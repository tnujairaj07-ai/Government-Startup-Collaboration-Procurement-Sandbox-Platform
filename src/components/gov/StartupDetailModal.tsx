import React from 'react';
import { Modal } from '../common/Modal';
import { usePlatform } from '../../context/PlatformContext';
import { CapabilityRadarChart } from '../common/RadarChart';
import { StatusBadge } from '../common/StatusBadge';
import { 
  ShieldCheck, Award, FileCheck2, Cpu, MapPin, 
  Users, CheckCircle2, Lock, Download, Mail, Sparkles 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  startupId: string;
  onClose: () => void;
}

export const StartupDetailModal: React.FC<Props> = ({ startupId, onClose }) => {
  const { startups, addNotification } = usePlatform();
  const startup = startups.find(s => s.id === startupId) || startups[0];

  if (!startup) return null;

  const handleInvite = () => {
    addNotification({
      title: 'Challenge Invitation Dispatched',
      message: `Invitation to submit proposal dispatched to ${startup.name}.`,
      portal: 'both',
      type: 'success'
    });
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    onClose();
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={`${startup.name} — Verified Capability Dossier`}
      subtitle={`DPIIT Recognition: ${startup.dpiitNumber} • ${startup.location}`}
      maxWidth="5xl"
    >
      <div className="space-y-6">
        
        {/* Header Summary Banner */}
        <div className="p-5 rounded-3xl bg-gradient-to-r from-brand-sky-light via-white to-blue-50 border border-brand-sky flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={startup.logo}
              alt={startup.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-navy-900 font-display">{startup.name}</h3>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">{startup.tagline}</p>
              
              {/* Badge Row */}
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <StatusBadge label="DPIIT-recognized" variant="emerald" size="sm" icon="check" />
                <StatusBadge label="Maharashtra-based" variant="blue" size="sm" />
                <StatusBadge label="Pilot-ready" variant="violet" size="sm" />
              </div>
            </div>
          </div>

          <div className="text-right shrink-0 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-brand-sky shadow-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Gov AI Fit Score</div>
            <div className="text-3xl font-extrabold text-brand-royal font-display">{startup.matchScore}%</div>
            <span className="text-[10px] font-semibold text-emerald-600">Top Match for Water Leakage</span>
          </div>
        </div>

        {/* About & Key Achievements */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <div>
            <h4 className="text-sm font-bold text-navy-900 font-display mb-1">
              About {startup.name}
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {startup.summary}
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <span className="micro-label text-brand-cobalt block mb-2">Key Achievements</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {startup.achievements.map((ach, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mb-1.5" />
                  <span>{ach}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2-Column: Capability Radar vs Solution Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Radar Chart (5 cols) */}
          <div className="lg:col-span-5 p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="micro-label text-slate-400">Capability Radar</span>
                <StatusBadge label="Benchmark: State Baseline" variant="slate" size="sm" />
              </div>
              <CapabilityRadarChart metrics={startup.radarMetrics} height={260} />
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 mt-2">
              <span className="font-bold text-navy-900">Radar Axes: </span>
              Innovation, Feasibility, Scalability, Cost Efficiency, Security & Compliance, Team Strength.
            </div>
          </div>

          {/* Core Solution (AquaMind Platform) & Features (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="micro-label text-brand-royal">Core Solution</span>
                <span className="font-mono text-xs font-bold bg-brand-sky-light text-brand-cobalt px-2.5 py-1 rounded-full">
                  AquaMind Platform
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                A SaaS platform that ingests sensor data, runs leak-detection models, and provides actionable dashboards for utility engineers.
              </p>

              <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-royal" />
                  <span>Real-time leak alerts via SMS/WhatsApp</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-royal" />
                  <span>Predictive maintenance schedules</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-royal" />
                  <span>Integration with SCADA & GIS systems</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-royal" />
                  <span>Role-based access and audit logs</span>
                </div>
              </div>
            </div>

            {/* Compliance & Security Card */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-navy-900">{startup.cloudInfrastructure}</p>
                  <p className="text-[11px] text-slate-500">ISO 27001 certified processes • MeitY cloud compliant</p>
                </div>
              </div>
              <StatusBadge label="MeitY Empanelled" variant="emerald" size="sm" icon="shield" />
            </div>

          </div>
        </div>

        {/* Past Engagements Track Record */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-navy-900 font-display">
              Track Record & Past Municipal Engagements
            </h4>
            <span className="text-xs text-slate-400">{startup.deployments.length} deployments</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {startup.deployments.map(dep => (
              <div key={dep.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-navy-900">{dep.title}</span>
                  <StatusBadge label={dep.status} variant="emerald" size="sm" />
                </div>
                <p className="text-[11px] text-slate-500 font-medium">{dep.client} • {dep.year}</p>
                <div className="mt-2 pt-2 border-t border-slate-200/50 text-[11px] text-slate-600">
                  {dep.outcome}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
          <span className="text-xs text-slate-500">
            Contact: <strong className="text-navy-900">{startup.contactEmail}</strong> • Signatory: {startup.founderName}
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleInvite}
              className="px-5 py-2.5 rounded-full bg-brand-royal hover:bg-brand-cobalt text-white font-bold text-xs shadow-action flex items-center gap-1.5 transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Invite to Challenge</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-navy-900 font-bold text-xs transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </Modal>
  );
};
