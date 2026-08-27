import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { 
  QrCode, CheckCircle2, Award, FileCheck2, Lock, 
  Download, Edit3, Save, Share2, ShieldCheck, FileText, Check 
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { CapabilityRadarChart } from '../common/RadarChart';
import confetti from 'canvas-confetti';

export const EvidencePassport: React.FC = () => {
  const { currentStartup, updateStartupProfile, addNotification } = usePlatform();
  const [isEditing, setIsEditing] = useState(false);

  // Form edit states
  const [tagline, setTagline] = useState(currentStartup.tagline);
  const [founderName, setFounderName] = useState(currentStartup.founderName);
  const [teamSize, setTeamSize] = useState(currentStartup.teamSize);
  const [contactEmail, setContactEmail] = useState(currentStartup.contactEmail);

  const handleSave = () => {
    updateStartupProfile({
      tagline,
      founderName,
      teamSize: Number(teamSize),
      contactEmail
    });
    setIsEditing(false);
  };

  const handleShare = () => {
    addNotification({
      title: 'Evidence Passport Shared',
      message: 'Encrypted capability token shared with Maharashtra Water Supply Department.',
      portal: 'startup',
      type: 'success'
    });
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="micro-label text-slate-400">Verifiable Digital Identity</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-display">
            Evidence Passport
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Your verified capability profile for government buyers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-action flex items-center gap-2 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 text-navy-900 font-bold text-xs border border-brand-sky shadow-xs flex items-center gap-2 transition-all"
            >
              <Edit3 className="w-4 h-4 text-brand-royal" />
              <span>Edit Passport</span>
            </button>
          )}

          <button
            onClick={handleShare}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-royal to-brand-cobalt text-white font-bold text-xs shadow-action flex items-center gap-2 transition-all hover:scale-[1.02]"
          >
            <Share2 className="w-4 h-4" />
            <span>Share with Department</span>
          </button>
        </div>
      </div>

      {/* Boarding Pass Style Card */}
      <div className="relative passport-ticket bg-white rounded-3xl p-6 sm:p-8 border border-white/90 shadow-2xl overflow-hidden">
        
        {/* Side Notches */}
        <div className="passport-notch-left top-1/2 -translate-y-1/2" />
        <div className="passport-notch-right top-1/2 -translate-y-1/2" />

        {/* 1. Startup Identity Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-dashed border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-brand-royal text-white flex items-center justify-center font-black text-xl shadow-action shrink-0">
              AQ
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase block">
                MAHARASHTRA INNOVATION SOCIETY • VERIFIED EVIDENCE PASSPORT
              </span>
              <h2 className="text-2xl font-extrabold text-navy-900 font-display">
                {currentStartup.name}
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {isEditing ? (
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="p-1 px-2 border rounded-lg text-xs w-80 font-normal outline-none focus:border-brand-royal"
                  />
                ) : (
                  currentStartup.tagline
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-100 shrink-0">
            <div className="w-14 h-14 bg-white rounded-xl border border-slate-200 flex items-center justify-center p-1 shadow-inner">
              <QrCode className="w-full h-full text-navy-900" />
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                ✓ Cryptographically Signed
              </span>
              <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                DPIIT: {currentStartup.dpiitNumber}
              </span>
              <span className="text-[10px] font-mono text-slate-400 block">
                GeM: {currentStartup.gemSellerId}
              </span>
            </div>
          </div>
        </div>

        {/* Startup Identity Metadata Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 py-6 border-b border-slate-100 text-xs">
          <div>
            <span className="micro-label text-slate-400 block mb-1">DPIIT Recognition</span>
            <span className="font-mono font-bold text-emerald-700">{currentStartup.dpiitNumber}</span>
          </div>

          <div>
            <span className="micro-label text-slate-400 block mb-1">Year Incorporated</span>
            <span className="font-bold text-navy-900">{currentStartup.yearFounded}</span>
          </div>

          <div>
            <span className="micro-label text-slate-400 block mb-1">Headquarters</span>
            <span className="font-bold text-navy-900">{currentStartup.location}</span>
          </div>

          <div>
            <span className="micro-label text-slate-400 block mb-1">Team Size</span>
            {isEditing ? (
              <input
                type="number"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="p-1 px-2 border rounded-lg text-xs w-20 font-bold"
              />
            ) : (
              <span className="font-bold text-navy-900">{currentStartup.teamSize} Core Members</span>
            )}
          </div>

          <div>
            <span className="micro-label text-slate-400 block mb-1">TRL Maturity</span>
            <span className="font-bold text-brand-royal">TRL {currentStartup.trl} (Pilot-Ready)</span>
          </div>
        </div>

        {/* 2. Core Capabilities & 3. Track Record */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-6 border-b border-slate-100">
          
          {/* Core Capabilities (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <span className="micro-label text-slate-400 block">Core Capabilities</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                'AI/ML for Utilities',
                'IoT Sensor Networks',
                'Cloud SaaS Platforms',
                'Integration with SCADA/GIS'
              ].map((cap, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-brand-sky-light/60 border border-brand-sky text-xs font-bold text-navy-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-royal shrink-0" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 mt-3">
              <span className="micro-label text-slate-400 block mb-2">Metrics & Impact</span>
              <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>20–25% reduction in non-revenue water</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>450+ km pipeline under monitoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>INR 1.2 Cr annualized savings for clients</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Track Record & Deployments (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <span className="micro-label text-slate-400 block">Track Record & Deployments</span>
            <div className="space-y-2.5">
              {currentStartup.deployments.map(dep => (
                <div key={dep.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-navy-900">{dep.title}</span>
                    <StatusBadge label={dep.status} variant="emerald" size="sm" />
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">{dep.client} • {dep.year}</p>
                  <p className="text-[11px] text-emerald-800 font-medium mt-1.5">
                    Outcome: {dep.outcome}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 5. Compliance & 6. Documents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-2">
            <span className="micro-label text-slate-400 block">Compliance & Certifications</span>
            <div className="space-y-1.5 text-xs text-slate-700 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>DPIIT-recognized startup (Certificate #DIPP12345)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>ISO 27001 certified processes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Data hosted in India (AWS Mumbai region)</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-2">
            <span className="micro-label text-slate-400 block">Verified Document Pack</span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {['Company Profile (PDF)', 'DPIIT Certificate', 'Case Study: Pune MC', 'Security & Compliance Note'].map((doc, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-slate-700">
                  <span className="font-semibold truncate">{doc}</span>
                  <Download className="w-3.5 h-3.5 text-brand-royal shrink-0" />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
