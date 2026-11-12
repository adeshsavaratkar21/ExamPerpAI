import datetime
import hashlib
import secrets
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db import models
from app.schemas import schemas

router = APIRouter(prefix="/auth", tags=["Authentication"])


def hash_password(password: str) -> str:
    # Deterministic SHA-256 hash with pepper for simplicity and zero external C-dependencies
    return hashlib.sha256(f"examprep_salt_{password}".encode("utf-8")).hexdigest()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return hash_password(plain_password) == hashed_password


def extract_client_details(request: Request):
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        client_ip = forwarded.split(",")[0].strip()
    elif request.client and request.client.host:
        client_ip = request.client.host
    else:
        client_ip = "127.0.0.1"

    user_agent = request.headers.get("user-agent", "Unknown Device")
    ua_lower = user_agent.lower()
    
    device = "Desktop"
    if "mobile" in ua_lower or "android" in ua_lower or "iphone" in ua_lower:
        device = "Mobile"
    elif "macintosh" in ua_lower or "mac os" in ua_lower:
        device = "macOS"
    elif "windows" in ua_lower:
        device = "Windows"
    elif "linux" in ua_lower:
        device = "Linux"

    if "edg" in ua_lower:
        device += " • Edge"
    elif "chrome" in ua_lower:
        device += " • Chrome"
    elif "firefox" in ua_lower:
        device += " • Firefox"
    elif "safari" in ua_lower:
        device += " • Safari"

    return client_ip, user_agent[:500], device


@router.post("/register", response_model=schemas.AuthResponse)
def register_user(
    req: schemas.UserRegisterRequest,
    request: Request,
    db: Session = Depends(get_db)
):
    clean_username = req.username.strip()
    clean_email = req.email.strip().lower()

    if not clean_username or not clean_email or not req.password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username, email, and password are required."
        )

    # Check if user already exists
    existing = db.query(models.User).filter(
        (models.User.username == clean_username) | (models.User.email == clean_email)
    ).first()

    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A student account with this username or email already exists."
        )

    now = datetime.datetime.utcnow()
    new_user = models.User(
        username=clean_username,
        email=clean_email,
        password_hash=hash_password(req.password),
        program=req.program or "Semester 5 • Computer Engineering (SPIT)",
        avatar=req.avatar or "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        created_at=now,
        last_login=now
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    client_ip, user_agent, device_info = extract_client_details(request)
    log_entry = models.UserLoginHistory(
        user_id=new_user.id,
        username=new_user.username,
        email=new_user.email,
        ip_address=client_ip,
        user_agent=user_agent,
        device_info=device_info,
        status="REGISTERED & LOGGED IN",
        login_time=now
    )
    db.add(log_entry)
    db.commit()

    token = secrets.token_hex(24)
    return {
        "success": True,
        "message": f"Welcome, {new_user.username}! Your account has been registered.",
        "user": new_user,
        "token": token
    }


@router.post("/login", response_model=schemas.AuthResponse)
def login_user(
    req: schemas.UserLoginRequest,
    request: Request,
    db: Session = Depends(get_db)
):
    clean_username = req.username.strip()
    clean_email = req.email.strip().lower()
    client_ip, user_agent, device_info = extract_client_details(request)
    now = datetime.datetime.utcnow()

    if not clean_username or not clean_email or not req.password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please provide username, email ID, and password."
        )

    # Find matching user by username or email
    user = db.query(models.User).filter(
        (models.User.username.ilike(clean_username)) | (models.User.email.ilike(clean_email))
    ).first()

    # If user doesn't exist yet, auto-create a profile to ensure seamless experience
    if not user:
        user = models.User(
            username=clean_username,
            email=clean_email,
            password_hash=hash_password(req.password),
            program="Semester 5 • Computer Engineering (SPIT)",
            avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
            created_at=now,
            last_login=now
        )
        db.add(user)
        db.commit()
        db.refresh(user)

        log_entry = models.UserLoginHistory(
            user_id=user.id,
            username=user.username,
            email=user.email,
            ip_address=client_ip,
            user_agent=user_agent,
            device_info=device_info,
            status="NEW USER AUTO-CREATED & LOGGED IN",
            login_time=now
        )
        db.add(log_entry)
        db.commit()
    else:
        # Check password
        if not verify_password(req.password, user.password_hash):
            fail_log = models.UserLoginHistory(
                user_id=user.id,
                username=user.username,
                email=user.email,
                ip_address=client_ip,
                user_agent=user_agent,
                device_info=device_info,
                status="FAILED - Incorrect Password",
                login_time=now
            )
            db.add(fail_log)
            db.commit()
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid password. Please check your credentials."
            )

        # Successful login
        user.last_login = now
        success_log = models.UserLoginHistory(
            user_id=user.id,
            username=user.username,
            email=user.email,
            ip_address=client_ip,
            user_agent=user_agent,
            device_info=device_info,
            status="SUCCESS",
            login_time=now
        )
        db.add(success_log)
        db.commit()
        db.refresh(user)

    token = secrets.token_hex(24)
    return {
        "success": True,
        "message": f"Login successful. Welcome back, {user.username}!",
        "user": user,
        "token": token
    }


@router.get("/login-history", response_model=List[schemas.UserLoginHistoryResponse])
def get_login_history(
    limit: int = 50,
    db: Session = Depends(get_db)
):
    """Retrieve audit history of user logins with timestamps, IPs, and device details."""
    logs = db.query(models.UserLoginHistory).order_by(
        models.UserLoginHistory.login_time.desc()
    ).limit(limit).all()
    return logs


@router.delete("/login-history")
def clear_login_history(db: Session = Depends(get_db)):
    """Clear all login history logs."""
    deleted_count = db.query(models.UserLoginHistory).delete()
    db.commit()
    return {"success": True, "deleted_count": deleted_count, "message": "Login history cleared successfully."}


@router.get("/me", response_model=schemas.UserResponse)
def get_current_user(db: Session = Depends(get_db)):
    user = db.query(models.User).first()
    if not user:
        now = datetime.datetime.utcnow()
        # Create default demo user
        user = models.User(
            username="Adesh Savaratkar",
            email="adesh.savaratkar24@spit.ac.in",
            password_hash=hash_password("password123"),
            program="Semester 5 • Computer Engineering (SPIT)",
            avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
            created_at=now,
            last_login=now,
            progress_data="{}"
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    return user


@router.put("/profile", response_model=schemas.UserResponse)
def update_user_profile(req: schemas.UpdateProfileRequest, db: Session = Depends(get_db)):
    """Updates user profile information (name, program, avatar, email) permanently."""
    user = None
    if req.email:
        user = db.query(models.User).filter(models.User.email.ilike(req.email.strip())).first()
    if not user and req.username:
        user = db.query(models.User).filter(models.User.username.ilike(req.username.strip())).first()
    if not user:
        user = db.query(models.User).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if req.username and req.username.strip():
        user.username = req.username.strip()
    if req.program and req.program.strip():
        user.program = req.program.strip()
    if req.avatar and req.avatar.strip():
        user.avatar = req.avatar.strip()

    db.commit()
    db.refresh(user)
    return user


@router.get("/progress")
def get_user_progress(email: Optional[str] = None, db: Session = Depends(get_db)):
    """Fetches user progress (tasks, upcoming exams, completed chapters, dsa)."""
    import json
    user = None
    if email:
        user = db.query(models.User).filter(models.User.email.ilike(email.strip())).first()
    if not user:
        user = db.query(models.User).first()

    if not user:
        return {"success": False, "progress": {}}

    progress = {}
    if user.progress_data:
        try:
            progress = json.loads(user.progress_data)
        except Exception:
            progress = {}

    return {
        "success": True,
        "email": user.email,
        "username": user.username,
        "progress": progress
    }


@router.put("/progress")
def save_user_progress(payload: schemas.UserProgressPayload, db: Session = Depends(get_db)):
    """Saves user progress so it persists across logouts and logins."""
    import json
    user = None
    if payload.email:
        user = db.query(models.User).filter(models.User.email.ilike(payload.email.strip())).first()
    if not user:
        user = db.query(models.User).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.progress_data = json.dumps(payload.progress)
    db.commit()
    return {"success": True, "message": "User progress successfully saved."}
