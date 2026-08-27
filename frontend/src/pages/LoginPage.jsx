import React from 'react';
import { useApp } from '../context/AppContext';
import { Building2, Rocket, ShieldCheck, UserCheck, ArrowRight, Lock } from 'lucide-react';

export default function LoginPage() {
  const { setPersona, setCurrentView, showToast } = useApp();

  const handleDemoLogin = (role, defaultView = 'dashboard') => {
    setPersona(role);
    setCurrentView(defaultView);
    showToast(`Logged in as ${role === 'gov' ? 'Government Nodal Officer' : role === 'startup' ? 'Startup Founder' : 'Policy Director'}`, 'success');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="max-w-xl w-full modern-card p-8 bg-white border border-slate-200/90 shadow-2xl space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-700 to-cyan-500 flex items-center justify-center text-white text-3xl mx-auto shadow-lg shadow-blue-500/25">
            🏛️
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">MahaInnovate</h1>
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest">
            Government Innovation Procurement & Evidence Platform
          </p>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            A trusted evidence bridge transforming public problems into verified startup pilots and direct GeM procurement scale-up.
          </p>
        </div>

        {/* Demo Fast-Track Roles Selector (Ref: Hackathon Showcase) */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center">
            Select Demo Account / Persona
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => handleDemoLogin('gov', 'dashboard')}
              className="p-4 rounded-xl border border-blue-200 bg-gradient-to-b from-blue-50/50 to-white hover:border-blue-500 hover:shadow-md transition text-left space-y-1.5 group"
            >
              <div className="flex items-center justify-between">
                <Building2 className="w-5 h-5 text-blue-600 group-hover:scale-110 transition" />
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">Primary Demo</span>
              </div>
              <p className="text-xs font-bold text-slate-900">Government Officer</p>
              <p className="text-[11px] text-slate-500">Post challenges, evaluate evidence, simulate scale & authorize pilots.</p>
            </button>

            <button
              onClick={() => handleDemoLogin('startup', 'dashboard')}
              className="p-4 rounded-xl border border-emerald-200 bg-gradient-to-b from-emerald-50/50 to-white hover:border-emerald-500 hover:shadow-md transition text-left space-y-1.5 group"
            >
              <div className="flex items-center justify-between">
                <Rocket className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition" />
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">Founder View</span>
              </div>
              <p className="text-xs font-bold text-slate-900">Startup Founder</p>
              <p className="text-[11px] text-slate-500">Manage Evidence Passport, bid on open challenges, and upload deliverables.</p>
            </button>

            <button
              onClick={() => handleDemoLogin('gov', 'evaluations')}
              className="p-4 rounded-xl border border-amber-200 bg-gradient-to-b from-amber-50/50 to-white hover:border-amber-500 hover:shadow-md transition text-left space-y-1.5 group"
            >
              <div className="flex items-center justify-between">
                <ShieldCheck className="w-5 h-5 text-amber-600 group-hover:scale-110 transition" />
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">Validator</span>
              </div>
              <p className="text-xs font-bold text-slate-900">Scientific Validator</p>
              <p className="text-[11px] text-slate-500">Independent technical scoring & mathematical KPI verification.</p>
            </button>

            <button
              onClick={() => handleDemoLogin('admin', 'dashboard')}
              className="p-4 rounded-xl border border-purple-200 bg-gradient-to-b from-purple-50/50 to-white hover:border-purple-500 hover:shadow-md transition text-left space-y-1.5 group"
            >
              <div className="flex items-center justify-between">
                <UserCheck className="w-5 h-5 text-purple-600 group-hover:scale-110 transition" />
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">Policy Hub</span>
              </div>
              <p className="text-xs font-bold text-slate-900">State Policy Admin</p>
              <p className="text-[11px] text-slate-500">Statewide innovation demand heatmaps & supply gap analysis.</p>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center pt-2 text-[11px] text-slate-400">
          Compliant with Maharashtra State Innovation Sandbox Policy & DPIIT Guidelines
        </div>
      </div>
    </div>
  );
}
