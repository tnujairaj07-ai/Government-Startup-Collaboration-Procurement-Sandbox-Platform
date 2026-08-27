import React, { useState, useMemo } from 'react';
import { Modal } from '../common/Modal';
import { usePlatform } from '../../context/PlatformContext';
import { 
  Sparkles, Check, ArrowRight, ArrowLeft, ShieldCheck, Lock, 
  Sliders, CheckCircle2, AlertTriangle, Plus, Trash2, HelpCircle, 
  Layers, FileText, Database, Shield, Activity, Calendar, 
  Building2, MapPin, Award, RefreshCw, X, ChevronDown, ChevronUp, Eye 
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import confetti from 'canvas-confetti';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface EligibilityCriterion {
  id: string;
  name: string;
  type: 'Mandatory' | 'Preferred' | 'Scored';
  description: string;
  verificationMethod: string;
}

interface EvaluationCriterion {
  id: string;
  name: string;
  weight: number;
  rubricDefined: boolean;
  rubricLevels?: { [key: string]: string };
}

interface KPIItem {
  id: string;
  name: string;
  baseline: string;
  target: string;
  unit: string;
  dataSource: string;
  frequency: string;
  threshold: string;
  isMandatory: boolean;
  method: string;
}

export const ProblemStatementModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { addChallenge, addNotification } = usePlatform();

  // Current Step: 1 to 6
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);

  // ==========================================
  // STEP 1: CHALLENGE BASICS
  // ==========================================
  const [title, setTitle] = useState('AI-Based Traffic Congestion Reduction');
  const [department, setDepartment] = useState('Department of Urban Development & Water Resources');
  const [problemStatement, setProblemStatement] = useState(
    'High traffic congestion at major arterial intersections leads to prolonged vehicle idling, increased tailpipe emissions, and extended municipal commute delays during peak morning and evening corridors.'
  );
  const [desiredOutcome, setDesiredOutcome] = useState('Reduce average intersection waiting time by 20% at designated high-volume corridors.');
  const [targetGeographies, setTargetGeographies] = useState<string[]>(['Pune', 'Nagpur', 'Mumbai']);
  const [newGeoInput, setNewGeoInput] = useState('');
  const [beneficiaries, setBeneficiaries] = useState<string[]>(['Citizens', 'Drivers', 'Municipal staff', 'Transport operators']);
  const [baseline, setBaseline] = useState('Avg. waiting time: 12 minutes during peak hours (7–10 AM, 5–8 PM)');
  const [pilotDurationVal, setPilotDurationVal] = useState('90');
  const [pilotDurationUnit, setPilotDurationUnit] = useState('Days');
  const [budgetMin, setBudgetMin] = useState('500000');
  const [budgetMax, setBudgetMax] = useState('1500000');
  const [deadline, setDeadline] = useState('2026-09-30');
  const [scaleDecisionDate, setScaleDecisionDate] = useState('2026-12-30');

  // AI Helper 1: Generate Outcome Challenge Modal
  const [isAiBasicsModalOpen, setIsAiBasicsModalOpen] = useState(false);
  const [aiPromptInput, setAiPromptInput] = useState('');

  // ==========================================
  // STEP 2: ELIGIBILITY & CONSTRAINTS
  // ==========================================
  const [eligibilityCriteria, setEligibilityCriteria] = useState<EligibilityCriterion[]>([
    {
      id: 'EC-1',
      name: 'DPIIT Recognition',
      type: 'Mandatory',
      description: 'Startup must be recognized by DPIIT with a valid Certificate of Recognition.',
      verificationMethod: 'Official verification (DPIIT portal)'
    },
    {
      id: 'EC-2',
      name: 'Prior Turnover Relaxation',
      type: 'Preferred',
      description: 'Prior turnover < INR 5 Cr permitted under startup procurement relaxation rules.',
      verificationMethod: 'Financial declaration'
    },
    {
      id: 'EC-3',
      name: 'Relevant Deployment in India',
      type: 'Preferred',
      description: 'At least 1 live municipal / commercial pilot deployment in India preferred.',
      verificationMethod: 'Evidence (documents/case studies)'
    }
  ]);

  const [requiredIntegrations, setRequiredIntegrations] = useState<string[]>(['ITMS', 'GIS', 'Government API']);
  const [dataSensitivity, setDataSensitivity] = useState<'Public' | 'Internal' | 'Confidential' | 'Highly Sensitive'>('Confidential');
  const [dataResidencyIndia, setDataResidencyIndia] = useState(true);
  const [cloudDeployment, setCloudDeployment] = useState<'Approved government cloud' | 'MeitY-empanelled cloud' | 'On-premise' | 'Hybrid'>('MeitY-empanelled cloud');
  const [infraConstraints, setInfraConstraints] = useState<string[]>([
    'Existing government infrastructure must be reused',
    'API integration required',
    'Mobile support required'
  ]);

  // ==========================================
  // STEP 3: EVALUATION PRIORITIES
  // ==========================================
  const [evaluationCriteria, setEvaluationCriteria] = useState<EvaluationCriterion[]>([
    { id: 'EVAL-1', name: 'Problem/Solution Fit', weight: 20, rubricDefined: true },
    { id: 'EVAL-2', name: 'Innovation & Novelty', weight: 15, rubricDefined: true },
    { id: 'EVAL-3', name: 'Technical Feasibility', weight: 15, rubricDefined: true },
    { id: 'EVAL-4', name: 'Government Operational Fit', weight: 15, rubricDefined: false },
    { id: 'EVAL-5', name: 'Expected Outcome/Impact', weight: 15, rubricDefined: true },
    { id: 'EVAL-6', name: 'Scalability Across Districts', weight: 10, rubricDefined: false },
    { id: 'EVAL-7', name: 'Cost Effectiveness', weight: 5, rubricDefined: false },
    { id: 'EVAL-8', name: 'Security & Compliance', weight: 5, rubricDefined: true }
  ]);

  const [activeRubricModal, setActiveRubricModal] = useState<EvaluationCriterion | null>(null);

  // Total Evaluation Weight Live Calculation
  const totalWeight = useMemo(() => {
    return evaluationCriteria.reduce((sum, c) => sum + (Number(c.weight) || 0), 0);
  }, [evaluationCriteria]);

  // ==========================================
  // STEP 4: PILOT & KPI
  // ==========================================
  const [pilotObjective, setPilotObjective] = useState('Reduce traffic waiting time and queue length at selected high-volume intersections.');
  const [pilotLocations, setPilotLocations] = useState('3 high-volume intersections in Pune: Swargate Chowk, University Square, Nal Stop');
  const [startupsCountToSelect, setStartupsCountToSelect] = useState('3');
  const [expectedDeploymentTime, setExpectedDeploymentTime] = useState('≤ 15 days from contract signing');
  const [baselinePeriod, setBaselinePeriod] = useState('Previous 30 days of continuous traffic camera data from municipal ITMS');

  const [kpiList, setKpiList] = useState<KPIItem[]>([
    {
      id: 'KPI-1',
      name: 'Average Peak Waiting Time',
      baseline: '12 minutes',
      target: '≤ 9.6 minutes',
      unit: 'Minutes',
      dataSource: 'Government system (e.g. ITMS, SCADA)',
      frequency: 'Daily',
      threshold: '≥ 20% improvement over baseline',
      isMandatory: true,
      method: 'Average waiting time = total vehicle idling seconds / volume of eligible corridor vehicles during 7–10 AM & 5–8 PM.'
    },
    {
      id: 'KPI-2',
      name: 'System Telemetry Uptime',
      baseline: '90%',
      target: '≥ 99.0%',
      unit: 'Percent',
      dataSource: 'IoT/device',
      frequency: 'Real-time',
      threshold: 'Zero unannounced outage > 30 minutes',
      isMandatory: true,
      method: 'Monitored via automated heartbeat ping to State Data Centre every 60 seconds.'
    }
  ]);

  const [successRuleMandatoryPass, setSuccessRuleMandatoryPass] = useState(true);
  const [successRuleMinScore, setSuccessRuleMinScore] = useState(75);
  const [successRuleNoCriticalSecurity, setSuccessRuleNoCriticalSecurity] = useState(true);
  const [successRuleIndependentValidation, setSuccessRuleIndependentValidation] = useState(true);
  const [validatorType, setValidatorType] = useState('Third-party auditor');

  // ==========================================
  // STEP 5: IP, DATA & RISK
  // ==========================================
  const [dataOwnership, setDataOwnership] = useState('Government retains ownership of all pilot data');
  const [dataAccessRules, setDataAccessRules] = useState<string[]>([
    'Controlled API access',
    'Temporary access (pilot duration only)',
    'No raw data leaves government environment'
  ]);
  const [dataRetention, setDataRetention] = useState('Pilot + 90 days');
  const [backgroundIp, setBackgroundIp] = useState('Startup retained');
  const [newlyDevelopedIp, setNewlyDevelopedIp] = useState('Startup owned with government license');
  const [customIpDetails, setCustomIpDetails] = useState('');
  const [riskLevel, setRiskLevel] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [securityChecklist, setSecurityChecklist] = useState<string[]>([
    'Encryption (in transit and at rest)',
    'Role-based access control (RBAC)',
    'Audit logging',
    'Data residency compliance',
    'Vulnerability assessment / penetration test'
  ]);

  // ==========================================
  // STEP 6: REVIEW & PUBLISH
  // ==========================================
  const [publishingStatusOption, setPublishingStatusOption] = useState<'DRAFT' | 'IN_REVIEW' | 'PUBLISHED'>('PUBLISHED');
  const [isPublishConfirmOpen, setIsPublishConfirmOpen] = useState(false);

  // Dynamic Readiness Calculation (0–100%)
  const readiness = useMemo(() => {
    let score = 0;
    if (title && problemStatement && desiredOutcome && deadline) score += 25;
    if (eligibilityCriteria.length > 0 && dataResidencyIndia) score += 20;
    if (totalWeight === 100 && evaluationCriteria.length >= 3) score += 20;
    if (kpiList.some(k => k.isMandatory) && pilotLocations) score += 20;
    if (riskLevel && dataOwnership) score += 15;
    return Math.min(100, score);
  }, [title, problemStatement, desiredOutcome, deadline, eligibilityCriteria, dataResidencyIndia, totalWeight, evaluationCriteria, kpiList, pilotLocations, riskLevel, dataOwnership]);

  // Actions
  const handleAddGeo = () => {
    if (newGeoInput.trim() && !targetGeographies.includes(newGeoInput.trim())) {
      setTargetGeographies([...targetGeographies, newGeoInput.trim()]);
      setNewGeoInput('');
    }
  };

  const handleRemoveGeo = (geo: string) => {
    setTargetGeographies(targetGeographies.filter(g => g !== geo));
  };

  const handleAddEligibility = () => {
    const newId = `EC-${eligibilityCriteria.length + 1}`;
    setEligibilityCriteria([
      ...eligibilityCriteria,
      {
        id: newId,
        name: 'New Custom Requirement',
        type: 'Preferred',
        description: 'Specify mandatory or preferred criterion details...',
        verificationMethod: 'Evidence (documents/case studies)'
      }
    ]);
  };

  const handleRemoveEligibility = (id: string) => {
    if (eligibilityCriteria.length > 1) {
      setEligibilityCriteria(eligibilityCriteria.filter(c => c.id !== id));
    }
  };

  const handleAddEvaluationCriterion = () => {
    const newId = `EVAL-${evaluationCriteria.length + 1}`;
    setEvaluationCriteria([
      ...evaluationCriteria,
      { id: newId, name: 'Additional Technical Criterion', weight: 5, rubricDefined: false }
    ]);
  };

  const handleRemoveEvaluationCriterion = (id: string) => {
    if (evaluationCriteria.length > 3) {
      setEvaluationCriteria(evaluationCriteria.filter(c => c.id !== id));
    }
  };

  const handleAddKPI = () => {
    const newId = `KPI-${kpiList.length + 1}`;
    setKpiList([
      ...kpiList,
      {
        id: newId,
        name: 'New Outcome Metric',
        baseline: 'Baseline value',
        target: 'Target value',
        unit: 'Percent',
        dataSource: 'Government system (e.g. ITMS, SCADA)',
        frequency: 'Monthly',
        threshold: 'Target threshold',
        isMandatory: false,
        method: 'Measurement formula and procedure...'
      }
    ]);
  };

  const handleRemoveKPI = (id: string) => {
    if (kpiList.length > 1) {
      setKpiList(kpiList.filter(k => k.id !== id));
    }
  };

  const handlePublishConfirmed = () => {
    addChallenge({
      title,
      department,
      sector: 'Urban Tech & Smart Mobility',
      domain: 'Transport',
      location: targetGeographies,
      description: problemStatement,
      problemSummary: desiredOutcome,
      budget: `INR ${(Number(budgetMin) / 100000).toFixed(1)}–${(Number(budgetMax) / 100000).toFixed(1)} Lakhs`,
      budgetMin: Number(budgetMin),
      budgetMax: Number(budgetMax),
      pilotDurationMonths: Math.round(Number(pilotDurationVal) / 30) || 3,
      scaleDecisionMonth: 6,
      trlMin: 7,
      deadline,
      status: 'Open',
      securityCompliance: securityChecklist,
      ipTerms: newlyDevelopedIp,
      tags: ['AI/ML', 'Smart Mobility', 'Traffic Optimization', 'IoT'],
      aiDecomposition: {
        objectives: [problemStatement, desiredOutcome],
        keyMetrics: kpiList.map(k => `${k.name} (${k.target})`),
        recommendedTech: requiredIntegrations,
        estimatedCostRange: `INR ${(Number(budgetMin) / 100000).toFixed(1)}–${(Number(budgetMax) / 100000).toFixed(1)} Lakhs`
      }
    });

    addNotification({
      title: publishingStatusOption === 'PUBLISHED' ? 'Innovation Challenge Published!' : 'Challenge Saved as Draft',
      message: `"${title}" has been successfully ${publishingStatusOption === 'PUBLISHED' ? 'published for startup applications' : 'saved to your department drafts'}.`,
      portal: 'both',
      type: 'success'
    });

    if (publishingStatusOption === 'PUBLISHED') {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }

    setIsPublishConfirmOpen(false);
    onClose();
    setStep(1);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Innovation Challenge"
      subtitle="Maharashtra State Startup-Friendly Public Procurement Framework (PS 26136)"
      maxWidth="5xl"
    >
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* ========================================================================= */}
        {/* MAIN FORM AREA (6-STEP WIZARD) */}
        {/* ========================================================================= */}
        <div className="flex-1 min-w-0 space-y-6 w-full">
          
          {/* Stepper Header (6 Steps) */}
          <div className="bg-slate-50 rounded-2xl p-2 border border-slate-200 overflow-x-auto">
            <div className="flex items-center gap-1 min-w-max text-xs font-bold">
              {[
                { num: 1, label: '① Basics' },
                { num: 2, label: '② Eligibility' },
                { num: 3, label: '③ Evaluation' },
                { num: 4, label: '④ Pilot & KPI' },
                { num: 5, label: '⑤ IP & Risk' },
                { num: 6, label: '⑥ Review' }
              ].map((s) => (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => setStep(s.num as any)}
                  className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                    step === s.num
                      ? 'bg-[#1D64EC] text-white shadow-xs'
                      : step > s.num
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'text-slate-500 hover:bg-white'
                  }`}
                >
                  {step > s.num ? <Check className="w-3 h-3 text-emerald-600" /> : null}
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ======================================================================= */}
          {/* STEP 1: CHALLENGE BASICS */}
          {/* ======================================================================= */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              
              {/* AI Helper Trigger Banner */}
              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-purple-900 block">AI Outcome Formulation Assistant</span>
                    <p className="text-[11px] text-purple-700">Transform problem descriptions into outcome-driven challenge specifications.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAiBasicsModalOpen(true)}
                  className="px-4 py-1.5 rounded-full bg-white hover:bg-purple-100 text-purple-900 border border-purple-200 font-bold text-xs shadow-2xs transition-colors shrink-0"
                >
                  ✨ Generate Outcome Challenge
                </button>
              </div>

              <div>
                <label className="font-bold text-xs text-navy-900 block mb-1">Challenge Title <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. AI-Based Traffic Congestion Reduction"
                  className="w-full p-2.5 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-navy-900 outline-none focus:border-[#1D64EC] focus:bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-xs text-slate-500 block mb-1">Department (Pre-filled)</label>
                <input
                  type="text"
                  value={department}
                  readOnly
                  className="w-full p-2.5 px-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-600 outline-none cursor-not-allowed"
                />
              </div>

              <div>
                <label className="font-bold text-xs text-navy-900 block mb-1">Problem Statement (Outcome-Oriented) <span className="text-rose-500">*</span></label>
                <textarea
                  rows={3}
                  value={problemStatement}
                  onChange={(e) => setProblemStatement(e.target.value)}
                  placeholder="Describe the public problem in terms of outcomes, not just technology..."
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-navy-900 outline-none focus:border-[#1D64EC] focus:bg-white leading-relaxed"
                />
              </div>

              <div>
                <label className="font-bold text-xs text-navy-900 block mb-1">Desired Public Outcome <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  value={desiredOutcome}
                  onChange={(e) => setDesiredOutcome(e.target.value)}
                  placeholder="e.g. Reduce average waiting time by 20% at high-volume intersections."
                  className="w-full p-2.5 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-navy-900 outline-none focus:border-[#1D64EC] focus:bg-white"
                />
              </div>

              {/* Target Geographies Chips */}
              <div>
                <label className="font-bold text-xs text-navy-900 block mb-1">Target Geographies</label>
                <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-200 mb-2">
                  {targetGeographies.map(geo => (
                    <span key={geo} className="px-2.5 py-1 rounded-full bg-blue-50 text-[#1D64EC] text-xs font-semibold border border-blue-200 flex items-center gap-1">
                      {geo}
                      <button type="button" onClick={() => handleRemoveGeo(geo)} className="hover:text-navy-900 font-bold ml-1">×</button>
                    </span>
                  ))}
                  <div className="flex items-center gap-1 ml-auto">
                    <input
                      type="text"
                      placeholder="Add city/district..."
                      value={newGeoInput}
                      onChange={(e) => setNewGeoInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddGeo(); } }}
                      className="bg-transparent text-xs text-navy-900 outline-none placeholder:text-slate-400 w-28"
                    />
                    <button
                      type="button"
                      onClick={handleAddGeo}
                      className="px-2 py-0.5 rounded-md bg-[#1D64EC] text-white text-[11px] font-bold"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Beneficiary Groups */}
              <div>
                <label className="font-bold text-xs text-navy-900 block mb-1.5">Beneficiary Groups</label>
                <div className="flex flex-wrap gap-2 text-xs">
                  {['Citizens', 'Drivers', 'Municipal staff', 'Transport operators', 'Pedestrians', 'Emergency Services'].map(b => (
                    <label key={b} className="flex items-center gap-1.5 cursor-pointer bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
                      <input
                        type="checkbox"
                        checked={beneficiaries.includes(b)}
                        onChange={(e) => {
                          if (e.target.checked) setBeneficiaries([...beneficiaries, b]);
                          else setBeneficiaries(beneficiaries.filter(item => item !== b));
                        }}
                        className="rounded text-[#1D64EC]"
                      />
                      <span className="font-medium text-slate-700">{b}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Baseline & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-xs text-navy-900 block mb-1">Current Baseline</label>
                  <input
                    type="text"
                    value={baseline}
                    onChange={(e) => setBaseline(e.target.value)}
                    placeholder="e.g. Avg. waiting time: 12 minutes"
                    className="w-full p-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-navy-900 outline-none focus:border-[#1D64EC]"
                  />
                </div>

                <div>
                  <label className="font-bold text-xs text-navy-900 block mb-1">Pilot Duration</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={pilotDurationVal}
                      onChange={(e) => setPilotDurationVal(e.target.value)}
                      className="w-24 p-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-navy-900 outline-none"
                    />
                    <select
                      value={pilotDurationUnit}
                      onChange={(e) => setPilotDurationUnit(e.target.value)}
                      className="flex-1 p-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-navy-900 outline-none cursor-pointer"
                    >
                      <option value="Days">Days</option>
                      <option value="Weeks">Weeks</option>
                      <option value="Months">Months</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Budget Range & Deadlines */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-xs text-navy-900 block mb-1">Expected Pilot Budget</label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      value={budgetMin}
                      onChange={(e) => setBudgetMin(e.target.value)}
                      placeholder="Min ₹"
                      className="w-full p-2 px-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-navy-900 outline-none"
                    />
                    <span className="text-slate-400">–</span>
                    <input
                      type="number"
                      value={budgetMax}
                      onChange={(e) => setBudgetMax(e.target.value)}
                      placeholder="Max ₹"
                      className="w-full p-2 px-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-navy-900 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-xs text-navy-900 block mb-1">Application Deadline</label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full p-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-navy-900 outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-xs text-navy-900 block mb-1">Scale Decision By</label>
                  <input
                    type="date"
                    value={scaleDecisionDate}
                    onChange={(e) => setScaleDecisionDate(e.target.value)}
                    className="w-full p-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-navy-900 outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-full bg-[#1D64EC] hover:bg-brand-cobalt text-white font-bold text-xs shadow-sm flex items-center gap-2 transition-all"
                >
                  <span>Next: Eligibility & Constraints</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* STEP 2: ELIGIBILITY & CONSTRAINTS */}
          {/* ======================================================================= */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in">
              
              {/* Section A: Startup Eligibility Builder */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-navy-900">Startup Eligibility Criteria Builder</h3>
                    <p className="text-[11px] text-slate-500">Define mandatory vs startup-friendly scored relaxations.</p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddEligibility}
                    className="px-3 py-1.5 rounded-full bg-blue-50 text-[#1D64EC] border border-blue-200 text-xs font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Criterion</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {eligibilityCriteria.map((crit, idx) => (
                    <div key={crit.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={crit.name}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEligibilityCriteria(prev => prev.map(c => c.id === crit.id ? { ...c, name: val } : c));
                          }}
                          className="font-bold text-navy-900 bg-white p-1.5 px-2 rounded-lg border border-slate-200 flex-1 outline-none"
                        />

                        <select
                          value={crit.type}
                          onChange={(e) => {
                            const val = e.target.value as any;
                            setEligibilityCriteria(prev => prev.map(c => c.id === crit.id ? { ...c, type: val } : c));
                          }}
                          className={`p-1.5 px-2.5 rounded-lg font-bold outline-none cursor-pointer ${
                            crit.type === 'Mandatory' ? 'bg-rose-100 text-rose-900 border border-rose-200' :
                            crit.type === 'Preferred' ? 'bg-amber-100 text-amber-900 border border-amber-200' :
                            'bg-blue-100 text-blue-900 border border-blue-200'
                          }`}
                        >
                          <option value="Mandatory">Mandatory 🔴</option>
                          <option value="Preferred">Preferred 🟡</option>
                          <option value="Scored">Scored 🔵</option>
                        </select>

                        {eligibilityCriteria.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveEligibility(crit.id)}
                            className="text-slate-400 hover:text-rose-600 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={crit.description}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEligibilityCriteria(prev => prev.map(c => c.id === crit.id ? { ...c, description: val } : c));
                          }}
                          placeholder="Requirement description..."
                          className="p-1.5 px-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 outline-none"
                        />

                        <select
                          value={crit.verificationMethod}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEligibilityCriteria(prev => prev.map(c => c.id === crit.id ? { ...c, verificationMethod: val } : c));
                          }}
                          className="p-1.5 px-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 outline-none"
                        >
                          <option value="Official verification (DPIIT portal)">Official verification (DPIIT portal)</option>
                          <option value="Financial declaration">Financial declaration</option>
                          <option value="Evidence (documents/case studies)">Evidence (documents/case studies)</option>
                          <option value="Document + review">Document + review</option>
                          <option value="Self-declaration">Self-declaration</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section B: Technical Constraints & Data Residency */}
              <div className="space-y-4 pt-2 border-t border-slate-100 text-xs">
                <h3 className="font-bold text-sm text-navy-900">Technical Constraints & Data Residency</h3>

                {/* 1. Required Integrations */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1.5">1. Required Integrations</label>
                  <div className="flex flex-wrap gap-2">
                    {['SCADA', 'ITMS', 'ERP', 'Government API', 'GIS', 'Aadhaar / DigiLocker'].map(item => (
                      <label key={item} className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl cursor-pointer">
                        <input
                          type="checkbox"
                          checked={requiredIntegrations.includes(item)}
                          onChange={(e) => {
                            if (e.target.checked) setRequiredIntegrations([...requiredIntegrations, item]);
                            else setRequiredIntegrations(requiredIntegrations.filter(i => i !== item));
                          }}
                          className="rounded text-[#1D64EC]"
                        />
                        <span className="font-medium text-navy-900">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 2. Data Sensitivity & Residency */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="font-bold text-navy-900 block">Data Sensitivity</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {(['Public', 'Internal', 'Confidential', 'Highly Sensitive'] as const).map(sens => (
                        <label key={sens} className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="sensitivity"
                            checked={dataSensitivity === sens}
                            onChange={() => setDataSensitivity(sens)}
                            className="text-[#1D64EC]"
                          />
                          <span className="text-slate-700">{sens}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="font-bold text-navy-900 block">Data Residency & Cloud</span>
                    <label className="flex items-center gap-2 cursor-pointer font-bold text-navy-900">
                      <input
                        type="checkbox"
                        checked={dataResidencyIndia}
                        onChange={(e) => setDataResidencyIndia(e.target.checked)}
                        className="rounded text-[#1D64EC]"
                      />
                      <span>Data must reside in India (MeitY)</span>
                    </label>

                    <select
                      value={cloudDeployment}
                      onChange={(e) => setCloudDeployment(e.target.value as any)}
                      className="w-full p-2 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 outline-none"
                    >
                      <option value="MeitY-empanelled cloud">MeitY-empanelled cloud</option>
                      <option value="Approved government cloud">Approved government cloud</option>
                      <option value="On-premise">On-premise</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 rounded-full bg-[#1D64EC] hover:bg-brand-cobalt text-white font-bold text-xs shadow-sm flex items-center gap-2 transition-all"
                >
                  <span>Next: Evaluation Priorities</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* STEP 3: EVALUATION PRIORITIES */}
          {/* ======================================================================= */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-navy-900">Evaluation Criteria & Rubric Weights</h3>
                  <p className="text-[11px] text-slate-500">Configure weighting for technical reviewers. Total weight must equal 100%.</p>
                </div>

                <div className={`px-3 py-1 rounded-full text-xs font-extrabold border ${
                  totalWeight === 100 ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'
                }`}>
                  Total: {totalWeight}% {totalWeight === 100 ? '✅' : '⚠️ (Must = 100%)'}
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                {evaluationCriteria.map((crit) => (
                  <div key={crit.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                    <input
                      type="text"
                      value={crit.name}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEvaluationCriteria(prev => prev.map(c => c.id === crit.id ? { ...c, name: val } : c));
                      }}
                      className="font-bold text-navy-900 bg-white p-1.5 px-3 rounded-lg border border-slate-200 flex-1 outline-none"
                    />

                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={crit.weight}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setEvaluationCriteria(prev => prev.map(c => c.id === crit.id ? { ...c, weight: val } : c));
                        }}
                        className="w-16 p-1.5 px-2 rounded-lg bg-white border border-slate-200 font-extrabold text-navy-900 text-center outline-none"
                      />
                      <span className="font-bold text-slate-400">%</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveRubricModal(crit)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-colors flex items-center gap-1 ${
                        crit.rubricDefined 
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span>{crit.rubricDefined ? 'Rubric Defined ✅' : 'Define Rubric'}</span>
                    </button>

                    {evaluationCriteria.length > 3 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveEvaluationCriterion(crit.id)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleAddEvaluationCriterion}
                  className="px-4 py-1.5 rounded-full bg-blue-50 text-[#1D64EC] border border-blue-200 font-bold text-xs flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Criterion</span>
                </button>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={totalWeight !== 100}
                  onClick={() => setStep(4)}
                  className="px-6 py-2.5 rounded-full bg-[#1D64EC] hover:bg-brand-cobalt text-white font-bold text-xs shadow-sm flex items-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span>Next: Pilot & KPI</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* STEP 4: PILOT & KPI */}
          {/* ======================================================================= */}
          {step === 4 && (
            <div className="space-y-5 animate-in fade-in">
              
              {/* Section A: Pilot Setup */}
              <div className="space-y-3 text-xs">
                <h3 className="font-bold text-sm text-navy-900">Pilot Deployment Setup</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Pilot Objective <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      value={pilotObjective}
                      onChange={(e) => setPilotObjective(e.target.value)}
                      className="w-full p-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-navy-900 outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Number of Startups to Select for Pilot</label>
                    <input
                      type="number"
                      value={startupsCountToSelect}
                      onChange={(e) => setStartupsCountToSelect(e.target.value)}
                      className="w-full p-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-navy-900 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Pilot Locations / Field Assets</label>
                  <input
                    type="text"
                    value={pilotLocations}
                    onChange={(e) => setPilotLocations(e.target.value)}
                    className="w-full p-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-navy-900 outline-none"
                  />
                </div>
              </div>

              {/* Section B: KPI Builder */}
              <div className="space-y-3 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-navy-900">Outcome Key Performance Indicators (KPIs)</h3>
                    <p className="text-[11px] text-slate-500">Measurable KPIs linked to pilot telemetry escrow payouts.</p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddKPI}
                    className="px-3 py-1.5 rounded-full bg-blue-50 text-[#1D64EC] border border-blue-200 text-xs font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add KPI</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {kpiList.map((kpi, idx) => (
                    <div key={kpi.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={kpi.name}
                          onChange={(e) => {
                            const val = e.target.value;
                            setKpiList(prev => prev.map(k => k.id === kpi.id ? { ...k, name: val } : k));
                          }}
                          placeholder="KPI Name..."
                          className="font-bold text-navy-900 bg-white p-1.5 px-2.5 rounded-lg border border-slate-200 flex-1 outline-none"
                        />

                        <label className="flex items-center gap-1.5 cursor-pointer bg-white px-2.5 py-1.5 rounded-lg border border-slate-200">
                          <input
                            type="checkbox"
                            checked={kpi.isMandatory}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setKpiList(prev => prev.map(k => k.id === kpi.id ? { ...k, isMandatory: checked } : k));
                            }}
                            className="rounded text-[#1D64EC]"
                          />
                          <span className="font-bold text-[#1D64EC] text-[11px]">Mandatory KPI</span>
                        </label>

                        {kpiList.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveKPI(kpi.id)}
                            className="text-slate-400 hover:text-rose-600 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 block mb-0.5">Baseline Value</span>
                          <input
                            type="text"
                            value={kpi.baseline}
                            onChange={(e) => {
                              const val = e.target.value;
                              setKpiList(prev => prev.map(k => k.id === kpi.id ? { ...k, baseline: val } : k));
                            }}
                            className="p-1.5 px-2 rounded-lg bg-white border border-slate-200 w-full outline-none"
                          />
                        </div>

                        <div>
                          <span className="text-[10px] font-bold text-slate-400 block mb-0.5">Target Value</span>
                          <input
                            type="text"
                            value={kpi.target}
                            onChange={(e) => {
                              const val = e.target.value;
                              setKpiList(prev => prev.map(k => k.id === kpi.id ? { ...k, target: val } : k));
                            }}
                            className="p-1.5 px-2 rounded-lg bg-white border border-slate-200 w-full outline-none"
                          />
                        </div>

                        <div>
                          <span className="text-[10px] font-bold text-slate-400 block mb-0.5">Data Source</span>
                          <select
                            value={kpi.dataSource}
                            onChange={(e) => {
                              const val = e.target.value;
                              setKpiList(prev => prev.map(k => k.id === kpi.id ? { ...k, dataSource: val } : k));
                            }}
                            className="p-1.5 px-2 rounded-lg bg-white border border-slate-200 w-full outline-none"
                          >
                            <option value="Government system (e.g. ITMS, SCADA)">Government system</option>
                            <option value="IoT/device">IoT/device</option>
                            <option value="Independent validator">Independent validator</option>
                            <option value="Startup system/platform">Startup system</option>
                          </select>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold text-slate-400 block mb-0.5">Measurement Frequency</span>
                          <select
                            value={kpi.frequency}
                            onChange={(e) => {
                              const val = e.target.value;
                              setKpiList(prev => prev.map(k => k.id === kpi.id ? { ...k, frequency: val } : k));
                            }}
                            className="p-1.5 px-2 rounded-lg bg-white border border-slate-200 w-full outline-none"
                          >
                            <option value="Real-time">Real-time</option>
                            <option value="Daily">Daily</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Monthly">Monthly</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(5)}
                  className="px-6 py-2.5 rounded-full bg-[#1D64EC] hover:bg-brand-cobalt text-white font-bold text-xs shadow-sm flex items-center gap-2 transition-all"
                >
                  <span>Next: IP, Data & Risk</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* STEP 5: IP, DATA & RISK */}
          {/* ======================================================================= */}
          {step === 5 && (
            <div className="space-y-4 animate-in fade-in text-xs">
              
              {/* Section A: Data Ownership & Access */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <h3 className="font-bold text-sm text-navy-900">Data Ownership & Access</h3>
                <div className="space-y-1.5">
                  {[
                    'Government retains ownership of all pilot data',
                    'Startup retains ownership; government gets license',
                    'Shared ownership'
                  ].map(own => (
                    <label key={own} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="dataOwnership"
                        checked={dataOwnership === own}
                        onChange={() => setDataOwnership(own)}
                        className="text-[#1D64EC]"
                      />
                      <span className="text-slate-800 font-medium">{own}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Section B: IP Model */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <h3 className="font-bold text-sm text-navy-900">Intellectual Property (IP) Framework</h3>
                <div className="space-y-1.5">
                  {[
                    'Startup owned with government license (perpetual, royalty-free)',
                    'Government owned',
                    'Joint / custom arrangement'
                  ].map(ip => (
                    <label key={ip} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="ipModel"
                        checked={newlyDevelopedIp.startsWith(ip.substring(0, 10))}
                        onChange={() => setNewlyDevelopedIp(ip)}
                        className="text-[#1D64EC]"
                      />
                      <span className="text-slate-800 font-medium">{ip}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Section C: Risk Level & Security */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="font-bold text-sm text-navy-900">Cybersecurity & Risk Level</h3>
                
                <div className="flex items-center gap-4">
                  <span className="font-bold text-slate-700">Assigned Risk Level:</span>
                  {(['Low', 'Medium', 'High'] as const).map(lvl => (
                    <label key={lvl} className="flex items-center gap-1.5 cursor-pointer font-bold">
                      <input
                        type="radio"
                        name="riskLevel"
                        checked={riskLevel === lvl}
                        onChange={() => setRiskLevel(lvl)}
                        className="text-[#1D64EC]"
                      />
                      <span>{lvl === 'Low' ? '🟢 Low' : lvl === 'Medium' ? '🟡 Medium' : '🔴 High'}</span>
                    </label>
                  ))}
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-200/80">
                  <span className="font-bold text-slate-700 block">Security Controls Checklist</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {[
                      'Encryption (in transit and at rest)',
                      'Role-based access control (RBAC)',
                      'Audit logging',
                      'Data residency compliance',
                      'Vulnerability assessment / penetration test',
                      'Mandatory independent security audit before scale'
                    ].map(sec => (
                      <label key={sec} className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={securityChecklist.includes(sec)}
                          onChange={(e) => {
                            if (e.target.checked) setSecurityChecklist([...securityChecklist, sec]);
                            else setSecurityChecklist(securityChecklist.filter(s => s !== sec));
                          }}
                          className="rounded text-[#1D64EC]"
                        />
                        <span className="text-slate-700">{sec}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(6)}
                  className="px-6 py-2.5 rounded-full bg-[#1D64EC] hover:bg-brand-cobalt text-white font-bold text-xs shadow-sm flex items-center gap-2 transition-all"
                >
                  <span>Next: Review & Publish</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* STEP 6: REVIEW & PUBLISH */}
          {/* ======================================================================= */}
          {step === 6 && (
            <div className="space-y-5 animate-in fade-in text-xs">
              
              {/* Section A: Challenge Readiness Checklist */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="font-bold text-sm text-navy-900">Challenge Readiness Checklist</h3>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                    Readiness: {readiness}%
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Problem clearly defined & outcome-oriented</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Evaluation weights = 100% ({totalWeight}%)</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Mandatory eligibility criteria established ({eligibilityCriteria.length})</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Measurable KPIs defined ({kpiList.length} metrics)</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Data residency in India enforced</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Security controls configured ({riskLevel} Risk)</span>
                  </div>
                </div>
              </div>

              {/* Section B: Challenge Summary Preview */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-navy-900 block">{title}</span>
                <p className="text-slate-600 leading-relaxed font-medium">{problemStatement}</p>
                <div className="flex flex-wrap gap-3 pt-2 text-slate-500 font-medium">
                  <span>Geographies: <strong>{targetGeographies.join(', ')}</strong></span>
                  <span>•</span>
                  <span>Budget: <strong>INR {(Number(budgetMin)/100000).toFixed(1)}–{(Number(budgetMax)/100000).toFixed(1)} L</strong></span>
                  <span>•</span>
                  <span>Deadline: <strong>{deadline}</strong></span>
                </div>
              </div>

              {/* Section C: Publishing Options */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
                <span className="font-bold text-navy-900 block">Publishing Options</span>
                <div className="space-y-2">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="radio"
                      name="pubOption"
                      checked={publishingStatusOption === 'PUBLISHED'}
                      onChange={() => setPublishingStatusOption('PUBLISHED')}
                      className="text-[#1D64EC]"
                    />
                    <div>
                      <strong className="text-navy-900 block">Publish Challenge (Open for Startup Submissions)</strong>
                      <span className="text-slate-500">Instantly visible in Startup Portal for solution proposals.</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="radio"
                      name="pubOption"
                      checked={publishingStatusOption === 'DRAFT'}
                      onChange={() => setPublishingStatusOption('DRAFT')}
                      className="text-[#1D64EC]"
                    />
                    <div>
                      <strong className="text-navy-900 block">Save as Internal Draft</strong>
                      <span className="text-slate-500">Save progress for further departmental edits.</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(5)}
                  className="px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Back
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setPublishingStatusOption('DRAFT');
                      handlePublishConfirmed();
                    }}
                    className="px-5 py-2.5 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs"
                  >
                    Save Draft
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsPublishConfirmOpen(true)}
                    className="px-7 py-2.5 rounded-full bg-[#1D64EC] hover:bg-brand-cobalt text-white font-bold text-xs shadow-sm flex items-center gap-2 hover:scale-[1.02] transition-all"
                  >
                    <Check className="w-4 h-4" />
                    <span>Publish Challenge</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* ========================================================================= */}
        {/* RIGHT-SIDE STICKY PANEL: LIVE CHALLENGE SUMMARY */}
        {/* ========================================================================= */}
        <aside className="w-full lg:w-72 shrink-0 sticky top-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-navy-900">Challenge Summary</h3>
              <StatusBadge label={step === 6 ? 'Ready to Publish' : 'Draft In Progress'} variant="emerald" size="sm" />
            </div>

            {/* Live Checklist */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-left font-semibold text-slate-700"
              >
                <span>1. Problem Basics</span>
                <span className="text-emerald-600 font-bold">✅</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-left font-semibold text-slate-700"
              >
                <span>2. Eligibility</span>
                <span className="text-emerald-600 font-bold">✅</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-left font-semibold text-slate-700"
              >
                <span>3. Evaluation ({totalWeight}%)</span>
                <span className={totalWeight === 100 ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
                  {totalWeight === 100 ? '✅' : '⚠️'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setStep(4)}
                className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-left font-semibold text-slate-700"
              >
                <span>4. Pilot & KPIs</span>
                <span className="text-emerald-600 font-bold">✅</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(5)}
                className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-left font-semibold text-slate-700"
              >
                <span>5. IP, Data & Risk</span>
                <span className="text-emerald-600 font-bold">✅</span>
              </button>
            </div>

            {/* Live Readiness Gauge */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400">Readiness Score</span>
              <div className="text-xl font-extrabold text-[#1D64EC] font-display">{readiness}%</div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#1D64EC] h-full transition-all duration-300" style={{ width: `${readiness}%` }} />
              </div>
            </div>

            {/* Sticky Action Buttons */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setPublishingStatusOption('PUBLISHED');
                  setIsPublishConfirmOpen(true);
                }}
                disabled={totalWeight !== 100}
                className="w-full py-2 rounded-full bg-[#1D64EC] hover:bg-brand-cobalt text-white font-bold text-xs shadow-sm transition-all disabled:opacity-40"
              >
                Publish Challenge
              </button>

              <button
                type="button"
                onClick={() => {
                  setPublishingStatusOption('DRAFT');
                  handlePublishConfirmed();
                }}
                className="w-full py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
              >
                Save Draft
              </button>
            </div>
          </div>
        </aside>

      </div>

      {/* ========================================================================= */}
      {/* MODAL: AI OUTCOME CHALLENGE GENERATOR */}
      {/* ========================================================================= */}
      {isAiBasicsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 border border-slate-200 shadow-2xl">
            <div className="flex items-start justify-between gap-3 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-base text-navy-900">AI Outcome-Based Generator</h3>
              </div>
              <button onClick={() => setIsAiBasicsModalOpen(false)} className="text-slate-400 hover:text-navy-900 font-bold">×</button>
            </div>

            <div className="space-y-3 text-xs">
              <label className="font-bold text-slate-700 block">Describe your public problem in your own words:</label>
              <textarea
                rows={4}
                value={aiPromptInput}
                onChange={(e) => setAiPromptInput(e.target.value)}
                placeholder="e.g. Pune junction traffic during peak hours causes huge fuel waste and delay for citizens. We want smart automated signal timing based on real-time vehicle density..."
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-navy-900 outline-none focus:border-[#1D64EC] focus:bg-white"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setIsAiBasicsModalOpen(false)}
                className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  setTitle('AI-Powered Adaptive Traffic Flow & Congestion Mitigation');
                  setProblemStatement('Urban intersection bottlenecks cause extensive vehicle delay and carbon emissions due to static signal schedules unable to adapt to dynamic morning and evening surge volumes.');
                  setDesiredOutcome('Achieve minimum 20% reduction in average vehicle queue delay and 15% reduction in idling emissions across high-volume corridors.');
                  setBaseline('Peak commute delay: 14.5 minutes per arterial intersection');
                  setIsAiBasicsModalOpen(false);
                  addNotification({ title: 'AI Suggestion Applied', message: 'Challenge title, problem statement, and outcome metrics auto-populated.', portal: 'gov', type: 'success' });
                }}
                className="px-5 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-sm"
              >
                Accept Suggestion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: RUBRIC BUILDER */}
      {/* ========================================================================= */}
      {activeRubricModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 border border-slate-200 shadow-2xl">
            <div className="flex items-start justify-between gap-3 pb-2 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-[#1D64EC] uppercase">5-Level Scoring Rubric</span>
                <h3 className="font-bold text-base text-navy-900">{activeRubricModal.name}</h3>
              </div>
              <button onClick={() => setActiveRubricModal(null)} className="text-slate-400 hover:text-navy-900 font-bold">×</button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                <strong className="text-emerald-900 block">Score 9–10: Outstanding</strong>
                <p className="text-emerald-800 text-[11px]">Production-ready and proven in similar municipal contexts with third-party certification.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200">
                <strong className="text-blue-900 block">Score 7–8: Strong</strong>
                <p className="text-blue-800 text-[11px]">Strong prototype with documented limited commercial deployment.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                <strong className="text-amber-900 block">Score 5–6: Plausible</strong>
                <p className="text-amber-800 text-[11px]">Technically plausible but requires customization for municipal ITMS integration.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200">
                <strong className="text-rose-900 block">Score 0–4: Inadequate</strong>
                <p className="text-rose-800 text-[11px]">Significant technical uncertainty or lacks required hardware readiness.</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setEvaluationCriteria(prev => prev.map(c => c.id === activeRubricModal.id ? { ...c, rubricDefined: true } : c));
                  setActiveRubricModal(null);
                }}
                className="px-5 py-2 rounded-full bg-[#1D64EC] text-white font-bold text-xs"
              >
                Save Rubric
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: PUBLISH CONFIRMATION */}
      {/* ========================================================================= */}
      {isPublishConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-4 border border-slate-200 shadow-2xl text-center">
            <div className="w-14 h-14 rounded-3xl bg-blue-50 text-[#1D64EC] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-extrabold text-navy-900 font-display">
                Publish Innovation Challenge?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>{title}</strong> will be immediately published across the Maharashtra State Startup Portal.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-left text-xs text-slate-600 space-y-1">
              <div>Department: <strong>{department}</strong></div>
              <div>Applications Open Until: <strong>{deadline}</strong></div>
              <div>Budget: <strong>INR {(Number(budgetMin)/100000).toFixed(1)}–{(Number(budgetMax)/100000).toFixed(1)} Lakhs</strong></div>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsPublishConfirmOpen(false)}
                className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handlePublishConfirmed}
                className="px-6 py-2.5 rounded-full bg-[#1D64EC] hover:bg-brand-cobalt text-white font-bold text-xs shadow-sm flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Confirm & Publish</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </Modal>
  );
};
