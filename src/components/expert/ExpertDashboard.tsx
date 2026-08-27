import React from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { 
  Award, ClipboardCheck, CheckCircle2, Clock, 
  ArrowUpRight, ChevronRight, FileText, Sparkles, UserCheck 
} from 'lucide-react';
import { MetricTile } from '../common/MetricTile';
import { StatusBadge } from '../common/StatusBadge';

export const ExpertDashboard: React.FC = () => {
  const { proposals, setActiveTab } = usePlatform();

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="micro-label text-slate-400">Technical Evaluation Panel</span>
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-display">
            Expert Reviewer Workspace
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Welcome, Dr. Meera Deshmukh – Chief Technical Evaluator (Urban Infrastructure & AI).
          </p>
        </div>

        <button
          onClick={() => setActiveTab('evaluation')}
          className="px-5 py-3 rounded-full bg-gradient-to-r from-purple-600 to-brand-royal text-white font-bold text-xs shadow-action flex items-center gap-2 transition-all hover:scale-[1.02]"
        >
          <ClipboardCheck className="w-4 h-4" />
          <span>Open Scoring Rubrics</span>
        </button>
      </div>

      {/* KPI Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricTile
          label="Assigned Proposals"
          value="3"
          subValue="2 evaluated, 1 in review"
          variant="gradient"
          timeframe="Urban & Water"
        />

        <MetricTile
          label="Average Score Awarded"
          value="92 / 100"
          subValue="5-Criteria Weighted Rubric"
          variant="white"
          timeframe="Panel Average"
        />

        <MetricTile
          label="Recommended for Pilot"
          value="2"
          subValue="AquaSense & CropCare"
          variant="white"
          timeframe="High TRL Startups"
        />
      </div>

      {/* Assigned Reviews Queue */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-glass space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-navy-900 font-display">
              Assigned Reviews Queue
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Evaluate technical proposals using structured 1–5 rubrics</p>
          </div>
          <span className="text-xs font-bold text-brand-royal">3 Proposals</span>
        </div>

        <div className="space-y-3">
          {proposals.map(prop => (
            <div
              key={prop.id}
              onClick={() => setActiveTab('evaluation')}
              className="p-4 rounded-2xl bg-white hover:bg-brand-sky-light/50 border border-slate-200/80 shadow-xs transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3.5">
                <img
                  src={prop.startupLogo}
                  alt={prop.startupName}
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shadow-sm shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-xs sm:text-sm text-navy-900 group-hover:text-brand-royal transition-colors">
                      {prop.startupName}
                    </h3>
                    <StatusBadge label="96% AI Fit" variant="violet" size="sm" />
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{prop.challengeTitle}</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Grant Request</span>
                  <span className="text-xs font-bold text-navy-900">{prop.requestedBudget}</span>
                </div>

                <button
                  type="button"
                  className="px-4 py-2 rounded-full bg-brand-sky-light group-hover:bg-brand-royal group-hover:text-white text-brand-cobalt font-bold text-xs transition-colors flex items-center gap-1"
                >
                  <span>Score Rubric</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
