from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.config import settings
from app.database import engine, Base, SessionLocal
from app.routes import auth, courses, blogs
from app.admin import courses as admin_courses, blogs as admin_blogs, uploads as admin_uploads
from app.routes.auth import seed_admin

app = FastAPI(title="Zehin Yoly API")

origins = settings.CORS_ORIGINS.split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

uploads_dir = Path("static/uploads")
uploads_dir.mkdir(parents=True, exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(auth.router)
app.include_router(courses.router)
app.include_router(blogs.router)
app.include_router(admin_courses.router)
app.include_router(admin_blogs.router)
app.include_router(admin_uploads.router)


def _migrate_column_text_to_jsonb(conn, table: str, column: str, default_en: str = ""):
    """Migrate a text/varchar column to JSONB, wrapping existing values in {"en": ...}."""
    result = conn.execute(text(
        f"SELECT data_type FROM information_schema.columns "
        f"WHERE table_name = '{table}' AND column_name = '{column}'"
    )).fetchone()
    if result and result[0] in ("character varying", "text"):
        temp = f"{column}_jsonb"
        conn.execute(text(
            f"ALTER TABLE {table} ADD COLUMN {temp} JSONB"
        ))
        conn.execute(text(
            f"UPDATE {table} SET {temp} = jsonb_build_object('en', {column}) WHERE {column} IS NOT NULL"
        ))
        conn.execute(text(
            f"UPDATE {table} SET {temp} = '{{\"en\": \"{default_en}\"}}'::jsonb WHERE {temp} IS NULL"
        ))
        conn.execute(text(
            f"ALTER TABLE {table} DROP COLUMN {column}"
        ))
        conn.execute(text(
            f"ALTER TABLE {table} RENAME COLUMN {temp} TO {column}"
        ))
        conn.execute(text(
            f"ALTER TABLE {table} ALTER COLUMN {column} SET NOT NULL"
        ))


@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)
    with engine.connect() as conn:
        conn.execute(text("ALTER TABLE courses DROP COLUMN IF EXISTS image_url"))
        conn.execute(text("ALTER TABLE courses ADD COLUMN IF NOT EXISTS icon_name VARCHAR"))
        conn.execute(text("ALTER TABLE courses ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE"))
        conn.execute(text("UPDATE courses SET created_at = NOW() WHERE created_at IS NULL"))
        conn.execute(text("ALTER TABLE courses ALTER COLUMN created_at SET NOT NULL"))
        _migrate_column_text_to_jsonb(conn, "courses", "title", "")
        _migrate_column_text_to_jsonb(conn, "courses", "description", "")
        _migrate_column_text_to_jsonb(conn, "courses", "target_audience", "All Ages")
        _migrate_column_text_to_jsonb(conn, "blog_posts", "title", "")
        _migrate_column_text_to_jsonb(conn, "blog_posts", "content", "")
        conn.execute(text("ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS links JSONB"))
        conn.execute(text("UPDATE blog_posts SET links = '[]'::jsonb WHERE links IS NULL"))
        conn.execute(text("ALTER TABLE blog_posts ALTER COLUMN links SET NOT NULL"))
        conn.commit()
    db: Session = SessionLocal()
    try:
        seed_admin(db)
    finally:
        db.close()
