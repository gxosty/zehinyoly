from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Course
from app.schemas import CourseCreate, CourseUpdate, CourseResponse
from app.auth import get_current_admin

router = APIRouter(prefix="/api/admin/courses", tags=["Admin Courses"])


@router.post("", response_model=CourseResponse, status_code=201)
def create_course(
    body: CourseCreate,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin),
):
    course = Course(**body.model_dump())
    db.add(course)
    db.commit()
    db.refresh(course)
    return course


@router.put("/{course_id}", response_model=CourseResponse)
def update_course(
    course_id: int,
    body: CourseUpdate,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin),
):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    for key, val in body.model_dump(exclude_unset=True).items():
        setattr(course, key, val)
    db.commit()
    db.refresh(course)
    return course


@router.delete("/{course_id}", status_code=204)
def delete_course(
    course_id: int,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin),
):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    db.delete(course)
    db.commit()
