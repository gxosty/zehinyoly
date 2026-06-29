import math

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import desc

from app.database import get_db
from app.models import BlogPost
from app.schemas import BlogPostResponse, PaginatedBlogPosts

router = APIRouter(prefix="/api/blogs", tags=["Blogs"])


@router.get("", response_model=PaginatedBlogPosts)
def list_blogs(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=50),
    db: Session = Depends(get_db),
):
    total = db.query(BlogPost).count()
    total_pages = max(1, math.ceil(total / limit))
    items = (
        db.query(BlogPost)
        .order_by(desc(BlogPost.created_at))
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )
    return PaginatedBlogPosts(
        items=items,
        total_pages=total_pages,
        current_page=page,
    )


@router.get("/{blog_id}", response_model=BlogPostResponse)
def get_blog(blog_id: int, db: Session = Depends(get_db)):
    post = db.query(BlogPost).filter(BlogPost.id == blog_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return post
