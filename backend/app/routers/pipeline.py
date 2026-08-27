from fastapi import APIRouter, HTTPException, Query, Body
from typing import Optional, Dict, Any
from app.store import store
from app.models import ProposalCreateRequest, ReviewSubmitRequest

router = APIRouter(prefix="/api/pipeline", tags=["Pipeline & Applications"])

@router.get("/applications")
def list_applications(
    stage: Optional[str] = Query(None, description="Stage filter"),
    startup_id: Optional[str] = Query(None, description="Startup filter"),
    challenge_id: Optional[str] = Query(None, description="Challenge filter")
):
    return store.get_all_applications(stage=stage, startup_id=startup_id, challenge_id=challenge_id)

@router.get("/applications/{app_id}")
def get_application(app_id: str):
    app = store.get_application_by_id(app_id)
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    return app

@router.post("/applications", status_code=201)
def submit_proposal(payload: ProposalCreateRequest):
    try:
        return store.submit_application(payload.model_dump())
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.patch("/applications/{app_id}/stage")
def update_stage(app_id: str, stage: str = Body(..., embed=True), reason: Optional[str] = Body(None, embed=True)):
    app = store.update_application_stage(app_id, stage, reason)
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    return app

@router.post("/applications/{app_id}/expert-review")
def add_expert_review(app_id: str, payload: ReviewSubmitRequest):
    app = store.add_expert_review(app_id, payload.model_dump())
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    return app
