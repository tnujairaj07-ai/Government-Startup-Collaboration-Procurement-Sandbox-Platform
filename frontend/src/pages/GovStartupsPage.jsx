import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Radar, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ShieldCheck, 
  Scale, 
  FileText,
  MapPin
} from 'lucide-react';

export default function GovStartupsPage() {
  const { startups, setSelectedStartupId, setCurrentView } = useApp();

  const [search, setSearch] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [activeDrawerStartup, setActiveDrawerStartup] = useState(startups[0]);

  const filtered = startups.filter(s => {
    const matchesSec = selectedSector === 'All' || s.sector === selectedSector;
    const q = search.toLowerCase();
    const matchesQ = !q || s.name.toLowerCase().includes(q) || s.tagline.toLowerCase().includes(q);
    return matchesSec && matchesQ;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
            <Radar className="w-5 h-5 text-blue-600" />
            <span>Startup Discovery & AI Match Radar</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            AI-ranked startups matched to your challenge with transparent capability vs. evidence confidence scores.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('compare')}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition"
        >
          <Scale className="w-4 h-4" />
          <span>Compare Candidates Side-by-Side</span>
        </button>
      </div>

      {/* Main 2-Column Split: Ranked Cards on Left, Why Matched vs Why Not Inspector on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Startup Cards */}
        <div className="lg:col-span-2 space-y-4">
          {filtered.map((s, idx) => {
            const isSelected = activeDrawerStartup?.id === s.id;

            return (
              <div
                key={s.id}
                onClick={() => setActiveDrawerStartup(s)}
                className={`modern-card p-6 bg-white cursor-pointer transition space-y-4 ${
                  isSelected ? 'ring-2 ring-blue-600 border-transparent shadow-lg' : ''
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-black text-blue-600 font-mono">#{idx + 1}</span>
                      <h3 className="text-base font-black text-slate-900">{s.name}</h3>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {s.match_score}% Match
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{s.tagline}</p>
                    <div className="flex items-center space-x-2 text-[11px] text-slate-400 mt-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{s.location}</span>
                      <span>•</span>
                      <span>DPIIT: {s.dpiit_no}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      s.risk === 'Low' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      Risk: {s.risk}
                    </span>
                  </div>
                </div>

                {/* Score Breakdown Bars */}
                <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Capability Fit</span>
                    <p className="text-sm font-black text-blue-700 mt-0.5">{s.capability_fit}/100</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Evidence Confidence</span>
                    <p className="text-sm font-black text-emerald-700 mt-0.5">{s.evidence_confidence}/100</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Pilot Readiness</span>
                    <p className="text-sm font-black text-purple-700 mt-0.5">{s.pilot_readiness}/100</p>
                  </div>
                </div>

                {/* Quick Action Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-700">
                    Grant Cost: ₹{(s.cost_inr / 100000).toFixed(1)} Lakh
                  </span>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStartupId(s.id);
                        setCurrentView('evidence');
                      }}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800"
                    >
                      View Evidence Passport &rarr;
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 1 Col: Why Matched vs Why Not? Inspector Drawer */}
        <div className="space-y-4">
          <div className="modern-card p-6 bg-white space-y-4 sticky top-24">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">AI Explainability Inspector</span>
                <h3 className="text-sm font-black text-slate-900">{activeDrawerStartup.name}</h3>
              </div>
              <span className="text-xs font-black text-blue-600">{activeDrawerStartup.match_score}% Match</span>
            </div>

            {/* Why Matched? */}
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
              <h4 className="text-xs font-bold text-emerald-950 uppercase flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Why Matched? (Positive Factors)</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-emerald-900">
                {activeDrawerStartup.why_matched.map((m, i) => (
                  <li key={i} className="flex items-start space-x-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Why Not? / Constraints */}
            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-2">
              <h4 className="text-xs font-bold text-amber-950 uppercase flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Why Not? / Risk Constraints</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-amber-900">
                {activeDrawerStartup.why_not.map((n, i) => (
                  <li key={i} className="flex items-start space-x-1.5">
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Button */}
            <button
              onClick={() => {
                setSelectedStartupId(activeDrawerStartup.id);
                setCurrentView('evidence');
              }}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition flex items-center justify-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Inspect Evidence Passport</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
