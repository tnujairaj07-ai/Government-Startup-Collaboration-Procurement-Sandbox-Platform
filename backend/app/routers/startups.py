from fastapi import APIRouter, HTTPException, Query
from typing import Optional, Dict, Any
from app.store import store

router = APIRouter(prefix="/api/startups", tags=["Startups"])

@router.get("")
def list_startups(
    sector: Optional[str] = Query(None, description="Filter by sector"),
    search: Optional[str] = Query(None, description="Search keyword"),
    min_cyber: Optional[int] = Query(None, description="Minimum cyber score")
):
    return store.get_all_startups(sector=sector, search=search, min_cyber=min_cyber)

@router.get("/{startup_id}")
def get_startup(startup_id: str):
    startup = store.get_startup_by_id(startup_id)
    if not startup:
        raise HTTPException(status_code=404, detail="Startup not found")
    return startup

@router.post("")
def register_or_update_startup(payload: Dict[str, Any]):
    return store.register_or_update_startup(payload)
