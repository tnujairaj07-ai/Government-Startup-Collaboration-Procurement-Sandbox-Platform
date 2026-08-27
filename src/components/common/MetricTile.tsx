import React from 'react';
import clsx from 'clsx';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';

interface MetricTileProps {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    percentage: string;
    text?: string;
  };
  timeframe?: string;
  icon?: LucideIcon;
  variant?: 'gradient' | 'white' | 'glass';
  className?: string;
}

export const MetricTile: React.FC<MetricTileProps> = ({
  label,
  value,
  subValue,
  trend,
  timeframe = 'Live Telemetry',
  icon: Icon,
  className = '',
}) => {
  return (
    <div className={clsx(
      "rounded-3xl p-5 sm:p-6 bg-white border border-slate-200/80 shadow-xs text-navy-900 flex flex-col justify-between transition-all hover:shadow-sm",
      className
    )}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-extrabold tracking-[0.08em] uppercase text-slate-400">
          {label}
        </span>
        {Icon && (
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1D64EC] flex items-center justify-center">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="my-1.5">
        <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-navy-900 font-display">
          {value}
        </div>
        {subValue && (
          <div className="text-xs text-slate-500 font-medium mt-1 leading-snug">
            {subValue}
          </div>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        {trend ? (
          <div className={clsx(
            "flex items-center gap-1 font-bold text-xs",
            trend.direction === 'up' ? 'text-emerald-600' : 'text-rose-600'
          )}>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px] flex items-center gap-1">
              {trend.direction === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {trend.percentage}
            </span>
            {trend.text && <span className="text-slate-400 font-normal ml-0.5 text-[11px]">{trend.text}</span>}
          </div>
        ) : (
          <span className="text-slate-400 text-[11px] font-medium">Real-Time Synced</span>
        )}

        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
          {timeframe}
        </span>
      </div>
    </div>
  );
};
