import React from 'react';
import { useApp } from '../context/AppContext';
import { LayoutDashboard, Users, FlaskConical, Award, ShieldCheck, TrendingUp, BarChart3 } from 'lucide-react';

export default function AdminDashboardPage() {
  const { setCurrentView } = useApp();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="modern-card p-6 bg-gradient-to-r from-purple-900 via-slate-900 to-indigo-950 text-white space-y-2">
        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase">
          STATE POLICY OVERSIGHT
        </span>
        <h1 className="text-xl font-black">Maharashtra State Innovation Sandbox Oversight</h1>
        <p className="text-xs text-slate-300">
          Executive dashboard tracking statewide public innovation challenges, pilot turnaround velocity, and GeM procurement scaling.
        </p>
      </div>

      {/* Aggregate KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="modern-card p-5 bg-white space-y-1 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total Challenges</span>
          <p className="text-3xl font-black text-slate-900">84</p>
          <span className="text-[10px] text-slate-500">Across 18 Ministries</span>
        </div>

        <div className="modern-card p-5 bg-white space-y-1 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Empanelled Startups</span>
          <p className="text-3xl font-black text-blue-600">2,481</p>
          <span className="text-[10px] text-emerald-600 font-bold">100% DPIIT Verified</span>
        </div>

        <div className="modern-card p-5 bg-white space-y-1 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Active State Pilots</span>
          <p className="text-3xl font-black text-purple-700">37</p>
          <span className="text-[10px] text-slate-500">Avg Duration: 71 Days</span>
        </div>

        <div className="modern-card p-5 bg-white space-y-1 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Scaled Solutions</span>
          <p className="text-3xl font-black text-emerald-600">9 PAC</p>
          <span className="text-[10px] text-emerald-700 font-bold">₹28.4 Cr Procured</span>
        </div>
      </div>

      {/* Quick Access Policy Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          onClick={() => setCurrentView('analytics')}
          className="modern-card p-6 bg-white hover:border-purple-400 cursor-pointer transition space-y-2"
        >
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            <h3 className="text-sm font-bold text-slate-900">Statewide Demand vs Supply Heatmap</h3>
          </div>
          <p className="text-xs text-slate-500">
            Identify high-priority public sector gaps where municipal demand exceeds qualified deep-tech startup availability.
          </p>
        </div>

        <div
          onClick={() => setCurrentView('evidence')}
          className="modern-card p-6 bg-white hover:border-blue-400 cursor-pointer transition space-y-2"
        >
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">State Verification & Claims Queue</h3>
          </div>
          <p className="text-xs text-slate-500">
            Review pending startup DPIIT, CERT-In, and municipal past project verification requests.
          </p>
        </div>
      </div>
    </div>
  );
}
