from fastapi import APIRouter, HTTPException
from typing import Dict, Any
from app.store import store
from app.models import GeMOnboardingRequest

router = APIRouter(prefix="/api/gem", tags=["GeM Integration & Scale-up"])

@router.get("/listings")
def list_gem_catalog():
    return store.get_all_gem_listings()

@router.post("/onboard", status_code=201)
def onboard_to_gem(payload: GeMOnboardingRequest):
    try:
        return store.create_gem_listing(payload.model_dump())
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/reset-data")
def reset_all_data():
    store.reset()
    return {"message": "Data store reset to initial seed"}
