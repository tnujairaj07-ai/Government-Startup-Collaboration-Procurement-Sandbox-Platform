import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export const SEED_CHALLENGES = [
  {
    id: "CHAL-101",
    title: "Smart Waste Collection & Dynamic Route Optimization",
    department: "Municipal Corporation of Greater Mumbai",
    ministry: "Urban Development Department",
    sector: "Smart Cities & Urban Mobility",
    baseline: "30% Missed Pickups",
    target: "≤ 20% Missed Pickups (20%+ Improvement)",
    budget_inr: 1200000.0,
    duration: "60 Days",
    status: "Active Pilot",
    stage: "pilot",
    sample_size: "10,000 collection records",
    locations: "3 Municipal Wards (Ward K-East, H-West, G-South)",
    matched_startups_count: 12,
    description: "Deployment of IoT bin sensor telemetry and real-time dynamic route dispatch to eliminate missed waste pickups and optimize fuel consumption across urban wards."
  },
  {
    id: "CHAL-102",
    title: "Hospital OPD Queue Optimization & Patient Flow AI",
    department: "Directorate of Medical Education & Research",
    ministry: "Public Health Department",
    sector: "HealthTech & Telemedicine",
    baseline: "42 Mins Avg. Waiting Time",
    target: "≤ 30 Mins (28% Reduction)",
    budget_inr: 850000.0,
    duration: "45 Days",
    status: "Evaluation Stage",
    stage: "evaluation",
    sample_size: "15,000 OPD tokens",
    locations: "2 District Civil Hospitals",
    matched_startups_count: 8,
    description: "Computer vision and token dispatch algorithms to predict triage bottlenecks and dynamically allocate OPD consulting rooms in high-density district hospitals."
  },
  {
    id: "CHAL-103",
    title: "Autonomous Edge-AI Coastal Drone Surveillance",
    department: "Directorate of Coastal & Maritime Security",
    ministry: "Home & Defence Department",
    sector: "Defence & Aerospace",
    baseline: "4.5 Hrs Night Detection Latency",
    target: "≤ 15 Mins Automated Alert",
    budget_inr: 2500000.0,
    duration: "90 Days",
    status: "Scale Ready",
    stage: "scale",
    sample_size: "500 Flight Hours Telemetry",
    locations: "Konkan Maritime Sector",
    matched_startups_count: 5,
    description: "Thermal imaging UAVs with onboard neural inference for non-cooperative craft detection in maritime foggy zones without GPS reliance."
  }
];

export const SEED_STARTUPS = [
  {
    id: "ST-001",
    name: "RouteAI Systems",
    tagline: "Autonomous Fleet Routing & Edge GPS Optimization for Municipal Services",
    sector: "Smart Cities & Urban Mobility",
    dpiit_no: "DIPP94821",
    location: "Pune, Maharashtra",
    match_score: 92,
    capability_fit: 95,
    evidence_confidence: 91,
    pilot_readiness: 88,
    risk: "Low",
    risk_color: "emerald",
    cost_inr: 800000,
    past_gov_pilots: 3,
    cyber_score: 96,
    why_matched: [
      "3 verified municipal deployments in Maharashtra",
      "Demonstrated 28% fuel route optimization benchmark",
      "Native compatibility with municipal GIS mapping"
    ],
    why_not: [
      "Requires baseline GPS connectivity on vehicle fleet"
    ],
    evidence_passport: {
      identity_verified: true,
      dpiit_verified: true,
      projects_verified: "4/4 Verified",
      claims_verified: "7/8 Verified",
      security_tier: "CERT-In Tier 1 Cleared",
      hash: "SHA256:7F83B1657FF1FC53B92DC18148A1D65DFC2D4B1FA3D677284ADDD200126D9069",
      claim_nodes: [
        { id: "c1", title: "DPIIT Entity Certification", status: "Verified 🟢", authority: "Ministry of Commerce", date: "12 Jan 2026" },
        { id: "c2", title: "Pune Smart City Route Trial", status: "Verified 🟢", authority: "PMC Commissionerate", date: "18 Aug 2026" },
        { id: "c3", title: "AES-256 Telemetry Encryption", status: "Verified 🟢", authority: "CERT-In Empanelled Lab", date: "04 Jul 2026" },
        { id: "c4", title: "DPDP 2023 Sovereign Data Residency", status: "Verified 🟢", authority: "MeitY Cloud Auditor", date: "22 May 2026" }
      ]
    },
    radar_data: [
      { subject: 'Technical Fit', candidate: 95, benchmark: 80, fullMark: 100 },
      { subject: 'Evidence Confidence', candidate: 91, benchmark: 75, fullMark: 100 },
      { subject: 'Pilot Readiness', candidate: 88, benchmark: 70, fullMark: 100 },
      { subject: 'Security / DPDP', candidate: 96, benchmark: 85, fullMark: 100 },
      { subject: 'Cost Efficiency', candidate: 84, benchmark: 70, fullMark: 100 },
      { subject: 'Scalability', candidate: 92, benchmark: 75, fullMark: 100 },
    ]
  },
  {
    id: "ST-002",
    name: "Logix Fleet Dynamics",
    tagline: "AI Predictive Dispatch & Vehicle Load Balancing",
    sector: "Smart Cities & Urban Mobility",
    dpiit_no: "DIPP83910",
    location: "Mumbai, Maharashtra",
    match_score: 79,
    capability_fit: 87,
    evidence_confidence: 62,
    pilot_readiness: 79,
    risk: "Medium",
    risk_color: "amber",
    cost_inr: 500000,
    past_gov_pilots: 0,
    cyber_score: 82,
    why_matched: [
      "Strong proprietary AI dispatch algorithms",
      "Competitive cost structure (₹5 Lakh)"
    ],
    why_not: [
      "⚠ No comparable government deployment track record",
      "⚠ Security audit clearance pending review",
      "⚠ Custom hardware sensor dependency"
    ],
    evidence_passport: {
      identity_verified: true,
      dpiit_verified: true,
      projects_verified: "1/3 Verified",
      claims_verified: "4/7 Verified",
      security_tier: "Under Audit",
      hash: "SHA256:3D82A1708B981657EF1900CB21422FFB76251B2A1A0F918BC32145690ABCDE88",
      claim_nodes: [
        { id: "c1", title: "DPIIT Entity Certification", status: "Verified 🟢", authority: "Ministry of Commerce", date: "05 Feb 2026" },
        { id: "c2", title: "Private Logistics Deployment", status: "Submitted 🟡", authority: "Self-Declared", date: "10 Mar 2026" }
      ]
    },
    radar_data: [
      { subject: 'Technical Fit', candidate: 87, benchmark: 80, fullMark: 100 },
      { subject: 'Evidence Confidence', candidate: 62, benchmark: 75, fullMark: 100 },
      { subject: 'Pilot Readiness', candidate: 79, benchmark: 70, fullMark: 100 },
      { subject: 'Security / DPDP', candidate: 78, benchmark: 85, fullMark: 100 },
      { subject: 'Cost Efficiency', candidate: 92, benchmark: 70, fullMark: 100 },
      { subject: 'Scalability', candidate: 80, benchmark: 75, fullMark: 100 },
    ]
  },
  {
    id: "ST-003",
    name: "FleetMind Analytics",
    tagline: "Sensor-Fusion Route Optimization & Real-Time Urban Waste Tracking",
    sector: "Smart Cities & Urban Mobility",
    dpiit_no: "DIPP77218",
    location: "Nagpur, Maharashtra",
    match_score: 84,
    capability_fit: 82,
    evidence_confidence: 90,
    pilot_readiness: 84,
    risk: "Low",
    risk_color: "emerald",
    cost_inr: 700000,
    past_gov_pilots: 2,
    cyber_score: 92,
    why_matched: [
      "Tested in 2 municipal corporations in central India",
      "High verified evidence confidence (90%)"
    ],
    why_not: [
      "Moderate proprietary AI depth compared to RouteAI"
    ],
    evidence_passport: {
      identity_verified: true,
      dpiit_verified: true,
      projects_verified: "3/3 Verified",
      claims_verified: "6/6 Verified",
      security_tier: "CERT-In Tier 1 Cleared",
      hash: "SHA256:119842F87AC61900CB21422FFB76251B2A1A0F918BC32145690ABCDE1029",
      claim_nodes: [
        { id: "c1", title: "DPIIT Entity Certification", status: "Verified 🟢", authority: "Ministry of Commerce", date: "15 Jan 2026" },
        { id: "c2", title: "Nagpur Municipal Pilot", status: "Verified 🟢", authority: "NMC Commissionerate", date: "20 Jul 2026" }
      ]
    },
    radar_data: [
      { subject: 'Technical Fit', candidate: 82, benchmark: 80, fullMark: 100 },
      { subject: 'Evidence Confidence', candidate: 90, benchmark: 75, fullMark: 100 },
      { subject: 'Pilot Readiness', candidate: 84, benchmark: 70, fullMark: 100 },
      { subject: 'Security / DPDP', candidate: 92, benchmark: 85, fullMark: 100 },
      { subject: 'Cost Efficiency', candidate: 86, benchmark: 70, fullMark: 100 },
      { subject: 'Scalability', candidate: 85, benchmark: 75, fullMark: 100 },
    ]
  }
];

export const SEED_PILOT = {
  id: "PILOT-2026-042",
  challenge_id: "CHAL-101",
  challenge_title: "Smart Waste Route Optimization Pilot",
  startup_id: "ST-001",
  startup_name: "RouteAI Systems",
  current_day: 42,
  total_days: 60,
  progress_percent: 70,
  kpi: {
    name: "Missed Waste Pickup Rate",
    baseline: 30,
    target: 20,
    current: 18,
    status: "TARGET MET 🟢",
    measurement_source: "Municipal Automated Ingest CSV + GPS Logs",
    sample_records: 12340
  },
  data_integrity: {
    source_consistency: "Verified 🟢",
    duplicate_records: 0,
    missing_data_rate: "1.2%",
    anomaly_detection: "1 Low-Severity Addressed",
    file_hash: "SHA256:9F8214B8...E091",
    last_sync: "Today, 14:32 IST"
  },
  telemetry_sources: [
    { source: "Government Municipal CSV", records: "12,340", status: "Verified 🟢", hash: "SHA256:A92F...1102" },
    { source: "RouteAI Telemetry API", records: "8,241", status: "Verified 🟢", hash: "SHA256:B82D...9942" },
    { source: "Vehicle GPS Ping Stream", records: "31,554", status: "Verified 🟢", hash: "SHA256:C71E...8841" },
    { source: "Manual Dispatch Overrides", records: "12", status: "Reviewed 🟡", hash: "SHA256:D60A...7730" }
  ],
  anomalies: [
    {
      id: "ALT-014",
      title: "Identical Sensor Measurements on Ward 4 Route",
      severity: "Medium",
      severity_score: 6,
      status: "Investigated & Resolved",
      timestamp: "2026-08-20 11:15 IST",
      details: "Repeated GPS coordinate pings caused by vehicle idle at depot for 35 mins. Verified valid stop."
    },
    {
      id: "ALT-015",
      title: "Summary Metric Delta Mismatch (0.4%)",
      severity: "Low",
      severity_score: 3,
      status: "Auto-Reconciled",
      timestamp: "2026-08-22 09:30 IST",
      details: "Timezone offset in raw vehicle log vs server ingestion time. Corrected via UTC sync."
    }
  ],
  milestones: [
    { id: "M1", title: "Ward Sensor Integration & Edge Setup", amount_inr: 200000, status: "Approved & Disbursed", date: "Day 10", released: true },
    { id: "M2", title: "30-Day Intermediate Benchmark (-15% Pickup Rate)", amount_inr: 200000, status: "Approved & Disbursed", date: "Day 30", released: true },
    { id: "M3", title: "60-Day Final Validation & Data Integrity Audit", amount_inr: 300000, status: "Pending Validator Sign-Off", date: "Day 60", released: false },
    { id: "M4", title: "PAC Scale Handover & GeM Onboarding Dossier", amount_inr: 300000, status: "Locked Pending M3", date: "Post-Pilot", released: false }
  ],
  contract: {
    ip_ownership: "Background IP: RouteAI Proprietary • Foreground Solution: State Usage License Granted",
    cyber_sla: "CERT-In Tier-1 SLA: 99.9% Uptime, AES-256 Telemetry Encryption, 4-Hour Incident SLA",
    dpdp_compliance: "MeitY sovereign data residency • Zero third-party sharing • Purpose-limited retention",
    gov_signed: true,
    gov_signer: "Municipal Commissioner, MCBM",
    startup_signed: true,
    startup_signer: "AeroGuard / RouteAI Founder",
    status: "Active Legally Binding Contract"
  },
  validation: {
    kpi_achievement: "92% (28% Reduction vs 20% Target)",
    data_integrity_pass: true,
    security_cleared: true,
    validator_name: "Dr. V. K. Saraswat (Technical Advisor)",
    validated_on: "26 Aug 2026",
    verdict: "SCALE RECOMMENDED 🟢"
  }
};

export const SEED_APPLICATIONS = [
  {
    id: "APP-901",
    challenge_id: "CHAL-101",
    challenge_title: "Smart Waste Collection & Dynamic Route Optimization",
    startup_name: "RouteAI Systems",
    stage: "Active Pilot",
    status: "Pilot in Progress (Day 42/60)",
    status_type: "emerald",
    match_score: 92,
    feedback: "Exceptional edge-AI architecture. Verified municipal benchmark passed 100%."
  },
  {
    id: "APP-902",
    challenge_id: "CHAL-102",
    challenge_title: "Hospital OPD Queue Optimization",
    startup_name: "QueueAI Systems",
    stage: "Expert Review",
    status: "Shortlisted for Pilot Review",
    status_type: "blue",
    match_score: 94,
    feedback: "High-accuracy computer vision triage model. Prototype test scheduled."
  },
  {
    id: "APP-903",
    challenge_id: "CHAL-103",
    challenge_title: "Autonomous Edge-AI Coastal Drone Surveillance",
    startup_name: "AeroGuard Defense",
    stage: "Scale Ready",
    status: "PAC Scale-Ready",
    status_type: "purple",
    match_score: 96,
    feedback: "Maritime night thermal benchmark validated. 15-minute response latency verified."
  }
];

export const SEED_VERIFICATION_QUEUE = [
  { id: "VER-101", entity: "NeuralHealth AI Labs", claim: "DPIIT Recognition Certificate", type: "Entity Identity", status: "Pending Verification", date: "24 Aug 2026" },
  { id: "VER-102", entity: "UrbanFlow Systems", claim: "CERT-In Mobile API Security Audit", type: "Cybersecurity", status: "Pending Verification", date: "25 Aug 2026" },
  { id: "VER-103", entity: "AeroGuard Defense", claim: "Konkan Coastal Surveillance Milestone 2", type: "Pilot Milestone", status: "Under Review", date: "26 Aug 2026" }
];

export function AppProvider({ children }) {
  // Current user persona: 'gov' | 'startup' | 'expert' | 'admin'
  const [persona, setPersona] = useState('gov');
  
  // Current active view
  const [currentView, setCurrentView] = useState('dashboard');
  
  // Active startup for deep detail view
  const [selectedStartupId, setSelectedStartupId] = useState('ST-001');
  
  // State
  const [challenges, setChallenges] = useState(SEED_CHALLENGES);
  const [startups, setStartups] = useState(SEED_STARTUPS);
  const [activePilot, setActivePilot] = useState(SEED_PILOT);
  const [applications, setApplications] = useState(SEED_APPLICATIONS);
  const [verificationQueue, setVerificationQueue] = useState(SEED_VERIFICATION_QUEUE);
  
  // Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleResetData = () => {
    setChallenges(SEED_CHALLENGES);
    setStartups(SEED_STARTUPS);
    setActivePilot(SEED_PILOT);
    setApplications(SEED_APPLICATIONS);
    setVerificationQueue(SEED_VERIFICATION_QUEUE);
    showToast('Platform reset to verified sandbox baseline', 'info');
  };

  const addChallenge = (newChal) => {
    const chal = {
      id: `CHAL-${challenges.length + 101}`,
      ...newChal,
      status: "Active Challenge",
      stage: "problem",
      matched_startups_count: 8
    };
    setChallenges([chal, ...challenges]);
    showToast('Government Challenge published with AI Copilot validation!', 'success');
  };

  const currentStartup = startups.find(s => s.id === selectedStartupId) || startups[0];

  return (
    <AppContext.Provider
      value={{
        persona,
        setPersona,
        currentView,
        setCurrentView,
        selectedStartupId,
        setSelectedStartupId,
        currentStartup,
        challenges,
        startups,
        activePilot,
        setActivePilot,
        applications,
        verificationQueue,
        setVerificationQueue,
        anomaliesCount: activePilot.anomalies.length,
        toast,
        showToast,
        handleResetData,
        addChallenge
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
