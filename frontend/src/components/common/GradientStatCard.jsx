import React from 'react';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

export default function GradientStatCard({
  title = "PILOT EFFICIENCY",
  value = "43%",
  subtitle = "Avg. Turnaround Acceleration",
  trend = "+28% vs. Baseline",
  icon: Icon
}) {
  return (
    <div className="stat-gradient-card p-6 flex flex-col justify-between h-full min-h-[160px]">
      <div className="flex items-start justify-between z-10">
        <div>
          <span className="text-[10px] font-bold tracking-widest text-cyan-200 uppercase">{title}</span>
          <h3 className="text-4xl font-black text-white mt-1 tracking-tight">{value}</h3>
        </div>
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-white/15 flex items-center justify-between text-xs text-white/80 z-10">
        <span className="text-[11px] truncate">{subtitle}</span>
        {trend && (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 font-bold text-[10px] border border-emerald-400/30">
            <TrendingUp className="w-3 h-3" />
            <span>{trend}</span>
          </span>
        )}
      </div>
    </div>
  );
}
