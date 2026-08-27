import React from 'react';

export default function RadialReadinessDial({
  score = 78,
  title = "Bio-Sync / Pilot Readiness",
  subtitle = "Evidence Confidence High",
  size = 130
}) {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Arc angle (e.g. 240 degrees for aesthetic gauge or 360)
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let colorClass = "text-blue-600";
  if (score >= 90) colorClass = "text-emerald-600";
  else if (score < 70) colorClass = "text-amber-500";

  return (
    <div className="flex flex-col items-center justify-center text-center p-3">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className={`${colorClass} transition-all duration-1000 ease-out`}
          />
        </svg>

        {/* Center Text */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-2xl font-black text-slate-900 tracking-tight">{score}</span>
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Score</span>
        </div>
      </div>

      <p className="text-xs font-bold text-slate-800 mt-2">{title}</p>
      {subtitle && <p className="text-[10px] text-slate-500">{subtitle}</p>}
    </div>
  );
}
