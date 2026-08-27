import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { usePlatform } from '../../context/PlatformContext';
import { Challenge, Milestone } from '../../types';
import { Sparkles, Check, ArrowRight, CheckCircle2, ShieldCheck, DollarSign } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  challenge: Challenge;
}

export const ProposalSubmissionModal: React.FC<Props> = ({ isOpen, onClose, challenge }) => {
  const { submitProposal, currentStartup } = usePlatform();
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Step 1: Basic Info
  const [solutionName, setSolutionName] = useState('AquaMind Leakage Detection Suite');

  // Step 2: Solution Overview
  const [problemUnderstanding, setProblemUnderstanding] = useState(
    'Urban water utilities in Maharashtra face high non-revenue water due to undetected leaks and reactive maintenance. Our solution uses AI and IoT to detect leaks in real time and predict failures before they occur.'
  );
  const [proposedApproach, setProposedApproach] = useState(
    'Deploy 320 non-invasive acoustic clamp sensors across distribution pipelines in Zone A. Sensor telemetry is ingested via edge gateways into our cloud AI engine to triangulate micro-leak coordinates within ±2 meters and dispatch work orders to field crews.'
  );
  const [expectedOutcomes, setExpectedOutcomes] = useState([
    '≥20% reduction in water loss in 6 months',
    '<15 min average alert response time',
    '15% reduction in energy cost for pumping'
  ]);

  // Step 3: Implementation Plan
  const [pilotDurationMonths, setPilotDurationMonths] = useState(6);
  const [teamAllocation, setTeamAllocation] = useState([
    'Project Lead – 1',
    'Data Scientists – 2',
    'Field Engineers – 3'
  ]);

  // Step 4: Budget & Commercials
  const [totalCost, setTotalCost] = useState('INR 35 Lakhs');

  // Step 5: IP, Data & Compliance
  const [ipAccepted, setIpAccepted] = useState(true);
  const [dataOwnershipAccepted, setDataOwnershipAccepted] = useState(true);
  const [cyberPolicyAccepted, setCyberPolicyAccepted] = useState(true);

  const handleSubmit = () => {
    submitProposal({
      challengeId: challenge.id,
      challengeTitle: challenge.title,
      department: challenge.department,
      proposedSolutionName: solutionName,
      problemUnderstanding,
      approachSummary: proposedApproach,
      expectedOutcomes,
      timelineMonths: Number(pilotDurationMonths),
      requestedBudget: totalCost,
      teamAllocation,
      milestones: [
        {
          id: 'M1',
          number: 1,
          title: 'Baseline & Sensor Deployment (Month 1–2)',
          deliverableDescription: 'Complete deployment of 320 sensors and baseline SCADA integration.',
          durationWeeks: 8,
          payoutPercentage: 30,
          payoutAmount: 'INR 10.5 Lakhs',
          status: 'pending'
        },
        {
          id: 'M2',
          number: 2,
          title: 'AI Model Tuning & Alerts (Month 3–4)',
          deliverableDescription: '90-day telemetry, live leak alerts, and model calibration.',
          durationWeeks: 8,
          payoutPercentage: 40,
          payoutAmount: 'INR 14.0 Lakhs',
          status: 'pending'
        },
        {
          id: 'M3',
          number: 3,
          title: 'Validation & Handover (Month 5–6)',
          deliverableDescription: 'Final KPI audit report, municipal handover, and GeM cataloging.',
          durationWeeks: 8,
          payoutPercentage: 30,
          payoutAmount: 'INR 10.5 Lakhs',
          status: 'pending'
        }
      ]
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Submit Proposal Studio"
      subtitle={`Challenge: ${challenge.code} — ${challenge.title}`}
      maxWidth="4xl"
    >
      {/* 5-Step Stepper Header */}
      <div className="flex items-center justify-between mb-6 px-1">
        {[
          { num: 1, label: '1. Basic Info' },
          { num: 2, label: '2. Solution Overview' },
          { num: 3, label: '3. Implementation' },
          { num: 4, label: '4. Budget' },
          { num: 5, label: '5. Compliance' },
        ].map((s, idx) => (
          <React.Fragment key={s.num}>
            <div className="flex items-center gap-1.5">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                step >= s.num ? 'bg-brand-royal text-white shadow-action' : 'bg-slate-100 text-slate-400'
              }`}>
                {step > s.num ? <Check className="w-3 h-3" /> : s.num}
              </div>
              <span className={`text-[11px] font-bold hidden sm:inline ${step >= s.num ? 'text-navy-900' : 'text-slate-400'}`}>
                {s.label}
              </span>
            </div>
            {idx < 4 && <div className="flex-1 h-0.5 bg-slate-200 mx-1" />}
          </React.Fragment>
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-brand-sky-light/60 border border-brand-sky flex items-center justify-between">
            <div>
              <span className="micro-label text-brand-cobalt block">{challenge.department}</span>
              <p className="text-xs text-navy-900 font-bold mt-0.5">{challenge.title}</p>
            </div>
            <div className="text-right shrink-0">
              <span className="micro-label text-slate-400 block">Pilot Budget</span>
              <span className="text-xs font-extrabold text-navy-900 font-display">{challenge.budget}</span>
            </div>
          </div>

          <div>
            <label className="micro-label block mb-1">Applying Startup Name (Pre-Filled)</label>
            <input
              type="text"
              value={currentStartup.name}
              readOnly
              className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 outline-none"
            />
          </div>

          <div>
            <label className="micro-label block mb-1">Proposed Solution Name</label>
            <input
              type="text"
              value={solutionName}
              onChange={(e) => setSolutionName(e.target.value)}
              className="w-full p-3 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-navy-900 outline-none focus:border-brand-royal"
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-6 py-2.5 rounded-full bg-brand-royal hover:bg-brand-cobalt text-white font-bold text-xs shadow-action flex items-center gap-2 transition-all"
            >
              <span>Next: Solution Overview</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Solution Overview */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="micro-label block mb-1">Problem Understanding (200–300 words)</label>
            <textarea
              rows={3}
              value={problemUnderstanding}
              onChange={(e) => setProblemUnderstanding(e.target.value)}
              className="w-full p-3 rounded-2xl bg-white border border-slate-200 text-xs font-medium text-navy-900 outline-none focus:border-brand-royal"
            />
          </div>

          <div>
            <label className="micro-label block mb-1">Proposed Approach (300–500 words)</label>
            <textarea
              rows={3}
              value={proposedApproach}
              onChange={(e) => setProposedApproach(e.target.value)}
              className="w-full p-3 rounded-2xl bg-white border border-slate-200 text-xs font-medium text-navy-900 outline-none focus:border-brand-royal"
            />
          </div>

          <div>
            <label className="micro-label block mb-1">Expected Outcomes & Target Metrics</label>
            <div className="space-y-1.5 text-xs text-navy-900 font-semibold">
              {expectedOutcomes.map((out, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{out}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="px-6 py-2.5 rounded-full bg-brand-royal hover:bg-brand-cobalt text-white font-bold text-xs shadow-action flex items-center gap-2 transition-all"
            >
              <span>Next: Implementation Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Implementation Plan */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="micro-label block mb-1">Pilot Duration</label>
              <input
                type="text"
                value={`${pilotDurationMonths} Months`}
                readOnly
                className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-navy-900 outline-none"
              />
            </div>
            <div>
              <label className="micro-label block mb-1">Target Start Date</label>
              <input
                type="text"
                value="September 2026"
                readOnly
                className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-navy-900 outline-none"
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2.5">
            <span className="micro-label text-slate-400 block">Pilot Phases</span>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold">
                1. Baseline & Sensor Deployment (Month 1–2)
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold">
                2. AI Model Tuning & Alerts (Month 3–4)
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold">
                3. Validation & Handover (Month 5–6)
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
            <span className="micro-label text-slate-400 block">Core R&D Team Allocation</span>
            <div className="flex flex-wrap gap-2 text-xs">
              {teamAllocation.map((t, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-xl bg-brand-sky-light text-brand-cobalt font-semibold border border-brand-sky">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep(4)}
              className="px-6 py-2.5 rounded-full bg-brand-royal hover:bg-brand-cobalt text-white font-bold text-xs shadow-action flex items-center gap-2 transition-all"
            >
              <span>Next: Budget & Commercials</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Budget & Commercials */}
      {step === 4 && (
        <div className="space-y-4">
          <div>
            <label className="micro-label block mb-1">Total Requested Pilot Cost</label>
            <input
              type="text"
              value={totalCost}
              onChange={(e) => setTotalCost(e.target.value)}
              className="w-full p-3 rounded-2xl bg-white border border-slate-200 text-sm font-bold text-navy-900 outline-none focus:border-brand-royal"
            />
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
            <span className="micro-label text-slate-400 block">Milestone-wise Breakup</span>
            <div className="space-y-2 text-xs font-semibold text-navy-900">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between">
                <span>Milestone 1 (M1 – Deployment & Baseline)</span>
                <span className="text-brand-royal font-bold">30% (INR 10.5 Lakhs)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between">
                <span>Milestone 2 (M2 – 3-Month Performance Review)</span>
                <span className="text-brand-royal font-bold">40% (INR 14.0 Lakhs)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between">
                <span>Milestone 3 (M3 – Final Validation & Handover)</span>
                <span className="text-brand-royal font-bold">30% (INR 10.5 Lakhs)</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep(5)}
              className="px-6 py-2.5 rounded-full bg-brand-royal hover:bg-brand-cobalt text-white font-bold text-xs shadow-action flex items-center gap-2 transition-all"
            >
              <span>Next: IP & Compliance</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 5: IP, Data & Compliance */}
      {step === 5 && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
            <span className="micro-label text-slate-400 block">Statutory Compliance Checkboxes</span>
            <div className="space-y-2">
              <label className="flex items-center gap-2.5 text-xs text-navy-900 font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={ipAccepted}
                  onChange={(e) => setIpAccepted(e.target.checked)}
                  className="rounded text-brand-royal focus:ring-brand-royal w-4 h-4"
                />
                <span>We agree to Maharashtra standard IP terms (Startup retains IP; perpetual internal license to Govt)</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-navy-900 font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={dataOwnershipAccepted}
                  onChange={(e) => setDataOwnershipAccepted(e.target.checked)}
                  className="rounded text-brand-royal focus:ring-brand-royal w-4 h-4"
                />
                <span>We confirm all pilot data will reside in India on MeitY empanelled cloud</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-navy-900 font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={cyberPolicyAccepted}
                  onChange={(e) => setCyberPolicyAccepted(e.target.checked)}
                  className="rounded text-brand-royal focus:ring-brand-royal w-4 h-4"
                />
                <span>We confirm full compliance with Maharashtra State Cyber Policy v2.0</span>
              </label>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={() => setStep(4)}
              className="px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
            >
              Back
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs transition-colors"
              >
                Save as Draft
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-7 py-2.5 rounded-full bg-gradient-to-r from-brand-royal to-brand-cobalt text-white font-bold text-xs shadow-action flex items-center gap-2 hover:scale-[1.02] transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Submit Proposal</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </Modal>
  );
};
