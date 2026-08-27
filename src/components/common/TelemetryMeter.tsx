import React from 'react';
import clsx from 'clsx';

interface TelemetryMeterProps {
  label: string;
  currentValue: number; // 0 to max
  maxValue?: number;
  totalSegments?: number;
  unit?: string;
  targetThreshold?: string;
  variant?: 'blue' | 'emerald' | 'amber' | 'crimson';
  className?: string;
}

export const TelemetryMeter: React.FC<TelemetryMeterProps> = ({
  label,
  currentValue,
  maxValue = 10,
  totalSegments = 10,
  unit = '',
  targetThreshold,
  variant = 'blue',
  className = '',
}) => {
  const percentage = Math.min(Math.max((currentValue / maxValue) * 100, 0), 100);
  const activeSegmentsCount = Math.round((percentage / 100) * totalSegments);

  const activeColorClasses = {
    blue: 'bg-brand-royal shadow-sm',
    emerald: 'bg-emerald-500 shadow-sm',
    amber: 'bg-amber-500 shadow-sm',
    crimson: 'bg-rose-500 shadow-sm',
  };

  return (
    <div className={clsx("w-full bg-white/70 backdrop-blur-md rounded-xl p-3 border border-white/80", className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-bold tracking-[0.08em] uppercase text-slate-500">
          {label}
        </span>
        <div className="flex items-center gap-1.5">
          {targetThreshold && (
            <span className="text-[10px] text-slate-400 font-medium mr-1">
              Target: {targetThreshold}
            </span>
          )}
          <span className="text-xs font-bold text-navy-900 font-display">
            {currentValue}{unit} <span className="text-slate-400 font-normal">/ {maxValue}{unit}</span>
          </span>
        </div>
      </div>

      {/* Capsule Bars */}
      <div className="flex items-center gap-1.5 w-full h-3">
        {Array.from({ length: totalSegments }).map((_, index) => {
          const isActive = index < activeSegmentsCount;
          return (
            <div
              key={index}
              className={clsx(
                "flex-1 h-full rounded-full transition-all duration-300",
                isActive 
                  ? activeColorClasses[variant]
                  : "bg-slate-200/80"
              )}
            />
          );
        })}
      </div>
    </div>
  );
};
