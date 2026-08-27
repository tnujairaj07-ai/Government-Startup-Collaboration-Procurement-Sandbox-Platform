from fastapi import APIRouter, HTTPException, Body
from typing import Dict, Any
from app.store import store
from app.models import MilestoneSubmitRequest, MilestoneApproveRequest

router = APIRouter(prefix="/api/milestones", tags=["Milestones & Escrow"])

@router.get("/application/{app_id}")
def get_milestones(app_id: str):
    app = store.get_application_by_id(app_id)
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    return app.get("milestones", [])

@router.post("/application/{app_id}/{milestone_id}/submit")
def submit_milestone(app_id: str, milestone_id: str, payload: MilestoneSubmitRequest):
    milestone = store.submit_milestone(app_id, milestone_id, payload.model_dump())
    if not milestone:
        raise HTTPException(status_code=404, detail="Milestone or application not found")
    return milestone

@router.post("/application/{app_id}/{milestone_id}/approve")
def approve_milestone(app_id: str, milestone_id: str, payload: MilestoneApproveRequest):
    milestone = store.approve_milestone(app_id, milestone_id, payload.model_dump())
    if not milestone:
        raise HTTPException(status_code=404, detail="Milestone or application not found")
    return milestone
