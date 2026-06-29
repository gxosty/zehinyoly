from datetime import datetime
from pydantic import BaseModel, Field, model_validator
from typing import Optional


class LocalizedField(BaseModel):
    en: str = Field(..., min_length=1)
    ru: Optional[str] = None
    tk: Optional[str] = None

    @model_validator(mode="before")
    @classmethod
    def ensure_en(cls, data: any) -> any:
        if isinstance(data, dict):
            if "en" not in data or not data["en"]:
                raise ValueError("'en' (English) value is required and must be non-empty")
        return data


class LinkItem(BaseModel):
    url: str = Field(..., min_length=1)
    label: Optional[str] = None


# ---- Auth ----
class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


# ---- Courses ----
class CourseBase(BaseModel):
    title: LocalizedField
    description: LocalizedField
    target_audience: LocalizedField = LocalizedField(en="All Ages")
    icon_name: Optional[str] = None


class CourseCreate(CourseBase):
    pass


class CourseUpdate(BaseModel):
    title: Optional[LocalizedField] = None
    description: Optional[LocalizedField] = None
    target_audience: Optional[LocalizedField] = None
    icon_name: Optional[str] = None


class CourseResponse(CourseBase):
    id: int
    created_at: datetime

    model_config = {"from_attributes": True}


# ---- Blog Posts ----
class BlogPostBase(BaseModel):
    title: LocalizedField
    content: LocalizedField
    image_url: Optional[str] = None
    links: list[LinkItem] = []


class BlogPostCreate(BlogPostBase):
    pass


class BlogPostUpdate(BaseModel):
    title: Optional[LocalizedField] = None
    content: Optional[LocalizedField] = None
    image_url: Optional[str] = None
    links: Optional[list[LinkItem]] = None


class BlogPostResponse(BlogPostBase):
    id: int
    created_at: datetime

    model_config = {"from_attributes": True}


class PaginatedBlogPosts(BaseModel):
    items: list[BlogPostResponse]
    total_pages: int
    current_page: int
