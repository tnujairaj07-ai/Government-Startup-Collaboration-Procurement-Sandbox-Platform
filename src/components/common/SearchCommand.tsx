import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Building2, Rocket, Award, Shield, 
  FileText, Activity, ShieldCheck, ArrowRight, X 
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';

export const SearchCommand: React.FC = () => {
  const { 
    isCommandPaletteOpen, setIsCommandPaletteOpen, 
    challenges, startups, contracts, telemetryFeeds,
    setSelectedChallengeId, setSelectedStartupId,
    setActiveTab, setCurrentRole
  } = usePlatform();

  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(!isCommandPaletteOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setIsCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const filteredChallenges = challenges.filter(c => 
    c.title.toLowerCase().includes(query.toLowerCase()) || 
    c.department.toLowerCase().includes(query.toLowerCase()) ||
    c.code.toLowerCase().includes(query.toLowerCase())
  );

  const filteredStartups = startups.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.tagline.toLowerCase().includes(query.toLowerCase()) ||
    s.domains.some(d => d.toLowerCase().includes(query.toLowerCase())) ||
    s.location.toLowerCase().includes(query.toLowerCase())
  );

  const filteredContracts = contracts.filter(c =>
    c.challengeTitle.toLowerCase().includes(query.toLowerCase()) ||
    c.contractCode.toLowerCase().includes(query.toLowerCase()) ||
    c.startupName.toLowerCase().includes(query.toLowerCase())
  );

  const filteredTelemetry = telemetryFeeds.filter(t =>
    t.pilotName.toLowerCase().includes(query.toLowerCase()) ||
    t.district.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-20 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCommandPaletteOpen(false)}
          className="fixed inset-0 bg-navy-900/50 backdrop-blur-md"
        />

        {/* Command Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/90 overflow-hidden z-10"
        >
          {/* Search Input Bar */}
          <div className="p-4 border-b border-slate-100 flex items-center gap-3">
            <Search className="w-5 h-5 text-brand-royal" />
            <input
              type="text"
              autoFocus
              placeholder="Search challenges, startups, pilots, contracts... (e.g. 'Water', 'AquaSense')"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-navy-900 text-sm placeholder:text-slate-400 font-medium"
            />
            <button
              onClick={() => setIsCommandPaletteOpen(false)}
              className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-navy-900"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto p-3 space-y-4 text-xs">
            {/* Quick Portal Switch */}
            <div>
              <div className="micro-label px-3 py-1 text-slate-400">Switch Workspace</div>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <button
                  onClick={() => {
                    setCurrentRole('gov');
                    setActiveTab('dashboard');
                    setIsCommandPaletteOpen(false);
                  }}
                  className="flex flex-col items-center p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-[#1D64EC] transition-colors text-center font-medium"
                >
                  <Building2 className="w-4 h-4 text-[#1D64EC] mb-1" />
                  <span className="text-[11px] font-bold">Government Department</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentRole('startup');
                    setActiveTab('dashboard');
                    setIsCommandPaletteOpen(false);
                  }}
                  className="flex flex-col items-center p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 transition-colors text-center font-medium"
                >
                  <Rocket className="w-4 h-4 text-emerald-600 mb-1" />
                  <span className="text-[11px] font-bold">Startup / Innovator</span>
                </button>
              </div>
            </div>

            {/* Challenges */}
            {filteredChallenges.length > 0 && (
              <div>
                <div className="micro-label px-3 py-1 text-slate-400">Government Challenges</div>
                <div className="space-y-1 mt-1">
                  {filteredChallenges.map(c => (
                    <div
                      key={c.id}
                      onClick={() => {
                        setSelectedChallengeId(c.id);
                        setActiveTab('challenges');
                        setIsCommandPaletteOpen(false);
                      }}
                      className="p-2.5 rounded-xl hover:bg-brand-sky-light/60 transition-colors flex items-center justify-between cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 text-brand-royal flex items-center justify-center font-bold text-[10px]">
                          {c.code.split('-')[2] || 'GOV'}
                        </div>
                        <div>
                          <p className="font-semibold text-navy-900 group-hover:text-brand-royal transition-colors line-clamp-1">
                            {c.title}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {c.department} • Budget: {c.budget}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-royal transition-transform group-hover:translate-x-0.5" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Startups */}
            {filteredStartups.length > 0 && (
              <div>
                <div className="micro-label px-3 py-1 text-slate-400">DPIIT Verified Startups</div>
                <div className="space-y-1 mt-1">
                  {filteredStartups.map(s => (
                    <div
                      key={s.id}
                      onClick={() => {
                        setSelectedStartupId(s.id);
                        setActiveTab('directory');
                        setIsCommandPaletteOpen(false);
                      }}
                      className="p-2.5 rounded-xl hover:bg-brand-sky-light/60 transition-colors flex items-center justify-between cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-navy-900 group-hover:text-brand-royal transition-colors">
                            {s.name}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {s.domains.join(', ')} • TRL {s.trl} • {s.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                          {s.matchScore}% Match
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-royal" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contracts */}
            {filteredContracts.length > 0 && (
              <div>
                <div className="micro-label px-3 py-1 text-slate-400">Pilot Agreements</div>
                <div className="space-y-1 mt-1">
                  {filteredContracts.map(ct => (
                    <div
                      key={ct.id}
                      onClick={() => {
                        setActiveTab('contracts');
                        setIsCommandPaletteOpen(false);
                      }}
                      className="p-2.5 rounded-xl hover:bg-brand-sky-light/60 transition-colors flex items-center justify-between cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-4 h-4 text-brand-royal" />
                        <div>
                          <p className="font-semibold text-navy-900 group-hover:text-brand-royal">
                            {ct.contractCode} — {ct.startupName}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            Value: {ct.totalValue} • Status: {ct.startupStatus === 'signed' ? 'Executed' : 'Pending e-Sign'}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-royal" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Telemetry */}
            {filteredTelemetry.length > 0 && (
              <div>
                <div className="micro-label px-3 py-1 text-slate-400">Live Pilot Telemetry Feeds</div>
                <div className="space-y-1 mt-1">
                  {filteredTelemetry.map(t => (
                    <div
                      key={t.id}
                      onClick={() => {
                        setActiveTab('monitor');
                        setIsCommandPaletteOpen(false);
                      }}
                      className="p-2.5 rounded-xl hover:bg-brand-sky-light/60 transition-colors flex items-center justify-between cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Activity className="w-4 h-4 text-emerald-600" />
                        <div>
                          <p className="font-semibold text-navy-900 group-hover:text-brand-royal">
                            {t.pilotName}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {t.district} • {t.activeSensors} Active Nodes • {t.currentWaterLossReduction}% Reduction
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-royal" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Tip: Press <kbd className="px-1.5 py-0.5 bg-white border rounded text-slate-600 font-mono">Esc</kbd> to close</span>
            <span>Mahatech Procure • Problem Statement 26136</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
