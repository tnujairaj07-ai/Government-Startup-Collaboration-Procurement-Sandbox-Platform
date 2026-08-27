import React from 'react';
import { Check, Clock, AlertTriangle, ArrowRight, ShieldCheck, FileSignature, Rocket, ShoppingCart } from 'lucide-react';

const STAGES = [
  { key: 'screening', label: '1. Registered & Screening', icon: Clock },
  { key: 'expert_review', label: '2. Expert Technical Review', icon: ShieldCheck },
  { key: 'contract_approval', label: '3. Digital Contract & Compliance', icon: FileSignature },
  { key: 'active_sandbox', label: '4. Active Sandbox Work', icon: Rocket },
  { key: 'gem_transition', label: '5. GeM Scale-up & Procurement', icon: ShoppingCart },
];

export default function Stepper({ currentStage }) {
  const getStageIndex = (stage) => {
    const idx = STAGES.findIndex(s => s.key === stage);
    return idx === -1 ? 0 : idx;
  };

  const currentIndex = getStageIndex(currentStage);

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
            <span>Engagement Lifecycle Status</span>
            <span className="text-xs font-normal text-slate-500">• DPIIT & GeM Sandbox Workflow</span>
          </h3>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
          Step {currentIndex + 1} of {STAGES.length}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {STAGES.map((step, idx) => {
          const isDone = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const isPending = idx > currentIndex;
          const Icon = step.icon;

          return (
            <div
              key={step.key}
              className={`p-3 rounded-lg border transition-all ${
                isCurrent
                  ? 'bg-blue-50/80 border-blue-400 ring-2 ring-blue-500/20 shadow-xs'
                  : isDone
                  ? 'bg-emerald-50/60 border-emerald-300'
                  : 'bg-slate-50/60 border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isCurrent
                      ? 'bg-blue-600 text-white'
                      : isDone
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-300 text-slate-700'
                  }`}
                >
                  {isDone ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                </div>
                <Icon className={`w-4 h-4 ${isCurrent ? 'text-blue-600' : isDone ? 'text-emerald-600' : 'text-slate-400'}`} />
              </div>
              <p className={`text-xs font-semibold mt-2 ${isCurrent ? 'text-blue-900' : isDone ? 'text-emerald-900' : 'text-slate-600'}`}>
                {step.label}
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">
                {isCurrent ? 'In Progress' : isDone ? 'Completed' : 'Upcoming'}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
