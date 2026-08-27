from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from enum import Enum
from datetime import datetime

class PipelineStage(str, Enum):
    SCREENING = "screening"
    EXPERT_REVIEW = "expert_review"
    CONTRACT_APPROVAL = "contract_approval"
    ACTIVE_SANDBOX = "active_sandbox"
    GEM_TRANSITION = "gem_transition"
    REJECTED = "rejected"

class SectorEnum(str, Enum):
    DEFENCE = "Defence & Aerospace"
    HEALTHCARE = "HealthTech & Telemedicine"
    SMART_CITIES = "Smart Cities & Urban Mobility"
    AGRITECH = "Agritech & Rural Economy"
    CYBERSECURITY = "Cybersecurity & Gov-Cloud"
    GOVTECH = "GovTech & Citizen Services"
    FINTECH = "FinTech & Public Financials"

class MilestoneStatus(str, Enum):
    PENDING = "pending"
    SUBMITTED = "submitted"
    UNDER_REVIEW = "under_review"
    APPROVED = "approved"
    PAYMENT_DISBURSED = "payment_disbursed"

class Milestone(BaseModel):
    id: str
    title: str
    description: str
    deliverable_type: str  # "Code Repo / Architecture", "Live Test Telemetry", "Pilot Verification"
    payout_percentage: int
    payout_amount_inr: float
    status: MilestoneStatus = MilestoneStatus.PENDING
    due_date: str
    submission_notes: Optional[str] = None
    submission_url: Optional[str] = None
    submitted_at: Optional[str] = None
    verified_at: Optional[str] = None
    transaction_ref: Optional[str] = None

class IPClauseType(str, Enum):
    STARTUP_OWNED_GOV_LICENSED = "Startup Owned with Perpetual Royalty-Free Gov License"
    GOV_EXCLUSIVE = "Government Co-Ownership for Defense & Critical Infra"
    DUAL_USE_COMMERCIAL = "Dual-Use Commercialization with Sovereign Safeguards"

class CyberComplianceLevel(str, Enum):
    CERT_IN_TIER1 = "CERT-In Audited (Tier 1 High Security)"
    ISO_27001_COMPLIANT = "ISO 27001 / SOC-2 Type II Certified"
    MEITY_EMPANELLED = "MeitY Empanelled Gov-Cloud Ready"

class ContractTerms(BaseModel):
    id: str
    application_id: str
    ip_ownership: IPClauseType = IPClauseType.STARTUP_OWNED_GOV_LICENSED
    cyber_compliance: CyberComplianceLevel = CyberComplianceLevel.CERT_IN_TIER1
    data_privacy_law: str = "Digital Personal Data Protection (DPDP) Act 2023 Compliant"
    liability_cap_inr: float = 2500000.0
    sandbox_duration_days: int = 90
    gov_signed: bool = False
    gov_signed_by: Optional[str] = None
    gov_signed_at: Optional[str] = None
    startup_signed: bool = False
    startup_signed_by: Optional[str] = None
    startup_signed_at: Optional[str] = None
    contract_hash: Optional[str] = None
    status: str = "pending_signatures" # pending_signatures, fully_executed

class ExpertScore(BaseModel):
    expert_name: str
    designation: str
    technical_feasibility: int = Field(..., ge=1, le=10)
    gov_impact: int = Field(..., ge=1, le=10)
    cyber_readiness: int = Field(..., ge=1, le=10)
    commercial_viability: int = Field(..., ge=1, le=10)
    comments: str
    recommendation: str # "Approve for Sandbox", "Request Revisions", "Reject"
    evaluated_at: str

class ProblemStatement(BaseModel):
    id: str
    title: str
    department: str
    ministry: str
    sector: SectorEnum
    description: str
    budget_inr: float
    sandbox_duration: str
    eligibility_criteria: List[str]
    cybersecurity_requirements: List[str]
    milestone_templates: List[Dict[str, Any]]
    status: str = "active" # active, closed, in_sandbox
    created_at: str
    applications_count: int = 0

class StartupProfile(BaseModel):
    id: str
    name: str
    tagline: str
    sector: SectorEnum
    dpiit_number: str
    incorporation_year: int
    founders: List[str]
    location: str
    trl_level: int # Technology Readiness Level 1-9
    cert_in_status: str # "Verified", "In Audit", "Pending"
    cyber_score: int # 1 - 100
    track_record_summary: str
    past_gov_pilots: int
    security_clearance: str
    dpdp_compliance: bool = True
    gem_vendor_id: Optional[str] = None
    contact_email: str
    website: str
    metrics: Dict[str, Any]

class Application(BaseModel):
    id: str
    challenge_id: str
    challenge_title: str
    ministry: str
    startup_id: str
    startup_name: str
    startup_sector: SectorEnum
    stage: PipelineStage = PipelineStage.SCREENING
    proposal_summary: str
    solution_architecture: str
    proposed_timeline: str
    total_budget_inr: float
    expert_reviews: List[ExpertScore] = []
    avg_expert_score: float = 0.0
    contract: Optional[ContractTerms] = None
    milestones: List[Milestone] = []
    gem_listing_id: Optional[str] = None
    applied_at: str
    last_updated_at: str
    rejection_reason: Optional[str] = None

class ProposalCreateRequest(BaseModel):
    challenge_id: str
    startup_id: str
    proposal_summary: str
    solution_architecture: str
    proposed_timeline: str
    total_budget_inr: float

class ProblemStatementCreateRequest(BaseModel):
    title: str
    department: str
    ministry: str
    sector: SectorEnum
    description: str
    budget_inr: float
    sandbox_duration: str
    eligibility_criteria: List[str]
    cybersecurity_requirements: List[str]
    milestone_templates: List[Dict[str, Any]]

class ReviewSubmitRequest(BaseModel):
    expert_name: str
    designation: str
    technical_feasibility: int
    gov_impact: int
    cyber_readiness: int
    commercial_viability: int
    comments: str
    recommendation: str

class ContractSignRequest(BaseModel):
    signer_role: str # "gov" or "startup"
    signer_name: str
    e_sign_token: str
    ip_ownership: Optional[IPClauseType] = None
    cyber_compliance: Optional[CyberComplianceLevel] = None

class MilestoneSubmitRequest(BaseModel):
    submission_notes: str
    submission_url: str

class MilestoneApproveRequest(BaseModel):
    approver_name: str
    approval_notes: str
    disburse_payment: bool = True

class GeMOnboardingRequest(BaseModel):
    application_id: str
    catalog_title: str
    product_category: str
    unit_price_inr: float
    delivery_terms: str
    gem_service_type: str = "Direct Procurement / PAC (Proprietary Article Certificate)"
