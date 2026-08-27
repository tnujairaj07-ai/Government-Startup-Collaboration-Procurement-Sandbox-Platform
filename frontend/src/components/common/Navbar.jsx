import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  Rocket, 
  ShoppingCart, 
  ShieldCheck, 
  Search, 
  RotateCcw, 
  Bell, 
  Layers,
  FileCheck,
  Award,
  ChevronRight
} from 'lucide-react';

export default function Navbar() {
  const { 
    persona, 
    setPersona, 
    currentView, 
    setCurrentView, 
    currentStartup,
    startups,
    setSelectedStartupId,
    handleResetData 
  } = useApp();

  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-lg border-b border-slate-800">
      {/* Tricolor National Accent Strip */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-white to-emerald-600" />
      
      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Portal Identity */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentView('dashboard')}>
            <div className="w-10 h-10 rounded-lg bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-amber-400 font-bold text-xl shadow-inner">
              🏛️
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-base font-bold tracking-tight text-white">GovSandbox India</span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-blue-900/80 text-blue-300 border border-blue-700/50">
                  GeM Integrated
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Government-Startup Collaboration & Procurement Sandbox</p>
            </div>
          </div>

          {/* Persona Switcher / Role Selector */}
          <div className="flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700 shadow-inner">
            <button
              onClick={() => {
                setPersona('gov');
                setCurrentView('dashboard');
              }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                persona === 'gov'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-blue-200" />
              <span>Government Portal</span>
            </button>

            <button
              onClick={() => {
                setPersona('startup');
                setCurrentView('dashboard');
              }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                persona === 'startup'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <Rocket className="w-3.5 h-3.5 text-emerald-200" />
              <span>Startup Workspace</span>
            </button>

            <button
              onClick={() => {
                setPersona('gem');
                setCurrentView('gem-catalog');
              }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                persona === 'gem'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5 text-amber-200" />
              <span>GeM Gateway</span>
            </button>
          </div>

          {/* Active Context & Quick Actions */}
          <div className="flex items-center space-x-3">
            {persona === 'startup' && (
              <div className="hidden md:flex items-center space-x-2 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                <span className="text-[11px] text-slate-400">Startup:</span>
                <select
                  value={currentStartup?.id || ''}
                  onChange={(e) => setSelectedStartupId(e.target.value)}
                  className="bg-transparent text-xs font-medium text-emerald-400 focus:outline-none cursor-pointer"
                >
                  {startups.map(s => (
                    <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                      {s.name} ({s.sector})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={handleResetData}
              title="Reset Sandbox Mock Data"
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition border border-transparent hover:border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset State</span>
            </button>

            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 text-xs font-bold">
              {persona === 'gov' ? 'GOV' : persona === 'startup' ? 'STP' : 'GeM'}
            </div>
          </div>
        </div>

        {/* Sub-Navigation per Persona */}
        <div className="flex items-center space-x-1 py-2 border-t border-slate-800/80 overflow-x-auto text-xs scrollbar-none">
          {persona === 'gov' && (
            <>
              <NavTab active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} label="Overview Dashboard" />
              <NavTab active={currentView === 'startups'} onClick={() => setCurrentView('startups')} label="Startup Radar & Screening" badge="AI Matched" />
              <NavTab active={currentView === 'pipeline'} onClick={() => setCurrentView('pipeline')} label="Review Pipeline (Kanban)" badge="Evaluation" />
              <NavTab active={currentView === 'projects'} onClick={() => setCurrentView('projects')} label="Sandbox Project Monitor" />
              <NavTab active={currentView === 'challenges'} onClick={() => setCurrentView('challenges')} label="Challenge Studio" />
            </>
          )}

          {persona === 'startup' && (
            <>
              <NavTab active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} label="Startup Hub" />
              <NavTab active={currentView === 'challenges'} onClick={() => setCurrentView('challenges')} label="Government Challenges" badge="Open Grants" />
              <NavTab active={currentView === 'workspace'} onClick={() => setCurrentView('workspace')} label="Sandbox Work Area" badge="Milestones" />
              <NavTab active={currentView === 'contract'} onClick={() => setCurrentView('contract')} label="Digital E-Sign Suite" />
              <NavTab active={currentView === 'profile'} onClick={() => setCurrentView('profile')} label="Compliance & DPIIT Profile" />
            </>
          )}

          {persona === 'gem' && (
            <>
              <NavTab active={currentView === 'gem-catalog'} onClick={() => setCurrentView('gem-catalog')} label="GeM Direct Catalog (PAC)" />
              <NavTab active={currentView === 'gem-telemetry'} onClick={() => setCurrentView('gem-telemetry')} label="Sandbox Pilot Telemetry" />
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function NavTab({ active, onClick, label, badge }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-all flex items-center space-x-1.5 ${
        active 
          ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 font-semibold' 
          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
      }`}
    >
      <span>{label}</span>
      {badge && (
        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
          {badge}
        </span>
      )}
    </button>
  );
}
