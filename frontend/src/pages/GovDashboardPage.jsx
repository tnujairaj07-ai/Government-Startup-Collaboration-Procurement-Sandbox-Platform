import React from 'react';
import { useApp } from '../context/AppContext';
import GradientStatCard from '../components/common/GradientStatCard';
import { 
  Puzzle, 
  Rocket, 
  FlaskConical, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  Plus, 
  Clock, 
  AlertTriangle,
  ChevronRight,
  BarChart3
} from 'lucide-react';

export default function GovDashboardPage() {
  const { challenges, startups, activePilot, setCurrentView } = useApp();

  const funnelStages = [
    { label: 'Challenges', count: 24, color: 'bg-blue-600' },
    { label: 'Proposals', count: 438, color: 'bg-blue-500' },
    { label: 'Eligible', count: 221, color: 'bg-cyan-500' },
    { label: 'Shortlisted', count: 46, color: 'bg-teal-500' },
    { label: 'Active Pilots', count: 18, color: 'bg-emerald-500' },
    { label: 'Validated', count: 7, color: 'bg-emerald-600' },
    { label: 'Scale-Ready', count: 4, color: 'bg-purple-600' },
  ];

  const recentEvents = [
    { type: 'success', text: 'RouteAI Waste Routing Pilot validated — 28% efficiency gain', time: '10 mins ago', tag: 'Validation' },
    { type: 'warning', text: 'Logix Fleet telemetry integrity check pending review', time: '1 hour ago', tag: 'Evidence' },
    { type: 'info', text: 'New Challenge published: Hospital OPD Queue Optimization', time: '3 hours ago', tag: 'Challenge' },
    { type: 'alert', text: 'Anomaly #014 auto-reconciled on Ward 4 collection route', time: '5 hours ago', tag: 'Integrity' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner & Quick Post Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-black text-slate-900 tracking-tight">Government Innovation Command Center</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Live Operations
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time evidence tracking: From Municipal Challenges $\rightarrow$ Controlled Pilots $\rightarrow$ Direct PAC Scaling.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setCurrentView('challenges')}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Challenge</span>
          </button>
        </div>
      </div>

      {/* Hero Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Luminous Highlight Card (Image 2 Ref) */}
        <GradientStatCard
          title="OVERALL PILOT EFFICIENCY GAIN"
          value="43%"
          subtitle="Validated vs. Pre-Pilot Baselines"
          trend="+28% Efficiency"
          icon={TrendingUp}
        />

        {/* Regular Stat Card 1 */}
        <div className="modern-card p-6 flex flex-col justify-between bg-white">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">ACTIVE PILOTS</span>
              <h3 className="text-3xl font-black text-slate-900 mt-1">18 <span className="text-sm font-semibold text-slate-400">Live</span></h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
              <FlaskConical className="w-5 h-5" />
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Average Pilot Duration: <strong>60 Days</strong></span>
            <span className="text-emerald-600 font-bold">68% Success Rate</span>
          </div>
        </div>

        {/* Regular Stat Card 2 */}
        <div className="modern-card p-6 flex flex-col justify-between bg-white">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">SCALE-READY SOLUTIONS</span>
              <h3 className="text-3xl font-black text-purple-700 mt-1">4 <span className="text-sm font-semibold text-slate-400">PAC Ready</span></h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>GeM Fast-Track Eligible</span>
            <span className="text-purple-600 font-bold">₹14.8 Cr Potential</span>
          </div>
        </div>
      </div>

      {/* Visual Innovation Pipeline Funnel */}
      <div className="modern-card p-6 bg-white space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Innovation Procurement Funnel</h3>
            <p className="text-xs text-slate-500">End-to-end conversion efficiency across governance decision gates</p>
          </div>
          <button
            onClick={() => setCurrentView('scale')}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
          >
            <span>Open Scale Simulator</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Funnel Bars */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {funnelStages.map((st, i) => (
            <div key={st.label} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-center relative overflow-hidden space-y-1">
              <div className={`h-1 w-full absolute top-0 left-0 ${st.color}`} />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{st.label}</span>
              <p className="text-xl font-black text-slate-900">{st.count}</p>
              <span className="text-[9px] text-slate-400">Step {i + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Split-View: Active Challenges & Live Event Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Active Challenges */}
        <div className="lg:col-span-2 space-y-4">
          <div className="modern-card p-6 bg-white space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Active Government Challenges</h3>
                <p className="text-xs text-slate-500">Problems actively matched with verified deep-tech startups</p>
              </div>
              <button
                onClick={() => setCurrentView('challenges')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                View All (24) &rarr;
              </button>
            </div>

            <div className="space-y-3">
              {challenges.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setCurrentView('pilots')}
                  className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 bg-white hover:bg-blue-50/20 cursor-pointer transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">{c.id}</span>
                      <h4 className="text-sm font-bold text-slate-900 hover:text-blue-600 transition">{c.title}</h4>
                    </div>
                    <p className="text-xs text-slate-500">
                      {c.department} • <strong className="text-blue-700">{c.matched_startups_count} Matched Startups</strong>
                    </p>
                    <div className="flex items-center space-x-3 text-[11px] text-slate-600 pt-1">
                      <span>Baseline: <strong>{c.baseline}</strong></span>
                      <span>•</span>
                      <span>Target: <strong className="text-emerald-700">{c.target}</strong></span>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-1">
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                      {c.status}
                    </span>
                    <span className="text-[10px] text-slate-400">{c.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Live Activity Stream */}
        <div className="space-y-4">
          <div className="modern-card p-6 bg-white space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Evidence Stream (Today)</span>
            </h3>

            <div className="space-y-3">
              {recentEvents.map((ev, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50/80 border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded ${
                      ev.type === 'success' ? 'bg-emerald-100 text-emerald-800' :
                      ev.type === 'warning' ? 'bg-amber-100 text-amber-800' :
                      ev.type === 'alert' ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {ev.tag}
                    </span>
                    <span className="text-[10px] text-slate-400">{ev.time}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-800 leading-snug">{ev.text}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setCurrentView('data')}
              className="w-full py-2 rounded-xl text-xs font-bold text-blue-600 hover:bg-blue-50 border border-blue-200 transition"
            >
              Open Full Audit Log &rarr;
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
