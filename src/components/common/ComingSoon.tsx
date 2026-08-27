import React from 'react';
import { Sparkles, Clock, ArrowLeft } from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';

interface ComingSoonProps {
  title: string;
  subtitle?: string;
  category?: string;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({ 
  title, 
  subtitle = 'This module is currently in development and will be available in the upcoming release.',
  category = 'Under Development'
}) => {
  const { setActiveTab } = usePlatform();

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="micro-label text-slate-400">{category}</span>
            <span className="w-2 h-2 rounded-full bg-[#1D64EC]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-display">
            {title}
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Main Coming Soon Card */}
      <div className="bg-white rounded-3xl p-12 sm:p-16 border border-slate-200/80 shadow-xs flex flex-col items-center justify-center text-center space-y-5 max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-3xl bg-blue-50 text-[#1D64EC] flex items-center justify-center shadow-xs">
          <Clock className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="px-3.5 py-1 rounded-full bg-blue-50 text-[#1D64EC] text-[11px] font-bold uppercase tracking-wider border border-blue-100">
            Coming Soon
          </span>
          <h2 className="text-2xl font-extrabold text-navy-900 font-display pt-1">
            Coming soon
          </h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            We are working hard to bring you the full <strong>{title}</strong> suite. Check back soon for updates.
          </p>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className="px-6 py-2.5 rounded-full bg-[#1D64EC] hover:bg-brand-cobalt text-white font-bold text-xs shadow-sm flex items-center gap-2 transition-all hover:scale-[1.02]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </button>
        </div>
      </div>

    </div>
  );
};
