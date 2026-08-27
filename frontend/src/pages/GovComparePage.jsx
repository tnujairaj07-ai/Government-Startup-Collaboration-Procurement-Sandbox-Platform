import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import RadarCapabilityChart from '../components/common/RadarCapabilityChart';
import { Scale, ArrowLeft, CheckCircle2, ShieldCheck, TrendingUp, AlertTriangle } from 'lucide-react';

export default function GovComparePage() {
  const { startups, setCurrentView, setSelectedStartupId } = useApp();

  const [selectedCandidate, setSelectedCandidate] = useState(startups[0]);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentView('startups')}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
              <Scale className="w-5 h-5 text-blue-600" />
              <span>Startup Candidate Comparison Matrix</span>
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 ml-6">
            Multi-dimensional evaluation comparing capability fit, evidence confidence, risk profile, and commercial value.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedStartupId(selectedCandidate.id);
            setCurrentView('pilots');
          }}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition"
        >
          Select {selectedCandidate.name} for Pilot &rarr;
        </button>
      </div>

      {/* Top Split: 6-Axis Radar Polygon Chart (Image 2 Ref) + Summary Recommendation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 modern-card p-6 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Multi-Axis Capability vs. Gov Baseline Radar</h3>
            <span className="text-xs font-bold text-blue-600 font-mono">Candidate: {selectedCandidate.name}</span>
          </div>
          
          <RadarCapabilityChart
            data={selectedCandidate.radar_data}
            candidateName={selectedCandidate.name}
            benchmarkName="Gov Baseline (80%)"
          />
        </div>

        {/* Objective Recommendation Box */}
        <div className="modern-card p-6 bg-gradient-to-b from-blue-50/80 to-white border border-blue-200 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <span className="text-[10px] font-bold tracking-widest text-blue-600 uppercase">AI RECOMMENDATION ENGINE</span>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <p className="text-xs font-bold text-emerald-900 flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Recommendation: <strong>RouteAI Systems</strong></span>
              </p>
              <p className="text-[11px] text-emerald-800 mt-1">
                Highest verified evidence-to-risk ratio (91% confidence, 3 verified municipal pilots, CERT-In Tier-1 cleared).
              </p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Logix offers a lower initial bid (₹5L) but lacks prior government deployment validation and has pending security audits.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-200">
            <button
              onClick={() => setCurrentView('evidence')}
              className="w-full py-2 rounded-xl text-xs font-bold text-blue-600 hover:bg-blue-100/50 border border-blue-300 transition"
            >
              Inspect Claims in Evidence Passport
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="modern-card p-6 bg-white space-y-4 overflow-x-auto">
        <h3 className="text-sm font-bold text-slate-900">Side-by-Side Factor Comparison</h3>

        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
              <th className="py-3 px-4">Evaluation Criteria</th>
              {startups.map(s => (
                <th key={s.id} className="py-3 px-4 text-slate-900 font-black text-xs">
                  {s.name} {s.id === selectedCandidate.id && '(Selected)'}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-3 px-4 font-semibold text-slate-600">Overall Match Score</td>
              {startups.map(s => (
                <td key={s.id} className="py-3 px-4 font-black text-blue-700">{s.match_score}%</td>
              ))}
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold text-slate-600">Capability Fit</td>
              {startups.map(s => (
                <td key={s.id} className="py-3 px-4 font-bold text-slate-800">{s.capability_fit}/100</td>
              ))}
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold text-slate-600">Evidence Confidence</td>
              {startups.map(s => (
                <td key={s.id} className="py-3 px-4 font-bold text-emerald-700">{s.evidence_confidence}/100</td>
              ))}
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold text-slate-600">Pilot Readiness</td>
              {startups.map(s => (
                <td key={s.id} className="py-3 px-4 font-bold text-purple-700">{s.pilot_readiness}/100</td>
              ))}
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold text-slate-600">Risk Assessment</td>
              {startups.map(s => (
                <td key={s.id} className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
                    s.risk === 'Low' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {s.risk}
                  </span>
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold text-slate-600">Past Government Deployments</td>
              {startups.map(s => (
                <td key={s.id} className="py-3 px-4 font-bold text-slate-800">
                  {s.past_gov_pilots > 0 ? `✅ ${s.past_gov_pilots} Verified` : '❌ None'}
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold text-slate-600">Pilot Grant Cost</td>
              {startups.map(s => (
                <td key={s.id} className="py-3 px-4 font-black text-slate-900">₹{(s.cost_inr / 100000).toFixed(1)} Lakh</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
