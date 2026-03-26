import os
import sys
import secrets
import string

# Ensure the api/ directory itself is on the path so sibling modules resolve
sys.path.insert(0, os.path.dirname(__file__))

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

from db import get_client
from schemas import ShortenRequest, ShortenResponse

app = FastAPI(title="urlshortener")

_FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[_FRONTEND_ORIGIN],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

_ALPHABET = string.ascii_letters + string.digits
_CODE_LEN = 6
_MAX_ATTEMPTS = 10


def _generate_code() -> str:
    return "".join(secrets.choice(_ALPHABET) for _ in range(_CODE_LEN))


def _unique_code(db) -> str:
    for _ in range(_MAX_ATTEMPTS):
        code = _generate_code()
        existing = db.table("urls").select("short_code").eq("short_code", code).execute()
        if not existing.data:
            return code
    raise RuntimeError("Could not generate a unique short code after multiple attempts")


@app.post("/api/shorten", response_model=ShortenResponse)
async def shorten(payload: ShortenRequest, request: Request):
    original = str(payload.url)
    db = get_client()

    code = _unique_code(db)

    insert_result = db.table("urls").insert(
        {"original_url": original, "short_code": code}
    ).execute()

    if not insert_result.data:
        raise HTTPException(status_code=500, detail="Failed to save URL")

    base = str(request.base_url).rstrip("/")
    return ShortenResponse(
        short_code=code,
        short_url=f"{base}/{code}",
        original_url=original,
    )


@app.get("/{short_code}")
async def redirect(short_code: str):
    if len(short_code) != _CODE_LEN or not short_code.isalnum():
        raise HTTPException(status_code=404, detail="Not found")

    db = get_client()
    result = db.table("urls").select("original_url").eq("short_code", short_code).execute()

    if not result.data:
        raise HTTPException(status_code=404, detail="Short URL not found")

    # Fire-and-forget click increment via the DB function defined in schema.sql
    db.rpc("increment_clicks", {"code": short_code}).execute()

    return RedirectResponse(url=result.data[0]["original_url"], status_code=307)
