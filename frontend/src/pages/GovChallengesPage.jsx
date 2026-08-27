import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Puzzle, 
  Plus, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Clock, 
  Coins, 
  MapPin, 
  Search,
  Filter
} from 'lucide-react';

export default function GovChallengesPage() {
  const { challenges, addChallenge, setCurrentView } = useApp();

  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');

  // Form State
  const [formData, setFormData] = useState({
    title: 'Smart Waste Collection & Dynamic Route Optimization',
    department: 'Municipal Corporation of Greater Mumbai',
    ministry: 'Urban Development Department',
    sector: 'Smart Cities & Urban Mobility',
    problemNarrative: '30% of municipal collection trips suffer from missed pickups and redundant vehicle mileage.',
    baselineKPI: '30% Missed Pickups',
    targetKPI: '≤ 20% Missed Pickups (20%+ Improvement)',
    budget_inr: 1200000,
    duration: '60 Days',
    locations: '3 Municipal Wards (Ward K-East, H-West, G-South)',
    sample_size: '10,000 collection records',
    dataSensitivity: 'Medium (DPDP Act 2023 Compliant)',
    securitySLA: 'CERT-In Tier-1 Cleared'
  });

  const filtered = challenges.filter(c => {
    const matchesSec = selectedSector === 'All' || c.sector === selectedSector;
    const q = search.toLowerCase();
    const matchesQ = !q || c.title.toLowerCase().includes(q) || c.department.toLowerCase().includes(q);
    return matchesSec && matchesQ;
  });

  const handlePublish = () => {
    addChallenge({
      title: formData.title,
      department: formData.department,
      ministry: formData.ministry,
      sector: formData.sector,
      baseline: formData.baselineKPI,
      target: formData.targetKPI,
      budget_inr: formData.budget_inr,
      duration: formData.duration,
      sample_size: formData.sample_size,
      locations: formData.locations,
      description: formData.problemNarrative
    });
    setIsWizardOpen(false);
    setStep(1);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
            <Puzzle className="w-5 h-5 text-blue-600" />
            <span>Government Challenges Studio</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Formulate public problem statements, define measurable KPI contracts, and generate pilot blueprints with AI Copilot.
          </p>
        </div>

        <button
          onClick={() => {
            setIsWizardOpen(true);
            setStep(1);
          }}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Create Challenge Wizard</span>
        </button>
      </div>

      {/* 5-Step Creation Wizard Modal */}
      {isWizardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in duration-150">
            
            {/* Wizard Header with Stepper */}
            <div className="p-6 bg-slate-50 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold tracking-wider text-blue-600 uppercase">AI Challenge Designer</span>
                  <h3 className="text-base font-black text-slate-900">
                    {step === 1 && 'Step 1: Define Problem Statement & Scope'}
                    {step === 2 && 'Step 2: Define Desired Outcome with AI Copilot'}
                    {step === 3 && 'Step 3: Operational Constraints & Governance'}
                    {step === 4 && 'Step 4: Pilot Blueprint & KPI Contract'}
                    {step === 5 && 'Step 5: Review & Publish Readiness'}
                  </h3>
                </div>
                <button
                  onClick={() => setIsWizardOpen(false)}
                  className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1"
                >
                  ✕
                </button>
              </div>

              {/* 5-Step Indicator */}
              <div className="grid grid-cols-5 gap-2 mt-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 rounded-full transition-all ${
                      s <= step ? 'bg-blue-600' : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Wizard Step Content */}
            <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
              
              {/* Step 1: Problem */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Challenge Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Smart Waste Route Optimization"
                      className="w-full text-xs border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Department / Directorate *</label>
                      <input
                        type="text"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full text-xs border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Sector *</label>
                      <select
                        value={formData.sector}
                        onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                        className="w-full text-xs border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        <option value="Smart Cities & Urban Mobility">Smart Cities & Urban Mobility</option>
                        <option value="HealthTech & Telemedicine">HealthTech & Telemedicine</option>
                        <option value="Defence & Aerospace">Defence & Aerospace</option>
                        <option value="Cybersecurity & Gov-Cloud">Cybersecurity & Gov-Cloud</option>
                        <option value="Agritech & Rural Economy">Agritech & Rural Economy</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Problem Narrative & Citizen Impact *</label>
                    <textarea
                      rows={3}
                      value={formData.problemNarrative}
                      onChange={(e) => setFormData({ ...formData, problemNarrative: e.target.value })}
                      placeholder="Describe the operational bottleneck, who is affected, and current service deficiency..."
                      className="w-full text-xs border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Outcome & AI Copilot */}
              {step === 2 && (
                <div className="space-y-4">
                  {/* AI Copilot Suggestion Box */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 space-y-2">
                    <div className="flex items-center space-x-2 text-blue-900 font-bold text-xs">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span>🤖 AI Challenge Copilot Recommendation</span>
                    </div>
                    <p className="text-xs text-blue-800 leading-relaxed">
                      “Based on your problem description, I suggest measuring: <strong>Missed Pickup Rate</strong> as Primary KPI, and <strong>Fleet Fuel Consumption & Turnaround Time</strong> as Secondary KPIs. Target benchmark: 20% improvement over 60 days.”
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Current Baseline KPI *</label>
                      <input
                        type="text"
                        value={formData.baselineKPI}
                        onChange={(e) => setFormData({ ...formData, baselineKPI: e.target.value })}
                        placeholder="e.g. 30% Missed Pickups"
                        className="w-full text-xs border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Desired Target Threshold *</label>
                      <input
                        type="text"
                        value={formData.targetKPI}
                        onChange={(e) => setFormData({ ...formData, targetKPI: e.target.value })}
                        placeholder="e.g. ≤ 20% Missed Pickups (20%+ Improvement)"
                        className="w-full text-xs border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Constraints */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Pilot Budget Grant (₹ INR) *</label>
                      <input
                        type="number"
                        value={formData.budget_inr}
                        onChange={(e) => setFormData({ ...formData, budget_inr: Number(e.target.value) })}
                        className="w-full text-xs border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Pilot Test Duration</label>
                      <input
                        type="text"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="w-full text-xs border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Data Sensitivity & Privacy Policy</label>
                    <input
                      type="text"
                      value={formData.dataSensitivity}
                      onChange={(e) => setFormData({ ...formData, dataSensitivity: e.target.value })}
                      className="w-full text-xs border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Pilot Blueprint */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <h4 className="text-xs font-bold text-slate-900 uppercase">Automated Pilot Blueprint</h4>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                      <div className="bg-white p-3 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-400 font-semibold uppercase">Testing Locations</span>
                        <p className="font-bold text-slate-900 mt-0.5">{formData.locations}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-400 font-semibold uppercase">Minimum Data Records</span>
                        <p className="font-bold text-slate-900 mt-0.5">{formData.sample_size}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-400 font-semibold uppercase">Cybersecurity SLA</span>
                        <p className="font-bold text-emerald-700 mt-0.5">{formData.securitySLA}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Publish Readiness */}
              {step === 5 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-3">
                    <div className="flex items-center space-x-2 text-emerald-900 font-bold text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Challenge Readiness Verification (100% Cleared)</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-emerald-800">
                      <div className="flex items-center space-x-2">
                        <span>🟢 Problem Statement Clarity</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>🟢 Quantitative Outcome Defined</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>🟢 KPI Contract Generated</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>🟢 Security & DPDP SLA Included</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Wizard Navigation Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex items-center space-x-1 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-200 transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              ) : <div />}

              {step < 5 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="flex items-center space-x-1 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePublish}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition"
                >
                  Publish Challenge
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Challenge Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map(c => (
          <div
            key={c.id}
            className="modern-card p-6 bg-white flex flex-col justify-between hover:border-blue-400 transition space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{c.ministry} • {c.department}</span>
                  <h3 className="text-sm font-bold text-slate-900 mt-1">{c.title}</h3>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {c.status}
                </span>
              </div>

              <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">{c.description}</p>

              <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Baseline</span>
                  <p className="font-bold text-slate-800 mt-0.5">{c.baseline}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Target Outcome</span>
                  <p className="font-bold text-emerald-700 mt-0.5">{c.target}</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-blue-700">
                {c.matched_startups_count} Matched Startups
              </span>
              <button
                onClick={() => setCurrentView('startups')}
                className="flex items-center space-x-1 text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                <span>Find Startups &rarr;</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
