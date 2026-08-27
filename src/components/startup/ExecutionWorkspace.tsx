import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { 
  Rocket, Upload, CheckCircle2, FileText, ShieldCheck, 
  ShoppingBag, Check, Clock, AlertCircle, Sparkles, FileSpreadsheet, Paperclip 
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { Modal } from '../common/Modal';
import confetti from 'canvas-confetti';

export const ExecutionWorkspace: React.FC = () => {
  const { proposals, submitMilestoneDeliverable, updateStartupProfile, currentStartup } = usePlatform();

  const activeProposal = proposals[0];

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [proofUrl, setProofUrl] = useState('https://dashboard.aquasense.ai/pune-zone-a/export-90days.pdf');
  const [proofNotes, setProofNotes] = useState('90-day performance dashboard export (38 verified leaks resolved / 47 alerts) with SCADA telemetry data.');

  // GeM fast-track state
  const [gemStep, setGemStep] = useState(currentStartup.gemReady ? 4 : 2);
  const [isGemSuccess, setIsGemSuccess] = useState(false);

  const handleUploadM2 = () => {
    if (activeProposal) {
      submitMilestoneDeliverable(activeProposal.id, 'M2', proofUrl, proofNotes);
      setIsUploadModalOpen(false);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }
  };

  const handleAdvanceGeM = () => {
    if (gemStep < 4) {
      setGemStep(gemStep + 1);
    } else {
      updateStartupProfile({ gemReady: true, gemSellerId: 'GEM-VEND-MH-882194' });
      setIsGemSuccess(true);
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="micro-label text-slate-400">Pilot Delivery & Scaling</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-display">
            Execution Workspace
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Manage milestone submissions, evidence uploads, and GeM onboarding for active pilots.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge label="Pilot Ongoing" variant="amber" size="md" icon="clock" />
        </div>
      </div>

      {/* Pilot Context Header */}
      <div className="glass-panel rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div>
          <span className="micro-label text-brand-royal block text-[10px]">Active Pilot Assignment</span>
          <p className="font-bold text-navy-900 text-sm mt-0.5">AI-based Water Leakage Detection – Pune Zone A</p>
          <p className="text-slate-500">Department: Maharashtra Water Supply & Sanitation • Value: INR 35 Lakhs</p>
        </div>
        <div className="text-right shrink-0">
          <span className="text-[10px] text-slate-400 font-bold block">Current Reduction</span>
          <span className="text-lg font-extrabold text-emerald-700 font-display">18.4% Achieved</span>
        </div>
      </div>

      {/* 2-Column: Milestone Deliverables vs GeM Onboarding */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Milestone Submissions (7 cols) */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 shadow-glass space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-navy-900 font-display">
              Milestone Submissions
            </h2>
            <span className="text-xs font-semibold text-slate-500">3-Stage Escrow Release</span>
          </div>

          <div className="space-y-4">
            
            {/* M1 – Deployment & Baseline */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-xs font-bold text-navy-900">M1 – Deployment & Baseline</h3>
                </div>
                <StatusBadge label="Completed & Paid" variant="emerald" size="sm" />
              </div>

              <div className="text-xs text-slate-600 pl-7 space-y-1 font-medium">
                <p>• Sensor deployment report (320 nodes)</p>
                <p>• Baseline water loss data (Pune Zone A)</p>
                <p>• Integration certificate with SCADA</p>
              </div>

              <div className="pt-2 pl-7 border-t border-emerald-200/60 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Evidence Uploaded: <strong className="text-navy-900">3 files</strong></span>
                <span className="text-emerald-800 font-bold">Approved on 30 Oct 2026</span>
              </div>
            </div>

            {/* M2 – 3-month Performance Review */}
            <div className="p-5 rounded-2xl bg-white border border-brand-royal/60 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-brand-royal" />
                  <h3 className="text-xs font-bold text-navy-900">M2 – 3-Month Performance Review</h3>
                </div>
                <StatusBadge label="Due in 5 days" variant="amber" size="sm" />
              </div>

              <div className="text-xs text-slate-700 pl-7 space-y-1 font-medium">
                <p className="micro-label text-slate-400 block mb-1">Required Evidence Checklist:</p>
                <p>1. Performance dashboard export (last 90 days)</p>
                <p>2. Verified leak report vs alerts (38 leaks resolved)</p>
                <p>3. Third-party validation note</p>
              </div>

              {/* Upload Drag & Drop Area */}
              <div
                onClick={() => setIsUploadModalOpen(true)}
                className="mt-2 pl-7 p-4 rounded-2xl bg-brand-sky-light/50 border border-dashed border-brand-royal hover:bg-brand-sky-light/80 transition-colors cursor-pointer text-center space-y-1"
              >
                <Upload className="w-5 h-5 text-brand-royal mx-auto" />
                <p className="text-xs font-bold text-navy-900">Click to Upload Milestone Evidence</p>
                <p className="text-[10px] text-slate-500">Attach telemetry export PDF, leak logs, and verification reports</p>
              </div>

              <div className="pt-2 pl-7 flex items-center justify-between text-xs">
                <span className="font-extrabold text-brand-royal text-sm">INR 14.0 Lakhs (40%)</span>
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(true)}
                  className="px-5 py-2 rounded-full bg-brand-royal hover:bg-brand-cobalt text-white font-bold text-xs shadow-action flex items-center gap-1.5 transition-all hover:scale-[1.02]"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Submit for Validation</span>
                </button>
              </div>
            </div>

            {/* M3 – Final Validation & Handover */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-500 font-bold text-xs flex items-center justify-center">3</span>
                  <h3 className="text-xs font-bold text-slate-500">M3 – Final Validation & Handover</h3>
                </div>
                <StatusBadge label="Not Started" variant="slate" size="sm" />
              </div>
              <p className="text-xs text-slate-500 pl-7">
                Final KPI validation, handover documentation, and scale recommendation for state-wide GeM listing.
              </p>
            </div>

          </div>
        </div>

        {/* Right: GeM Onboarding for Scale (5 cols) */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 shadow-glass space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 mb-1">
                <ShoppingBag className="w-4 h-4 text-brand-royal" />
                <span className="micro-label text-brand-cobalt">Statewide Procurement Gate</span>
              </div>
              <h2 className="text-base font-bold text-navy-900 font-display">
                GeM Onboarding for Scale
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Prepare your product listing for GeM to enable scale-up across departments.
              </p>
            </div>

            {/* 4 Steps */}
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-bold text-emerald-900">1. Create GeM Seller Account</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-full">Linked</span>
              </div>

              <div className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                gemStep >= 2 ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center gap-2.5">
                  {gemStep >= 2 ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Clock className="w-4 h-4 text-slate-400" />}
                  <span className="font-bold text-navy-900">2. Map Product/Service Category</span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500">Smart Water IoT</span>
              </div>

              <div className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                gemStep >= 3 ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center gap-2.5">
                  {gemStep >= 3 ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Clock className="w-4 h-4 text-slate-400" />}
                  <span className="font-bold text-navy-900">3. Link Pilot Performance Evidence</span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500">Pune MC Pilot</span>
              </div>

              <div className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                gemStep >= 4 ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center gap-2.5">
                  {gemStep >= 4 ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Clock className="w-4 h-4 text-slate-400" />}
                  <span className="font-bold text-navy-900">4. Publish Listing</span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500">Standing Contract</span>
              </div>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="button"
              onClick={handleAdvanceGeM}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-brand-royal via-blue-600 to-brand-cobalt text-white font-bold text-xs shadow-action flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>{gemStep >= 4 ? 'GeM Seller ID Active (GEM-VEND-MH-882194)' : 'Start GeM Onboarding'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Deliverable Evidence Upload Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Submit Evidence — Milestone M2 (3-Month Performance Review)"
        subtitle="Upload validated 90-day telemetry reports and leak resolution evidence"
        maxWidth="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="micro-label block mb-1">Performance Dashboard Export URL</label>
            <input
              type="text"
              value={proofUrl}
              onChange={(e) => setProofUrl(e.target.value)}
              className="w-full p-3 rounded-xl bg-white border border-slate-200 text-xs font-mono text-navy-900 outline-none focus:border-brand-royal"
            />
          </div>

          <div>
            <label className="micro-label block mb-1">Evidence & Verification Notes</label>
            <textarea
              rows={3}
              value={proofNotes}
              onChange={(e) => setProofNotes(e.target.value)}
              className="w-full p-3 rounded-xl bg-white border border-slate-200 text-xs font-medium text-navy-900 outline-none focus:border-brand-royal"
            />
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
            <span className="font-bold text-navy-900">Attached Files:</span>
            <div className="flex items-center gap-2 text-[11px] text-slate-600">
              <Paperclip className="w-3.5 h-3.5 text-brand-royal" />
              <span>pune_zone_a_90days_telemetry_audit.pdf (2.4 MB)</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-600">
              <Paperclip className="w-3.5 h-3.5 text-brand-royal" />
              <span>verified_leak_logs_38leaks.csv (140 KB)</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(false)}
              className="px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleUploadM2}
              className="px-7 py-2.5 rounded-full bg-brand-royal hover:bg-brand-cobalt text-white font-bold text-xs shadow-action flex items-center gap-1.5 transition-all hover:scale-[1.02]"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Submit for Validation</span>
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
