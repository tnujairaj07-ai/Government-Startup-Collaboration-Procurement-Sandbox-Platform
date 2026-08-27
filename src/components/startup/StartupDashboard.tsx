import React from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { 
  Rocket, Ticket, Upload, FileSignature, 
  ArrowUpRight, ChevronRight, FileText, CheckCircle2, Clock, Sparkles 
} from 'lucide-react';
import { MetricTile } from '../common/MetricTile';
import { StatusBadge } from '../common/StatusBadge';

export const StartupDashboard: React.FC = () => {
  const { currentStartup, setActiveTab } = usePlatform();

  const recentUpdates = [
    { text: 'Your proposal for ‘Smart Street Lighting’ is shortlisted.', time: 'Today', type: 'violet' as const },
    { text: 'Milestone M2 for ‘Water Leakage Pilot’ is due in 5 days.', time: '2h ago', type: 'warning' as const },
    { text: 'Invoice #INV-2026-042 for ‘CropCare AI’ has been paid.', time: 'Yesterday', type: 'success' as const },
  ];

  return (
    <div className="space-y-6">
      
      {/* Hero Founder Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              DPIIT Startup: {currentStartup.dpiitNumber}
            </span>
            <span className="text-xs text-slate-500 font-medium">Headquarters: {currentStartup.location}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight font-display">
            Founder Cockpit
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Track your challenges, proposals, pilots, and payments in one place.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0 relative z-10">
          <button
            type="button"
            onClick={() => setActiveTab('passport')}
            className="px-5 py-3 rounded-full bg-white hover:bg-slate-50 text-navy-900 font-bold text-xs border border-brand-sky shadow-xs flex items-center gap-2 transition-all hover:scale-[1.02]"
          >
            <Ticket className="w-4 h-4 text-brand-royal" />
            <span>Update Evidence Passport</span>
          </button>
          
          <button
            type="button"
            onClick={() => setActiveTab('challenges')}
            className="px-5 py-3 rounded-full bg-gradient-to-r from-brand-royal to-brand-cobalt text-white font-bold text-xs shadow-action flex items-center gap-2 transition-all hover:scale-[1.02]"
          >
            <Rocket className="w-4 h-4" />
            <span>Explore Challenges</span>
          </button>
        </div>
      </div>

      {/* KPI Cards (MetricTile) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricTile
          label="Active Proposals"
          value="4"
          subValue="2 under review, 1 shortlisted"
          variant="gradient"
          timeframe="Live Pipeline"
        />

        <MetricTile
          label="Pilots in Progress"
          value="2"
          subValue="1 due for milestone submission"
          variant="white"
          trend={{ direction: 'up', percentage: 'Pune Zone A', text: 'active' }}
          timeframe="Field Live"
        />

        <MetricTile
          label="Revenue from Gov Pilots (YTD)"
          value="INR 68 Lakhs"
          subValue="Invoices paid: 85%"
          variant="white"
          trend={{ direction: 'up', percentage: '85%', text: 'paid' }}
          timeframe="Escrow Released"
        />

        <MetricTile
          label="Solutions Scaled"
          value="1"
          subValue="Pune Zone A – Water Leakage"
          variant="white"
          trend={{ direction: 'up', percentage: 'GeM Ready', text: 'active' }}
          timeframe="Fast-Track Scale"
        />
      </div>

      {/* 2-Column: Recent Updates & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Recent Updates (7 cols) */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 shadow-glass space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-navy-900 font-display">
                Recent Updates
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Notices, milestone deadlines, and payment confirmations</p>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="space-y-3">
            {recentUpdates.map((update, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between gap-3 hover:bg-brand-sky-light/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    update.type === 'success' ? 'bg-emerald-50 text-emerald-600' :
                    update.type === 'warning' ? 'bg-amber-50 text-amber-600' : 'bg-purple-50 text-purple-600'
                  }`}>
                    {update.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> :
                     update.type === 'warning' ? <Clock className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-navy-900 leading-snug">{update.text}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{update.time}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Actions (5 cols) */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 shadow-glass flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h2 className="text-base font-bold text-navy-900 font-display">
                Quick Actions
              </h2>
              <span className="micro-label text-slate-400">Founder Tools</span>
            </div>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => setActiveTab('challenges')}
                className="w-full p-3 rounded-2xl bg-white hover:bg-brand-sky-light/70 border border-slate-200/80 text-navy-900 font-bold text-xs flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-brand-royal flex items-center justify-center">
                    <Rocket className="w-4 h-4" />
                  </div>
                  <span>Explore Challenges</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-royal transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('passport')}
                className="w-full p-3 rounded-2xl bg-white hover:bg-brand-sky-light/70 border border-slate-200/80 text-navy-900 font-bold text-xs flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Ticket className="w-4 h-4" />
                  </div>
                  <span>Update Evidence Passport</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-royal transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('execution')}
                className="w-full p-3 rounded-2xl bg-white hover:bg-brand-sky-light/70 border border-slate-200/80 text-navy-900 font-bold text-xs flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Upload className="w-4 h-4" />
                  </div>
                  <span>Submit Milestone (M2 Due)</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-royal transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('contracts')}
                className="w-full p-3 rounded-2xl bg-white hover:bg-brand-sky-light/70 border border-slate-200/80 text-navy-900 font-bold text-xs flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <FileSignature className="w-4 h-4" />
                  </div>
                  <span>View Contracts & Invoices</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-royal transition-transform" />
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs mt-4 text-emerald-900">
            <span className="font-bold">Active Pilot Status: </span>
            <span>Pune Zone A (Water Leakage) running with <strong className="text-emerald-700">18.4%</strong> verified reduction.</span>
          </div>
        </div>

      </div>

    </div>
  );
};
