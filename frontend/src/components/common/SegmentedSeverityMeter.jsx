import React from 'react';

export default function SegmentedSeverityMeter({
  value = 8, // out of 10
  max = 10,
  label = "Severity Meter & Action",
  type = "blue" // "blue" | "amber" | "rose" | "emerald"
}) {
  const segments = Array.from({ length: max }, (_, i) => i + 1);

  const getActiveClass = () => {
    switch (type) {
      case 'amber': return 'active-amber';
      case 'rose': return 'active-rose';
      case 'emerald': return 'active-emerald';
      case 'cyan': return 'active-cyan';
      default: return 'active-blue';
    }
  };

  return (
    <div className="space-y-1.5 w-full">
      <div className="flex items-center justify-between text-xs">
        <span className="text-[11px] font-bold text-slate-700">{label}</span>
        <span className="text-[11px] font-mono font-bold text-slate-900">{value}/{max}</span>
      </div>

      <div className="flex items-center space-x-1.5 w-full">
        {segments.map((num) => {
          const isActive = num <= value;
          return (
            <div
              key={num}
              className={`flex-1 tick-segment ${isActive ? getActiveClass() : ''}`}
            />
          );
        })}
      </div>
    </div>
  );
}
