import datetime
import json
import os
import shutil
from typing import List, Optional, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db import models
from app.schemas import schemas
from app.services.analytics_service import analytics_service
from app.services.youtube_service import youtube_service
from app.core.config import settings

router = APIRouter(tags=["Analytics & Syllabus Management"])


# ---------------- SUBJECTS ---------------- #
@router.get("/subjects", response_model=List[schemas.SubjectResponse])
def get_subjects(db: Session = Depends(get_db)):
    """
    Returns all subjects with calculated readiness and chapter counts.
    Auto-seeds default semester curriculum if the database is clean.
    """
    subjects = db.query(models.Subject).order_by(models.Subject.id).all()
    if not subjects:
        try:
            print("[ExamPrepAI] Empty database detected on /subjects request. Auto-seeding curriculum...")
            from seed_curriculum import seed_database
            seed_database(db)
            subjects = db.query(models.Subject).order_by(models.Subject.id).all()
        except Exception as e:
            print(f"[get_subjects] Auto-seed error: {e}")

    results = []
    for s in subjects:
        ch_count = len(s.chapters)
        
        # Calculate real uploaded papers count from database records
        pyq_count = len(s.pyq_documents)
        
        # Calculate subject readiness
        report = analytics_service.get_subject_readiness_report(db, s.id)
        overall_readiness = report["overall_readiness_index"] if report else 0.0

        exam_scheme_parsed = None
        if s.exam_scheme:
            try:
                exam_scheme_parsed = json.loads(s.exam_scheme)
            except Exception:
                pass

        results.append(schemas.SubjectResponse(
            id=s.id,
            name=s.name,
            code=s.code,
            course_code=s.course_code,
            credits=s.credits or 4,
            target_exam=s.target_exam,
            total_marks=s.total_marks,
            exam_scheme=exam_scheme_parsed,
            created_at=s.created_at,
            chapter_count=ch_count,
            pyq_count=pyq_count,
            overall_readiness=overall_readiness
        ))
    return results


@router.post("/subjects", response_model=schemas.SubjectDetailResponse)
def create_subject(payload: schemas.SubjectCreate, db: Session = Depends(get_db)):
    """
    Creates a new subject along with chapters and initial weightage distributions.
    """
    subject = models.Subject(
        name=payload.name,
        code=payload.code,
        target_exam=payload.target_exam or "Semester Exam",
        total_marks=payload.total_marks or 100.0,
        created_at=datetime.datetime.utcnow()
    )
    db.add(subject)
    db.flush()

    total_chapters = len(payload.chapters) if payload.chapters else 1
    default_pct = round(100.0 / total_chapters, 1)

    created_chapters = []
    if payload.chapters:
        for idx, ch in enumerate(payload.chapters):
            ch_obj = models.Chapter(
                subject_id=subject.id,
                name=ch.name,
                order=ch.order or (idx + 1),
                weightage_marks=ch.weightage_marks or ((default_pct / 100.0) * subject.total_marks),
                weightage_percent=ch.weightage_percent or default_pct,
                is_completed=ch.is_completed or False
            )
            db.add(ch_obj)
            db.flush()
            created_chapters.append(ch_obj)
    else:
        # Default starter chapter
        ch_obj = models.Chapter(
            subject_id=subject.id,
            name="Chapter 1: Foundations & Architecture",
            order=1,
            weightage_marks=20.0,
            weightage_percent=20.0,
            is_completed=False
        )
        db.add(ch_obj)
        db.flush()
        created_chapters.append(ch_obj)

    db.commit()

    return schemas.SubjectDetailResponse(
        id=subject.id,
        name=subject.name,
        code=subject.code,
        target_exam=subject.target_exam,
        total_marks=subject.total_marks,
        created_at=subject.created_at,
        chapter_count=len(created_chapters),
        pyq_count=0,
        overall_readiness=0.0,
        chapters=[
            schemas.ChapterResponse(
                id=c.id,
                subject_id=c.subject_id,
                name=c.name,
                order=c.order,
                weightage_marks=c.weightage_marks,
                weightage_percent=c.weightage_percent,
                is_completed=c.is_completed,
                completed_at=c.completed_at,
                questions_count=0,
                accuracy_score=0.0,
                readiness_index=0.0,
                priority_level="HIGH FOCUS"
            ) for c in created_chapters
        ]
    )


@router.get("/subjects/{subject_id}", response_model=schemas.SubjectDetailResponse)
def get_subject_detail(subject_id: int, db: Session = Depends(get_db)):
    """
    Returns detailed subject data including chapters, metrics, and question counts.
    """
    subject = db.query(models.Subject).filter(models.Subject.id == subject_id).first()
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")

    chapters = db.query(models.Chapter).filter(models.Chapter.subject_id == subject.id).order_by(models.Chapter.order).all()
    chapters_out = []

    for ch in chapters:
        q_count = db.query(models.Question).filter(models.Question.chapter_id == ch.id).count()
        metrics = analytics_service.calculate_chapter_metrics(db, ch.id)

        topics_parsed = []
        if ch.topics:
            try:
                topics_parsed = json.loads(ch.topics)
            except Exception:
                pass

        ref_materials_parsed = []
        if getattr(ch, "reference_materials", None):
            try:
                ref_materials_parsed = json.loads(ch.reference_materials)
            except Exception:
                ref_materials_parsed = []

        chapters_out.append(schemas.ChapterResponse(
            id=ch.id,
            subject_id=ch.subject_id,
            name=ch.name,
            unit_number=ch.unit_number or ch.order,
            order=ch.order,
            teaching_hours=ch.teaching_hours or 8,
            weightage_marks=ch.weightage_marks,
            estimated_ese_marks=ch.estimated_ese_marks or ch.weightage_marks,
            weightage_percent=ch.weightage_percent,
            topics=topics_parsed,
            is_completed=bool(ch.is_completed),
            video_done=bool(getattr(ch, "video_done", False)),
            notes_done=bool(getattr(ch, "notes_done", False)),
            pyq_done=bool(getattr(ch, "pyq_done", False)),
            quiz_done=bool(getattr(ch, "quiz_done", False)),
            reference_materials=ref_materials_parsed,
            completed_at=ch.completed_at,
            questions_count=q_count,
            accuracy_score=metrics["accuracy"],
            readiness_index=metrics["readiness_index"],
            priority_level=metrics["priority_quadrant"]
        ))

    report = analytics_service.get_subject_readiness_report(db, subject.id)
    overall_readiness = report["overall_readiness_index"] if report else 0.0

    exam_scheme_parsed = None
    if subject.exam_scheme:
        try:
            exam_scheme_parsed = json.loads(subject.exam_scheme)
        except Exception:
            pass

    sub_dir = os.path.join(settings.UPLOAD_DIR, subject.code)
    disk_count = 0
    if os.path.exists(sub_dir):
        disk_count = len([f for f in os.listdir(sub_dir) if f.lower().endswith(('.pdf', '.jpg', '.jpeg', '.png'))])
    real_pyq_count = max(len(subject.pyq_documents), disk_count)

    return schemas.SubjectDetailResponse(
        id=subject.id,
        name=subject.name,
        code=subject.code,
        course_code=subject.course_code,
        credits=subject.credits or 4,
        target_exam=subject.target_exam,
        total_marks=subject.total_marks,
        exam_scheme=exam_scheme_parsed,
        created_at=subject.created_at,
        chapter_count=len(chapters),
        pyq_count=real_pyq_count,
        overall_readiness=overall_readiness,
        chapters=chapters_out
    )


# ---------------- READINESS TRACKER & WEIGHTAGE ---------------- #
@router.get("/analytics/subject/{subject_id}", response_model=schemas.SubjectReadinessReport)
def get_subject_readiness(subject_id: int, db: Session = Depends(get_db)):
    """
    Calculates the Exam Readiness Index and highlights high-weightage, low-accuracy topics.
    """
    report = analytics_service.get_subject_readiness_report(db, subject_id)
    if not report:
        raise HTTPException(status_code=404, detail="Subject not found")
    return report


@router.post("/analytics/weightage")
def update_weightage_distribution(
    payload: schemas.UpdateWeightageBatchRequest,
    db: Session = Depends(get_db)
):
    """
    Updates total marks and chapter-wise weightage distribution.
    """
    subject = db.query(models.Subject).filter(models.Subject.id == payload.subject_id).first()
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")

    subject.total_marks = payload.total_marks

    total_weight_marks = sum(item.weightage_marks for item in payload.chapters) or 1.0

    for item in payload.chapters:
        ch = db.query(models.Chapter).filter(
            models.Chapter.id == item.chapter_id,
            models.Chapter.subject_id == payload.subject_id
        ).first()
        if ch:
            ch.weightage_marks = item.weightage_marks
            ch.weightage_percent = round((item.weightage_marks / total_weight_marks) * 100.0, 1)

    db.commit()

    return analytics_service.get_subject_readiness_report(db, payload.subject_id)


@router.post("/syllabus/chapter/{chapter_id}/toggle-complete")
def toggle_chapter_completion(chapter_id: int, db: Session = Depends(get_db)):
    """
    Toggles whole chapter completion state.
    Strict 4-Step Rule: Setting is_completed=True marks all 4 components (video, notes, pyq, quiz) done;
    unmarking sets all 4 components to False.
    """
    ch = db.query(models.Chapter).filter(models.Chapter.id == chapter_id).first()
    if not ch:
        raise HTTPException(status_code=404, detail="Chapter not found")

    new_state = not ch.is_completed
    ch.is_completed = new_state
    ch.video_done = new_state
    ch.notes_done = new_state
    ch.pyq_done = new_state
    ch.quiz_done = new_state
    ch.completed_at = datetime.datetime.utcnow() if new_state else None
    
    # Recalculate metrics
    updated_metrics = analytics_service.calculate_chapter_metrics(db, chapter_id)
    db.commit()

    return {
        "chapter_id": ch.id,
        "is_completed": ch.is_completed,
        "video_done": ch.video_done,
        "notes_done": ch.notes_done,
        "pyq_done": ch.pyq_done,
        "quiz_done": ch.quiz_done,
        "steps_done": 4 if new_state else 0,
        "total_steps": 4,
        "completed_at": ch.completed_at.isoformat() if ch.completed_at else None,
        "updated_readiness_index": updated_metrics["readiness_index"],
        "priority_level": updated_metrics["priority_quadrant"]
    }


@router.post("/syllabus/chapter/{chapter_id}/progress")
def update_chapter_progress(
    chapter_id: int,
    payload: schemas.ChapterProgressUpdate,
    db: Session = Depends(get_db)
):
    """
    Updates the 4-part completion flags (video_done, notes_done, pyq_done, quiz_done).
    Strict 4-Step Rule: A chapter is ONLY marked is_completed=True when all 4 flags are True.
    """
    ch = db.query(models.Chapter).filter(models.Chapter.id == chapter_id).first()
    if not ch:
        raise HTTPException(status_code=404, detail="Chapter not found")

    if payload.video_done is not None:
        ch.video_done = payload.video_done
    if payload.notes_done is not None:
        ch.notes_done = payload.notes_done
    if payload.pyq_done is not None:
        ch.pyq_done = payload.pyq_done
    if payload.quiz_done is not None:
        ch.quiz_done = payload.quiz_done

    is_all_done = bool(ch.video_done and ch.notes_done and ch.pyq_done and ch.quiz_done)
    ch.is_completed = is_all_done
    if is_all_done and not ch.completed_at:
        ch.completed_at = datetime.datetime.utcnow()
    elif not is_all_done:
        ch.completed_at = None

    updated_metrics = analytics_service.calculate_chapter_metrics(db, chapter_id)
    db.commit()

    steps_done = sum([1 for flag in [ch.video_done, ch.notes_done, ch.pyq_done, ch.quiz_done] if flag])

    return {
        "chapter_id": ch.id,
        "is_completed": ch.is_completed,
        "video_done": bool(ch.video_done),
        "notes_done": bool(ch.notes_done),
        "pyq_done": bool(ch.pyq_done),
        "quiz_done": bool(ch.quiz_done),
        "steps_done": steps_done,
        "total_steps": 4,
        "completed_at": ch.completed_at.isoformat() if ch.completed_at else None,
        "updated_readiness_index": updated_metrics["readiness_index"],
        "priority_level": updated_metrics["priority_quadrant"]
    }


@router.get("/syllabus/chapter/{chapter_id}/youtube-lectures")
def get_chapter_youtube_lectures(chapter_id: int, db: Session = Depends(get_db)):
    """
    Fetches both Complete Syllabus Full Playlists and Unit Topic Lectures
    with individual video watch tracking and verified playback options.
    """
    ch = db.query(models.Chapter).filter(models.Chapter.id == chapter_id).first()
    if not ch:
        raise HTTPException(status_code=404, detail="Chapter not found")

    subject = db.query(models.Subject).filter(models.Subject.id == ch.subject_id).first()
    subject_code = subject.code if subject else "DC"

    parsed_topics = []
    if ch.topics:
        try:
            parsed_topics = json.loads(ch.topics)
            if not isinstance(parsed_topics, list):
                parsed_topics = [str(ch.topics)]
        except Exception:
            parsed_topics = [t.strip() for t in str(ch.topics).split(",") if t.strip()]

    data = youtube_service.get_lectures_for_chapter(
        subject_code=subject_code,
        unit_number=ch.unit_number,
        chapter_name=ch.name,
        topics=parsed_topics
    )

    watched = []
    if ch.watched_videos:
        try:
            watched = json.loads(ch.watched_videos)
            if not isinstance(watched, list):
                watched = []
        except Exception:
            watched = []

    unit_lectures = data.get("unit_lectures", [])
    subject_playlists = data.get("subject_playlists", [])
    active_playlist = data.get("active_playlist")

    steps_done = sum([1 for flag in [ch.video_done, ch.notes_done, ch.pyq_done, ch.quiz_done] if flag])

    return {
        "chapter_id": ch.id,
        "chapter_name": ch.name,
        "unit_number": ch.unit_number,
        "subject_code": subject_code,
        "subject_name": subject.name if subject else "",
        "video_done": bool(ch.video_done),
        "watched_videos": watched,
        "watched_count": len(watched),
        "total_unit_lectures": len(unit_lectures),
        "steps_done": steps_done,
        "total_steps": 4,
        "is_completed": bool(ch.is_completed),
        "subject_playlists": subject_playlists,
        "active_playlist": active_playlist,
        "unit_lectures": unit_lectures,
        "lectures": unit_lectures
    }


@router.post("/syllabus/chapter/{chapter_id}/video-progress")
def update_chapter_video_progress(
    chapter_id: int,
    payload: schemas.VideoProgressUpdate,
    db: Session = Depends(get_db)
):
    """
    Tracks individual video completion in a unit's syllabus playlist.
    Auto-updates Step 1/4 (video_done) and recalculates readiness.
    """
    ch = db.query(models.Chapter).filter(models.Chapter.id == chapter_id).first()
    if not ch:
        raise HTTPException(status_code=404, detail="Chapter not found")

    watched = []
    if ch.watched_videos:
        try:
            watched = json.loads(ch.watched_videos)
            if not isinstance(watched, list):
                watched = []
        except Exception:
            watched = []

    if payload.watched and payload.video_id not in watched:
        watched.append(payload.video_id)
    elif not payload.watched and payload.video_id in watched:
        watched.remove(payload.video_id)

    ch.watched_videos = json.dumps(watched)

    # If at least 1 video is marked watched, mark video_done=True
    if len(watched) > 0:
        ch.video_done = True
    else:
        ch.video_done = False

    is_all_done = bool(ch.video_done and ch.notes_done and ch.pyq_done and ch.quiz_done)
    ch.is_completed = is_all_done
    if is_all_done and not ch.completed_at:
        ch.completed_at = datetime.datetime.utcnow()
    elif not is_all_done:
        ch.completed_at = None

    updated_metrics = analytics_service.calculate_chapter_metrics(db, chapter_id)
    db.commit()

    return {
        "chapter_id": ch.id,
        "video_id": payload.video_id,
        "watched": payload.watched,
        "watched_videos": watched,
        "watched_count": len(watched),
        "video_done": bool(ch.video_done),
        "is_completed": bool(ch.is_completed),
        "steps_done": sum([1 for f in [ch.video_done, ch.notes_done, ch.pyq_done, ch.quiz_done] if f]),
        "total_steps": 4,
        "readiness_index": updated_metrics["readiness_index"]
    }


@router.post("/syllabus/chapter/{chapter_id}/reference-material")
async def upload_chapter_reference_material(
    chapter_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Uploads unit reference material (Lecture PPT, Textbook PDF, or Class Notes),
    extracts key text context, and attaches it to the chapter for grounded note generation.
    """
    ch = db.query(models.Chapter).filter(models.Chapter.id == chapter_id).first()
    if not ch:
        raise HTTPException(status_code=404, detail="Chapter not found")

    subject = db.query(models.Subject).filter(models.Subject.id == ch.subject_id).first()
    subject_code = (subject.code or "SUB").upper()

    ref_dir = os.path.join(settings.UPLOAD_DIR, subject_code, f"unit_{ch.unit_number or ch.id}")
    os.makedirs(ref_dir, exist_ok=True)

    safe_name = f"{int(datetime.datetime.utcnow().timestamp())}_{file.filename.replace(' ', '_')}"
    file_path = os.path.join(ref_dir, safe_name)

    content = await file.read()
    with open(file_path, "wb") as f:
        f.write(content)

    extracted_text = ""
    file_lower = file.filename.lower()
    try:
        if file_lower.endswith(".pdf"):
            from pypdf import PdfReader
            reader = PdfReader(file_path)
            pages_text = [page.extract_text() or "" for page in reader.pages[:15]]
            extracted_text = "\n".join(pages_text).strip()
        elif file_lower.endswith((".pptx", ".ppt")):
            try:
                from pptx import Presentation
                prs = Presentation(file_path)
                slides_text = []
                for slide in prs.slides:
                    for shape in slide.shapes:
                        if hasattr(shape, "text") and shape.text:
                            slides_text.append(shape.text.strip())
                extracted_text = "\n".join(slides_text).strip()
            except Exception as ppt_err:
                extracted_text = f"PPT presentation uploaded: {file.filename}"
        elif file_lower.endswith(".txt"):
            extracted_text = content.decode("utf-8", errors="ignore")
    except Exception as extract_err:
        extracted_text = f"Reference file attached: {file.filename} (error extracting text: {extract_err})"

    file_size_kb = max(1, round(len(content) / 1024))
    size_formatted = f"{file_size_kb / 1024:.1f} MB" if file_size_kb >= 1024 else f"{file_size_kb} KB"

    existing_materials = []
    if ch.reference_materials:
        try:
            existing_materials = json.loads(ch.reference_materials)
            if not isinstance(existing_materials, list):
                existing_materials = []
        except Exception:
            existing_materials = []

    material_entry = {
        "id": f"ref_{int(datetime.datetime.utcnow().timestamp())}",
        "filename": file.filename,
        "file_path": file_path,
        "file_size": size_formatted,
        "uploaded_at": datetime.datetime.utcnow().isoformat(),
        "text_preview": extracted_text[:1000] if extracted_text else ""
    }
    existing_materials.append(material_entry)
    ch.reference_materials = json.dumps(existing_materials)
    db.commit()

    return {
        "message": f"Successfully attached {file.filename} as reference material for {ch.name}",
        "chapter_id": ch.id,
        "reference_materials": existing_materials
    }


@router.get("/syllabus/chapter/{chapter_id}/reference-materials")
def get_chapter_reference_materials(chapter_id: int, db: Session = Depends(get_db)):
    """
    Returns the list of attached reference materials for this unit.
    """
    ch = db.query(models.Chapter).filter(models.Chapter.id == chapter_id).first()
    if not ch:
        raise HTTPException(status_code=404, detail="Chapter not found")

    materials = []
    if ch.reference_materials:
        try:
            materials = json.loads(ch.reference_materials)
            if not isinstance(materials, list):
                materials = []
        except Exception:
            materials = []

    return {
        "chapter_id": ch.id,
        "chapter_name": ch.name,
        "reference_materials": materials
    }


# ---------------- API SETTINGS & KEY MANAGEMENT ---------------- #
@router.get("/settings/status", response_model=schemas.ApiKeyStatusResponse)
def get_api_status():
    """
    Returns the live status of Gemini and OpenAI API keys.
    """
    gemini_key = settings.GEMINI_API_KEY or os.environ.get("GEMINI_API_KEY", "")
    openai_key = settings.OPENAI_API_KEY or os.environ.get("OPENAI_API_KEY", "")

    return schemas.ApiKeyStatusResponse(
        gemini_configured=bool(gemini_key and len(gemini_key) > 5),
        openai_configured=bool(openai_key and len(openai_key) > 5),
        project_name=settings.PROJECT_NAME,
        version="1.0.0"
    )


@router.post("/settings/keys")
def update_api_keys(payload: schemas.UpdateApiKeysRequest):
    """
    Updates API keys in runtime and persists them to .env.
    """
    updated = []
    env_lines = {}

    env_path = ".env"
    if os.path.exists(env_path):
        with open(env_path, "r", encoding="utf-8") as f:
            for line in f:
                if "=" in line and not line.strip().startswith("#"):
                    k, v = line.strip().split("=", 1)
                    env_lines[k.strip()] = v.strip().strip('"').strip("'")

    if payload.gemini_api_key is not None:
        settings.GEMINI_API_KEY = payload.gemini_api_key.strip()
        os.environ["GEMINI_API_KEY"] = payload.gemini_api_key.strip()
        env_lines["GEMINI_API_KEY"] = payload.gemini_api_key.strip()
        updated.append("Gemini API Key")

    if payload.openai_api_key is not None:
        settings.OPENAI_API_KEY = payload.openai_api_key.strip()
        os.environ["OPENAI_API_KEY"] = payload.openai_api_key.strip()
        env_lines["OPENAI_API_KEY"] = payload.openai_api_key.strip()
        updated.append("OpenAI API Key")

    # Write back to .env
    with open(env_path, "w", encoding="utf-8") as f:
        for k, v in env_lines.items():
            f.write(f'{k}="{v}"\n')

    return {"message": f"Successfully updated: {', '.join(updated)}"}


# ---------------- SEED DATABASE ENDPOINT ---------------- #
@router.post("/seed")
def seed_demo_data(db: Session = Depends(get_db)):
    """
    Seeds comprehensive academic demo data for instant platform testing.
    """
    # Check if already seeded
    existing = db.query(models.Subject).first()
    if existing:
        return {"message": "Database already contains subjects.", "subject_id": existing.id}

    # Seed full curriculum schemes from seed_curriculum module
    from seed_curriculum import seed_database
    seed_database(db)
    first_sub = db.query(models.Subject).first()
    return {
        "message": "Curriculum and subject schemes seeded successfully.",
        "subject_id": first_sub.id if first_sub else None
    }
    first_sub = db.query(models.Subject).first()
    return {"message": "Demo subjects DC, SE, AISC, TOC, CNS, MDM successfully seeded!", "subject_id": first_sub.id if first_sub else None}
