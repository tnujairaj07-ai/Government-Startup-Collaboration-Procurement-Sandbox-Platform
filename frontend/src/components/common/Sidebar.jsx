import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Puzzle, 
  Radar, 
  ShieldCheck, 
  Scale, 
  FlaskConical, 
  Lock, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2, 
  ShoppingCart, 
  BrainCircuit, 
  FileSignature, 
  BarChart3,
  Layers,
  Award,
  CreditCard,
  FileText,
  Building2,
  Users
} from 'lucide-react';

export default function Sidebar() {
  const { persona, currentView, setCurrentView } = useApp();

  const govNavItems = [
    { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
    { id: 'challenges', label: 'Challenges Studio', icon: Puzzle, badge: '24' },
    { id: 'startups', label: 'Startup Radar (3D)', icon: Radar, badge: 'AI Match' },
    { id: 'compare', label: 'Startup Matrix', icon: Scale },
    { id: 'evaluations', label: 'Screening & Eval', icon: Award },
    { id: 'contracts', label: 'Contract & Compliance', icon: FileSignature },
    { id: 'pilots', label: 'Pilot Sandbox', icon: FlaskConical, badge: '18 Live' },
    { id: 'payments', label: 'Milestone Escrow', icon: CreditCard },
    { id: 'data', label: 'Data Integrity', icon: Lock },
    { id: 'anomalies', label: 'Anomaly Center', icon: AlertTriangle, badgeColor: 'rose', badge: '2 Alerts' },
    { id: 'validation', label: 'Pilot Validation', icon: CheckCircle2 },
    { id: 'scale', label: 'Scale Simulator', icon: TrendingUp },
    { id: 'decisions', label: 'Decision Gate', icon: Layers },
    { id: 'procurement', label: 'Procurement (GeM)', icon: ShoppingCart },
    { id: 'knowledge', label: 'Knowledge Memory', icon: BrainCircuit },
    { id: 'analytics', label: 'Demand Heatmap', icon: BarChart3 },
  ];

  const startupNavItems = [
    { id: 'dashboard', label: 'Founder Dashboard', icon: LayoutDashboard },
    { id: 'challenges', label: 'Open Opportunities', icon: Puzzle, badge: 'Gov Bids' },
    { id: 'applications', label: 'Application Tracker', icon: FileText, badge: '3 Active' },
    { id: 'profile', label: 'Company Profile', icon: Building2 },
    { id: 'passport', label: 'Evidence Passport', icon: ShieldCheck, badge: '91/100' },
    { id: 'contracts', label: 'Contract & E-Sign', icon: FileSignature },
    { id: 'workspace', label: 'Active Pilot Workspace', icon: FlaskConical },
    { id: 'payments', label: 'Payments & Escrow', icon: CreditCard, badge: '₹4L Paid' },
    { id: 'procurement', label: 'GeM PAC Readiness', icon: ShoppingCart },
  ];

  const expertNavItems = [
    { id: 'dashboard', label: 'Validator Dashboard', icon: LayoutDashboard },
    { id: 'evaluations', label: 'Assigned Evaluations', icon: Award, badge: '8 Pending' },
    { id: 'evidence', label: 'Evidence Review Queue', icon: ShieldCheck, badge: '6 Reviews' },
    { id: 'validation', label: 'Pilot Validation Hub', icon: CheckCircle2, badge: '3 Validations' },
  ];

  const adminNavItems = [
    { id: 'dashboard', label: 'System Health', icon: LayoutDashboard },
    { id: 'verification', label: 'Verification Queue', icon: ShieldCheck, badge: '3 Pending' },
    { id: 'analytics', label: 'Demand vs Supply Gap', icon: BarChart3 },
    { id: 'data', label: 'System Audit Logs', icon: Lock },
  ];

  let items = govNavItems;
  if (persona === 'startup') items = startupNavItems;
  else if (persona === 'expert') items = expertNavItems;
  else if (persona === 'admin') items = adminNavItems;

  return (
    <aside className="w-64 bg-white/80 backdrop-blur-md border-r border-slate-200 min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between hidden md:flex">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {persona === 'gov' ? 'Government Command' :
           persona === 'startup' ? 'Startup Workspace' :
           persona === 'expert' ? 'Expert Evaluation' : 'Policy Administration'}
        </div>

        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : item.badgeColor === 'rose'
                      ? 'bg-rose-50 text-rose-600 border border-rose-200'
                      : 'bg-blue-50 text-blue-600 border border-blue-200'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Sidebar Footer */}
      <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50/50 rounded-xl border border-blue-100/80 text-[11px] space-y-1">
        <span className="font-bold text-blue-900 block">Sandbox Governance Active</span>
        <p className="text-[10px] text-blue-700 leading-tight">
          Evidence Verification, Escrow Payouts & GeM PAC Ready.
        </p>
      </div>
    </aside>
  );
}
