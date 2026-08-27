import React from 'react';

export default function MetricCard({ title, value, subtitle, icon: Icon, change, trend = 'up', color = 'blue' }) {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    amber: 'bg-amber-50 text-amber-600 border-amber-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    rose: 'bg-rose-50 text-rose-600 border-rose-200',
  };

  return (
    <div className="gov-card p-5 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
        </div>
        {Icon && (
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-xs ${colorMap[color] || colorMap.blue}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
      {(subtitle || change) && (
        <div className="mt-3 flex items-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          {change && (
            <span className={`font-semibold mr-1.5 ${trend === 'up' ? 'text-emerald-600' : 'text-slate-600'}`}>
              {change}
            </span>
          )}
          <span>{subtitle}</span>
        </div>
      )}
    </div>
  );
}
