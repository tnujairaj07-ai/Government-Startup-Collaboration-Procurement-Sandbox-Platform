import React from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { 
  Shield, CheckCircle2, AlertTriangle, FileSpreadsheet, 
  Users, Building2, Rocket, Activity, Download, Sparkles, Clock 
} from 'lucide-react';
import { MetricTile } from '../common/MetricTile';
import { StatusBadge } from '../common/StatusBadge';

export const AdminDashboard: React.FC = () => {
  const { challenges, startups, adminLogs, setActiveTab } = usePlatform();

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="micro-label text-slate-400">Maharashtra Innovation Society</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-display">
            Platform Administration Console
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Governance overview, statutory compliance audits, and state-wide innovation procurement monitoring.
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-white border border-brand-sky text-xs font-bold text-navy-900 shadow-xs">
          Statewide System Health: <strong className="text-emerald-600">100% Compliant</strong>
        </div>
      </div>

      {/* KPI Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricTile
          label="Total Active Challenges"
          value={challenges.length}
          subValue="Across 6 Departments"
          variant="gradient"
          timeframe="Statewide"
        />

        <MetricTile
          label="DPIIT Startups Screened"
          value={startups.length}
          subValue="37 shortlisted in total"
          variant="white"
          timeframe="Verified"
        />

        <MetricTile
          label="Pilots Monitored"
          value="9"
          subValue="100% telemetry synced"
          variant="white"
          timeframe="Active"
        />

        <MetricTile
          label="Total Grants Disbursed"
          value="INR 24.8 Cr"
          subValue="Dedicated Escrow Ledger"
          variant="white"
          timeframe="FY26 YTD"
        />
      </div>

      {/* Compliance & Audit Log */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-glass space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-navy-900 font-display">
              Statutory Compliance & Audit Log
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Automated CERT-In security tokens, DPIIT validation hashes, and escrow sign-offs</p>
          </div>
          <button
            type="button"
            className="px-4 py-2 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Audit Trail</span>
          </button>
        </div>

        <div className="space-y-3">
          {adminLogs.map(log => (
            <div
              key={log.id}
              className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-navy-900">{log.action}</p>
                  <p className="text-[11px] text-slate-500">Entity: <strong className="text-slate-700">{log.entity}</strong> • By: {log.performedBy}</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                <span className="text-[10px] text-slate-400 font-mono">{log.timestamp}</span>
                <StatusBadge label={log.status} variant="emerald" size="sm" icon="check" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
