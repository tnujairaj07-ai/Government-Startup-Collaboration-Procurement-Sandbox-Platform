from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import challenges, startups, pipeline, contracts, milestones, gem

app = FastAPI(
    title="Gov-Startup Collaboration & Procurement Sandbox API",
    description="Backend API powering sandbox evaluation, digital contract compliance, milestone escrow release, and GeM direct procurement transition.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(challenges.router)
app.include_router(startups.router)
app.include_router(pipeline.router)
app.include_router(contracts.router)
app.include_router(milestones.router)
app.include_router(gem.router)

@app.get("/")
def root():
    return {
        "status": "online",
        "service": "Government-Startup Collaboration & Procurement Sandbox Platform",
        "version": "1.0.0",
        "endpoints": {
            "docs": "/docs",
            "challenges": "/api/challenges",
            "startups": "/api/startups",
            "pipeline": "/api/pipeline/applications",
            "contracts": "/api/contracts",
            "milestones": "/api/milestones",
            "gem": "/api/gem/listings"
        }
    }
