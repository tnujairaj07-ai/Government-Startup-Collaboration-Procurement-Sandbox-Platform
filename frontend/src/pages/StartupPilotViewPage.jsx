import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FlaskConical, Upload, CheckCircle2, FileText, Lock, ArrowRight } from 'lucide-react';

export default function StartupPilotViewPage() {
  const { activePilot, showToast, setCurrentView } = useApp();

  const [milestoneNotes, setMilestoneNotes] = useState('');
  const [deliverableUrl, setDeliverableUrl] = useState('https://github.com/routeai/municipal-route-edge');

  const handleSubmitDeliverable = (e) => {
    e.preventDefault();
    showToast('Milestone deliverable submitted for Government Technical Sign-off!', 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="modern-card p-6 bg-gradient-to-r from-blue-900 via-slate-900 to-blue-950 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase">
            ACTIVE SANDBOX WORKBENCH
          </span>
          <h1 className="text-xl font-black mt-1">{activePilot.challenge_title}</h1>
          <p className="text-xs text-slate-300">
            Day {activePilot.current_day} of {activePilot.total_days} • Telemetry Stream: <strong className="text-emerald-400">Live Active (12,340 records)</strong>
          </p>
        </div>

        <button
          onClick={() => setCurrentView('procurement')}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 transition flex items-center space-x-2"
        >
          <span>GeM Direct Scale-Up Gateway &rarr;</span>
        </button>
      </div>

      {/* Live Read-Only Verified Metrics */}
      <div className="modern-card p-6 bg-white space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Government-Verified Live KPI Telemetry</h3>
            <p className="text-xs text-slate-500">Live metrics are validated against raw data ingest and cannot be tampered with</p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Current: 18% Missed (Target Met 🟢)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Pre-Pilot Baseline</span>
            <p className="text-2xl font-black text-slate-800 mt-1">30%</p>
          </div>
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
            <span className="text-[10px] text-emerald-700 uppercase font-semibold">Current Verified Result</span>
            <p className="text-2xl font-black text-emerald-700 mt-1">18% (-28%)</p>
          </div>
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
            <span className="text-[10px] text-blue-700 uppercase font-semibold">Contractual Target</span>
            <p className="text-2xl font-black text-blue-800 mt-1">≤ 20%</p>
          </div>
        </div>
      </div>

      {/* Deliverable Submission Box */}
      <div className="modern-card p-6 bg-white space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Submit Milestone 2 Deliverables & Edge Firmware</h3>

        <form onSubmit={handleSubmitDeliverable} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Code Repository / Firmware Package URL *</label>
            <input
              type="url"
              required
              value={deliverableUrl}
              onChange={(e) => setDeliverableUrl(e.target.value)}
              className="w-full text-xs border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Deliverable Notes & Testbench Log Summary</label>
            <textarea
              rows={3}
              value={milestoneNotes}
              onChange={(e) => setMilestoneNotes(e.target.value)}
              placeholder="Provide summary of ward test deployment, hardware uptime, and error rate..."
              className="w-full text-xs border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>Submit Deliverable Package</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
