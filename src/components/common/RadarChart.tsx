import React from 'react';
import { 
  Radar, RadarChart as RechartsRadar, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip 
} from 'recharts';
import { RadarMetric } from '../../types';

interface RadarProps {
  metrics: RadarMetric[];
  height?: number;
  showBenchmark?: boolean;
}

export const CapabilityRadarChart: React.FC<RadarProps> = ({
  metrics,
  height = 280,
  showBenchmark = true,
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div style={{ width: '100%', height }}>
        <ResponsiveContainer>
          <RechartsRadar cx="50%" cy="50%" outerRadius="75%" data={metrics}>
            <PolarGrid stroke="#CBD5E1" strokeDasharray="3 3" strokeOpacity={0.6} />
            <PolarAngleAxis 
              dataKey="attribute" 
              tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }}
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              tick={{ fill: '#94A3B8', fontSize: 9 }}
              stroke="#E2E8F0"
            />
            
            {showBenchmark && (
              <Radar
                name="Gov Baseline Benchmark"
                dataKey="benchmark"
                stroke="#94A3B8"
                strokeDasharray="4 4"
                fill="#94A3B8"
                fillOpacity={0.15}
              />
            )}

            <Radar
              name="Startup Capability"
              dataKey="value"
              stroke="#1D64EC"
              strokeWidth={2}
              fill="#38BDF8"
              fillOpacity={0.35}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-slate-200 shadow-glass text-xs">
                      <p className="font-bold text-navy-900 mb-1">{data.attribute}</p>
                      <p className="text-brand-royal font-semibold">
                        Startup Score: <span className="font-bold">{data.value}/100</span>
                      </p>
                      {showBenchmark && (
                        <p className="text-slate-400 text-[11px]">
                          Benchmark: {data.benchmark}/100
                        </p>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
          </RechartsRadar>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-6 mt-1 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-brand-royal/60 border border-brand-royal" />
          <span className="text-slate-600 font-medium">Startup Score</span>
        </div>
        {showBenchmark && (
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-slate-300 border border-dashed border-slate-400" />
            <span className="text-slate-500 font-medium">Gov Baseline</span>
          </div>
        )}
      </div>
    </div>
  );
};
