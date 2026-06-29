import uuid
from pathlib import Path

from fastapi import APIRouter, Depends, UploadFile, File, HTTPException

from app.auth import get_current_admin

router = APIRouter(prefix="/api/admin/upload", tags=["Admin Uploads"])

ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp", "image/gif"}
UPLOAD_DIR = Path("static/uploads")


@router.post("")
def upload_file(
    file: UploadFile = File(...),
    _=Depends(get_current_admin),
):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type. Allowed: {', '.join(ALLOWED_TYPES)}",
        )
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    ext = Path(file.filename).suffix if file.filename else ".jpg"
    filename = f"{uuid.uuid4().hex}{ext}"
    filepath = UPLOAD_DIR / filename
    file.file.seek(0)
    filepath.write_bytes(file.file.read())
    return {"url": f"/static/uploads/{filename}"}
