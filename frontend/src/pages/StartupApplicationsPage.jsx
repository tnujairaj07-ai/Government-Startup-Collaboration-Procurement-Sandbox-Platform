import React from 'react';
import { useApp } from '../context/AppContext';
import { FileText, CheckCircle2, AlertCircle, Clock, ChevronRight, ArrowRight } from 'lucide-react';

export default function StartupApplicationsPage() {
  const { applications, setCurrentView } = useApp();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="modern-card p-6 bg-white space-y-2">
        <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <span>Government Challenge Application Tracker</span>
        </h1>
        <p className="text-xs text-slate-500">
          Track stage progression, transparent evaluator feedback, and required deliverable actions across all your submitted proposals.
        </p>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {applications.map((app) => (
          <div key={app.id} className="modern-card p-6 bg-white space-y-4 hover:border-blue-400 transition">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">{app.id}</span>
                  <h3 className="text-sm font-bold text-slate-900">{app.challenge_title}</h3>
                </div>
                <p className="text-xs text-slate-500 mt-1">Stage: <strong className="text-blue-700">{app.stage}</strong> • Match Score: <strong>{app.match_score}%</strong></p>
              </div>

              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                app.status_type === 'emerald' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                app.status_type === 'purple' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                'bg-blue-50 text-blue-700 border border-blue-200'
              }`}>
                {app.status}
              </span>
            </div>

            {/* Evaluator Feedback Box */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-1">
              <span className="font-bold text-slate-900 block">Evaluator Synthesis & Feedback:</span>
              <p className="leading-relaxed">{app.feedback}</p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">Next Action: Submit Milestone 2 Telemetry</span>
              <button
                onClick={() => setCurrentView('workspace')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
              >
                <span>Open Project Workspace</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
