import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

export default function RadarCapabilityChart({
  data = [
    { subject: 'Technical Fit', candidate: 94, benchmark: 80, fullMark: 100 },
    { subject: 'Evidence Confidence', candidate: 91, benchmark: 75, fullMark: 100 },
    { subject: 'Pilot Readiness', candidate: 88, benchmark: 70, fullMark: 100 },
    { subject: 'Security / DPDP', candidate: 96, benchmark: 85, fullMark: 100 },
    { subject: 'Cost Efficiency', candidate: 82, benchmark: 70, fullMark: 100 },
    { subject: 'Scalability', candidate: 90, benchmark: 75, fullMark: 100 },
  ],
  candidateName = "RouteAI",
  benchmarkName = "Gov Baseline"
}) {
  return (
    <div className="w-full h-64 relative">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#475569', fontSize: 10, fontWeight: 600 }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9, fill: '#94a3b8' }} />
          <Radar
            name={candidateName}
            dataKey="candidate"
            stroke="#1a56db"
            fill="#2563eb"
            fillOpacity={0.4}
          />
          <Radar
            name={benchmarkName}
            dataKey="benchmark"
            stroke="#94a3b8"
            fill="#cbd5e1"
            fillOpacity={0.2}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              borderRadius: '8px',
              border: 'none',
              color: '#fff',
              fontSize: '11px',
              padding: '6px 10px'
            }}
          />
        </RadarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="absolute bottom-0 right-0 flex items-center space-x-3 text-[10px] bg-white/80 backdrop-blur-xs px-2 py-1 rounded-md border border-slate-200">
        <div className="flex items-center space-x-1">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
          <span className="font-bold text-slate-800">{candidateName}</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <span className="text-slate-500">{benchmarkName}</span>
        </div>
      </div>
    </div>
  );
}
