import React from 'react';
import { useApp } from '../context/AppContext';
import SegmentedSeverityMeter from '../components/common/SegmentedSeverityMeter';
import { AlertTriangle, ShieldAlert, CheckCircle2, ArrowLeft, Clock, UserCheck } from 'lucide-react';

export default function GovAnomalyCenterPage() {
  const { activePilot, setCurrentView, showToast } = useApp();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentView('pilots')}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>Anti-Fraud & Data Integrity Anomaly Center</span>
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 ml-6">
            Real-time automated fraud detection flagging duplicate telemetry, late uploads, and metric deviations.
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          All Active Alerts Reconciled 🟢
        </span>
      </div>

      {/* Anomaly Alerts List */}
      <div className="space-y-4">
        {activePilot.anomalies.map((alt) => (
          <div key={alt.id} className="modern-card p-6 bg-white space-y-4 border-l-4 border-l-amber-500">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-white">{alt.id}</span>
                  <h3 className="text-sm font-black text-slate-900">{alt.title}</h3>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {alt.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 flex items-center space-x-1 mt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Flagged: {alt.timestamp}</span>
                </p>
              </div>

              {/* Discrete 10-bar Severity Meter (Image 2 Ref) */}
              <div className="w-48">
                <SegmentedSeverityMeter
                  value={alt.severity_score}
                  label={`Severity: ${alt.severity}`}
                  type={alt.severity === 'Medium' ? 'amber' : 'blue'}
                />
              </div>
            </div>

            {/* Drilldown Details */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 text-slate-700">
              <p className="leading-relaxed"><span className="font-bold text-slate-900">Investigation Resolution:</span> {alt.details}</p>
              <div className="flex items-center space-x-2 text-[11px] text-emerald-700 font-semibold pt-1 border-t border-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Audited & Cleared by Municipal Telemetry Inspector</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
