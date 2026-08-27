from datetime import datetime

INITIAL_CHALLENGES = [
    {
        "id": "CHAL-2026-001",
        "title": "Autonomous Edge-AI Drone Surveillance for Coastal Defense & Anti-Smuggling",
        "department": "Directorate of Coastal Security",
        "ministry": "Ministry of Defence",
        "sector": "Defence & Aerospace",
        "description": "Deployment of ruggedized UAVs equipped with onboard thermal vision and edge machine learning capable of detecting non-cooperative vessels and nighttime maritime infiltrations without GPS reliance.",
        "budget_inr": 7500000.0,
        "sandbox_duration": "90 Days",
        "eligibility_criteria": [
            "DPIIT Recognized Startup",
            "TRL 6+ with bench-tested prototype",
            "Indigenous Indian Component Share >= 60%",
            "CERT-In Security Cleared Firmware"
        ],
        "cybersecurity_requirements": [
            "Military-grade AES-256 telemetry encryption",
            "Zero foreign cloud telemetry exfiltration",
            "Hardware secure element on drone flight controller"
        ],
        "milestone_templates": [
            {
                "id": "M1",
                "title": "Milestone 1: Simulation & Protocol Handshake",
                "description": "Integration of edge-AI stream with Coastal Command mock command centre API.",
                "deliverable_type": "Architecture & Telemetry Specs",
                "payout_percentage": 25,
                "payout_amount_inr": 1875000.0,
                "status": "payment_disbursed",
                "due_date": "Day 25",
                "submission_notes": "Completed initial API handshake and encrypted stream testing on naval test bench.",
                "submission_url": "https://gov-sandbox.nic.in/artifacts/CHAL-001-M1-naval-stream.pdf",
                "submitted_at": "2026-07-10T10:30:00",
                "verified_at": "2026-07-12T14:15:00",
                "transaction_ref": "PFMS-TXN-9842145"
            },
            {
                "id": "M2",
                "title": "Milestone 2: 48-Hour Continuous Coastal Sandbox Test",
                "description": "Live coastal environment test with automated target classification under night fog conditions.",
                "deliverable_type": "Live Test Telemetry & Video Audit",
                "payout_percentage": 45,
                "payout_amount_inr": 3375000.0,
                "status": "under_review",
                "due_date": "Day 60",
                "submission_notes": "Flight test logs from Goa coastal sector uploaded with 99.2% night accuracy report.",
                "submission_url": "https://gov-sandbox.nic.in/artifacts/CHAL-001-M2-coastal-test.pdf",
                "submitted_at": "2026-08-20T16:45:00",
                "verified_at": None,
                "transaction_ref": None
            },
            {
                "id": "M3",
                "title": "Milestone 3: Field Sign-off & GeM Direct Catalog Ready",
                "description": "Security audit clearance, PAC specification generation, and GeM procurement listing.",
                "deliverable_type": "Pilot Sign-off & GeM Transition",
                "payout_percentage": 30,
                "payout_amount_inr": 2250000.0,
                "status": "pending",
                "due_date": "Day 90",
                "submission_notes": None,
                "submission_url": None,
                "submitted_at": None,
                "verified_at": None,
                "transaction_ref": None
            }
        ],
        "status": "active",
        "created_at": "2026-06-01T09:00:00",
        "applications_count": 4
    },
    {
        "id": "CHAL-2026-002",
        "title": "ABDM-Compliant Federated AI for Predictive ICU Sepsis Detection",
        "department": "National Health Authority (NHA)",
        "ministry": "Ministry of Health & Family Welfare",
        "sector": "HealthTech & Telemedicine",
        "description": "Decentralized federated machine learning framework running across district hospitals to forecast sepsis onset 6 hours in advance without centralizing identifiable patient health records (EHR).",
        "budget_inr": 5000000.0,
        "sandbox_duration": "60 Days",
        "eligibility_criteria": [
            "Ayushman Bharat Digital Mission (ABDM) Milestone 3 Certified",
            "100% DPDP Act 2023 Compliance",
            "Demonstrated HIPAA/FHIR Interoperability"
        ],
        "cybersecurity_requirements": [
            "Differential privacy noise addition",
            "No raw patient record export outside hospital LAN",
            "CERT-In audit certificate"
        ],
        "milestone_templates": [
            {
                "id": "M1",
                "title": "Milestone 1: FHIR Pipeline & Synthetic Dataset Validation",
                "description": "Validation against 50,000 synthetic ICU telemetry records.",
                "deliverable_type": "Technical Benchmark",
                "payout_percentage": 30,
                "payout_amount_inr": 1500000.0,
                "status": "payment_disbursed",
                "due_date": "Day 20",
                "submission_notes": "FHIR adapter verified on ABDM Sandbox stage.",
                "submission_url": "https://abdm.sandbox.nic.in/reports/sepsis-fhir-v1.pdf",
                "submitted_at": "2026-07-01T11:00:00",
                "verified_at": "2026-07-03T17:00:00",
                "transaction_ref": "PFMS-TXN-110294"
            },
            {
                "id": "M2",
                "title": "Milestone 2: Multi-Hospital Pilot Simulation",
                "description": "Federated training across 3 simulated medical college nodes.",
                "deliverable_type": "Privacy Proof & Model ROC Curves",
                "payout_percentage": 40,
                "payout_amount_inr": 2000000.0,
                "status": "submitted",
                "due_date": "Day 45",
                "submission_notes": "Zero data leakage verified. Model AUC achieved 0.94.",
                "submission_url": "https://abdm.sandbox.nic.in/reports/federated-audit.pdf",
                "submitted_at": "2026-08-22T14:30:00",
                "verified_at": None,
                "transaction_ref": None
            },
            {
                "id": "M3",
                "title": "Milestone 3: National Scale-up & GeM Health Category Listing",
                "description": "Final MeitY security review and direct onboarding to GeM Healthtech panel.",
                "deliverable_type": "GeM Catalog Product",
                "payout_percentage": 30,
                "payout_amount_inr": 1500000.0,
                "status": "pending",
                "due_date": "Day 60",
                "submission_notes": None,
                "submission_url": None,
                "submitted_at": None,
                "verified_at": None,
                "transaction_ref": None
            }
        ],
        "status": "active",
        "created_at": "2026-06-15T11:30:00",
        "applications_count": 3
    },
    {
        "id": "CHAL-2026-003",
        "title": "Real-time AI Traffic Signal Synchronization & Emergency Corridors",
        "department": "Smart City Mission Hub",
        "ministry": "Ministry of Housing and Urban Affairs",
        "sector": "Smart Cities & Urban Mobility",
        "description": "Computer-vision traffic flow optimization platform that dynamically calibrates green signal timings and automatically creates zero-delay green corridors for ambulances and fire engines.",
        "budget_inr": 6000000.0,
        "sandbox_duration": "90 Days",
        "eligibility_criteria": [
            "Tested on at least 10 traffic junction intersections",
            "CCTV RTSP feed ingestion latency < 200ms",
            "DPIIT Registered Startup"
        ],
        "cybersecurity_requirements": [
            "Edge video analytics without license plate face storage",
            "TLS 1.3 encrypted junction controller communications"
        ],
        "milestone_templates": [
            {
                "id": "M1",
                "title": "Milestone 1: 5-Junction Lab Bench Test",
                "description": "Simulated traffic matrix with automated green light scheduling.",
                "deliverable_type": "Architecture Proof",
                "payout_percentage": 30,
                "payout_amount_inr": 1800000.0,
                "status": "pending",
                "due_date": "Day 30",
                "submission_notes": None,
                "submission_url": None,
                "submitted_at": None,
                "verified_at": None,
                "transaction_ref": None
            }
        ],
        "status": "active",
        "created_at": "2026-07-01T14:00:00",
        "applications_count": 5
    },
    {
        "id": "CHAL-2026-004",
        "title": "Sovereign Zero-Trust Identity Broker for Gov-Cloud Services",
        "department": "National Informatics Centre (NIC)",
        "ministry": "Ministry of Electronics & Information Technology (MeitY)",
        "sector": "Cybersecurity & Gov-Cloud",
        "description": "Continuous contextual authentication and micro-segmentation broker for multi-cloud government workload access with hardware cryptographic token integration.",
        "budget_inr": 8500000.0,
        "sandbox_duration": "90 Days",
        "eligibility_criteria": [
            "CERT-In Empanelled or Tier 1 Audited",
            "TRL 7+ High Availability Architecture",
            "Support for OpenID Connect, SAML 2.0 & FIDO2"
        ],
        "cybersecurity_requirements": [
            "Air-gapped deployment capability",
            "Cryptographic proof of source code audit",
            "Indian data residency guarantee"
        ],
        "milestone_templates": [
            {
                "id": "M1",
                "title": "Milestone 1: Micro-segmentation Benchmark",
                "description": "Passing 100,000 synthetic credential attack vectors on NIC testbed.",
                "deliverable_type": "Security Benchmark Report",
                "payout_percentage": 35,
                "payout_amount_inr": 2975000.0,
                "status": "pending",
                "due_date": "Day 30",
                "submission_notes": None,
                "submission_url": None,
                "submitted_at": None,
                "verified_at": None,
                "transaction_ref": None
            }
        ],
        "status": "active",
        "created_at": "2026-07-15T16:00:00",
        "applications_count": 2
    }
]

INITIAL_STARTUPS = [
    {
        "id": "ST-001",
        "name": "AeroGuard Defense Labs",
        "tagline": "Tactical Edge-AI & Autonomous UAV Platforms for National Security",
        "sector": "Defence & Aerospace",
        "dpiit_number": "DIPP94821",
        "incorporation_year": 2021,
        "founders": ["Wing Cdr (Retd.) Rajesh Nair", "Dr. Shalini Varma"],
        "location": "Bengaluru, Karnataka",
        "trl_level": 7,
        "cert_in_status": "Verified",
        "cyber_score": 96,
        "track_record_summary": "Supplied 40+ specialized tethered surveillance drones to state police & border outposts. Winner of iDEX Challenge 2024.",
        "past_gov_pilots": 3,
        "security_clearance": "Secret / Tier-1 Cleared",
        "dpdp_compliance": True,
        "gem_vendor_id": "GEM-VND-84920",
        "contact_email": "contact@aeroguard.in",
        "website": "https://aeroguard.in",
        "metrics": {
            "pilot_success_rate": "98%",
            "active_patents": 4,
            "indigenous_components": "74%",
            "annual_revenue_cr": "12.4 Cr"
        }
    },
    {
        "id": "ST-002",
        "name": "NeuralHealth AI Labs",
        "tagline": "Privacy-Preserving Federated Clinical AI & Predictive Diagnostics",
        "sector": "HealthTech & Telemedicine",
        "dpiit_number": "DIPP83910",
        "incorporation_year": 2022,
        "founders": ["Dr. Ananya Ray", "Karthik Sundaram"],
        "location": "Hyderabad, Telangana",
        "trl_level": 8,
        "cert_in_status": "Verified",
        "cyber_score": 94,
        "track_record_summary": "Deployed in 6 leading private hospitals with >200k patient records evaluated under strict zero-knowledge architecture.",
        "past_gov_pilots": 2,
        "security_clearance": "Confidential / Health-Gov",
        "dpdp_compliance": True,
        "gem_vendor_id": "GEM-VND-67319",
        "contact_email": "hello@neuralhealth.ai",
        "website": "https://neuralhealth.ai",
        "metrics": {
            "pilot_success_rate": "95%",
            "active_patents": 3,
            "indigenous_components": "90%",
            "annual_revenue_cr": "6.8 Cr"
        }
    },
    {
        "id": "ST-003",
        "name": "UrbanFlow Mobility Systems",
        "tagline": "Real-time Distributed Video Analytics for Smart City Grid Control",
        "sector": "Smart Cities & Urban Mobility",
        "dpiit_number": "DIPP77218",
        "incorporation_year": 2020,
        "founders": ["Prateek Joshi", "Meera Sen"],
        "location": "Pune, Maharashtra",
        "trl_level": 7,
        "cert_in_status": "Verified",
        "cyber_score": 88,
        "track_record_summary": "Piloted adaptive traffic management in 3 municipal corporations across Maharashtra and Gujarat.",
        "past_gov_pilots": 4,
        "security_clearance": "Civilian Govt Certified",
        "dpdp_compliance": True,
        "gem_vendor_id": "GEM-VND-55102",
        "contact_email": "info@urbanflow.tech",
        "website": "https://urbanflow.tech",
        "metrics": {
            "pilot_success_rate": "92%",
            "active_patents": 2,
            "indigenous_components": "85%",
            "annual_revenue_cr": "8.5 Cr"
        }
    },
    {
        "id": "ST-004",
        "name": "BharatZeroTrust Networks",
        "tagline": "Indigenous Zero-Trust Access Gateway & Quantum-Safe Sovereign Cloud Security",
        "sector": "Cybersecurity & Gov-Cloud",
        "dpiit_number": "DIPP65432",
        "incorporation_year": 2021,
        "founders": ["Vikramaditya Iyer", "Tanvi Sengupta"],
        "location": "Noida, Uttar Pradesh",
        "trl_level": 8,
        "cert_in_status": "Verified",
        "cyber_score": 99,
        "track_record_summary": "Empanelled cybersecurity provider for critical public infrastructure. Holds 2 ISO certifications and proprietary FIDO2 server.",
        "past_gov_pilots": 5,
        "security_clearance": "Top Secret / MeitY Empanelled",
        "dpdp_compliance": True,
        "gem_vendor_id": "GEM-VND-99210",
        "contact_email": "security@bharatzerotrust.in",
        "website": "https://bharatzerotrust.in",
        "metrics": {
            "pilot_success_rate": "100%",
            "active_patents": 5,
            "indigenous_components": "100%",
            "annual_revenue_cr": "18.2 Cr"
        }
    },
    {
        "id": "ST-005",
        "name": "KrishiBhoomi Hyperspectral",
        "tagline": "Satellite & Drone Multi-spectral Analytics for Crop Insurance & Yield Estimation",
        "sector": "Agritech & Rural Economy",
        "dpiit_number": "DIPP88190",
        "incorporation_year": 2022,
        "founders": ["Rameshwar Patel", "Devika Nambiar"],
        "location": "Ahmedabad, Gujarat",
        "trl_level": 6,
        "cert_in_status": "In Audit",
        "cyber_score": 82,
        "track_record_summary": "Partnered with 2 state agriculture departments for PM-KMY validation over 1.2 million hectares.",
        "past_gov_pilots": 2,
        "security_clearance": "Civilian Gov Ready",
        "dpdp_compliance": True,
        "gem_vendor_id": None,
        "contact_email": "ops@krishibhoomi.io",
        "website": "https://krishibhoomi.io",
        "metrics": {
            "pilot_success_rate": "89%",
            "active_patents": 1,
            "indigenous_components": "92%",
            "annual_revenue_cr": "4.1 Cr"
        }
    }
]

INITIAL_APPLICATIONS = [
    {
        "id": "APP-2026-101",
        "challenge_id": "CHAL-2026-001",
        "challenge_title": "Autonomous Edge-AI Drone Surveillance for Coastal Defense & Anti-Smuggling",
        "ministry": "Ministry of Defence",
        "startup_id": "ST-001",
        "startup_name": "AeroGuard Defense Labs",
        "startup_sector": "Defence & Aerospace",
        "stage": "active_sandbox",
        "proposal_summary": "AeroGuard's FalconEdge-X platform provides 6-hour endurance thermal imaging with on-device tensor processing to autonomously identify radar-dark maritime craft in coastal waters.",
        "solution_architecture": "Custom carbon-composite quad-rotor with Nvidia Jetson Orin edge payload, AES-256 encrypted C2 datalink, and automated fail-safe return to shore beacon.",
        "proposed_timeline": "90 Days sandbox split into 3 verified milestones.",
        "total_budget_inr": 7500000.0,
        "expert_reviews": [
            {
                "expert_name": "Dr. V. K. Saraswat (Technical Advisor)",
                "designation": "Defence R&D Evaluator",
                "technical_feasibility": 9,
                "gov_impact": 10,
                "cyber_readiness": 9,
                "commercial_viability": 9,
                "comments": "Exceptional edge-inference telemetry. Satisfies all Naval Staff Qualitative Requirements (NSQRs). Strongly recommend for live coastal sandbox.",
                "recommendation": "Approve for Sandbox",
                "evaluated_at": "2026-06-25T11:20:00"
            },
            {
                "expert_name": "Col. Harpreet Singh",
                "designation": "Directorate of Indigenization",
                "technical_feasibility": 9,
                "gov_impact": 9,
                "cyber_readiness": 10,
                "commercial_viability": 8,
                "comments": "High indigenous content verified (74%). Firmware passes CERT-In static and dynamic penetration standards.",
                "recommendation": "Approve for Sandbox",
                "evaluated_at": "2026-06-26T15:00:00"
            }
        ],
        "avg_expert_score": 9.2,
        "contract": {
            "id": "CTR-2026-001",
            "application_id": "APP-2026-101",
            "ip_ownership": "Startup Owned with Perpetual Royalty-Free Gov License",
            "cyber_compliance": "CERT-In Audited (Tier 1 High Security)",
            "data_privacy_law": "Digital Personal Data Protection (DPDP) Act 2023 Compliant",
            "liability_cap_inr": 7500000.0,
            "sandbox_duration_days": 90,
            "gov_signed": True,
            "gov_signed_by": "Capt. M. S. Rawat (MoD Procurement Directorate)",
            "gov_signed_at": "2026-06-28T14:30:00",
            "startup_signed": True,
            "startup_signed_by": "Wing Cdr (Retd.) Rajesh Nair (CEO, AeroGuard)",
            "startup_signed_at": "2026-06-29T09:15:00",
            "contract_hash": "SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
            "status": "fully_executed"
        },
        "milestones": [
            {
                "id": "M1",
                "title": "Milestone 1: Simulation & Protocol Handshake",
                "description": "Integration of edge-AI stream with Coastal Command mock command centre API.",
                "deliverable_type": "Architecture & Telemetry Specs",
                "payout_percentage": 25,
                "payout_amount_inr": 1875000.0,
                "status": "payment_disbursed",
                "due_date": "Day 25",
                "submission_notes": "Completed initial API handshake and encrypted stream testing on naval test bench.",
                "submission_url": "https://gov-sandbox.nic.in/artifacts/CHAL-001-M1-naval-stream.pdf",
                "submitted_at": "2026-07-10T10:30:00",
                "verified_at": "2026-07-12T14:15:00",
                "transaction_ref": "PFMS-TXN-9842145"
            },
            {
                "id": "M2",
                "title": "Milestone 2: 48-Hour Continuous Coastal Sandbox Test",
                "description": "Live coastal environment test with automated target classification under night fog conditions.",
                "deliverable_type": "Live Test Telemetry & Video Audit",
                "payout_percentage": 45,
                "payout_amount_inr": 3375000.0,
                "status": "under_review",
                "due_date": "Day 60",
                "submission_notes": "Flight test logs from Goa coastal sector uploaded with 99.2% night accuracy report.",
                "submission_url": "https://gov-sandbox.nic.in/artifacts/CHAL-001-M2-coastal-test.pdf",
                "submitted_at": "2026-08-20T16:45:00",
                "verified_at": None,
                "transaction_ref": None
            },
            {
                "id": "M3",
                "title": "Milestone 3: Field Sign-off & GeM Direct Catalog Ready",
                "description": "Security audit clearance, PAC specification generation, and GeM procurement listing.",
                "deliverable_type": "Pilot Sign-off & GeM Transition",
                "payout_percentage": 30,
                "payout_amount_inr": 2250000.0,
                "status": "pending",
                "due_date": "Day 90",
                "submission_notes": None,
                "submission_url": None,
                "submitted_at": None,
                "verified_at": None,
                "transaction_ref": None
            }
        ],
        "gem_listing_id": None,
        "applied_at": "2026-06-18T10:00:00",
        "last_updated_at": "2026-08-20T16:45:00"
    },
    {
        "id": "APP-2026-102",
        "challenge_id": "CHAL-2026-002",
        "challenge_title": "ABDM-Compliant Federated AI for Predictive ICU Sepsis Detection",
        "ministry": "Ministry of Health & Family Welfare",
        "startup_id": "ST-002",
        "startup_name": "NeuralHealth AI Labs",
        "startup_sector": "HealthTech & Telemedicine",
        "stage": "contract_approval",
        "proposal_summary": "NeuralHealth's SepsisGuard decentralized model utilizes differential privacy and ABDM Health Information Exchange (HIE) protocols to detect critical septic shock markers 6 hours prior.",
        "solution_architecture": "Containerized model nodes for hospital on-premise servers with encrypted aggregate gradient synchronizer hosted on NIC Meghraj Cloud.",
        "proposed_timeline": "60 Days testbed with 3 hospital nodes.",
        "total_budget_inr": 5000000.0,
        "expert_reviews": [
            {
                "expert_name": "Dr. Raman Gangakhedkar",
                "designation": "Public Health & Clinical Informatics Expert",
                "technical_feasibility": 9,
                "gov_impact": 9,
                "cyber_readiness": 9,
                "commercial_viability": 8,
                "comments": "Clinical trial results show notable reduction in false alarms. Privacy preservation satisfies DPDP Act 2023 mandates.",
                "recommendation": "Approve for Sandbox",
                "evaluated_at": "2026-07-20T12:00:00"
            }
        ],
        "avg_expert_score": 8.8,
        "contract": {
            "id": "CTR-2026-002",
            "application_id": "APP-2026-102",
            "ip_ownership": "Startup Owned with Perpetual Royalty-Free Gov License",
            "cyber_compliance": "CERT-In Audited (Tier 1 High Security)",
            "data_privacy_law": "Digital Personal Data Protection (DPDP) Act 2023 Compliant",
            "liability_cap_inr": 5000000.0,
            "sandbox_duration_days": 60,
            "gov_signed": True,
            "gov_signed_by": "Dr. S. K. Roy (NHA Joint Director)",
            "gov_signed_at": "2026-08-15T11:00:00",
            "startup_signed": False,
            "startup_signed_by": None,
            "startup_signed_at": None,
            "contract_hash": "SHA256:3d82a1708b981657ef1900cb21422ffb76251b2a1a0f918bc32145690abcde88",
            "status": "pending_signatures"
        },
        "milestones": [
            {
                "id": "M1",
                "title": "Milestone 1: FHIR Pipeline & Synthetic Dataset Validation",
                "description": "Validation against 50,000 synthetic ICU telemetry records.",
                "deliverable_type": "Technical Benchmark",
                "payout_percentage": 30,
                "payout_amount_inr": 1500000.0,
                "status": "pending",
                "due_date": "Day 20",
                "submission_notes": None,
                "submission_url": None,
                "submitted_at": None,
                "verified_at": None,
                "transaction_ref": None
            },
            {
                "id": "M2",
                "title": "Milestone 2: Multi-Hospital Pilot Simulation",
                "description": "Federated training across 3 simulated medical college nodes.",
                "deliverable_type": "Privacy Proof & Model ROC Curves",
                "payout_percentage": 40,
                "payout_amount_inr": 2000000.0,
                "status": "pending",
                "due_date": "Day 45",
                "submission_notes": None,
                "submission_url": None,
                "submitted_at": None,
                "verified_at": None,
                "transaction_ref": None
            },
            {
                "id": "M3",
                "title": "Milestone 3: National Scale-up & GeM Health Category Listing",
                "description": "Final MeitY security review and direct onboarding to GeM Healthtech panel.",
                "deliverable_type": "GeM Catalog Product",
                "payout_percentage": 30,
                "payout_amount_inr": 1500000.0,
                "status": "pending",
                "due_date": "Day 60",
                "submission_notes": None,
                "submission_url": None,
                "submitted_at": None,
                "verified_at": None,
                "transaction_ref": None
            }
        ],
        "gem_listing_id": None,
        "applied_at": "2026-07-02T15:00:00",
        "last_updated_at": "2026-08-15T11:00:00"
    },
    {
        "id": "APP-2026-103",
        "challenge_id": "CHAL-2026-003",
        "challenge_title": "Real-time AI Traffic Signal Synchronization & Emergency Corridors",
        "ministry": "Ministry of Housing and Urban Affairs",
        "startup_id": "ST-003",
        "startup_name": "UrbanFlow Mobility Systems",
        "startup_sector": "Smart Cities & Urban Mobility",
        "stage": "expert_review",
        "proposal_summary": "Intelligent edge camera units with dynamic countdown signaling and siren acoustic detection triggers to prioritize emergency vehicles without manual intervention.",
        "solution_architecture": "Solar-backed micro-edge compute at junctions streaming lightweight occupancy metrics over 5G to municipal command centre.",
        "proposed_timeline": "90 Days with 10 live test junctions.",
        "total_budget_inr": 6000000.0,
        "expert_reviews": [],
        "avg_expert_score": 0.0,
        "contract": None,
        "milestones": [
            {
                "id": "M1",
                "title": "Milestone 1: 5-Junction Lab Bench Test",
                "description": "Simulated traffic matrix with automated green light scheduling.",
                "deliverable_type": "Architecture Proof",
                "payout_percentage": 30,
                "payout_amount_inr": 1800000.0,
                "status": "pending",
                "due_date": "Day 30",
                "submission_notes": None,
                "submission_url": None,
                "submitted_at": None,
                "verified_at": None,
                "transaction_ref": None
            }
        ],
        "gem_listing_id": None,
        "applied_at": "2026-07-25T11:15:00",
        "last_updated_at": "2026-07-25T11:15:00"
    },
    {
        "id": "APP-2026-104",
        "challenge_id": "CHAL-2026-004",
        "challenge_title": "Sovereign Zero-Trust Identity Broker for Gov-Cloud Services",
        "ministry": "Ministry of Electronics & Information Technology (MeitY)",
        "startup_id": "ST-004",
        "startup_name": "BharatZeroTrust Networks",
        "startup_sector": "Cybersecurity & Gov-Cloud",
        "stage": "screening",
        "proposal_summary": "Next-generation cryptographic Zero-Trust Network Access (ZTNA) with post-quantum key exchange algorithms tailored for sovereign digital infrastructure.",
        "solution_architecture": "Micro-segmented mesh architecture with eBPF kernel enforcement and hardware FIDO2 tokens.",
        "proposed_timeline": "90 Days sandbox testing across 5 NIC data centres.",
        "total_budget_inr": 8500000.0,
        "expert_reviews": [],
        "avg_expert_score": 0.0,
        "contract": None,
        "milestones": [
            {
                "id": "M1",
                "title": "Milestone 1: Micro-segmentation Benchmark",
                "description": "Passing 100,000 synthetic credential attack vectors on NIC testbed.",
                "deliverable_type": "Security Benchmark Report",
                "payout_percentage": 35,
                "payout_amount_inr": 2975000.0,
                "status": "pending",
                "due_date": "Day 30",
                "submission_notes": None,
                "submission_url": None,
                "submitted_at": None,
                "verified_at": None,
                "transaction_ref": None
            }
        ],
        "gem_listing_id": None,
        "applied_at": "2026-08-01T09:30:00",
        "last_updated_at": "2026-08-01T09:30:00"
    }
]

INITIAL_GEM_LISTINGS = [
    {
        "id": "GEM-CAT-9021",
        "application_id": "APP-2026-101",
        "startup_id": "ST-001",
        "startup_name": "AeroGuard Defense Labs",
        "catalog_title": "FalconEdge-X Autonomous Coastal Surveillance UAV",
        "product_category": "Unmanned Aerial Vehicles (UAVs) / Defence & Security",
        "unit_price_inr": 1850000.0,
        "delivery_terms": "30 Days to Coast Guard Base / MoD Delivery",
        "gem_service_type": "PAC (Proprietary Article Certificate) / Direct Procurement",
        "sandbox_certification_ref": "SANDBOX-CERT-2026-DEF-091",
        "verified_on": "2026-08-15T12:00:00",
        "status": "Active / Ready for Order",
        "total_orders": 3,
        "order_volume_inr": 14800000.0
    }
]
