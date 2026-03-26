from pydantic import BaseModel, HttpUrl, field_validator


class ShortenRequest(BaseModel):
    url: HttpUrl

    @field_validator("url", mode="before")
    @classmethod
    def ensure_scheme(cls, v: str) -> str:
        v = str(v).strip()
        if not v.startswith(("http://", "https://")):
            v = "https://" + v
        return v


class ShortenResponse(BaseModel):
    short_code: str
    short_url: str
    original_url: str
