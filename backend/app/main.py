import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from sqlalchemy import text
from app.core.config import settings
from app.db.database import engine, Base, SessionLocal
from app.routers import pyq, quiz, notes, analytics, books, auth, placement


def ensure_schema_migrations():
    """Ensure newly added columns and tables are migrated without errors."""
    try:
        Base.metadata.create_all(bind=engine)
        with engine.begin() as conn:
            if engine.dialect.name == "sqlite":
                # Check users table
                res = conn.execute(text("PRAGMA table_info(users)")).fetchall()
                user_cols = [r[1] for r in res]
                if user_cols:
                    if "last_login" not in user_cols:
                        conn.execute(text("ALTER TABLE users ADD COLUMN last_login DATETIME"))
                        print("[ExamPrepAI] Migrated users table: added last_login column")
                    if "progress_data" not in user_cols:
                        conn.execute(text("ALTER TABLE users ADD COLUMN progress_data TEXT DEFAULT '{}'"))
                        print("[ExamPrepAI] Migrated users table: added progress_data column")

                # Check pyq_documents table
                res_pyq = conn.execute(text("PRAGMA table_info(pyq_documents)")).fetchall()
                pyq_cols = [r[1] for r in res_pyq]
                if pyq_cols:
                    if "user_id" not in pyq_cols:
                        conn.execute(text("ALTER TABLE pyq_documents ADD COLUMN user_id INTEGER"))
                    if "file_data" not in pyq_cols:
                        conn.execute(text("ALTER TABLE pyq_documents ADD COLUMN file_data TEXT"))
                    if "file_size_formatted" not in pyq_cols:
                        conn.execute(text("ALTER TABLE pyq_documents ADD COLUMN file_size_formatted VARCHAR(50) DEFAULT '1.0 MB'"))
                    print("[ExamPrepAI] Migrated pyq_documents table: added file_data, user_id columns")

                # Purge legacy pre-seeded sample PYQs so repository starts completely null for user uploads
                conn.execute(text("DELETE FROM questions WHERE pyq_doc_id IN (SELECT id FROM pyq_documents WHERE file_data IS NULL)"))
                conn.execute(text("DELETE FROM pyq_documents WHERE file_data IS NULL"))
    except Exception as err:
        print(f"[ExamPrepAI] Migration notice: {err}")


# Run migration at load time
ensure_schema_migrations()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize DB schemas and migrations on startup
    ensure_schema_migrations()
    
    # Auto-seed sample subjects on first launch if database is clean
    db = SessionLocal()
    try:
        from app.db.models import Subject
        if db.query(Subject).count() == 0:
            print("[ExamPrepAI] Fresh database detected. Auto-seeding initial curriculum...")
            analytics.seed_demo_data(db)
    except Exception as e:
        print(f"[ExamPrepAI] Startup seed warning: {e}")
    finally:
        db.close()
    
    yield


app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Full-stack AI Exam Prep Platform with PYQ Categorization, Daily Chapter Quizzes, Dual-AI Revision Notes, and Strategic Readiness Tracking.",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Middleware
origins = settings.CORS_ORIGINS
if isinstance(origins, str):
    origins = [origins]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins if origins and "*" not in origins else ["*"],
    allow_origin_regex=r"https?://.*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount upload directory
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    print(f"[ExamPrepAI] Metadata create warning: {e}")

app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

# Include Routers
app.include_router(pyq.router, prefix=settings.API_V1_STR)
app.include_router(quiz.router, prefix=settings.API_V1_STR)
app.include_router(notes.router, prefix=settings.API_V1_STR)
app.include_router(analytics.router, prefix=settings.API_V1_STR)
app.include_router(books.router, prefix=settings.API_V1_STR)
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(placement.router, prefix=settings.API_V1_STR)


@app.get("/api/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "database": "connected",
        "gemini_ready": bool(settings.GEMINI_API_KEY),
        "openai_ready": bool(settings.OPENAI_API_KEY)
    }


# Serve static frontend build if present (for single-service deployment)
client_dist = os.path.abspath(os.path.join(settings.BASE_DIR, "..", "client", "dist"))
if os.path.exists(client_dist):
    app.mount("/", StaticFiles(directory=client_dist, html=True), name="frontend")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
