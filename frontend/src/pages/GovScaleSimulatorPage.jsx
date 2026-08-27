import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TrendingUp, ArrowRight, Coins, Clock, Users, ShieldAlert, CheckCircle2, ChevronRight } from 'lucide-react';

export default function GovScaleSimulatorPage() {
  const { setCurrentView } = useApp();

  const [scaleLevel, setScaleLevel] = useState('50'); // '10', '20', '50', 'district'

  const scaleConfigurations = {
    '10': {
      title: '10 Municipal Wards',
      cost: '₹1.2 Cr',
      timeline: '3 Months',
      staff: '6 Technical Staff',
      expectedImprovement: '24% – 28%',
      riskHotspots: 2,
      phases: ['Phase 1: 5 High-Density Wards (Month 1-2)', 'Phase 2: 5 Suburban Wards (Month 3)']
    },
    '20': {
      title: '20 Municipal Wards',
      cost: '₹2.3 Cr',
      timeline: '5 Months',
      staff: '10 Technical Staff',
      expectedImprovement: '23% – 28%',
      riskHotspots: 4,
      phases: ['Phase 1: 10 Core City Wards (Month 1-3)', 'Phase 2: 10 Peripheral Wards (Month 4-5)']
    },
    '50': {
      title: '50 Municipal Wards (City-Wide Expansion)',
      cost: '₹4.8 Cr',
      timeline: '8 Months',
      staff: '18 Technical Staff',
      expectedImprovement: '22% – 28%',
      riskHotspots: 7,
      phases: ['Phase 1: 10 Critical Wards (Month 1-3)', 'Phase 2: 20 Central Wards (Month 4-6)', 'Phase 3: 20 Peripheral Wards (Month 7-8)']
    },
    'district': {
      title: 'District-Wide Deployment (Entire Metropolitan Region)',
      cost: '₹11.5 Cr',
      timeline: '14 Months',
      staff: '35 Technical Staff',
      expectedImprovement: '20% – 26%',
      riskHotspots: 14,
      phases: ['Phase 1: Metropolitan Urban Core (Month 1-4)', 'Phase 2: Industrial Corridors (Month 5-9)', 'Phase 3: Rural Fringe Wards (Month 10-14)']
    }
  };

  const currentConfig = scaleConfigurations[scaleLevel];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span>Statewide Scale & Budget Simulator</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Model multi-ward and district-wide commercial rollout costs, timelines, staffing, and risk hotspots based on pilot evidence.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('decisions')}
          className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition"
        >
          <span>Open Decision Center &rarr;</span>
        </button>
      </div>

      {/* Baseline Anchor Card */}
      <div className="modern-card p-6 bg-gradient-to-r from-blue-900 to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest">VALIDATED PILOT BASELINE</span>
          <h3 className="text-base font-black mt-0.5">RouteAI Municipal Waste Route Optimization Pilot</h3>
          <p className="text-xs text-slate-300 mt-1">
            3 Wards Tested • 12,340 Records Ingested • <strong>28% Verified Efficiency Gain</strong>
          </p>
        </div>

        {/* Segmented Pill Selector (Image 1 Ref) */}
        <div className="bg-slate-800 p-1 rounded-full border border-slate-700 flex items-center">
          <button
            onClick={() => setScaleLevel('10')}
            className={`pill-tab ${scaleLevel === '10' ? 'active' : 'inactive'}`}
          >
            10 Wards
          </button>
          <button
            onClick={() => setScaleLevel('20')}
            className={`pill-tab ${scaleLevel === '20' ? 'active' : 'inactive'}`}
          >
            20 Wards
          </button>
          <button
            onClick={() => setScaleLevel('50')}
            className={`pill-tab ${scaleLevel === '50' ? 'active' : 'inactive'}`}
          >
            50 Wards
          </button>
          <button
            onClick={() => setScaleLevel('district')}
            className={`pill-tab ${scaleLevel === 'district' ? 'active' : 'inactive'}`}
          >
            District-Wide
          </button>
        </div>
      </div>

      {/* Projected Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="modern-card p-5 bg-white space-y-1 text-center">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2">
            <Coins className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase">Estimated Deployment Cost</span>
          <p className="text-2xl font-black text-slate-900">{currentConfig.cost}</p>
          <span className="text-[10px] text-slate-500">Capex + 1-Yr AMC</span>
        </div>

        <div className="modern-card p-5 bg-white space-y-1 text-center">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-2">
            <Clock className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase">Estimated Rollout Timeline</span>
          <p className="text-2xl font-black text-purple-700">{currentConfig.timeline}</p>
          <span className="text-[10px] text-slate-500">Phased Execution</span>
        </div>

        <div className="modern-card p-5 bg-white space-y-1 text-center">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-2">
            <Users className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase">Operational Staffing</span>
          <p className="text-2xl font-black text-slate-900">{currentConfig.staff}</p>
          <span className="text-[10px] text-slate-500">Municipal Dispatchers</span>
        </div>

        <div className="modern-card p-5 bg-white space-y-1 text-center">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
            <TrendingUp className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase">Projected Improvement</span>
          <p className="text-2xl font-black text-emerald-700">{currentConfig.expectedImprovement}</p>
          <span className="text-[10px] text-emerald-800 font-bold">Annual ₹9.2 Cr Savings</span>
        </div>
      </div>

      {/* Phased Rollout Blueprint */}
      <div className="modern-card p-6 bg-white space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Recommended Phased Rollout Blueprint</h3>

        <div className="space-y-3">
          {currentConfig.phases.map((ph, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                  {idx + 1}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">{ph}</p>
                  <p className="text-[11px] text-slate-500">Target Efficiency Retention: ≥ 22%</p>
                </div>
              </div>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Scheduled
              </span>
            </div>
          ))}
        </div>

        <div className="pt-3 flex justify-end">
          <button
            onClick={() => setCurrentView('decisions')}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition flex items-center space-x-2"
          >
            <span>Proceed to Final Scale Decision Gate &rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
}
