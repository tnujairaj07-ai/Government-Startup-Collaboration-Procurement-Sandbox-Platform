import urllib.request
import json
import os
import sys

def test_api():
    print("Testing Backend API integration...")
    from fastapi.testclient import TestClient
    from app.main import app

    client = TestClient(app)

    # 1. Health check
    res = client.get("/")
    assert res.status_code == 200, f"Root failed: {res.status_code}"
    print("[PASS] GET / passed")

    # 2. Challenges
    res = client.get("/api/challenges")
    assert res.status_code == 200 and len(res.json()) >= 4
    print(f"[PASS] GET /api/challenges returned {len(res.json())} challenges")

    # 3. Startups
    res = client.get("/api/startups")
    assert res.status_code == 200 and len(res.json()) >= 5
    print(f"[PASS] GET /api/startups returned {len(res.json())} startups")

    # 4. Pipeline Applications
    res = client.get("/api/pipeline/applications")
    assert res.status_code == 200 and len(res.json()) >= 4
    apps = res.json()
    print(f"[PASS] GET /api/pipeline/applications returned {len(apps)} applications")

    # 5. Submit new Proposal
    proposal_data = {
        "challenge_id": "CHAL-2026-003",
        "startup_id": "ST-001",
        "proposal_summary": "Automated drone traffic sensing testbed.",
        "solution_architecture": "Micro-edge compute with RTSP stream analytics.",
        "proposed_timeline": "90 Days",
        "total_budget_inr": 6000000.0
    }
    res = client.post("/api/pipeline/applications", json=proposal_data)
    assert res.status_code == 201
    new_app_id = res.json()["id"]
    print(f"[PASS] POST /api/pipeline/applications created {new_app_id}")

    # 6. Advance Stage & Add Expert Review
    res = client.patch(f"/api/pipeline/applications/{new_app_id}/stage", json={"stage": "expert_review"})
    assert res.status_code == 200

    review_data = {
        "expert_name": "Dr. Automated Test",
        "designation": "AI Lead Evaluator",
        "technical_feasibility": 9,
        "gov_impact": 10,
        "cyber_readiness": 9,
        "commercial_viability": 8,
        "comments": "High quality AI framework",
        "recommendation": "Approve for Sandbox"
    }
    res = client.post(f"/api/pipeline/applications/{new_app_id}/expert-review", json=review_data)
    assert res.status_code == 200
    assert res.json()["avg_expert_score"] == 9.0
    print(f"[PASS] POST /api/pipeline/applications/{new_app_id}/expert-review recorded score {res.json()['avg_expert_score']}")

    # 7. Advance to contract and sign
    res = client.patch(f"/api/pipeline/applications/{new_app_id}/stage", json={"stage": "contract_approval"})
    assert res.status_code == 200

    res = client.post(f"/api/contracts/application/{new_app_id}/sign", json={
        "signer_role": "gov",
        "signer_name": "Nodal Officer",
        "e_sign_token": "GOV-TOKEN-123"
    })
    assert res.status_code == 200

    res = client.post(f"/api/contracts/application/{new_app_id}/sign", json={
        "signer_role": "startup",
        "signer_name": "Founder",
        "e_sign_token": "STARTUP-TOKEN-456"
    })
    assert res.status_code == 200
    assert res.json()["status"] == "fully_executed"
    print("[PASS] Contract Signing & Fully Executed Transition passed")

    # 8. Submit and approve milestone
    res = client.post(f"/api/milestones/application/{new_app_id}/M1/submit", json={
        "submission_notes": "Benchmark passed 100%",
        "submission_url": "https://test.gov.in/report.pdf"
    })
    assert res.status_code == 200

    res = client.post(f"/api/milestones/application/{new_app_id}/M1/approve", json={
        "approver_name": "Director General",
        "approval_notes": "Verified",
        "disburse_payment": True
    })
    assert res.status_code == 200
    assert res.json()["status"] == "payment_disbursed"
    print("[PASS] Milestone submission and PFMS escrow release passed")

    # 9. GeM Onboarding
    gem_data = {
        "application_id": new_app_id,
        "catalog_title": "Automated Traffic Edge UAV Unit",
        "product_category": "Smart Cities AI",
        "unit_price_inr": 1200000.0,
        "delivery_terms": "30 Days delivery"
    }
    res = client.post("/api/gem/onboard", json=gem_data)
    assert res.status_code == 201
    print(f"[PASS] POST /api/gem/onboard created listing {res.json()['id']}")

    print("\nALL BACKEND API TESTS PASSED SUCCESSFULLY!")

if __name__ == "__main__":
    test_api()
