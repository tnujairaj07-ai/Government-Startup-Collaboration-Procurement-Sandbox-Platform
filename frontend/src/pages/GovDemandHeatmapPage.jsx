import React from 'react';
import { BarChart3, AlertTriangle, TrendingUp, Users } from 'lucide-react';

export default function GovDemandHeatmapPage() {
  const sectors = [
    { name: 'Healthcare & Hospital AI', demand: 38, supply: 14, ready: 4, gap: 'High Supply Gap ⚠' },
    { name: 'Water Resources & Flood Prediction', demand: 29, supply: 9, ready: 2, gap: 'Critical Gap ⚠' },
    { name: 'Waste & Urban Sanitation Routing', demand: 23, supply: 18, ready: 7, gap: 'Balanced 🟢' },
    { name: 'Agritech & Soil Intelligence', demand: 18, supply: 15, ready: 5, gap: 'Balanced 🟢' },
    { name: 'Smart Mobility & EV Fleet Dispatch', demand: 16, supply: 22, ready: 11, gap: 'Surplus Supply 🟢' },
    { name: 'Cybersecurity & Zero-Trust GovCloud', demand: 12, supply: 5, ready: 2, gap: 'High Supply Gap ⚠' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="modern-card p-6 bg-white space-y-2">
        <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <span>Maharashtra Innovation Demand vs. Startup Supply Heatmap</span>
        </h1>
        <p className="text-xs text-slate-500">
          State-level policy intelligence highlighting public problem demand against verified deep-tech startup availability.
        </p>
      </div>

      {/* Supply vs Demand Sector Bars */}
      <div className="space-y-4">
        {sectors.map((sec) => (
          <div key={sec.name} className="modern-card p-6 bg-white space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-slate-900">{sec.name}</h3>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                sec.gap.includes('Gap') ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}>
                {sec.gap}
              </span>
            </div>

            {/* Demand Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-600">
                <span>Government Challenges Demand</span>
                <span className="font-bold">{sec.demand} Challenges</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${(sec.demand / 40) * 100}%` }}
                />
              </div>
            </div>

            {/* Supply Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-600">
                <span>Verified Startup Supply (Pilot-Ready: {sec.ready})</span>
                <span className="font-bold text-emerald-700">{sec.supply} Startups</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${(sec.supply / 40) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
