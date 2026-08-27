import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Award, CheckCircle2, ShieldCheck, FileText, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';

export default function GovEvaluationPage() {
  const { currentStartup, showToast, setCurrentView } = useApp();

  const [scores, setScores] = useState({
    technical: 23, // out of 25
    innovation: 13, // out of 15
    outcome: 18, // out of 20
    feasibility: 14, // out of 15
    security: 10, // out of 10
    cost: 8, // out of 10
    scalability: 4, // out of 5
  });

  const [comments, setComments] = useState(
    "Exceptional edge-AI route optimization architecture. Fully compliant with Municipal GIS mapping and CERT-In security standards. Highly recommended for live 60-day sandbox testing."
  );

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

  const handleSaveEvaluation = (e) => {
    e.preventDefault();
    showToast(`Technical Evaluation Scorecard (${totalScore}/100) recorded!`, 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
            <Award className="w-5 h-5 text-blue-600" />
            <span>Expert Technical Evaluation Workspace</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Evaluate candidate proposal against objective 7-criteria matrix linked directly to verified evidence documentation.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-500">Candidate:</span>
          <span className="text-xs font-black text-blue-700 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200">
            {currentStartup.name}
          </span>
        </div>
      </div>

      <form onSubmit={handleSaveEvaluation} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: 7-Factor Scorecard Sliders */}
        <div className="lg:col-span-2 space-y-4">
          <div className="modern-card p-6 bg-white space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Structured Scoring Matrix</h3>
              <span className="text-xs font-bold text-slate-500">Scale: Max 100 Points</span>
            </div>

            {/* Criteria Sliders */}
            <div className="space-y-4">
              
              {/* Factor 1: Technical Fit */}
              <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>1. Technical Architecture & Algorithmic Fit (Max 25)</span>
                  <span className="text-blue-600">{scores.technical}/25</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  value={scores.technical}
                  onChange={(e) => setScores({ ...scores, technical: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 pt-0.5">
                  <span>Verified Edge Machine Learning & Dynamic Ingest</span>
                  <a href="#doc" onClick={(e) => { e.preventDefault(); showToast('Viewing Tech Architecture PDF', 'info'); }} className="text-blue-600 font-bold flex items-center space-x-1">
                    <FileText className="w-3 h-3" />
                    <span>View Architecture Doc</span>
                  </a>
                </div>
              </div>

              {/* Factor 2: Innovation */}
              <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>2. Innovation & DeepTech Novelty (Max 15)</span>
                  <span className="text-blue-600">{scores.innovation}/15</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  value={scores.innovation}
                  onChange={(e) => setScores({ ...scores, innovation: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Factor 3: Outcome Potential */}
              <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>3. Public Service Outcome & Citizen Impact (Max 20)</span>
                  <span className="text-blue-600">{scores.outcome}/20</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={scores.outcome}
                  onChange={(e) => setScores({ ...scores, outcome: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Factor 4: Pilot Feasibility */}
              <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>4. 60-Day Pilot Feasibility & Readiness (Max 15)</span>
                  <span className="text-blue-600">{scores.feasibility}/15</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  value={scores.feasibility}
                  onChange={(e) => setScores({ ...scores, feasibility: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Factor 5: Security */}
              <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>5. Cybersecurity & DPDP Act Compliance (Max 10)</span>
                  <span className="text-emerald-700">{scores.security}/10</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={scores.security}
                  onChange={(e) => setScores({ ...scores, security: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Factor 6: Cost */}
              <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>6. Commercial Value & Cost Efficiency (Max 10)</span>
                  <span className="text-blue-600">{scores.cost}/10</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={scores.cost}
                  onChange={(e) => setScores({ ...scores, cost: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Factor 7: Scalability */}
              <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>7. Statewide Scalability (Max 5)</span>
                  <span className="text-blue-600">{scores.scalability}/5</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={scores.scalability}
                  onChange={(e) => setScores({ ...scores, scalability: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer"
                />
              </div>

            </div>

            {/* Comments */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Evaluator Synthesis & Recommendation *</label>
              <textarea
                rows={3}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="w-full text-xs border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Right 1 Col: Score Summary & Action */}
        <div className="space-y-4">
          <div className="modern-card p-6 bg-white space-y-4 sticky top-24">
            <div className="text-center p-6 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-800 text-white space-y-1">
              <span className="text-[10px] font-bold tracking-widest text-cyan-200 uppercase">COMPOSITE EVALUATION SCORE</span>
              <p className="text-5xl font-black">{totalScore}<span className="text-xl font-normal text-white/70">/100</span></p>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 mt-2">
                🟢 Strongly Recommended for Pilot
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1.5 text-slate-600">
              <p><span className="font-semibold text-slate-800">Evaluator:</span> Dr. V. K. Saraswat</p>
              <p><span className="font-semibold text-slate-800">Role:</span> Scientific Advisor & Nodal Chair</p>
              <p><span className="font-semibold text-slate-800">Status:</span> Audit Sealed & Signed</p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition"
              >
                Save Scorecard to Audit Ledger
              </button>

              <button
                type="button"
                onClick={() => setCurrentView('pilots')}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition flex items-center justify-center space-x-1"
              >
                <span>Authorize 60-Day Pilot &rarr;</span>
              </button>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
