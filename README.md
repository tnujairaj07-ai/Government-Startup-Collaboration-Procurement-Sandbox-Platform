# Government-Startup Collaboration & Procurement Sandbox Platform (GeM Integrated)

A full-stack, enterprise-grade sandbox portal facilitating frictionless collaboration between Government Ministries and DeepTech Startups. It streamlines problem statement posting, AI-assisted startup screening, multi-stage evaluation pipelines (Kanban), digital contract e-signing (IP, CERT-In Cyber, and DPDP Data Privacy compliance), milestone-based escrow disbursements, and one-click graduation into the **GeM (Government e-Marketplace)** direct procurement catalog under Proprietary Article Certificate (PAC) rules.

---

## 🏛️ Key Capabilities & User Flows

### 1. Government Portal (`/gov`)
- **Executive Dashboard**: Real-time KPIs (Active Challenges, Startups in Sandbox, Escrow Disbursed, GeM Ready listings) with interactive sector and cybersecurity compliance analytics.
- **Problem Statement Posting Studio**: Define challenge scope, testing duration, grant budget caps, eligibility criteria, cybersecurity requirements, and milestone tranche schedules.
- **Startup Radar & AI Screening**: Multi-attribute filtering (Sector, DPIIT Verification, CERT-In Audit scores, TRL 1–9, Security Clearances), full capability dossiers, and direct challenge invites.
- **Review Pipeline (Kanban Board)**: Drag/stage advancement across *Screening $\rightarrow$ Expert Review $\rightarrow$ Contract Approval $\rightarrow$ Active Sandbox $\rightarrow$ GeM Ready*.
- **Expert Technical Scorecard Suite**: 10-point granular evaluation across Technical Feasibility, Government Impact, Cybersecurity Posture, and Commercial Viability.
- **Contract & Compliance Approval**: Formal review of Intellectual Property (IP) terms, CERT-In Cybersecurity SLA, and DPDP Act 2023 compliance, followed by official digital sign-off.
- **Active Project & Escrow Monitor**: Real-time milestone deliverable review, test telemetry inspection, and PFMS treasury escrow fund release.

### 2. Startup Workspace (`/startup`)
- **Engagement Stepper Banner**: Real-time lifecycle stepper (*Registered $\rightarrow$ Review in Progress $\rightarrow$ Approved $\rightarrow$ Contract Signed $\rightarrow$ Sandbox Active $\rightarrow$ GeM Ready*).
- **Company Registration & Compliance Studio**: Onboard entity details, DPIIT registration, CERT-In cybersecurity clearance, and sovereign data residency declarations.
- **Problem Statement Explorer**: Browse government challenges with automatic eligibility match scoring and structured proposal submission wizard.
- **Digital Contract E-Sign Suite**: Interactive contract review with Aadhaar OTP / DSC token simulator and SHA-256 cryptographic verification digest.
- **Sandbox Execution Workspace ("Start Work")**: API credentials, telemetry ingestion endpoints, milestone deliverable submission (code repository links, test logs, PDF audit reports), and escrow disbursement tracker.
- **GeM Fast-Track Onboarding**: Direct 1-click publishing to the GeM Direct Procurement Catalog upon sandbox milestone completion.

### 3. GeM Direct Procurement Gateway (`/gem-sandbox`)
- Direct PAC (Proprietary Article Certificate) catalog for central and state ministry procurement officers.
- Exemption from prior turnover and experience conditions for sandbox-graduated startups.
- One-click purchase order simulator with automated delivery terms and transaction volume tracking.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS v4, Lucide Icons, Recharts, Framer Motion |
| **Backend** | Python 3.13, FastAPI, Pydantic v2, Uvicorn |
| **Environment** | Python Virtual Environment (`backend/.venv`), Node.js v24 |
| **Compliance Standards** | DPIIT Startup India Framework, CERT-In Guidelines, DPDP Act 2023, GeM PAC |

---

## 🚀 Quick Start Guide

### Step 1: Start the Backend API (FastAPI)
Open a terminal in the root directory:
```bash
# Windows PowerShell
.\backend\.venv\Scripts\python.exe backend\run.py
```
*The FastAPI backend will start at `http://127.0.0.1:8000` (Interactive API Docs: `http://127.0.0.1:8000/docs`).*

### Step 2: Start the Frontend Application (Vite + React)
Open a second terminal:
```bash
cd frontend
node .\node_modules\vite\bin\vite.js --host
```
*The React UI will start at `http://localhost:5173`.*

---

## 🧪 Quick Test-Drive Walkthrough

1. **Open `http://localhost:5173`** in your browser.
2. In the top bar, use the **Persona Switcher**:
   - Click **🏛️ Government Portal** to post problem statements, evaluate startup proposals on the Kanban board, submit expert scorecards, approve contracts, and disburse milestone escrow funds.
   - Click **🚀 Startup Workspace** to submit proposals, sign contracts with Aadhaar e-sign, submit testbench telemetry deliverables, and graduate into GeM.
   - Click **🛒 GeM Gateway** to view graduated products and issue direct purchase orders.
3. Click **Reset State** anytime in the header to reset sandbox data to initial seeds.
