import os
import re
import shutil
import json
import base64
import uuid
import datetime
from typing import List, Optional
from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException, Query, Response
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db import models
from app.schemas import schemas
from app.services.pdf_service import pdf_service
from app.services.gemini_service import gemini_service
from app.core.config import settings

router = APIRouter(prefix="/pyq", tags=["Previous Year Questions"])


def match_question_to_chapter(
    q_text: str,
    q_hint: Optional[str],
    chapters: List[models.Chapter],
    fallback_index: int = 0
) -> Optional[int]:
    """
    Intelligently maps an extracted question to its exact syllabus module/chapter using:
    1. Explicit Unit/Module numbers in question text or AI category hint (e.g. 'Unit 3', 'Module 2').
    2. High-precision keyword scoring against chapter names and all syllabus topics.
    3. Balanced fallback distribution when keywords are generic or missing.
    """
    if not chapters:
        return None

    combined_query = f"{q_hint or ''} {q_text or ''}".lower()

    # 1. Direct unit or module number reference (e.g. "Unit 3", "Module 4", "Q1(a) Unit 2")
    unit_match = re.search(r"\b(?:unit|module)\s*(\d+)\b", combined_query)
    if unit_match:
        target_unit = int(unit_match.group(1))
        for ch in chapters:
            if ch.unit_number == target_unit:
                return ch.id

    # 2. Weighted keyword scoring against chapter name & syllabus topics
    best_ch = None
    best_score = 0
    stop_words = {
        "the", "and", "for", "with", "from", "that", "this", "explain", "describe",
        "what", "how", "write", "short", "note", "discuss", "give", "briefly", "state",
        "system", "systems", "types", "different", "concept", "concepts", "define"
    }

    for ch in chapters:
        score = 0
        ch_name_clean = re.sub(r"^(?:Unit\s*\d+\s*[:\-]\s*)", "", ch.name or "").lower()

        # Match words in chapter title (weighted +3)
        ch_words = [w for w in re.findall(r"[a-z]{3,}", ch_name_clean) if w not in stop_words]
        for w in ch_words:
            if re.search(r"\b" + re.escape(w) + r"\b", combined_query):
                score += 3

        # Match words in chapter topics list (weighted +2)
        if ch.topics:
            try:
                top_items = json.loads(ch.topics) if str(ch.topics).startswith("[") else str(ch.topics).split(",")
                for item in top_items:
                    item_words = [w for w in re.findall(r"[a-z]{4,}", str(item).lower()) if w not in stop_words]
                    for w in item_words:
                        if re.search(r"\b" + re.escape(w) + r"\b", combined_query):
                            score += 2
            except Exception:
                pass

        if score > best_score:
            best_score = score
            best_ch = ch

    if best_ch and best_score >= 3:
        return best_ch.id

    # 3. Fair fallback distribution across chapters so questions aren't dumped into Chapter 1
    return chapters[fallback_index % len(chapters)].id


@router.post("/upload", response_model=schemas.PYQExtractResponse)
async def upload_pyq_document(
    file: UploadFile = File(...),
    subject_id: int = Form(...),
    exam_year: str = Form("2024"),
    exam_session: str = Form("End-Semester"),
    db: Session = Depends(get_db)
):
    """
    Uploads a single PYQ PDF document, extracts its text, and parses structured questions via AI.
    """
    subject = db.query(models.Subject).filter(models.Subject.id == subject_id).first()
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")

    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF documents are supported")

    subject_folder = os.path.join(settings.UPLOAD_DIR, subject.code or f"subject_{subject_id}")
    os.makedirs(subject_folder, exist_ok=True)
    safe_filename = f"{subject_id}_{uuid.uuid4().hex[:8]}_{file.filename.replace(' ', '_')}"
    file_path = os.path.join(subject_folder, safe_filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        extracted_text = pdf_service.extract_text(file_path)
    except Exception as e:
        extracted_text = f"Note: Scanned or image-based PDF document detected. ({str(e)})"

    chapters = db.query(models.Chapter).filter(models.Chapter.subject_id == subject_id).order_by(models.Chapter.unit_number.asc()).all()
    chapter_names = [f"Unit {ch.unit_number}: {ch.name}" for ch in chapters]

    extracted_questions_raw = gemini_service.extract_questions_from_pyq(
        pyq_text=extracted_text,
        subject_name=subject.name,
        chapter_names=chapter_names
    )

    with open(file_path, "rb") as f:
        file_bytes = f.read()
    b64_content = base64.b64encode(file_bytes).decode('utf-8')
    size_mb = len(file_bytes) / (1024 * 1024)
    size_formatted = f"{size_mb:.1f} MB" if size_mb >= 1.0 else f"{max(1, round(len(file_bytes) / 1024))} KB"

    pyq_doc = models.PYQDocument(
        subject_id=subject_id,
        filename=file.filename,
        file_path=file_path,
        file_data=b64_content,
        file_size_formatted=size_formatted,
        exam_year=exam_year,
        exam_session=exam_session,
        total_questions_extracted=len(extracted_questions_raw)
    )
    db.add(pyq_doc)
    db.flush()

    created_questions = []
    for q_idx, q_data in enumerate(extracted_questions_raw):
        matched_chapter_id = match_question_to_chapter(
            q_text=q_data.get("text", ""),
            q_hint=q_data.get("chapter_name", ""),
            chapters=chapters,
            fallback_index=q_idx
        )

        tags = q_data.get("tags", [])
        if isinstance(tags, str):
            tags = [tags]

        question_obj = models.Question(
            subject_id=subject_id,
            chapter_id=matched_chapter_id,
            pyq_doc_id=pyq_doc.id,
            text=q_data.get("text", "Exam Question"),
            question_type=q_data.get("question_type", "Short"),
            marks=float(q_data.get("marks", 5.0)),
            solution=q_data.get("solution"),
            difficulty=q_data.get("difficulty", "Medium"),
            exam_year=exam_year,
            source_paper=f"{exam_session} {exam_year} ({file.filename})",
            tags=json.dumps(tags)
        )
        db.add(question_obj)
        db.flush()

        created_questions.append(
            schemas.QuestionResponse(
                id=question_obj.id,
                subject_id=subject_id,
                chapter_id=matched_chapter_id,
                pyq_doc_id=pyq_doc.id,
                text=question_obj.text,
                question_type=question_obj.question_type,
                marks=question_obj.marks,
                solution=question_obj.solution,
                difficulty=question_obj.difficulty,
                exam_year=question_obj.exam_year,
                source_paper=question_obj.source_paper,
                chapter_name=next((ch.name for ch in chapters if ch.id == matched_chapter_id), "General"),
                tags=tags,
                created_at=question_obj.created_at
            )
        )

    db.commit()

    return schemas.PYQExtractResponse(
        doc_id=pyq_doc.id,
        filename=pyq_doc.filename,
        exam_year=pyq_doc.exam_year,
        exam_session=pyq_doc.exam_session,
        total_extracted=len(created_questions),
        questions=created_questions
    )


@router.post("/upload-batch", response_model=schemas.PYQBatchExtractResponse)
async def upload_pyq_documents_batch(
    files: List[UploadFile] = File(...),
    subject_id: int = Form(...),
    exam_year: str = Form("2024"),
    exam_session: str = Form("End-Semester"),
    db: Session = Depends(get_db)
):
    """
    Uploads multiple PYQ PDF documents simultaneously (batch upload),
    extracts all questions, and categorizes them module-wise across all syllabus units.
    """
    subject = db.query(models.Subject).filter(models.Subject.id == subject_id).first()
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")

    if not files or len(files) == 0:
        raise HTTPException(status_code=400, detail="No files uploaded")

    subject_folder = os.path.join(settings.UPLOAD_DIR, subject.code or f"subject_{subject_id}")
    os.makedirs(subject_folder, exist_ok=True)

    chapters = db.query(models.Chapter).filter(models.Chapter.subject_id == subject_id).order_by(models.Chapter.unit_number.asc()).all()
    chapter_names = [f"Unit {ch.unit_number}: {ch.name}" for ch in chapters]

    total_extracted_all = 0
    docs_summary = []
    questions_per_mod: Dict[str, int] = {ch.name: 0 for ch in chapters}

    for file_item in files:
        if not file_item.filename.lower().endswith(".pdf"):
            continue

        safe_filename = f"{subject_id}_{uuid.uuid4().hex[:8]}_{file_item.filename.replace(' ', '_')}"
        file_path = os.path.join(subject_folder, safe_filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file_item.file, buffer)

        try:
            extracted_text = pdf_service.extract_text(file_path)
        except Exception:
            extracted_text = ""

        extracted_questions_raw = gemini_service.extract_questions_from_pyq(
            pyq_text=extracted_text,
            subject_name=subject.name,
            chapter_names=chapter_names
        )

        with open(file_path, "rb") as f:
            file_bytes = f.read()
        b64_content = base64.b64encode(file_bytes).decode('utf-8')
        size_mb = len(file_bytes) / (1024 * 1024)
        size_formatted = f"{size_mb:.1f} MB" if size_mb >= 1.0 else f"{max(1, round(len(file_bytes) / 1024))} KB"

        pyq_doc = models.PYQDocument(
            subject_id=subject_id,
            filename=file_item.filename,
            file_path=file_path,
            file_data=b64_content,
            file_size_formatted=size_formatted,
            exam_year=exam_year,
            exam_session=exam_session,
            total_questions_extracted=len(extracted_questions_raw)
        )
        db.add(pyq_doc)
        db.flush()

        doc_q_count = 0
        for q_idx, q_data in enumerate(extracted_questions_raw):
            matched_chapter_id = match_question_to_chapter(
                q_text=q_data.get("text", ""),
                q_hint=q_data.get("chapter_name", ""),
                chapters=chapters,
                fallback_index=total_extracted_all + q_idx
            )

            matched_ch = next((c for c in chapters if c.id == matched_chapter_id), None)
            if matched_ch:
                questions_per_mod[matched_ch.name] = questions_per_mod.get(matched_ch.name, 0) + 1

            tags = q_data.get("tags", [])
            if isinstance(tags, str):
                tags = [tags]

            question_obj = models.Question(
                subject_id=subject_id,
                chapter_id=matched_chapter_id,
                pyq_doc_id=pyq_doc.id,
                text=q_data.get("text", "Exam Question"),
                question_type=q_data.get("question_type", "Short"),
                marks=float(q_data.get("marks", 5.0)),
                solution=q_data.get("solution"),
                difficulty=q_data.get("difficulty", "Medium"),
                exam_year=exam_year,
                source_paper=f"{exam_session} {exam_year} ({file_item.filename})",
                tags=json.dumps(tags)
            )
            db.add(question_obj)
            doc_q_count += 1

        total_extracted_all += doc_q_count
        docs_summary.append({
            "id": pyq_doc.id,
            "filename": file_item.filename,
            "size": size_formatted,
            "questions_extracted": doc_q_count
        })

    db.commit()

    return schemas.PYQBatchExtractResponse(
        success=True,
        total_files=len(docs_summary),
        total_extracted=total_extracted_all,
        documents=docs_summary,
        questions_per_module=questions_per_mod,
        message=f"Successfully uploaded {len(docs_summary)} question papers and extracted {total_extracted_all} questions module-wise!"
    )


@router.post("/extract-module-wise", response_model=schemas.PYQModuleExtractResponse)
def extract_module_wise_questions(
    payload: schemas.PYQModuleExtractRequest,
    db: Session = Depends(get_db)
):
    """
    Intelligently parses and categorizes all PYQ questions module-wise for a subject.
    If questions are already loaded, it re-aligns them according to detailed syllabus topics
    so every module has authentic, properly assigned past year questions.
    """
    subject = db.query(models.Subject).filter(models.Subject.id == payload.subject_id).first()
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")

    chapters = db.query(models.Chapter).filter(models.Chapter.subject_id == payload.subject_id).order_by(models.Chapter.unit_number.asc()).all()
    if not chapters:
        raise HTTPException(status_code=400, detail="No chapters found for this subject")

    # Fetch all questions for this subject
    query = db.query(models.Question).filter(models.Question.subject_id == payload.subject_id)
    if payload.document_ids:
        query = query.filter(models.Question.pyq_doc_id.in_(payload.document_ids))
    questions = query.all()

    # If no questions currently in DB but documents exist, parse and extract them from documents
    if not questions or payload.force_reextract:
        docs_query = db.query(models.PYQDocument).filter(models.PYQDocument.subject_id == payload.subject_id)
        if payload.document_ids:
            docs_query = docs_query.filter(models.PYQDocument.id.in_(payload.document_ids))
        docs = docs_query.all()

        chapter_names = [f"Unit {ch.unit_number}: {ch.name}" for ch in chapters]
        for doc in docs:
            extracted_text = ""
            if doc.file_path and os.path.exists(doc.file_path):
                try:
                    extracted_text = pdf_service.extract_text(doc.file_path)
                except Exception:
                    pass
            elif doc.file_data:
                try:
                    import tempfile
                    with tempfile.NamedTemporaryFile(suffix=".pdf", delete=False) as tmp:
                        tmp.write(base64.b64decode(doc.file_data))
                        tmp_path = tmp.name
                    extracted_text = pdf_service.extract_text(tmp_path)
                    os.unlink(tmp_path)
                except Exception:
                    pass

            extracted_raw = gemini_service.extract_questions_from_pyq(
                pyq_text=extracted_text,
                subject_name=subject.name,
                chapter_names=chapter_names
            )

            # Avoid duplicates if force_reextract
            if payload.force_reextract:
                db.query(models.Question).filter(models.Question.pyq_doc_id == doc.id).delete()

            for q_idx, q_data in enumerate(extracted_raw):
                matched_chapter_id = match_question_to_chapter(
                    q_text=q_data.get("text", ""),
                    q_hint=q_data.get("chapter_name", ""),
                    chapters=chapters,
                    fallback_index=q_idx
                )
                tags = q_data.get("tags", [])
                if isinstance(tags, str):
                    tags = [tags]

                question_obj = models.Question(
                    subject_id=subject.id,
                    chapter_id=matched_chapter_id,
                    pyq_doc_id=doc.id,
                    text=q_data.get("text", "Exam Question"),
                    question_type=q_data.get("question_type", "Short"),
                    marks=float(q_data.get("marks", 5.0)),
                    solution=q_data.get("solution"),
                    difficulty=q_data.get("difficulty", "Medium"),
                    exam_year=doc.exam_year or "2024",
                    source_paper=f"{doc.exam_session or 'Endsem'} {doc.exam_year or '2024'} ({doc.filename})",
                    tags=json.dumps(tags)
                )
                db.add(question_obj)
        db.commit()

        # Re-fetch populated questions
        questions = db.query(models.Question).filter(models.Question.subject_id == payload.subject_id).all()

    # Re-evaluate and assign each question to the best matching chapter
    for q_idx, q in enumerate(questions):
        best_chapter_id = match_question_to_chapter(
            q_text=q.text,
            q_hint=None,
            chapters=chapters,
            fallback_index=q_idx
        )
        if best_chapter_id and q.chapter_id != best_chapter_id:
            q.chapter_id = best_chapter_id

    db.commit()

    # Compute breakdown per chapter
    breakdown = []
    total_q = 0
    for ch in chapters:
        count = db.query(models.Question).filter(models.Question.chapter_id == ch.id).count()
        total_q += count
        breakdown.append(schemas.ModuleQuestionCount(
            chapter_id=ch.id,
            chapter_name=ch.name,
            unit_number=ch.unit_number,
            questions_count=count
        ))

    return schemas.PYQModuleExtractResponse(
        success=True,
        subject_id=subject.id,
        subject_name=subject.name,
        total_questions=total_q,
        module_breakdown=breakdown,
        message=f"Categorized {total_q} questions module-wise across all {len(chapters)} modules for {subject.name}!"
    )


@router.get("/documents", response_model=List[dict])
def list_pyq_documents(subject_id: Optional[int] = None, db: Session = Depends(get_db)):
    """
    Lists uploaded PYQ documents with extraction statistics.
    """
    query = db.query(models.PYQDocument)
    if subject_id:
        query = query.filter(models.PYQDocument.subject_id == subject_id)
    
    docs = query.order_by(models.PYQDocument.uploaded_at.desc()).all()
    results = []
    for doc in docs:
        subject = db.query(models.Subject).filter(models.Subject.id == doc.subject_id).first()
        results.append({
            "id": doc.id,
            "filename": doc.filename,
            "exam_year": doc.exam_year,
            "exam_session": doc.exam_session,
            "subject_id": doc.subject_id,
            "subject_name": subject.name if subject else "Unknown",
            "total_questions_extracted": doc.total_questions_extracted,
            "uploaded_at": doc.uploaded_at.isoformat() if doc.uploaded_at else None
        })
    return results


@router.get("/questions", response_model=List[schemas.QuestionResponse])
def get_questions(
    subject_id: Optional[int] = None,
    chapter_id: Optional[int] = None,
    question_type: Optional[str] = None,
    difficulty: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """
    Search and filter PYQ question bank by subject, chapter, type, difficulty, and keywords.
    """
    query = db.query(models.Question)
    if subject_id:
        query = query.filter(models.Question.subject_id == subject_id)
    if chapter_id:
        query = query.filter(models.Question.chapter_id == chapter_id)
    if question_type and question_type != "All":
        query = query.filter(models.Question.question_type == question_type)
    if difficulty and difficulty != "All":
        query = query.filter(models.Question.difficulty == difficulty)
    if search:
        query = query.filter(models.Question.text.ilike(f"%{search}%"))

    questions = query.order_by(models.Question.id.desc()).all()
    response = []
    for q in questions:
        tags_list = []
        try:
            tags_list = json.loads(q.tags) if q.tags else []
        except Exception:
            tags_list = []
        
        chapter_name = q.chapter.name if q.chapter else "General"
        response.append(schemas.QuestionResponse(
            id=q.id,
            subject_id=q.subject_id,
            chapter_id=q.chapter_id,
            pyq_doc_id=q.pyq_doc_id,
            text=q.text,
            question_type=q.question_type,
            marks=q.marks,
            solution=q.solution,
            difficulty=q.difficulty,
            exam_year=q.exam_year,
            source_paper=q.source_paper,
            chapter_name=chapter_name,
            tags=tags_list,
            created_at=q.created_at
        ))
    return response


@router.delete("/documents/{doc_id}")
def delete_pyq_document(doc_id: int, db: Session = Depends(get_db)):
    """
    Deletes a PYQ document and associated questions.
    """
    doc = db.query(models.PYQDocument).filter(models.PYQDocument.id == doc_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")

    if os.path.exists(doc.file_path):
        try:
            os.remove(doc.file_path)
        except Exception:
            pass

    db.delete(doc)
    db.commit()
    return {"message": "Document and extracted questions deleted successfully"}


MONTH_MAP = {
    "jan": "January", "feb": "February", "mar": "March", "apr": "April",
    "may": "May", "jun": "June", "jul": "July", "aug": "August",
    "sep": "September", "oct": "October", "nov": "November", "dec": "December"
}


def parse_paper_metadata(filename: str, sub_code: str, file_path: str) -> dict:
    base_name = os.path.splitext(filename)[0]
    ext = os.path.splitext(filename)[1].lower()
    size_bytes = os.path.getsize(file_path) if os.path.exists(file_path) else 0
    if size_bytes >= 1024 * 1024:
        size_formatted = f"{size_bytes / (1024 * 1024):.1f} MB"
    else:
        size_formatted = f"{max(1, round(size_bytes / 1024))} KB"

    clean_upper = base_name.upper()
    exam_type = "University Examination Paper"
    exam_tag = "ESE"
    if clean_upper.startswith("E_") or clean_upper.startswith("E.") or clean_upper.startswith("E"):
        exam_type = "End-Semester Examination (ESE)"
        exam_tag = "ESE"
    elif clean_upper.startswith("M_") or clean_upper.startswith("M.") or clean_upper.startswith("M"):
        exam_type = "Mid-Semester Examination (MSE)"
        exam_tag = "MSE"
    elif clean_upper.startswith("R_") or clean_upper.startswith("R.") or clean_upper.startswith("R"):
        exam_type = "Re-Examination / KT Paper"
        exam_tag = "KT"
    elif clean_upper.startswith("S_") or clean_upper.startswith("S.") or clean_upper.startswith("S"):
        exam_type = "Supplementary / Summer Paper"
        exam_tag = "SUMMER"

    month_detected = ""
    lower_name = base_name.lower()
    for m_key, m_full in MONTH_MAP.items():
        if m_key in lower_name:
            month_detected = m_full
            break

    # Look for 2-digit or 4-digit year e.g. 18..26 or 2018..2026
    year_match = re.search(r'(20\d\d)|(?<!\d)(1[8-9]|2[0-9])(?!\d)', base_name)
    if year_match:
        yr = year_match.group(0)
        year_detected = f"20{yr}" if len(yr) == 2 else yr
    else:
        year_detected = "Recent"

    session_str = f"{month_detected} {year_detected}".strip() if month_detected else year_detected
    title = f"{sub_code} {exam_type} — {session_str}" if session_str else f"{sub_code} {exam_type}"

    return {
        "filename": filename,
        "title": title,
        "subject_code": sub_code,
        "exam_type": exam_type,
        "exam_tag": exam_tag,
        "exam_session": session_str,
        "exam_year": year_detected,
        "month": month_detected,
        "file_size": size_formatted,
        "file_size_bytes": size_bytes,
        "file_url": f"/uploads/{sub_code}/{filename}",
        "file_ext": ext,
        "is_pdf": ext == ".pdf",
        "modified_at": os.path.getmtime(file_path) if os.path.exists(file_path) else None
    }


@router.get("/documents/{doc_id}/view")
def view_or_download_pyq(doc_id: int, db: Session = Depends(get_db)):
    """
    Serves the PDF for in-app preview or download, restoring file to disk if needed.
    """
    doc = db.query(models.PYQDocument).filter(models.PYQDocument.id == doc_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="PYQ document not found")

    content = None
    if os.path.exists(doc.file_path):
        try:
            with open(doc.file_path, "rb") as f:
                content = f.read()
        except Exception:
            pass

    if not content and doc.file_data:
        try:
            content = base64.b64decode(doc.file_data)
            # Recreate on disk for static serving
            os.makedirs(os.path.dirname(doc.file_path), exist_ok=True)
            with open(doc.file_path, "wb") as f:
                f.write(content)
        except Exception as e:
            print(f"[restore paper error] {e}")

    if not content:
        raise HTTPException(status_code=404, detail="PDF content not available")

    return Response(
        content=content,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f'inline; filename="{doc.filename}"'
        }
    )


@router.get("/subject-papers/{identifier}")
def get_subject_papers(identifier: str, db: Session = Depends(get_db)):
    """
    Returns all authentic PYQ exam papers uploaded for a specific subject (by code or ID).
    Driven by database records so uploaded papers persist permanently.
    """
    subject = None
    if identifier.isdigit():
        subject = db.query(models.Subject).filter(models.Subject.id == int(identifier)).first()
    if not subject:
        subject = db.query(models.Subject).filter(models.Subject.code.ilike(identifier)).first()

    if not subject:
        return {
            "subject_id": None,
            "subject_code": identifier.upper(),
            "subject_name": identifier.upper(),
            "total_papers": 0,
            "papers": []
        }

    sub_code = subject.code
    docs = db.query(models.PYQDocument).filter(
        models.PYQDocument.subject_id == subject.id
    ).order_by(models.PYQDocument.uploaded_at.desc()).all()

    papers = []
    for doc in docs:
        # Restore to disk if needed
        if doc.file_data and not os.path.exists(doc.file_path):
            try:
                os.makedirs(os.path.dirname(doc.file_path), exist_ok=True)
                with open(doc.file_path, "wb") as f:
                    f.write(base64.b64decode(doc.file_data))
            except Exception as e:
                print(f"[restore paper] {e}")

        clean_upper = doc.filename.upper()
        exam_tag = "ESE"
        if "MID" in doc.exam_session.upper() or clean_upper.startswith("M"):
            exam_tag = "MSE"
        elif "KT" in doc.exam_session.upper() or "RE" in doc.exam_session.upper():
            exam_tag = "KT"

        papers.append({
            "id": doc.id,
            "filename": doc.filename,
            "title": f"{sub_code} {doc.exam_session} — {doc.exam_year}",
            "subject_code": sub_code,
            "subject_id": subject.id,
            "exam_type": doc.exam_session,
            "exam_tag": exam_tag,
            "exam_session": f"{doc.exam_session} {doc.exam_year}",
            "exam_year": doc.exam_year,
            "month": "",
            "file_size": doc.file_size_formatted or "1.0 MB",
            "file_url": f"/api/pyq/documents/{doc.id}/view",
            "file_ext": ".pdf",
            "is_pdf": True,
            "total_questions": doc.total_questions_extracted,
            "uploaded_at": doc.uploaded_at.isoformat() if doc.uploaded_at else None
        })

    return {
        "subject_id": subject.id,
        "subject_code": sub_code,
        "subject_name": subject.name,
        "total_papers": len(papers),
        "papers": papers
    }


@router.get("/all-papers")
def get_all_papers(db: Session = Depends(get_db)):
    """
    Returns all uploaded PYQ papers grouped across all active subjects.
    Starts completely null until the user uploads papers.
    """
    subjects = db.query(models.Subject).order_by(models.Subject.id).all()
    grouped = {}
    total_count = 0

    for sub in subjects:
        docs = db.query(models.PYQDocument).filter(
            models.PYQDocument.subject_id == sub.id
        ).order_by(models.PYQDocument.uploaded_at.desc()).all()

        papers = []
        for doc in docs:
            # Restore to disk if needed
            if doc.file_data and not os.path.exists(doc.file_path):
                try:
                    os.makedirs(os.path.dirname(doc.file_path), exist_ok=True)
                    with open(doc.file_path, "wb") as f:
                        f.write(base64.b64decode(doc.file_data))
                except Exception as e:
                    print(f"[restore paper] {e}")

            clean_upper = doc.filename.upper()
            exam_tag = "ESE"
            if "MID" in doc.exam_session.upper() or clean_upper.startswith("M"):
                exam_tag = "MSE"
            elif "KT" in doc.exam_session.upper() or "RE" in doc.exam_session.upper():
                exam_tag = "KT"

            papers.append({
                "id": doc.id,
                "filename": doc.filename,
                "title": f"{sub.code} {doc.exam_session} — {doc.exam_year}",
                "subject_code": sub.code,
                "subject_id": sub.id,
                "exam_type": doc.exam_session,
                "exam_tag": exam_tag,
                "exam_session": f"{doc.exam_session} {doc.exam_year}",
                "exam_year": doc.exam_year,
                "month": "",
                "file_size": doc.file_size_formatted or "1.0 MB",
                "file_url": f"/api/pyq/documents/{doc.id}/view",
                "file_ext": ".pdf",
                "is_pdf": True,
                "total_questions": doc.total_questions_extracted,
                "uploaded_at": doc.uploaded_at.isoformat() if doc.uploaded_at else None
            })

        total_count += len(papers)
        grouped[sub.code] = {
            "subject_id": sub.id,
            "subject_name": sub.name,
            "subject_code": sub.code,
            "course_code": sub.course_code,
            "count": len(papers),
            "papers": papers
        }

    return {
        "total_papers_all_subjects": total_count,
        "subjects": grouped
    }


@router.get("/chapter/{chapter_id}")
def get_chapter_pyq_overview(chapter_id: int, db: Session = Depends(get_db)):
    """
    Retrieves all past year exam questions specifically categorized under this unit/module,
    along with subject exam context, papers list, and completion status.
    """
    ch = db.query(models.Chapter).filter(models.Chapter.id == chapter_id).first()
    if not ch:
        raise HTTPException(status_code=404, detail="Chapter not found")

    subject = db.query(models.Subject).filter(models.Subject.id == ch.subject_id).first()
    questions = db.query(models.Question).filter(
        models.Question.chapter_id == chapter_id
    ).order_by(models.Question.marks.desc(), models.Question.id.desc()).all()

    # Formatted questions
    res_qs = []
    for q in questions:
        tags = []
        try:
            tags = json.loads(q.tags) if q.tags else []
        except Exception:
            tags = []
        res_qs.append({
            "id": q.id,
            "text": q.text,
            "question_type": q.question_type or "Long",
            "marks": q.marks or 10.0,
            "difficulty": q.difficulty or "Medium",
            "exam_year": q.exam_year or "2024",
            "source_paper": q.source_paper or "University Examination",
            "solution": q.solution or "",
            "tags": tags
        })

    # Total papers available for this subject
    sub_docs = db.query(models.PYQDocument).filter(models.PYQDocument.subject_id == subject.id).all() if subject else []

    return {
        "chapter_id": ch.id,
        "chapter_name": ch.name,
        "unit_number": ch.unit_number or 1,
        "subject_id": subject.id if subject else None,
        "subject_code": (subject.code or "SUB").upper() if subject else "",
        "subject_name": subject.name if subject else "",
        "pyq_done": bool(ch.pyq_done),
        "is_completed": bool(ch.is_completed),
        "total_questions": len(res_qs),
        "questions": res_qs,
        "total_subject_papers": len(sub_docs),
        "subject_papers": [{"id": d.id, "filename": d.filename, "year": d.exam_year, "session": d.exam_session} for d in sub_docs]
    }


@router.post("/chapter/{chapter_id}/mark-practiced")
def mark_chapter_pyq_practiced(chapter_id: int, db: Session = Depends(get_db)):
    """
    Marks Step 3/4 (PYQ Paper Practice) as completed for a unit.
    """
    ch = db.query(models.Chapter).filter(models.Chapter.id == chapter_id).first()
    if not ch:
        raise HTTPException(status_code=404, detail="Chapter not found")

    ch.pyq_done = True
    is_fully_done = bool(ch.video_done and ch.notes_done and ch.pyq_done and ch.quiz_done)
    ch.is_completed = is_fully_done
    if is_fully_done and not ch.completed_at:
        ch.completed_at = datetime.datetime.utcnow()

    from app.services.analytics_service import analytics_service
    updated_metrics = analytics_service.calculate_chapter_metrics(db, chapter_id)
    db.commit()

    return {
        "chapter_id": ch.id,
        "pyq_done": True,
        "is_completed": ch.is_completed,
        "steps_done": sum([1 for f in [ch.video_done, ch.notes_done, ch.pyq_done, ch.quiz_done] if f]),
        "total_steps": 4,
        "readiness_index": updated_metrics["readiness_index"]
    }


@router.post("/add-by-path")
def add_pyq_by_path(
    payload: schemas.PYQPathAddRequest,
    db: Session = Depends(get_db)
):
    """
    Imports PYQ PDF document(s) from a local filesystem path or directory.
    Extracts text, questions, and indexes them into the database with base64 persistence.
    """
    subject = db.query(models.Subject).filter(models.Subject.id == payload.subject_id).first()
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")

    raw_path = (payload.path or "").strip().strip('"').strip("'")
    if not raw_path:
        raise HTTPException(status_code=400, detail="Path cannot be empty")

    normalized_path = os.path.abspath(raw_path)
    if not os.path.exists(normalized_path):
        raise HTTPException(
            status_code=400,
            detail=f"Path not found: '{raw_path}'. Please verify the file or directory exists on your computer."
        )

    subject_folder = os.path.join(settings.UPLOAD_DIR, subject.code or f"subject_{subject.id}")
    os.makedirs(subject_folder, exist_ok=True)

    chapters = db.query(models.Chapter).filter(models.Chapter.subject_id == subject.id).order_by(models.Chapter.unit_number.asc()).all()
    chapter_names = [f"Unit {ch.unit_number}: {ch.name}" for ch in chapters]

    files_to_process = []
    if os.path.isfile(normalized_path):
        if not normalized_path.lower().endswith(".pdf"):
            raise HTTPException(status_code=400, detail="Only PDF documents are supported for PYQs.")
        files_to_process.append(normalized_path)
    elif os.path.isdir(normalized_path):
        for root, _, files in os.walk(normalized_path):
            for f in files:
                if f.lower().endswith(".pdf"):
                    files_to_process.append(os.path.join(root, f))

    if not files_to_process:
        raise HTTPException(
            status_code=400,
            detail=f"No PDF documents were found at '{raw_path}'."
        )

    imported_docs = []
    total_questions = 0

    for src_path in files_to_process:
        orig_filename = os.path.basename(src_path)
        safe_filename = f"{subject.id}_{int(os.times().elapsed)}_{orig_filename.replace(' ', '_')}"
        dest_path = os.path.join(subject_folder, safe_filename)

        # Copy file to subject folder
        shutil.copy2(src_path, dest_path)

        # Extract text using pdf_service
        try:
            extracted_text = pdf_service.extract_text(dest_path)
        except Exception:
            extracted_text = ""

        # Extract structured questions via Gemini / intelligent fallback
        extracted_questions_raw = gemini_service.extract_questions_from_pyq(
            pyq_text=extracted_text,
            subject_name=subject.name,
            chapter_names=chapter_names
        )

        with open(dest_path, "rb") as f:
            file_bytes = f.read()
        b64_content = base64.b64encode(file_bytes).decode('utf-8')
        size_mb = len(file_bytes) / (1024 * 1024)
        size_formatted = f"{size_mb:.1f} MB" if size_mb >= 1.0 else f"{max(1, round(len(file_bytes) / 1024))} KB"

        # Create PYQDocument record
        pyq_doc = models.PYQDocument(
            subject_id=subject.id,
            filename=orig_filename,
            file_path=dest_path,
            file_data=b64_content,
            file_size_formatted=size_formatted,
            exam_year=payload.exam_year or "2024",
            exam_session=payload.exam_session or "End-Semester",
            total_questions_extracted=len(extracted_questions_raw)
        )
        db.add(pyq_doc)
        db.flush()

        for q_idx, q_data in enumerate(extracted_questions_raw):
            matched_chapter_id = match_question_to_chapter(
                q_text=q_data.get("text", ""),
                q_hint=q_data.get("chapter_name", ""),
                chapters=chapters,
                fallback_index=total_questions + q_idx
            )

            tags = q_data.get("tags", [])
            if isinstance(tags, str):
                tags = [tags]

            question_obj = models.Question(
                subject_id=subject.id,
                chapter_id=matched_chapter_id,
                pyq_doc_id=pyq_doc.id,
                text=q_data.get("text", "Exam Question"),
                question_type=q_data.get("question_type", "Short"),
                marks=float(q_data.get("marks", 5.0)),
                solution=q_data.get("solution"),
                difficulty=q_data.get("difficulty", "Medium"),
                exam_year=payload.exam_year or "2024",
                source_paper=f"{payload.exam_session or 'End-Semester'} {payload.exam_year or '2024'} ({orig_filename})",
                tags=json.dumps(tags)
            )
            db.add(question_obj)
            db.flush()

        imported_docs.append({
            "id": pyq_doc.id,
            "filename": orig_filename,
            "questions_count": len(extracted_questions_raw)
        })
        total_questions += len(extracted_questions_raw)

    db.commit()

    return {
        "success": True,
        "message": f"Successfully imported {len(imported_docs)} PYQ paper(s) with {total_questions} questions for {subject.name}!",
        "documents": imported_docs,
        "total_documents": len(imported_docs),
        "total_questions": total_questions
    }


