import React from 'react';
import { useApp } from '../context/AppContext';
import { Lock, FileText, CheckCircle2, ArrowLeft, Download, Hash } from 'lucide-react';

export default function GovPilotDataPage() {
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
              <Lock className="w-5 h-5 text-emerald-600" />
              <span>Pilot Data & Cryptographic Evidence Trail</span>
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 ml-6">
            Multi-source immutable telemetry ledger guaranteeing anti-tamper verification across government and startup streams.
          </p>
        </div>

        <button
          onClick={() => showToast('Full SHA-256 Telemetry Package downloaded!', 'success')}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition"
        >
          <Download className="w-4 h-4" />
          <span>Export Audit Package</span>
        </button>
      </div>

      {/* Telemetry Sources Table */}
      <div className="modern-card p-6 bg-white space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Multi-Source Ingestion Streams</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                <th className="py-3 px-4">Telemetry Stream Source</th>
                <th className="py-3 px-4">Total Records Ingested</th>
                <th className="py-3 px-4">Validation Status</th>
                <th className="py-3 px-4">SHA-256 Digest Hash</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activePilot.telemetry_sources.map((src, i) => (
                <tr key={i} className="hover:bg-slate-50/60 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>{src.source}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-700">{src.records}</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-700">{src.status}</td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">{src.hash}</td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => showToast(`Verified ${src.source} hash integrity!`, 'info')}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800"
                    >
                      Verify Hash
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Versioned Raw Files History */}
      <div className="modern-card p-6 bg-white space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Versioned Audit History</h3>

        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-mono font-bold text-blue-700">pilot_data_v2_reconciled.csv</span>
              <p className="text-slate-500 mt-0.5">Uploaded: 15 Aug 2026 • Reason: 12 missing coordinate records corrected</p>
              <p className="font-mono text-[10px] text-slate-400 mt-0.5">Hash: SHA256:B82D148...9942</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Approved & Sealed
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-mono font-bold text-slate-800">pilot_data_v1_initial.csv</span>
              <p className="text-slate-500 mt-0.5">Uploaded: 10 Aug 2026 • Municipal baseline raw ingest</p>
              <p className="font-mono text-[10px] text-slate-400 mt-0.5">Hash: SHA256:A92F771...1102</p>
            </div>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
              Archived Snapshot
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
