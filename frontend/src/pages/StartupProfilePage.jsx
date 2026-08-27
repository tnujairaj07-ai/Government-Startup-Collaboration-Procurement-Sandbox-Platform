import React from 'react';
import { useApp } from '../context/AppContext';
import { Building2, ShieldCheck, MapPin, Award, CheckCircle2, FileText } from 'lucide-react';

export default function StartupProfilePage() {
  const { currentStartup, setCurrentView } = useApp();

  const trackRecord = [
    { year: '2023', projects: 2, description: 'Initial edge route POC in Pune suburb' },
    { year: '2024', projects: 4, description: 'Smart city corridor deployment across 2 wards' },
    { year: '2025', projects: 6, description: 'Municipal enterprise fleet optimization' },
    { year: '2026', projects: 'Active Sandbox', description: 'MCBM Smart Waste Routing Pilot (Day 42/60)' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="modern-card p-6 bg-white space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              <h1 className="text-xl font-black text-slate-900">{currentStartup.name}</h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                DPIIT Verified 🟢
              </span>
            </div>
            <p className="text-xs text-slate-600">{currentStartup.tagline}</p>
            <div className="flex items-center space-x-3 text-[11px] text-slate-400">
              <span className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{currentStartup.location}</span>
              </span>
              <span>•</span>
              <span>DPIIT No: <strong>{currentStartup.dpiit_no}</strong></span>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('passport')}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition flex items-center space-x-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>View Evidence Passport</span>
          </button>
        </div>
      </div>

      {/* Historical Track Record */}
      <div className="modern-card p-6 bg-white space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Historical Deployment Track Record</h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {trackRecord.map((tr, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">{tr.year}</span>
              <p className="text-xl font-black text-blue-700">{tr.projects} {typeof tr.projects === 'number' && 'Projects'}</p>
              <p className="text-[10px] text-slate-500">{tr.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications Matrix */}
      <div className="modern-card p-6 bg-white space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Verified Compliance & Security Accreditations</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">DPIIT Startup India</span>
            <p className="font-bold text-emerald-700 flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified 🟢</span>
            </p>
            <p className="text-[10px] text-slate-500">Ministry of Commerce & Industry</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">CERT-In Cybersecurity Audit</span>
            <p className="font-bold text-emerald-700 flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Tier 1 Cleared 🟢</span>
            </p>
            <p className="text-[10px] text-slate-500">Static & Dynamic Vulnerability Test</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">DPDP Act 2023 Compliance</span>
            <p className="font-bold text-emerald-700 flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Sovereign Cloud Cleared 🟢</span>
            </p>
            <p className="text-[10px] text-slate-500">MeitY Empanelled Cloud Residency</p>
          </div>
        </div>
      </div>
    </div>
  );
}
