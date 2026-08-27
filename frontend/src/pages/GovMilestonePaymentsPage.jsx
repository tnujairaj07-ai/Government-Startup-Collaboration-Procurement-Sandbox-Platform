import React from 'react';
import { useApp } from '../context/AppContext';
import { CreditCard, CheckCircle2, Clock, Lock, ArrowRight, ShieldCheck, Download } from 'lucide-react';

export default function GovMilestonePaymentsPage() {
  const { activePilot, showToast } = useApp();

  const totalBudget = activePilot.milestones.reduce((acc, curr) => acc + curr.amount_inr, 0);
  const totalDisbursed = activePilot.milestones.filter(m => m.released).reduce((acc, curr) => acc + curr.amount_inr, 0);

  const handleDisburseMilestone = (milestoneId) => {
    showToast(`PFMS Escrow tranche for ${milestoneId} released to ${activePilot.startup_name}!`, 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
            <CreditCard className="w-5 h-5 text-blue-600" />
            <span>Milestone Escrow & Treasury Disbursements</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Phased PFMS escrow releases tied strictly to quantitative technical deliverable sign-offs and validator certifications.
          </p>
        </div>

        <button
          onClick={() => showToast('Full Escrow Ledger PDF exported!', 'info')}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition"
        >
          <Download className="w-4 h-4" />
          <span>Export Escrow Statement</span>
        </button>
      </div>

      {/* Escrow Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="modern-card p-5 bg-white space-y-1 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total Pilot Grant</span>
          <p className="text-3xl font-black text-slate-900">₹{(totalBudget / 100000).toFixed(1)} Lakh</p>
          <span className="text-[10px] text-slate-500">Committed in Treasury Escrow</span>
        </div>

        <div className="modern-card p-5 bg-white space-y-1 text-center">
          <span className="text-[10px] font-bold text-emerald-700 uppercase">Released to Startup</span>
          <p className="text-3xl font-black text-emerald-600">₹{(totalDisbursed / 100000).toFixed(1)} Lakh</p>
          <span className="text-[10px] text-emerald-700 font-bold">2 / 4 Milestones Cleared</span>
        </div>

        <div className="modern-card p-5 bg-white space-y-1 text-center">
          <span className="text-[10px] font-bold text-amber-700 uppercase">Escrow Locked</span>
          <p className="text-3xl font-black text-amber-600">₹{((totalBudget - totalDisbursed) / 100000).toFixed(1)} Lakh</p>
          <span className="text-[10px] text-slate-500">Pending Final Verification</span>
        </div>
      </div>

      {/* Milestone Tranches Table */}
      <div className="modern-card p-6 bg-white space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Binding Tranche Disbursement Schedule</h3>

        <div className="space-y-3">
          {activePilot.milestones.map((m, idx) => (
            <div
              key={m.id}
              className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                m.released ? 'bg-emerald-50/40 border-emerald-200' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                  m.released ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-700'
                }`}>
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{m.title}</h4>
                  <p className="text-[11px] text-slate-500">Target Timeline: {m.date} • Beneficiary: <strong>{activePilot.startup_name}</strong></p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-black text-slate-900">₹{(m.amount_inr / 100000).toFixed(2)} Lakh</p>
                  <span className={`text-[10px] font-bold ${m.released ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {m.status}
                  </span>
                </div>

                {!m.released && (
                  <button
                    onClick={() => handleDisburseMilestone(m.id)}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition"
                  >
                    Release Escrow
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
