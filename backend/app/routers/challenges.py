from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List
from app.store import store
from app.models import ProblemStatementCreateRequest

router = APIRouter(prefix="/api/challenges", tags=["Challenges"])

@router.get("")
def list_challenges(
    sector: Optional[str] = Query(None, description="Filter by sector"),
    search: Optional[str] = Query(None, description="Search query")
):
    return store.get_all_challenges(sector=sector, search=search)

@router.get("/{challenge_id}")
def get_challenge(challenge_id: str):
    chal = store.get_challenge_by_id(challenge_id)
    if not chal:
        raise HTTPException(status_code=404, detail="Challenge not found")
    return chal

@router.post("", status_code=201)
def create_challenge(payload: ProblemStatementCreateRequest):
    data = payload.model_dump()
    return store.add_challenge(data)
