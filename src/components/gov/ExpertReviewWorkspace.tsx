import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { 
  ClipboardCheck, Award, CheckCircle2, AlertCircle, 
  HelpCircle, Sparkles, FileText, Check, ShieldCheck 
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { ExpertScorecard } from '../../types';
import confetti from 'canvas-confetti';

export const ExpertReviewWorkspace: React.FC = () => {
  const { proposals, evaluateProposal, addNotification } = usePlatform();

  const shortlistedStartups = [
    { name: 'AquaSense Technologies', id: 'ST-001' },
    { name: 'HydroMind Labs', id: 'ST-004' },
    { name: 'PipeGuard AI', id: 'ST-005' },
  ];

  const [activeStartupId, setActiveStartupId] = useState('ST-001');

  // 1-5 scale scores for AquaSense
  const [techScore, setTechScore] = useState(5);
  const [feasibilityScore, setFeasibilityScore] = useState(4);
  const [scalabilityScore, setScalabilityScore] = useState(5);
  const [costScore, setCostScore] = useState(4);
  const [securityScore, setSecurityScore] = useState(5);

  const [techComment, setTechComment] = useState('Novel hybrid model combining physics-based and ML approaches.');
  const [feasibilityComment, setFeasibilityComment] = useState('Requires minimal civil work; integrates with existing SCADA.');
  const [scalabilityComment, setScalabilityComment] = useState('Modular design; can scale block-wise across municipal zones.');
  const [costComment, setCostComment] = useState('Higher upfront sensor cost, but strong ROI in 18 months.');
  const [securityComment, setSecurityComment] = useState('Strong encryption, Indian data hosting on AWS Mumbai, clear access controls.');

  const [overallVerdict, setOverallVerdict] = useState<'Strongly Recommend for Pilot' | 'Recommend with Conditions' | 'Neutral' | 'Not Recommended'>(
    'Strongly Recommend for Pilot'
  );
  const [evaluatorNotes, setEvaluatorNotes] = useState(
    'Demonstrated robust field test results with high acoustic accuracy in Pune. Budget allocation maps accurately to sensor hardware BOM. Highly recommended for pilot stage.'
  );

  // Compute weighted score (out of 100)
  // Tech: 30% (score * 6), Feasibility: 25% (score * 5), Scalability: 20% (score * 4), Cost: 15% (score * 3), Security: 10% (score * 2)
  const weightedTotal = (techScore * 6) + (feasibilityScore * 5) + (scalabilityScore * 4) + (costScore * 3) + (securityScore * 2);

  const handleSubmitReview = () => {
    const scorecard: ExpertScorecard = {
      id: 'SC-' + Date.now(),
      reviewerName: 'Dr. Meera Deshmukh',
      role: 'Chief Technical Evaluator — Urban Infrastructure & AI',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
      scores: {
        technicalInnovation: techScore,
        govFeasibility: feasibilityScore,
        districtScalability: scalabilityScore,
        costEffectiveness: costScore,
        dataSecurityCompliance: securityScore,
      },
      qualitativeNotes: evaluatorNotes,
      riskFlags: ['Monitor sensor battery life in monsoon humidity'],
      recommendationVerdict: overallVerdict,
      weightedTotal,
      submittedAt: new Date().toISOString()
    };

    if (proposals[0]) {
      evaluateProposal(proposals[0].id, scorecard);
    }

    addNotification({
      title: 'Expert Evaluation Submitted',
      message: `Scorecard for ${activeStartupId === 'ST-001' ? 'AquaSense Technologies' : 'Startup'} recorded (${weightedTotal}/100).`,
      portal: 'both',
      type: 'success'
    });

    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="micro-label text-slate-400">Technical Evaluation Workspace</span>
            <span className="w-2 h-2 rounded-full bg-brand-royal" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-display">
            Expert Review Workspace
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Evaluate startup proposals with structured rubrics and collaborative scoring.
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-white border border-brand-sky text-xs font-bold text-navy-900 shadow-xs">
          Challenge: <strong className="text-brand-royal">AI-powered Water Leakage Detection</strong>
        </div>
      </div>

      {/* Shortlisted Startups Selector */}
      <div className="glass-panel rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="micro-label text-slate-400 block mb-1">Shortlisted Startups</span>
          <div className="flex flex-wrap items-center gap-2">
            {shortlistedStartups.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveStartupId(s.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeStartupId === s.id
                    ? 'bg-brand-royal text-white shadow-action'
                    : 'bg-white text-slate-700 hover:bg-brand-sky-light border border-slate-200'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        <div className="text-right shrink-0 bg-white p-3 rounded-2xl border border-brand-sky shadow-xs">
          <span className="micro-label text-slate-400 block text-[10px]">Weighted Total</span>
          <span className="text-2xl font-black text-brand-royal font-display">{weightedTotal}</span>
          <span className="text-xs font-bold text-slate-400"> / 100</span>
        </div>
      </div>

      {/* 5-Criteria Evaluation Rubric Table */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-glass space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="text-base font-bold text-navy-900 font-display">
            5-Criteria Evaluation Rubrics (1–5 Scale)
          </h2>
          <span className="text-xs text-slate-500 font-medium">Reviewing: <strong className="text-navy-900">AquaSense Technologies</strong></span>
        </div>

        <div className="space-y-4">
          
          {/* 1. Technical Innovation (30%) */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-navy-900">1. Technical Innovation (30% Weight)</span>
                <p className="text-[11px] text-slate-500">Novelty of acoustic sensors and edge machine learning models</p>
              </div>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(score => (
                  <button
                    key={score}
                    type="button"
                    onClick={() => setTechScore(score)}
                    className={`w-8 h-8 rounded-xl font-bold text-xs transition-all ${
                      techScore === score ? 'bg-brand-royal text-white shadow-action scale-105' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {score}
                  </button>
                ))}
              </div>
            </div>
            <input
              type="text"
              value={techComment}
              onChange={(e) => setTechComment(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-navy-900 outline-none focus:border-brand-royal"
            />
          </div>

          {/* 2. Feasibility in Gov Context (25%) */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-navy-900">2. Feasibility in Gov Context (25% Weight)</span>
                <p className="text-[11px] text-slate-500">Integration with existing SCADA, zero disruption to water supply</p>
              </div>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(score => (
                  <button
                    key={score}
                    type="button"
                    onClick={() => setFeasibilityScore(score)}
                    className={`w-8 h-8 rounded-xl font-bold text-xs transition-all ${
                      feasibilityScore === score ? 'bg-brand-royal text-white shadow-action scale-105' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {score}
                  </button>
                ))}
              </div>
            </div>
            <input
              type="text"
              value={feasibilityComment}
              onChange={(e) => setFeasibilityComment(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-navy-900 outline-none focus:border-brand-royal"
            />
          </div>

          {/* 3. Scalability Across Districts (20%) */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-navy-900">3. Scalability Across Districts (20% Weight)</span>
                <p className="text-[11px] text-slate-500">Ease of replication across 28 municipal corporations</p>
              </div>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(score => (
                  <button
                    key={score}
                    type="button"
                    onClick={() => setScalabilityScore(score)}
                    className={`w-8 h-8 rounded-xl font-bold text-xs transition-all ${
                      scalabilityScore === score ? 'bg-brand-royal text-white shadow-action scale-105' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {score}
                  </button>
                ))}
              </div>
            </div>
            <input
              type="text"
              value={scalabilityComment}
              onChange={(e) => setScalabilityComment(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-navy-900 outline-none focus:border-brand-royal"
            />
          </div>

          {/* 4. Cost-effectiveness (15%) */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-navy-900">4. Cost-effectiveness (15% Weight)</span>
                <p className="text-[11px] text-slate-500">BOM rationality and ROI in water savings</p>
              </div>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(score => (
                  <button
                    key={score}
                    type="button"
                    onClick={() => setCostScore(score)}
                    className={`w-8 h-8 rounded-xl font-bold text-xs transition-all ${
                      costScore === score ? 'bg-brand-royal text-white shadow-action scale-105' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {score}
                  </button>
                ))}
              </div>
            </div>
            <input
              type="text"
              value={costComment}
              onChange={(e) => setCostComment(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-navy-900 outline-none focus:border-brand-royal"
            />
          </div>

          {/* 5. Data Security & Compliance (10%) */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-navy-900">5. Data Security & Compliance (10% Weight)</span>
                <p className="text-[11px] text-slate-500">DPDP Act, MeitY cloud in India, CERT-In standards</p>
              </div>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(score => (
                  <button
                    key={score}
                    type="button"
                    onClick={() => setSecurityScore(score)}
                    className={`w-8 h-8 rounded-xl font-bold text-xs transition-all ${
                      securityScore === score ? 'bg-brand-royal text-white shadow-action scale-105' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {score}
                  </button>
                ))}
              </div>
            </div>
            <input
              type="text"
              value={securityComment}
              onChange={(e) => setSecurityComment(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-navy-900 outline-none focus:border-brand-royal"
            />
          </div>

        </div>

        {/* Overall Recommendation Dropdown & Notes */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div>
            <label className="micro-label block mb-1">Overall Recommendation</label>
            <select
              value={overallVerdict}
              onChange={(e) => setOverallVerdict(e.target.value as any)}
              className="w-full p-3 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-navy-900 outline-none focus:border-brand-royal"
            >
              <option value="Strongly Recommend for Pilot">Strongly Recommend for Pilot</option>
              <option value="Recommend with Conditions">Recommend with Conditions</option>
              <option value="Neutral">Neutral</option>
              <option value="Not Recommended">Not Recommended</option>
            </select>
          </div>

          <div>
            <label className="micro-label block mb-1">Qualitative Evaluator Comments</label>
            <textarea
              rows={3}
              value={evaluatorNotes}
              onChange={(e) => setEvaluatorNotes(e.target.value)}
              placeholder="Summarize key strengths, risks, and conditions for pilot (e.g., data sharing, SLAs, milestones)."
              className="w-full p-3 rounded-2xl bg-white border border-slate-200 text-xs font-medium text-navy-900 outline-none focus:border-brand-royal"
            />
          </div>
        </div>

        {/* Final Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
          <button
            type="button"
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Request Clarification from Startup</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              className="px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs transition-colors"
            >
              Save Draft
            </button>
            <button
              type="button"
              onClick={handleSubmitReview}
              className="px-7 py-2.5 rounded-full bg-gradient-to-r from-brand-royal to-brand-cobalt text-white font-bold text-xs shadow-action flex items-center gap-2 hover:scale-[1.02] transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Submit Review ({weightedTotal}/100)</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
