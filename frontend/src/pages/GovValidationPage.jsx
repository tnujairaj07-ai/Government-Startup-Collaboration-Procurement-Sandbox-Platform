import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, ShieldCheck, Award, ArrowRight, TrendingUp } from 'lucide-react';

export default function GovValidationPage() {
  const { activePilot, setCurrentView, showToast } = useApp();

  const handleApproveScaleReview = () => {
    showToast('Scale Review Approved! Transitioning to Scale Simulator.', 'success');
    setCurrentView('scale');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Pilot Outcome & Quantitative Validation</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Formal validation of pilot KPI attainment, data integrity audits, and independent scientific certification.
          </p>
        </div>

        <button
          onClick={handleApproveScaleReview}
          className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition"
        >
          <span>Approve Scale Review &rarr;</span>
        </button>
      </div>

      {/* Validation Scorecard Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="modern-card p-5 bg-white space-y-1 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase">KPI Achievement Rate</span>
          <p className="text-3xl font-black text-emerald-600">92%</p>
          <span className="text-[10px] font-semibold text-emerald-700">28% Drop vs. 20% Goal</span>
        </div>

        <div className="modern-card p-5 bg-white space-y-1 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Data Integrity Check</span>
          <p className="text-xl font-black text-emerald-700 mt-1 flex items-center justify-center space-x-1">
            <CheckCircle2 className="w-5 h-5" />
            <span>Passed</span>
          </p>
          <span className="text-[10px] text-slate-500">0 Unaddressed Anomalies</span>
        </div>

        <div className="modern-card p-5 bg-white space-y-1 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Security Review</span>
          <p className="text-xl font-black text-emerald-700 mt-1 flex items-center justify-center space-x-1">
            <ShieldCheck className="w-5 h-5" />
            <span>Tier-1 Cleared</span>
          </p>
          <span className="text-[10px] text-slate-500">CERT-In & DPDP Compliant</span>
        </div>

        <div className="modern-card p-5 bg-white space-y-1 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Scientific Validator</span>
          <p className="text-xs font-bold text-slate-900 mt-2">Dr. V. K. Saraswat</p>
          <span className="text-[10px] font-bold text-blue-600">Verified: 26 Aug 2026</span>
        </div>
      </div>

      {/* Validation Summary Card */}
      <div className="modern-card p-8 bg-gradient-to-r from-emerald-50 via-teal-50/50 to-emerald-50 border border-emerald-200 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-3xl mx-auto shadow-lg shadow-emerald-600/30">
          ✅
        </div>

        <div className="space-y-1 max-w-xl mx-auto">
          <h2 className="text-xl font-black text-emerald-950">PILOT FORMALLY VERIFIED & VALIDATED</h2>
          <p className="text-xs text-emerald-900 leading-relaxed">
            The pilot conducted by <strong>{activePilot.startup_name}</strong> has quantitatively exceeded the contractual KPI threshold across all 3 municipal wards with verified data integrity.
          </p>
        </div>

        <div className="pt-2 flex justify-center">
          <button
            onClick={handleApproveScaleReview}
            className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition flex items-center space-x-2"
          >
            <span>Launch Scale Simulator & Decision Gate</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
