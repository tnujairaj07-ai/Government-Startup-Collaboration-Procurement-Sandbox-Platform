from fastapi import APIRouter, HTTPException, Body
from typing import Dict, Any
from app.store import store
from app.models import ContractSignRequest

router = APIRouter(prefix="/api/contracts", tags=["Contracts & Compliance"])

@router.get("/application/{app_id}")
def get_contract(app_id: str):
    app = store.get_application_by_id(app_id)
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    if not app.get("contract"):
        raise HTTPException(status_code=404, detail="Contract not yet drafted for this application")
    return app["contract"]

@router.post("/application/{app_id}/sign")
def sign_contract(app_id: str, payload: ContractSignRequest):
    app = store.sign_contract(app_id, payload.model_dump())
    if not app:
        raise HTTPException(status_code=404, detail="Application or contract not found")
    return app["contract"]
