import React from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { 
  Layers, CheckCircle2, Clock, Check, 
  Sparkles, FileText, ArrowRight, ExternalLink 
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const ApplicationTracker: React.FC = () => {
  const { setActiveTab } = usePlatform();

  const stages = [
    { num: 1, title: 'Proposal Submitted', date: '10 Jun 2026', status: 'Completed' as const, note: 'Digital proposal receipt #RCP-88192 generated.' },
    { num: 2, title: 'Under Department Review', date: '15 Jun 2026', status: 'Completed' as const, note: 'Eligibility & DPIIT recognition verified.' },
    { num: 3, title: 'Shortlisted', date: '5 Jul 2026', status: 'Completed' as const, note: 'Top 3 startup solutions selected for technical panel.' },
    { num: 4, title: 'Expert Evaluation', date: '20 Jul 2026', status: 'Completed' as const, note: 'Technical scorecard 94/100 from Dr. Meera Deshmukh.' },
    { num: 5, title: 'Contract Approval', date: '10 Aug 2026', status: 'Completed' as const, note: 'Approved by Shri Rajesh Kumar, Secretary – Water Supply.' },
    { num: 6, title: 'Pilot Started', date: '1 Sep 2026', status: 'Completed' as const, note: 'Field sensor installation underway in Pune Zone A.' },
    { num: 7, title: 'Milestone M1 Completed', date: '30 Oct 2026', status: 'Completed' as const, note: '320 sensors calibrated & INR 10.5 Lakhs escrow paid.' },
    { num: 8, title: 'Milestone M2 In Progress', date: 'Due 15 Dec 2026', status: 'In Progress' as const, note: '90-day telemetry export & leak logs being validated.' },
    { num: 9, title: 'Final Validation', date: 'Pending', status: 'Pending' as const, note: 'Final KPI audit (≥20% NRW reduction).' },
    { num: 10, title: 'Scale Decision', date: 'Pending', status: 'Pending' as const, note: 'GeM state-wide fast-track standing rate contract.' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="micro-label text-slate-400">Application Lifecycle</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-display">
            Application Tracker
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Visual timeline of your proposals, reviews, pilots, and scale decisions.
          </p>
        </div>

        <StatusBadge label="Pilot Milestone M2 Live" variant="amber" size="md" icon="clock" />
      </div>

      {/* Proposal Summary Card */}
      <div className="glass-panel rounded-3xl p-6 shadow-glass flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="micro-label text-brand-royal block">Challenge Tracked</span>
          <h2 className="text-lg font-bold text-navy-900 font-display mt-0.5">
            AI-powered Water Leakage Detection for Urban Pipelines
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Maharashtra Water Supply & Sanitation Department • Solution: <strong className="text-navy-900">AquaMind Platform</strong>
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('execution')}
            className="px-5 py-2.5 rounded-full bg-brand-royal hover:bg-brand-cobalt text-white font-bold text-xs shadow-action flex items-center gap-1.5 transition-all"
          >
            <span>Open Active Pilot Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 10-Stage Granular Timeline */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-glass space-y-6">
        <h3 className="text-base font-bold text-navy-900 font-display pb-3 border-b border-slate-100">
          10-Stage Procurement & Pilot Progression
        </h3>

        <div className="space-y-4 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-200 before:z-0">
          {stages.map((stage) => {
            const isDone = stage.status === 'Completed';
            const isCurr = stage.status === 'In Progress';

            return (
              <div key={stage.num} className="relative z-10 flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                    isCurr
                      ? 'bg-amber-500 text-white shadow-action ring-4 ring-amber-100 scale-105 animate-pulse'
                      : isDone
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'bg-white text-slate-400 border border-slate-200'
                  }`}
                >
                  {isDone ? <Check className="w-5 h-5" /> : stage.num}
                </div>

                <div className={`flex-1 p-4 rounded-2xl border transition-all ${
                  isCurr
                    ? 'bg-amber-50/70 border-amber-200 shadow-xs'
                    : isDone
                    ? 'bg-white border-slate-200/80'
                    : 'bg-slate-50/60 border-slate-200/60 opacity-60'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h4 className="font-bold text-xs text-navy-900">{stage.title}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isCurr ? 'bg-amber-100 text-amber-800' : isDone ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {stage.date}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    {stage.note}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
