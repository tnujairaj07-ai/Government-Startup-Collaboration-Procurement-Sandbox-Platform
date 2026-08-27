import React from 'react';
import { useApp } from '../context/AppContext';
import { CreditCard, CheckCircle2, Clock, Lock, Download } from 'lucide-react';

export default function StartupPaymentsPage() {
  const { activePilot, showToast } = useApp();

  const totalContract = activePilot.milestones.reduce((acc, curr) => acc + curr.amount_inr, 0);
  const released = activePilot.milestones.filter(m => m.released).reduce((acc, curr) => acc + curr.amount_inr, 0);
  const pending = totalContract - released;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
            <CreditCard className="w-5 h-5 text-emerald-600" />
            <span>Milestone Payments & Escrow Ledger</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent tracking of government treasury milestone escrow fund disbursements tied to technical deliverable sign-offs.
          </p>
        </div>

        <button
          onClick={() => showToast('Disbursement certificate downloaded!', 'info')}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition"
        >
          <Download className="w-4 h-4" />
          <span>Download Escrow Statement</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="modern-card p-5 bg-white space-y-1 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total Contract Value</span>
          <p className="text-3xl font-black text-slate-900">₹{(totalContract / 100000).toFixed(1)} Lakh</p>
          <span className="text-[10px] text-slate-500">Committed in PFMS Escrow</span>
        </div>

        <div className="modern-card p-5 bg-white space-y-1 text-center">
          <span className="text-[10px] font-bold text-emerald-700 uppercase">Disbursed to Bank</span>
          <p className="text-3xl font-black text-emerald-600">₹{(released / 100000).toFixed(1)} Lakh</p>
          <span className="text-[10px] text-emerald-700 font-bold">2 / 4 Milestones Disbursed</span>
        </div>

        <div className="modern-card p-5 bg-white space-y-1 text-center">
          <span className="text-[10px] font-bold text-amber-700 uppercase">Pending Validation</span>
          <p className="text-3xl font-black text-amber-600">₹{(pending / 100000).toFixed(1)} Lakh</p>
          <span className="text-[10px] text-slate-500">M3 & M4 Milestone Tranches</span>
        </div>
      </div>

      {/* Tranche Ledger */}
      <div className="modern-card p-6 bg-white space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Milestone Payment Tranches</h3>

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
                  <p className="text-[11px] text-slate-500">Scheduled Date: {m.date} • Beneficiary Account: <strong>RouteAI HDFC Bank (Verified)</strong></p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-black text-slate-900">₹{(m.amount_inr / 100000).toFixed(2)} Lakh</p>
                <span className={`text-[10px] font-bold ${m.released ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {m.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
