from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import AdminUser
from app.schemas import LoginRequest, TokenResponse
from app.auth import verify_password, create_access_token, hash_password

router = APIRouter(prefix="/api/auth", tags=["Auth"])


@router.post("/login", response_model=TokenResponse)
def login(body: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(AdminUser).filter(AdminUser.username == body.username).first()
    if not user or not verify_password(body.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )
    token = create_access_token({"sub": user.username})
    return TokenResponse(access_token=token)


# helper to seed the initial admin user (call from main during startup)
def seed_admin(db: Session):
    admin = db.query(AdminUser).filter(AdminUser.username == "admin").first()
    if not admin:
        admin = AdminUser(
            username="admin", hashed_password=hash_password("admin123")
        )
        db.add(admin)
        db.commit()
