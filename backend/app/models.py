from datetime import datetime, timezone

from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.dialects.postgresql import JSONB

from app.database import Base


def _default_en(v: str = "") -> dict:
    return {"en": v}


class AdminUser(Base):
    __tablename__ = "admin_users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)


class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(JSONB, nullable=False, default=lambda: _default_en(""))
    description = Column(JSONB, nullable=False, default=lambda: _default_en(""))
    target_audience = Column(JSONB, nullable=False, default=lambda: _default_en("All Ages"))
    icon_name = Column(String, nullable=True)
    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )


class BlogPost(Base):
    __tablename__ = "blog_posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(JSONB, nullable=False, default=lambda: _default_en(""))
    content = Column(JSONB, nullable=False, default=lambda: _default_en(""))
    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )
    image_url = Column(String, nullable=True)
    links = Column(JSONB, nullable=False, default=lambda: [])
