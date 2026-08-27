import React from 'react';
import { useApp } from '../context/AppContext';
import { Layers, CheckCircle2, ArrowRight, ShieldCheck, FileText, ShoppingCart } from 'lucide-react';

export default function GovDecisionPage() {
  const { activePilot, setCurrentView, showToast } = useApp();

  const handleApproveScale = () => {
    showToast('Executive Order signed! Approved for GeM PAC Direct Procurement.', 'success');
    setCurrentView('procurement');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Giant Status Banner */}
      <div className="modern-card p-8 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white text-center rounded-2xl shadow-xl shadow-emerald-600/20 space-y-3">
        <span className="px-3.5 py-1 rounded-full text-xs font-black bg-white/20 text-white uppercase tracking-widest border border-white/30">
          OFFICIAL GOVERNANCE GATE 08
        </span>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">🟢 SCALE RECOMMENDED</h1>
        <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl mx-auto leading-relaxed">
          The solution presented by <strong>{activePilot.startup_name}</strong> has quantitatively satisfied all technical, economic, cybersecurity, and data integrity gates required for state-wide deployment.
        </p>
      </div>

      {/* Comprehensive Gate Checklist */}
      <div className="modern-card p-6 bg-white space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Governance Decision Gate Checklist</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between">
            <span className="font-semibold text-emerald-950">1. Problem Outcome Benchmark</span>
            <span className="font-bold text-emerald-700 flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Achieved (-28%)</span>
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between">
            <span className="font-semibold text-emerald-950">2. Technical & Algorithmic Performance</span>
            <span className="font-bold text-emerald-700 flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Exceeded</span>
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between">
            <span className="font-semibold text-emerald-950">3. Cybersecurity & DPDP SLA</span>
            <span className="font-bold text-emerald-700 flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>CERT-In Tier 1 Cleared</span>
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between">
            <span className="font-semibold text-emerald-950">4. Multi-Source Data Integrity</span>
            <span className="font-bold text-emerald-700 flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>100% Verified</span>
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between">
            <span className="font-semibold text-emerald-950">5. Independent Scientific Validation</span>
            <span className="font-bold text-emerald-700 flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Signed & Sealed</span>
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between">
            <span className="font-semibold text-emerald-950">6. Economic Feasibility & ROI</span>
            <span className="font-bold text-emerald-700 flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Positive (18 Mo. Payback)</span>
            </span>
          </div>
        </div>

        {/* Action Decision Options */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Nodal Sign-off: <strong>Municipal Commissioner, MCBM</strong>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={() => showToast('Requested supplementary 30-day pilot tranche', 'info')}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              Request Re-Pilot
            </button>

            <button
              onClick={handleApproveScale}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Authorize Scale & Open GeM Gateway</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
