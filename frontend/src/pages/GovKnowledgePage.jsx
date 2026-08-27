import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BrainCircuit, Search, CheckCircle2, XCircle, AlertTriangle, ArrowRight } from 'lucide-react';

export default function GovKnowledgePage() {
  const [searchQuery, setSearchQuery] = useState('hospital waiting time');

  const historicalPilots = [
    {
      id: "HIST-2025-09",
      department: "Civil Hospital Pune",
      solution: "QueueAI Edge Token System",
      result: "24% Improvement",
      status: "Successful Scale",
      status_color: "emerald",
      pitfalls: "Required legacy DB connectors for OPD registration system."
    },
    {
      id: "HIST-2025-14",
      department: "District Hospital Nashik",
      solution: "MedFlow Smart Kiosk",
      result: "18% Improvement",
      status: "Successful Scale",
      status_color: "emerald",
      pitfalls: "High hardware kiosk maintenance cost in semi-rural wards."
    },
    {
      id: "HIST-2024-03",
      department: "Urban Health Post Thane",
      solution: "CloudQueue Prototype",
      result: "5% Improvement",
      status: "Pilot Failed to Scale",
      status_color: "rose",
      pitfalls: "Cloud-only architecture failed during local internet outages. Edge computing mandatory."
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="modern-card p-6 bg-white space-y-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
            <BrainCircuit className="w-5 h-5 text-blue-600" />
            <span>Cross-Department Learning & Institutional Memory</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Search historical government problem statements, past pilot benchmarks, and common engineering pitfalls before posting new tenders.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search past problems: e.g. hospital waiting time, waste route, coastal surveillance..."
            className="w-full text-xs border border-slate-300 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Aggregate Insights Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="modern-card p-5 bg-white space-y-1 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Past Similar Pilots</span>
          <p className="text-3xl font-black text-blue-600">3 Pilots</p>
          <span className="text-[10px] text-slate-500">Across 3 Municipalities</span>
        </div>

        <div className="modern-card p-5 bg-white space-y-1 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Average Improvement</span>
          <p className="text-3xl font-black text-emerald-600">21%</p>
          <span className="text-[10px] text-emerald-700 font-semibold">Queue Reduction</span>
        </div>

        <div className="modern-card p-5 bg-white space-y-1 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Key Architecture Lesson</span>
          <p className="text-xs font-bold text-slate-900 mt-2">Edge-First Architecture</p>
          <span className="text-[10px] text-amber-600 font-semibold">Avoid Pure-Cloud Dependencies</span>
        </div>
      </div>

      {/* Historical Pilot Logs */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Historical Deployment Dossiers</h3>

        {historicalPilots.map((p) => (
          <div key={p.id} className="modern-card p-6 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">{p.id} • {p.department}</span>
                <h4 className="text-sm font-bold text-slate-900 mt-0.5">{p.solution}</h4>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                p.status_color === 'emerald' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}>
                {p.status} ({p.result})
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700">
              <span className="font-bold text-slate-900">What Happened / Engineering Retrospective: </span>
              {p.pitfalls}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
