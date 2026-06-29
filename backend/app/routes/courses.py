from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Course
from app.schemas import CourseResponse

router = APIRouter(prefix="/api/courses", tags=["Courses"])


@router.get("", response_model=list[CourseResponse])
def list_courses(db: Session = Depends(get_db)):
    return db.query(Course).order_by(Course.created_at).all()
