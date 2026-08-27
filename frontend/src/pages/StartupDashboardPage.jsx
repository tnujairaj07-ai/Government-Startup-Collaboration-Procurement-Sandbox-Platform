import React from 'react';
import { useApp } from '../context/AppContext';
import RadialReadinessDial from '../components/common/RadialReadinessDial';
import { Rocket, ShieldCheck, Award, ArrowRight, Puzzle, CheckCircle2, Clock } from 'lucide-react';

export default function StartupDashboardPage() {
  const { challenges, setCurrentView, currentStartup } = useApp();

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="modern-card p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase">
            FOUNDER WORKSPACE
          </span>
          <h1 className="text-xl font-black mt-1">Welcome back, {currentStartup.name}</h1>
          <p className="text-xs text-slate-300">
            DPIIT Verified DeepTech Innovator • <strong className="text-cyan-400">Maharashtra Sandbox Empanelled</strong>
          </p>
        </div>

        <button
          onClick={() => setCurrentView('passport')}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition flex items-center space-x-2"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Manage Evidence Passport</span>
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="modern-card p-5 bg-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Evidence Score</span>
            <p className="text-2xl font-black text-blue-600">{currentStartup.evidence_confidence}/100</p>
            <span className="text-[10px] text-emerald-600 font-bold">Verified Trust Ledger</span>
          </div>
          <RadialReadinessDial score={currentStartup.evidence_confidence} size={70} />
        </div>

        <div className="modern-card p-5 bg-white space-y-1 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Active Gov Pilots</span>
          <p className="text-2xl font-black text-emerald-600">1 Live</p>
          <span className="text-[10px] text-slate-500">MCBM Waste Routing</span>
        </div>

        <div className="modern-card p-5 bg-white space-y-1 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Verified Projects</span>
          <p className="text-2xl font-black text-slate-800">4 / 4</p>
          <span className="text-[10px] text-slate-500">100% Audit Verified</span>
        </div>

        <div className="modern-card p-5 bg-white space-y-1 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase">GeM PAC Scaling</span>
          <p className="text-2xl font-black text-purple-700">Eligible</p>
          <span className="text-[10px] text-purple-600 font-bold">Exemptions Active</span>
        </div>
      </div>

      {/* Recommended Government Challenges */}
      <div className="modern-card p-6 bg-white space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Recommended Public Challenges for Your Capabilities</h3>
            <p className="text-xs text-slate-500">Government opportunities matching your verified AI & sensor capabilities</p>
          </div>
        </div>

        <div className="space-y-3">
          {challenges.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 bg-white transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">{c.sector}</span>
                  <h4 className="text-sm font-bold text-slate-900">{c.title}</h4>
                </div>
                <p className="text-xs text-slate-500">{c.department} • Grant: ₹{(c.budget_inr / 100000).toFixed(1)} Lakh</p>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  92% Match
                </span>
                <button
                  onClick={() => setCurrentView('workspace')}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition"
                >
                  Enter Workspace
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
