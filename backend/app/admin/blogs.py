from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import BlogPost
from app.schemas import BlogPostCreate, BlogPostUpdate, BlogPostResponse
from app.auth import get_current_admin

router = APIRouter(prefix="/api/admin/blogs", tags=["Admin Blogs"])


@router.post("", response_model=BlogPostResponse, status_code=201)
def create_blog(
    body: BlogPostCreate,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin),
):
    post = BlogPost(**body.model_dump(), created_at=datetime.now(timezone.utc))
    db.add(post)
    db.commit()
    db.refresh(post)
    return post


@router.put("/{blog_id}", response_model=BlogPostResponse)
def update_blog(
    blog_id: int,
    body: BlogPostUpdate,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin),
):
    post = db.query(BlogPost).filter(BlogPost.id == blog_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    for key, val in body.model_dump(exclude_unset=True).items():
        setattr(post, key, val)
    db.commit()
    db.refresh(post)
    return post


@router.delete("/{blog_id}", status_code=204)
def delete_blog(
    blog_id: int,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin),
):
    post = db.query(BlogPost).filter(BlogPost.id == blog_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    db.delete(post)
    db.commit()
