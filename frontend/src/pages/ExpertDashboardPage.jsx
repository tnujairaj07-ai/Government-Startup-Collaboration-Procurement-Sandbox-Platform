import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, ShieldCheck, CheckCircle2, Clock, ArrowRight, FileText } from 'lucide-react';

export default function ExpertDashboardPage() {
  const { setCurrentView } = useApp();

  const assignedTasks = [
    {
      id: "EVAL-101",
      title: "Smart Waste Collection & Route Optimization",
      startup: "RouteAI Systems",
      type: "7-Factor Proposal Evaluation",
      deadline: "Today, 18:00 IST",
      status: "Score Recorded (90/100)",
      status_color: "emerald",
      actionView: "evaluations"
    },
    {
      id: "VAL-201",
      title: "60-Day Pilot Quantitative KPI Audit",
      startup: "RouteAI Systems",
      type: "Independent Pilot Validation",
      deadline: "28 Aug 2026",
      status: "Ready for Validation Stamp",
      status_color: "blue",
      actionView: "validation"
    },
    {
      id: "EVAL-102",
      title: "Hospital OPD Queue Optimization",
      startup: "QueueAI Systems",
      type: "Computer Vision Architecture Review",
      deadline: "30 Aug 2026",
      status: "Pending Review",
      status_color: "amber",
      actionView: "evaluations"
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="modern-card p-6 bg-gradient-to-r from-amber-600 via-slate-900 to-amber-700 text-white space-y-2">
        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
          INDEPENDENT SCIENTIFIC VALIDATION PORTAL
        </span>
        <h1 className="text-xl font-black">Welcome, Dr. V. K. Saraswat (Lead Scientific Advisor)</h1>
        <p className="text-xs text-slate-300">
          Conduct unbiased 7-criteria technical reviews, verify evidence documentation, and mathematically validate pilot outcomes.
        </p>
      </div>

      {/* Aggregate Task Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="modern-card p-5 bg-white space-y-1 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Assigned Evaluations</span>
          <p className="text-3xl font-black text-blue-600">8</p>
          <span className="text-[10px] text-slate-500">Public Challenges</span>
        </div>

        <div className="modern-card p-5 bg-white space-y-1 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Pilot Validations</span>
          <p className="text-3xl font-black text-purple-700">3</p>
          <span className="text-[10px] text-slate-500">Quantitative Benchmarks</span>
        </div>

        <div className="modern-card p-5 bg-white space-y-1 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Evidence Reviews</span>
          <p className="text-3xl font-black text-amber-600">6</p>
          <span className="text-[10px] text-slate-500">Security & DPDP Audits</span>
        </div>

        <div className="modern-card p-5 bg-white space-y-1 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Completed Audits</span>
          <p className="text-3xl font-black text-emerald-600">42</p>
          <span className="text-[10px] text-emerald-700 font-bold">100% On-Time SLA</span>
        </div>
      </div>

      {/* Assigned Tasks Work Queue */}
      <div className="modern-card p-6 bg-white space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Assigned Scientific Evaluations & Validation Queue</h3>

        <div className="space-y-3">
          {assignedTasks.map((t) => (
            <div
              key={t.id}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-amber-400 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">{t.id}</span>
                  <h4 className="font-bold text-slate-900">{t.title}</h4>
                </div>
                <p className="text-slate-500">Startup: <strong className="text-blue-700">{t.startup}</strong> • Task: {t.type}</p>
                <p className="text-[10px] text-slate-400">Deadline: {t.deadline}</p>
              </div>

              <div className="flex items-center space-x-3">
                <span className={`px-2.5 py-1 rounded-full font-bold ${
                  t.status_color === 'emerald' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                  t.status_color === 'blue' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                  'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {t.status}
                </span>

                <button
                  onClick={() => setCurrentView(t.actionView)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs transition flex items-center space-x-1"
                >
                  <span>Open Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
