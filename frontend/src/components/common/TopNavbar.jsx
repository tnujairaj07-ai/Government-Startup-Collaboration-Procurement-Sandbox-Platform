import React from 'react';
import { useApp } from '../../context/AppContext';
import PipelineBreadcrumb from './PipelineBreadcrumb';
import { 
  Building2, 
  Rocket, 
  ShieldCheck, 
  Search, 
  Bell, 
  RotateCcw, 
  UserCheck, 
  Layers,
  LogOut,
  Award
} from 'lucide-react';

export default function TopNavbar() {
  const { 
    persona, 
    setPersona, 
    currentView, 
    setCurrentView, 
    handleResetData 
  } = useApp();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Tricolor Subtle Top Accent Border */}
      <div className="h-0.5 w-full bg-gradient-to-r from-amber-500 via-blue-600 to-emerald-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Identity */}
          <div 
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center space-x-3 cursor-pointer select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-cyan-500 flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/20">
              🏛️
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-base font-black tracking-tight text-slate-900">MahaInnovate</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  Sandbox Platform
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Gov–Startup Collaboration & Procurement Sandbox</p>
            </div>
          </div>

          {/* Persistent Decision Breadcrumb in Center */}
          <PipelineBreadcrumb currentStage={
            currentView === 'challenges' ? 'problem' :
            currentView === 'startups' ? 'discovery' :
            currentView === 'compare' ? 'screening' :
            currentView === 'evaluations' || currentView === 'contracts' ? 'evaluation' :
            currentView === 'pilots' || currentView === 'payments' ? 'pilot' :
            currentView === 'validation' ? 'validation' :
            currentView === 'scale' ? 'scale' :
            currentView === 'procurement' ? 'procurement' : 'pilot'
          } />

          {/* 4-Persona Switcher & Actions */}
          <div className="flex items-center space-x-3">
            
            {/* 4-Role Pill Switcher (Ref: Image 1) */}
            <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-full border border-slate-200 text-xs">
              <button
                onClick={() => {
                  setPersona('gov');
                  setCurrentView('dashboard');
                }}
                className={`pill-tab ${persona === 'gov' ? 'active' : 'inactive'}`}
              >
                Gov
              </button>
              <button
                onClick={() => {
                  setPersona('startup');
                  setCurrentView('dashboard');
                }}
                className={`pill-tab ${persona === 'startup' ? 'active' : 'inactive'}`}
              >
                Startup
              </button>
              <button
                onClick={() => {
                  setPersona('expert');
                  setCurrentView('dashboard');
                }}
                className={`pill-tab ${persona === 'expert' ? 'active' : 'inactive'}`}
              >
                Expert
              </button>
              <button
                onClick={() => {
                  setPersona('admin');
                  setCurrentView('dashboard');
                }}
                className={`pill-tab ${persona === 'admin' ? 'active' : 'inactive'}`}
              >
                Admin
              </button>
            </div>

            {/* Notification / Anomaly Bell */}
            <button
              onClick={() => {
                if (persona === 'gov') setCurrentView('anomalies');
              }}
              title="Data Integrity & Anomaly Alerts"
              className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition border border-transparent hover:border-slate-200"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>

            {/* Reset Button */}
            <button
              onClick={handleResetData}
              title="Reset Sandbox Mock State"
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Role Badge */}
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-800 to-slate-900 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                {persona === 'gov' ? 'GOV' : persona === 'startup' ? 'STP' : persona === 'expert' ? 'EXP' : 'ADM'}
              </div>
              <button
                onClick={() => setCurrentView('login')}
                title="Switch Account / Logout"
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
