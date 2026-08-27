import React from 'react';
import { useApp } from '../context/AppContext';
import RadialReadinessDial from '../components/common/RadialReadinessDial';
import { 
  FlaskConical, 
  CheckCircle2, 
  Clock, 
  Lock, 
  AlertTriangle, 
  TrendingUp, 
  ArrowRight, 
  FileText,
  Activity,
  HardDrive
} from 'lucide-react';

export default function GovPilotHubPage() {
  const { activePilot, setCurrentView } = useApp();

  return (
    <div className="space-y-6 pb-12">
      {/* Pilot Live Banner */}
      <div className="modern-card p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
                LIVE SANDBOX TESTING
              </span>
              <span className="text-xs text-slate-400">ID: {activePilot.id}</span>
            </div>
            <h1 className="text-xl font-black mt-1">{activePilot.challenge_title}</h1>
            <p className="text-xs text-slate-300">
              Contractor: <strong className="text-cyan-400">{activePilot.startup_name}</strong> • Sample Records Ingested: <strong>{activePilot.kpi.sample_records.toLocaleString()}</strong>
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
            <div className="text-right">
              <p className="text-[10px] text-slate-400 uppercase font-bold">Pilot Timeline</p>
              <p className="text-base font-black text-white">Day {activePilot.current_day} <span className="text-xs font-normal text-slate-400">/ {activePilot.total_days}</span></p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center font-black text-xs text-blue-400">
              {activePilot.progress_percent}%
            </div>
          </div>
        </div>

        {/* 6-Stage Progress Stepper */}
        <div className="pt-3 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-6 gap-2 text-xs">
          <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-700/50 text-center">
            <span className="text-emerald-400 font-bold block">1. Deployment</span>
            <span className="text-[10px] text-emerald-300">Completed ✅</span>
          </div>
          <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-700/50 text-center">
            <span className="text-emerald-400 font-bold block">2. Baseline Sync</span>
            <span className="text-[10px] text-emerald-300">Completed ✅</span>
          </div>
          <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-700/50 text-center">
            <span className="text-emerald-400 font-bold block">3. 30-Day Gate</span>
            <span className="text-[10px] text-emerald-300">Completed ✅</span>
          </div>
          <div className="p-2 rounded-lg bg-blue-950/80 border border-blue-500 text-center">
            <span className="text-blue-300 font-bold block">4. 60-Day KPI</span>
            <span className="text-[10px] text-blue-200">Active (Day 42) 🟡</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-800/40 border border-slate-700 text-center opacity-60">
            <span className="text-slate-400 font-bold block">5. Validation</span>
            <span className="text-[10px] text-slate-500">Upcoming</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-800/40 border border-slate-700 text-center opacity-60">
            <span className="text-slate-400 font-bold block">6. Scale Gate</span>
            <span className="text-[10px] text-slate-500">Upcoming</span>
          </div>
        </div>
      </div>

      {/* Main Split: Live KPI Contract Card on Left, Data Integrity Panel on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: KPI Contract Card */}
        <div className="lg:col-span-2 space-y-4">
          <div className="modern-card p-6 bg-white space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">BINDING KPI CONTRACT</span>
                <h3 className="text-base font-black text-slate-900 mt-0.5">{activePilot.kpi.name}</h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                {activePilot.kpi.status}
              </span>
            </div>

            {/* 3 Metric Cards Comparison */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Pre-Pilot Baseline</span>
                <p className="text-2xl font-black text-slate-800">{activePilot.kpi.baseline}%</p>
                <span className="text-[10px] text-slate-500">Missed Pickups</span>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1 shadow-xs">
                <span className="text-[10px] font-bold text-emerald-700 uppercase">Current 42-Day Live</span>
                <p className="text-2xl font-black text-emerald-700">{activePilot.kpi.current}%</p>
                <span className="text-[10px] font-bold text-emerald-800">Target Exceeded (-28%)</span>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
                <span className="text-[10px] font-bold text-blue-700 uppercase">Contract Target</span>
                <p className="text-2xl font-black text-blue-800">≤ {activePilot.kpi.target}%</p>
                <span className="text-[10px] text-blue-600">Goal Threshold</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs flex items-center justify-between">
              <div>
                <span className="text-slate-500">Telemetry Source: </span>
                <strong className="text-slate-800">{activePilot.kpi.measurement_source}</strong>
              </div>
              <button
                onClick={() => setCurrentView('data')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                Inspect Raw Telemetry &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Data Integrity Panel */}
        <div className="space-y-4">
          <div className="modern-card p-6 bg-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-1.5">
                <Lock className="w-4 h-4 text-emerald-600" />
                <span>Data Integrity Panel</span>
              </h3>
              <span className="text-[10px] text-slate-400">{activePilot.data_integrity.last_sync}</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 rounded-lg bg-slate-50">
                <span className="text-slate-600">Source Consistency</span>
                <strong className="text-emerald-700">{activePilot.data_integrity.source_consistency}</strong>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-slate-50">
                <span className="text-slate-600">Duplicate Check</span>
                <strong className="text-emerald-700">0 Duplicates (Passed)</strong>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-slate-50">
                <span className="text-slate-600">Missing Data Rate</span>
                <strong className="text-blue-700">{activePilot.data_integrity.missing_data_rate} (Normal)</strong>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-slate-50">
                <span className="text-slate-600">File Hash Audit</span>
                <strong className="text-emerald-700 font-mono text-[11px]">{activePilot.data_integrity.file_hash}</strong>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => setCurrentView('anomalies')}
                className="w-full py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs border border-amber-200 transition flex items-center justify-center space-x-1.5"
              >
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Anomaly Center (2 Alerts Logged)</span>
              </button>

              <button
                onClick={() => setCurrentView('validation')}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition"
              >
                Proceed to Pilot Validation &rarr;
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
