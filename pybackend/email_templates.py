"""
routes/questions.py

Route for fetching data from a Metabase question (card), optionally
filtered by an MBQL filter clause generated on the frontend.

- No filter provided -> returns the question's full result set unmodified.
- Filter provided     -> runs the question as a virtual table (card__<id>)
                         with the filter applied server-side via /api/dataset.

Database and table are never accepted from the client - they're always
resolved from the card_id in the URL. MBQL clause shape is validated on
the frontend before it reaches this route.
"""

import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Any, Optional

router = APIRouter(prefix="/api/questions", tags=["questions"])

METABASE_URL = "https://your-metabase-instance.com"
METABASE_API_KEY = "your-api-key"  # server-side only, never sent to frontend

HEADERS = {"x-api-key": METABASE_API_KEY, "Content-Type": "application/json"}


class FilterRequest(BaseModel):
    filter: Optional[list[Any]] = None


# ---- Metabase HTTP helpers ----

async def mb_get(path: str) -> dict:
    async with httpx.AsyncClient() as client:
        resp = await client.get(f"{METABASE_URL}{path}", headers=HEADERS)
        resp.raise_for_status()
        return resp.json()


async def mb_post(path: str, body: dict | None = None) -> dict:
    async with httpx.AsyncClient() as client:
        resp = await client.post(f"{METABASE_URL}{path}", headers=HEADERS, json=body or {})
        resp.raise_for_status()
        return resp.json()


# ---- Field validation (still needed - protects against filters that ----
# ---- reference fields outside the question, regardless of frontend) ----

def extract_field_ids(clause: Any, ids: list[int] | None = None) -> list[int]:
    if ids is None:
        ids = []
    if not isinstance(clause, list):
        return ids
    if clause and clause[0] == "field" and isinstance(clause[1], int):
        ids.append(clause[1])
    else:
        for part in clause:
            extract_field_ids(part, ids)
    return ids


async def validate_filter_fields(card_id: int, filter_clause: list[Any]) -> list[int]:
    meta = await mb_get(f"/api/card/{card_id}/query_metadata")
    allowed = {c["id"] for c in meta.get("columns", []) if c.get("id")}
    used = extract_field_ids(filter_clause)
    return [f for f in used if f not in allowed]


# ---- Route ----

@router.post("/{card_id}/data")
async def get_question_data(card_id: int, body: FilterRequest):
    try:
        if not body.filter:
            return await mb_post(f"/api/card/{card_id}/query")

        invalid_fields = await validate_filter_fields(card_id, body.filter)
        if invalid_fields:
            raise HTTPException(
                status_code=400,
                detail=f"Filter references fields not on this question: {invalid_fields}"
            )

        card = await mb_get(f"/api/card/{card_id}")

        ad_hoc_query = {
            "database": card["database_id"],
            "type": "query",
            "query": {
                "source-table": f"card__{card_id}",
                "filter": body.filter
            }
        }

        return await mb_post("/api/dataset", ad_hoc_query)

    except httpx.HTTPStatusError as e:
        detail = e.response.json().get("message", str(e)) if e.response.content else str(e)
        raise HTTPException(status_code=e.response.status_code, detail=detail)
