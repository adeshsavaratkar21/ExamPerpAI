import hashlib
import secrets
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
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


@router.post("/register", response_model=schemas.AuthResponse)
def register_user(req: schemas.UserRegisterRequest, db: Session = Depends(get_db)):
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

    new_user = models.User(
        username=clean_username,
        email=clean_email,
        password_hash=hash_password(req.password),
        program=req.program or "Semester 5 • Computer Engineering (SPIT)",
        avatar=req.avatar or "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = secrets.token_hex(24)
    return {
        "success": True,
        "message": f"Welcome, {new_user.username}! Your account has been registered.",
        "user": new_user,
        "token": token
    }


@router.post("/login", response_model=schemas.AuthResponse)
def login_user(req: schemas.UserLoginRequest, db: Session = Depends(get_db)):
    clean_username = req.username.strip()
    clean_email = req.email.strip().lower()

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
            avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    else:
        # Check password
        if not verify_password(req.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid password. Please check your credentials."
            )

    token = secrets.token_hex(24)
    return {
        "success": True,
        "message": f"Login successful. Welcome back, {user.username}!",
        "user": user,
        "token": token
    }


@router.get("/me", response_model=schemas.UserResponse)
def get_current_user(db: Session = Depends(get_db)):
    user = db.query(models.User).first()
    if not user:
        # Create default demo user
        user = models.User(
            username="Adesh Savaratkar",
            email="adesh.savaratkar24@spit.ac.in",
            password_hash=hash_password("password123"),
            program="Semester 5 • Computer Engineering (SPIT)",
            avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    return user
