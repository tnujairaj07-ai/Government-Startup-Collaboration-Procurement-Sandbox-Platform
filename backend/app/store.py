import copy
import hashlib
from datetime import datetime
from typing import List, Optional, Dict, Any
from app.seed_data import INITIAL_CHALLENGES, INITIAL_STARTUPS, INITIAL_APPLICATIONS, INITIAL_GEM_LISTINGS

class DataStore:
    def __init__(self):
        self.reset()

    def reset(self):
        self.challenges: List[Dict[str, Any]] = copy.deepcopy(INITIAL_CHALLENGES)
        self.startups: List[Dict[str, Any]] = copy.deepcopy(INITIAL_STARTUPS)
        self.applications: List[Dict[str, Any]] = copy.deepcopy(INITIAL_APPLICATIONS)
        self.gem_listings: List[Dict[str, Any]] = copy.deepcopy(INITIAL_GEM_LISTINGS)

    # --- Challenges ---
    def get_all_challenges(self, sector: Optional[str] = None, search: Optional[str] = None):
        res = self.challenges
        if sector and sector != "All":
            res = [c for c in res if c["sector"] == sector]
        if search:
            s = search.lower()
            res = [c for c in res if s in c["title"].lower() or s in c["description"].lower() or s in c["ministry"].lower()]
        return res

    def get_challenge_by_id(self, challenge_id: str):
        for c in self.challenges:
            if c["id"] == challenge_id:
                return c
        return None

    def add_challenge(self, data: Dict[str, Any]):
        cid = f"CHAL-2026-{len(self.challenges) + 1:03d}"
        challenge = {
            "id": cid,
            "title": data["title"],
            "department": data["department"],
            "ministry": data["ministry"],
            "sector": data["sector"],
            "description": data["description"],
            "budget_inr": float(data["budget_inr"]),
            "sandbox_duration": data.get("sandbox_duration", "90 Days"),
            "eligibility_criteria": data.get("eligibility_criteria", ["DPIIT Recognized Startup", "TRL 6+"]),
            "cybersecurity_requirements": data.get("cybersecurity_requirements", ["CERT-In audit certificate"]),
            "milestone_templates": data.get("milestone_templates", []),
            "status": "active",
            "created_at": datetime.now().isoformat(),
            "applications_count": 0
        }
        self.challenges.insert(0, challenge)
        return challenge

    # --- Startups ---
    def get_all_startups(self, sector: Optional[str] = None, search: Optional[str] = None, min_cyber: Optional[int] = None):
        res = self.startups
        if sector and sector != "All":
            res = [s for s in res if s["sector"] == sector]
        if min_cyber is not None:
            res = [s for s in res if s["cyber_score"] >= min_cyber]
        if search:
            q = search.lower()
            res = [s for s in res if q in s["name"].lower() or q in s["tagline"].lower() or q in s["location"].lower() or q in s.get("dpiit_number", "").lower()]
        return res

    def get_startup_by_id(self, startup_id: str):
        for s in self.startups:
            if s["id"] == startup_id:
                return s
        return None

    def register_or_update_startup(self, data: Dict[str, Any]):
        sid = data.get("id")
        if sid:
            for i, s in enumerate(self.startups):
                if s["id"] == sid:
                    self.startups[i].update(data)
                    return self.startups[i]
        
        new_id = f"ST-{len(self.startups) + 1:03d}"
        startup = {
            "id": new_id,
            "name": data["name"],
            "tagline": data.get("tagline", "Innovative GovTech / DeepTech Solutions"),
            "sector": data["sector"],
            "dpiit_number": data.get("dpiit_number", f"DIPP{len(self.startups)*1000 + 4321}"),
            "incorporation_year": data.get("incorporation_year", 2023),
            "founders": data.get("founders", ["Founder"]),
            "location": data.get("location", "New Delhi, India"),
            "trl_level": data.get("trl_level", 6),
            "cert_in_status": data.get("cert_in_status", "Verified"),
            "cyber_score": data.get("cyber_score", 90),
            "track_record_summary": data.get("track_record_summary", "DPIIT recognized deep tech solution provider."),
            "past_gov_pilots": data.get("past_gov_pilots", 1),
            "security_clearance": data.get("security_clearance", "Tier-1 Cleared"),
            "dpdp_compliance": data.get("dpdp_compliance", True),
            "gem_vendor_id": data.get("gem_vendor_id", f"GEM-VND-{len(self.startups)*500 + 1000}"),
            "contact_email": data.get("contact_email", "contact@startup.in"),
            "website": data.get("website", "https://startup.in"),
            "metrics": data.get("metrics", {"pilot_success_rate": "95%", "active_patents": 1, "indigenous_components": "80%", "annual_revenue_cr": "2.5 Cr"})
        }
        self.startups.append(startup)
        return startup

    # --- Applications / Pipeline ---
    def get_all_applications(self, stage: Optional[str] = None, startup_id: Optional[str] = None, challenge_id: Optional[str] = None):
        res = self.applications
        if stage and stage != "all":
            res = [a for a in res if a["stage"] == stage]
        if startup_id:
            res = [a for a in res if a["startup_id"] == startup_id]
        if challenge_id:
            res = [a for a in res if a["challenge_id"] == challenge_id]
        return res

    def get_application_by_id(self, app_id: str):
        for a in self.applications:
            if a["id"] == app_id:
                return a
        return None

    def submit_application(self, data: Dict[str, Any]):
        challenge = self.get_challenge_by_id(data["challenge_id"])
        startup = self.get_startup_by_id(data["startup_id"])
        if not challenge or not startup:
            raise ValueError("Challenge or Startup not found")

        app_id = f"APP-2026-{len(self.applications) + 101}"
        
        # Clone milestone templates from challenge
        milestones = []
        if challenge.get("milestone_templates"):
            for m in challenge["milestone_templates"]:
                m_copy = copy.deepcopy(m)
                m_copy["status"] = "pending"
                m_copy["submission_notes"] = None
                m_copy["submission_url"] = None
                m_copy["submitted_at"] = None
                m_copy["verified_at"] = None
                m_copy["transaction_ref"] = None
                milestones.append(m_copy)

        new_app = {
            "id": app_id,
            "challenge_id": challenge["id"],
            "challenge_title": challenge["title"],
            "ministry": challenge["ministry"],
            "startup_id": startup["id"],
            "startup_name": startup["name"],
            "startup_sector": startup["sector"],
            "stage": "screening",
            "proposal_summary": data["proposal_summary"],
            "solution_architecture": data["solution_architecture"],
            "proposed_timeline": data.get("proposed_timeline", "90 Days"),
            "total_budget_inr": float(data.get("total_budget_inr", challenge["budget_inr"])),
            "expert_reviews": [],
            "avg_expert_score": 0.0,
            "contract": None,
            "milestones": milestones,
            "gem_listing_id": None,
            "applied_at": datetime.now().isoformat(),
            "last_updated_at": datetime.now().isoformat(),
            "rejection_reason": None
        }
        self.applications.insert(0, new_app)
        
        # Update challenge count
        challenge["applications_count"] = challenge.get("applications_count", 0) + 1
        return new_app

    def update_application_stage(self, app_id: str, new_stage: str, reason: Optional[str] = None):
        app = self.get_application_by_id(app_id)
        if not app:
            return None
        app["stage"] = new_stage
        app["last_updated_at"] = datetime.now().isoformat()
        if reason:
            app["rejection_reason"] = reason

        # If moved to contract_approval and no contract yet, generate initial draft
        if new_stage == "contract_approval" and not app.get("contract"):
            raw_hash_input = f"{app_id}-{app['startup_id']}-{app['total_budget_inr']}-{datetime.now().isoformat()}"
            mock_hash = "SHA256:" + hashlib.sha256(raw_hash_input.encode()).hexdigest()
            app["contract"] = {
                "id": f"CTR-2026-{app_id.split('-')[-1]}",
                "application_id": app_id,
                "ip_ownership": "Startup Owned with Perpetual Royalty-Free Gov License",
                "cyber_compliance": "CERT-In Audited (Tier 1 High Security)",
                "data_privacy_law": "Digital Personal Data Protection (DPDP) Act 2023 Compliant",
                "liability_cap_inr": app["total_budget_inr"],
                "sandbox_duration_days": 90,
                "gov_signed": False,
                "gov_signed_by": None,
                "gov_signed_at": None,
                "startup_signed": False,
                "startup_signed_by": None,
                "startup_signed_at": None,
                "contract_hash": mock_hash,
                "status": "pending_signatures"
            }
        return app

    def add_expert_review(self, app_id: str, review_data: Dict[str, Any]):
        app = self.get_application_by_id(app_id)
        if not app:
            return None
        
        review = {
            "expert_name": review_data["expert_name"],
            "designation": review_data.get("designation", "Technical Evaluator"),
            "technical_feasibility": int(review_data["technical_feasibility"]),
            "gov_impact": int(review_data["gov_impact"]),
            "cyber_readiness": int(review_data["cyber_readiness"]),
            "commercial_viability": int(review_data["commercial_viability"]),
            "comments": review_data["comments"],
            "recommendation": review_data["recommendation"],
            "evaluated_at": datetime.now().isoformat()
        }
        app["expert_reviews"].append(review)
        
        # Calculate new average
        scores = []
        for r in app["expert_reviews"]:
            avg_single = (r["technical_feasibility"] + r["gov_impact"] + r["cyber_readiness"] + r["commercial_viability"]) / 4.0
            scores.append(avg_single)
        app["avg_expert_score"] = round(sum(scores) / len(scores), 1)
        app["last_updated_at"] = datetime.now().isoformat()
        return app

    def sign_contract(self, app_id: str, sign_data: Dict[str, Any]):
        app = self.get_application_by_id(app_id)
        if not app or not app.get("contract"):
            return None
        
        ctr = app["contract"]
        role = sign_data["signer_role"] # "gov" or "startup"
        signer_name = sign_data["signer_name"]
        
        if sign_data.get("ip_ownership"):
            ctr["ip_ownership"] = sign_data["ip_ownership"]
        if sign_data.get("cyber_compliance"):
            ctr["cyber_compliance"] = sign_data["cyber_compliance"]

        if role == "gov":
            ctr["gov_signed"] = True
            ctr["gov_signed_by"] = signer_name
            ctr["gov_signed_at"] = datetime.now().isoformat()
        elif role == "startup":
            ctr["startup_signed"] = True
            ctr["startup_signed_by"] = signer_name
            ctr["startup_signed_at"] = datetime.now().isoformat()

        if ctr["gov_signed"] and ctr["startup_signed"]:
            ctr["status"] = "fully_executed"
            app["stage"] = "active_sandbox"
        
        app["last_updated_at"] = datetime.now().isoformat()
        return app

    def submit_milestone(self, app_id: str, milestone_id: str, submit_data: Dict[str, Any]):
        app = self.get_application_by_id(app_id)
        if not app:
            return None
        for m in app.get("milestones", []):
            if m["id"] == milestone_id:
                m["status"] = "under_review"
                m["submission_notes"] = submit_data["submission_notes"]
                m["submission_url"] = submit_data["submission_url"]
                m["submitted_at"] = datetime.now().isoformat()
                app["last_updated_at"] = datetime.now().isoformat()
                return m
        return None

    def approve_milestone(self, app_id: str, milestone_id: str, approve_data: Dict[str, Any]):
        app = self.get_application_by_id(app_id)
        if not app:
            return None
        for m in app.get("milestones", []):
            if m["id"] == milestone_id:
                m["status"] = "payment_disbursed" if approve_data.get("disburse_payment", True) else "approved"
                m["verified_at"] = datetime.now().isoformat()
                m["transaction_ref"] = f"PFMS-TXN-{datetime.now().strftime('%Y%m%d%H%M')}"
                app["last_updated_at"] = datetime.now().isoformat()
                
                # Check if all milestones are completed -> qualify for GeM transition
                all_done = all(x["status"] in ["approved", "payment_disbursed"] for x in app.get("milestones", []))
                if all_done:
                    app["stage"] = "gem_transition"
                
                return m
        return None

    # --- GeM Integration ---
    def get_all_gem_listings(self):
        return self.gem_listings

    def create_gem_listing(self, data: Dict[str, Any]):
        app_id = data["application_id"]
        app = self.get_application_by_id(app_id)
        if not app:
            raise ValueError("Application not found")

        listing_id = f"GEM-CAT-{len(self.gem_listings) + 9022}"
        listing = {
            "id": listing_id,
            "application_id": app_id,
            "startup_id": app["startup_id"],
            "startup_name": app["startup_name"],
            "catalog_title": data["catalog_title"],
            "product_category": data["product_category"],
            "unit_price_inr": float(data["unit_price_inr"]),
            "delivery_terms": data.get("delivery_terms", "30 Days delivery to Government Dept"),
            "gem_service_type": data.get("gem_service_type", "PAC / Direct Procurement"),
            "sandbox_certification_ref": f"SANDBOX-CERT-2026-{app['startup_id']}-{datetime.now().strftime('%H%M')}",
            "verified_on": datetime.now().isoformat(),
            "status": "Active / Ready for Order",
            "total_orders": 0,
            "order_volume_inr": 0.0
        }
        self.gem_listings.insert(0, listing)
        app["gem_listing_id"] = listing_id
        app["stage"] = "gem_transition"
        app["last_updated_at"] = datetime.now().isoformat()
        return listing

store = DataStore()
