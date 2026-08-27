import React from 'react';
import { useApp } from '../../context/AppContext';
import { Check, ChevronRight } from 'lucide-react';

const STAGES = [
  { id: 'problem', label: '1. Problem', view: 'challenges' },
  { id: 'discovery', label: '2. Discovery', view: 'startups' },
  { id: 'screening', label: '3. Screening', view: 'startups' },
  { id: 'evaluation', label: '4. Evaluation', view: 'evaluations' },
  { id: 'pilot', label: '5. Pilot', view: 'pilots' },
  { id: 'validation', label: '6. Validation', view: 'validation' },
  { id: 'scale', label: '7. Scale', view: 'scale' },
  { id: 'procurement', label: '8. Procurement', view: 'procurement' },
];

export default function PipelineBreadcrumb({ currentStage = 'pilot' }) {
  const { setCurrentView } = useApp();

  const getStageIndex = (stageId) => {
    const idx = STAGES.findIndex(s => s.id === stageId);
    return idx === -1 ? 4 : idx;
  };

  const activeIdx = getStageIndex(currentStage);

  return (
    <div className="hidden lg:flex items-center space-x-1 py-1.5 px-3 bg-slate-900/90 text-white rounded-xl shadow-inner border border-slate-700/60 overflow-x-auto text-[11px]">
      <span className="text-[10px] font-bold text-slate-400 uppercase mr-2 tracking-wider">
        Decision Gate:
      </span>
      {STAGES.map((s, idx) => {
        const isPast = idx < activeIdx;
        const isCurrent = idx === activeIdx;

        return (
          <React.Fragment key={s.id}>
            <button
              onClick={() => setCurrentView(s.view)}
              className={`flex items-center space-x-1 px-2 py-1 rounded-md font-bold transition ${
                isCurrent
                  ? 'bg-blue-600 text-white shadow-xs'
                  : isPast
                  ? 'text-emerald-400 hover:text-emerald-300'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {isPast && <Check className="w-3 h-3 text-emerald-400" />}
              <span>{s.label}</span>
            </button>
            {idx < STAGES.length - 1 && (
              <ChevronRight className="w-3 h-3 text-slate-600" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
