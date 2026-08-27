import React, { useState } from 'react';
import { 
  PlusCircle, ArrowUpRight, Compass, ClipboardCheck, 
  Activity, ChevronRight, FileText, CheckCircle2, Clock, Sparkles, 
  Scale, Shield, User, MapPin, Mail, Phone, ExternalLink, 
  AlertTriangle, Download, ArrowRight, Building2, CheckSquare, 
  Calendar, Layers, FileCheck, ShieldCheck, X 
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { MetricTile } from '../common/MetricTile';
import { ProblemStatementModal } from './ProblemStatementModal';
import { StatusBadge } from '../common/StatusBadge';

export const GovDashboard: React.FC = () => {
  const { setActiveTab, addNotification } = usePlatform();

  const [isNewChallengeModalOpen, setIsNewChallengeModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [activeCaseStudyModal, setActiveCaseStudyModal] = useState<boolean>(false);

  // Official Profile Information
  const officialProfile = {
    name: 'Shri Rajesh Deshmukh',
    designation: 'Joint Secretary',
    department: 'Department of Urban Development & Water Resources',
    ministry: 'Government of Maharashtra',
    office: 'Room 412, 4th Floor, Mantralaya, Mumbai – 400032',
    userId: 'GOV-MH-UD-2024-0187',
    primaryRole: 'Nodal Officer – Mahatech Procure (Urban Development & Water Resources)',
    responsibilities: [
      'Approve departmental problem statements & innovation calls',
      'Review independent expert evaluations & pilot approvals',
      'Approve milestone escrow releases & bilateral contracts',
      'Oversee state-wide scale-up and GeM cataloging'
    ],
    status: 'Active',
    lastLogin: '27 Aug 2026, 09:14 IST',
    email: 'rajesh.deshmukh@maharashtra.gov.in',
    phone: '+91-22-2202 5555 (Ext. 4182)'
  };

  // Section 3: Pending Priorities Data
  const pendingActions = [
    {
      id: 'ACT-001',
      type: 'Challenge' as const,
      title: 'PS5: AI-based Stormwater Flood Prediction & Early Warning',
      zone: 'Pune / Western Ghats',
      dueIn: '2 days',
      status: 'Pending Your Approval',
      actionLabel: 'Review Call',
      targetTab: 'challenges'
    },
    {
      id: 'ACT-002',
      type: 'Pilot' as const,
      title: 'AquaSense Technologies – Zone A Leak Detection (M2 Milestone)',
      zone: 'Pune Municipal Zone A',
      dueIn: '5 days',
      status: 'Due for Milestone Review',
      actionLabel: 'Monitor Pilot',
      targetTab: 'monitor'
    },
    {
      id: 'ACT-003',
      type: 'Contract' as const,
      title: 'CleanBot Innovations – Waste Segregation Robot (Tranche M2)',
      zone: 'Navi Mumbai APMC',
      dueIn: '1 week',
      status: 'Pending Contract Sign-off',
      actionLabel: 'Approve Contract',
      targetTab: 'contracts'
    },
    {
      id: 'ACT-004',
      type: 'Evaluation' as const,
      title: 'PS2: Solid Waste Sorting – Expert Panel Deliberation (3 Startups)',
      zone: 'Urban Development',
      dueIn: '3 days',
      status: 'In Progress',
      actionLabel: 'Evaluate Shortlist',
      targetTab: 'expert_clearance'
    }
  ];

  // Section 4: Key Department Challenges
  const keyChallenges = [
    {
      id: 'PS1',
      psCode: 'PS1',
      title: 'Smart Water Loss Reduction in Urban Networks',
      status: 'In Pilot',
      proposalsReceived: 9,
      shortlistedCount: 3,
      leadOfficer: 'Shri Rajesh Deshmukh',
      department: 'Water Supply & Sanitation'
    },
    {
      id: 'PS2',
      psCode: 'PS2',
      title: 'Autonomous Solid Waste Segregation & Robotic Sorting',
      status: 'Expert Evaluation',
      proposalsReceived: 14,
      shortlistedCount: 2,
      leadOfficer: 'Shri Rajesh Deshmukh',
      department: 'Environment & Climate Change'
    },
    {
      id: 'PS5',
      psCode: 'PS5',
      title: 'AI-based Stormwater Flood Prediction & Early Warning',
      status: 'Open for Submissions',
      proposalsReceived: 6,
      shortlistedCount: 0,
      leadOfficer: 'Shri Rajesh Deshmukh',
      department: 'Disaster Management'
    }
  ];

  // Section 5: Active Pilots List
  const activePilots = [
    {
      ps: 'PS1: Smart Water Loss Reduction',
      startup: 'AquaSense Technologies',
      zone: 'Pune Zone A (120 km)',
      milestone: 'M2 (3-Month Review)',
      status: 'On Track',
      nextReview: '05 Sep 2026',
      action: 'Review Milestone'
    },
    {
      ps: 'PS2: Solid Waste Sorter',
      startup: 'CleanBot Innovations',
      zone: 'Navi Mumbai APMC Yard',
      milestone: 'M1 (Assembly & Rigging)',
      status: 'On Track',
      nextReview: '10 Sep 2026',
      action: 'Review Milestone'
    },
    {
      ps: 'PS3: Drone Crop Monitoring',
      startup: 'CropCare AI Labs',
      zone: 'Nashik Horticulture',
      milestone: 'M3 (Validation & GeM)',
      status: 'Completed',
      nextReview: '–',
      action: 'View Report'
    }
  ];

  // Section 6: Recent Contracts
  const recentContracts = [
    {
      title: 'Waste Segregation Robot – CleanBot Innovations LLP',
      ps: 'PS2: Municipal Solid Waste Automation',
      value: 'INR 42.0 Lakhs',
      status: 'Active',
      lastMilestone: 'M2 Completed',
      nextPayment: 'INR 16.8 Lakhs'
    },
    {
      title: 'Smart Water Leakage Interception – AquaSense Technologies',
      ps: 'PS1: Smart Water Loss Reduction',
      value: 'INR 35.0 Lakhs',
      status: 'Pending eSign',
      lastMilestone: 'M1 Approved',
      nextPayment: 'INR 10.5 Lakhs'
    }
  ];

  // Section 7: Audit Activity Feed
  const recentActivities = [
    { 
      type: 'Challenge', 
      title: 'Challenge published: “AI-based Traffic Signal Optimization”', 
      time: '1 day ago', 
      category: 'Procurement Notice', 
      user: 'Shri Rajesh Deshmukh' 
    },
    { 
      type: 'Proposal', 
      title: 'Proposal received: “NaviMumbai Smart Parking” from Parkly Solutions', 
      time: '2 days ago', 
      category: 'Bid Submission', 
      user: 'System Registry' 
    },
    { 
      type: 'Pilot', 
      title: 'Pilot milestone completed: “Drone-based Crop Health Monitoring” (M3 Handover)', 
      time: '3 days ago', 
      category: 'Field Validation', 
      user: 'District Pilot Officer' 
    },
    { 
      type: 'Contract', 
      title: 'Contract approved: “Waste Segregation Robot” with CleanBot Innovations', 
      time: 'Last week', 
      category: 'Statutory Sign-off', 
      user: 'Secretary (UD)' 
    },
    { 
      type: 'Evaluation', 
      title: 'Expert evaluation completed: PS1 – 3 startups evaluated by COEP / VJTI panel', 
      time: 'Last week', 
      category: 'Technical Rubric', 
      user: 'Dr. Meera Deshmukh' 
    }
  ];

  const handleDownloadDepartmentReport = () => {
    addNotification({
      title: 'Department Report Generated',
      message: 'Downloading comprehensive executive audit report for Urban Development & Water Resources (PDF).',
      portal: 'gov',
      type: 'success'
    });
  };

  return (
    <div className="space-y-6">
      
      {/* ========================================================================= */}
      {/* SECTION 1: OFFICIAL PROFILE & ROLE SUMMARY (Profile-like Header Band) */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        
        {/* Top Identification Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          
          {/* Left: Identity */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#1D64EC] text-white flex items-center justify-center text-xl font-bold font-display shadow-md shrink-0">
              RD
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl font-extrabold text-navy-900 font-display">
                  {officialProfile.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {officialProfile.status}
                </span>
              </div>
              
              <p className="text-xs font-semibold text-[#1D64EC]">
                {officialProfile.designation} • {officialProfile.department}
              </p>
              
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 mt-1 font-medium">
                <span className="flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-slate-400" />
                  {officialProfile.office}
                </span>
                <span>•</span>
                <span className="font-mono text-slate-400">UID: {officialProfile.userId}</span>
              </div>
            </div>
          </div>

          {/* Right: Contact & Action */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto shrink-0">
            <div className="text-left sm:text-right text-xs space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Last Active Session</span>
              <p className="font-bold text-navy-900 font-mono text-[11px]">{officialProfile.lastLogin}</p>
              <div className="flex items-center sm:justify-end gap-2 text-slate-500 text-[11px] pt-1">
                <Mail className="w-3 h-3 text-slate-400" />
                <span>{officialProfile.email}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsProfileModalOpen(true)}
              className="px-4 py-2 rounded-full bg-slate-100 hover:bg-[#1D64EC] hover:text-white text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <User className="w-3.5 h-3.5" />
              <span>View Full Profile</span>
            </button>
          </div>

        </div>

        {/* Bottom Mandate & Responsibilities Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
          <div className="md:col-span-4 p-4 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-1">
            <span className="micro-label text-[#1D64EC] block">Primary Mandate</span>
            <p className="font-bold text-navy-900 leading-snug">{officialProfile.primaryRole}</p>
          </div>

          <div className="md:col-span-8 p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
            <span className="micro-label text-slate-400 block">Key Assigned Responsibilities</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-slate-700 font-medium">
              {officialProfile.responsibilities.map((resp, idx) => (
                <div key={idx} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{resp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: KEY METRICS AT A GLANCE (KPI Cards) */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-navy-900 font-display">
            Department Overview – Urban Development & Water Resources
          </h2>
          <span className="text-xs font-bold text-slate-400 font-mono">Real-time Portal Telemetry</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
          
          {/* Card 1: Active Challenges */}
          <div 
            onClick={() => setActiveTab('challenges')}
            className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#1D64EC]/40 transition-all cursor-pointer group"
          >
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Active Challenges</span>
            <div className="text-2xl font-extrabold text-navy-900 font-display">12</div>
            <p className="text-[11px] text-[#1D64EC] font-semibold mt-1">4 new this month</p>
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 group-hover:text-[#1D64EC]">
              <span>View All Challenges</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Card 2: Startups Engaged */}
          <div 
            onClick={() => setActiveTab('directory')}
            className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#1D64EC]/40 transition-all cursor-pointer group"
          >
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Startups Engaged</span>
            <div className="text-2xl font-extrabold text-navy-900 font-display">37</div>
            <p className="text-[11px] text-emerald-700 font-semibold mt-1">18 shortlisted, 9 in pilot</p>
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 group-hover:text-[#1D64EC]">
              <span>View Portfolio</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Card 3: Pilots in Progress */}
          <div 
            onClick={() => setActiveTab('monitor')}
            className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#1D64EC]/40 transition-all cursor-pointer group"
          >
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Pilots in Progress</span>
            <div className="text-2xl font-extrabold text-navy-900 font-display">9</div>
            <p className="text-[11px] text-amber-700 font-semibold mt-1">2 due for review</p>
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 group-hover:text-[#1D64EC]">
              <span>Monitor Pilots</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Card 4: Solutions Scaled */}
          <div 
            onClick={() => setActiveTab('monitor')}
            className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#1D64EC]/40 transition-all cursor-pointer group"
          >
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Solutions Scaled</span>
            <div className="text-2xl font-extrabold text-navy-900 font-display">5</div>
            <p className="text-[11px] text-purple-700 font-semibold mt-1">Across 3 districts</p>
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 group-hover:text-[#1D64EC]">
              <span>View Scaled</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Card 5: Contracts Approved */}
          <div 
            onClick={() => setActiveTab('contracts')}
            className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#1D64EC]/40 transition-all cursor-pointer group"
          >
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Contracts Approved</span>
            <div className="text-2xl font-extrabold text-navy-900 font-display">14</div>
            <p className="text-[11px] text-slate-600 font-semibold mt-1">Total: INR 4.8 Cr</p>
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 group-hover:text-[#1D64EC]">
              <span>View Contracts</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Card 6: Pending Approvals */}
          <div 
            onClick={() => setActiveTab('contracts')}
            className="bg-white rounded-3xl p-5 border border-amber-200 shadow-xs hover:shadow-md transition-all cursor-pointer group bg-amber-50/30"
          >
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block mb-1">Pending Approvals</span>
            <div className="text-2xl font-extrabold text-amber-900 font-display">6</div>
            <p className="text-[11px] text-amber-700 font-semibold mt-1">3 PS, 2 Pilots, 1 CTR</p>
            <div className="pt-3 mt-3 border-t border-amber-200 flex items-center justify-between text-[10px] font-bold text-amber-800 group-hover:underline">
              <span>Review Items</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 3: MY PRIORITIES & PENDING ACTIONS (Task List) */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-navy-900 font-display">
              Pending Actions & Priorities
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Urgent statutory approvals, milestone verifications, and contract ratifications requiring your sign-off.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-[11px] font-bold border border-rose-200">
            4 Actions Pending
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-navy-900 border-b border-slate-200">
                <th className="py-3 px-4 font-bold">Type</th>
                <th className="py-3 px-4 font-bold">Item & Scope</th>
                <th className="py-3 px-4 font-bold">Zone / Department</th>
                <th className="py-3 px-4 font-bold">Due In</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {pendingActions.map((act) => (
                <tr key={act.id} className="hover:bg-slate-50/60 transition-colors">
                  
                  {/* Type */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      act.type === 'Challenge' ? 'bg-blue-50 text-[#1D64EC] border border-blue-200' :
                      act.type === 'Pilot' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                      act.type === 'Contract' ? 'bg-purple-50 text-purple-800 border border-purple-200' :
                      'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {act.type}
                    </span>
                  </td>

                  {/* Title */}
                  <td className="py-3.5 px-4 font-bold text-navy-900 max-w-sm">
                    {act.title}
                  </td>

                  {/* Zone */}
                  <td className="py-3.5 px-4 text-slate-600 font-medium whitespace-nowrap">
                    {act.zone}
                  </td>

                  {/* Due In */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-800 font-bold text-[11px]">
                      {act.dueIn}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 font-semibold text-slate-700 whitespace-nowrap">
                    {act.status}
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => setActiveTab(act.targetTab as any)}
                      className="px-3.5 py-1.5 rounded-full bg-[#1D64EC] hover:bg-brand-cobalt text-white font-bold text-[11px] shadow-2xs transition-colors"
                    >
                      {act.actionLabel}
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={() => setActiveTab('challenges')}
            className="text-xs font-bold text-[#1D64EC] hover:underline flex items-center gap-1"
          >
            <span>View All Pending Actions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 4 & 5: 2-COLUMN CHALLENGES OVERVIEW & PILOT ENGAGEMENTS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Challenges & Problem Statements Overview (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-navy-900 font-display">
                  Challenges & Problem Statements
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Track published calls, proposals received, and active shortlists.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsNewChallengeModalOpen(true)}
                className="px-3 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 text-[#1D64EC] font-bold text-xs border border-blue-200 transition-colors flex items-center gap-1"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>New Call</span>
              </button>
            </div>

            {/* Summary Stats Strip */}
            <div className="grid grid-cols-3 gap-2 py-3 text-center">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Published</span>
                <strong className="text-sm font-extrabold text-navy-900">10 / 12</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Proposals</span>
                <strong className="text-sm font-extrabold text-[#1D64EC]">84</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Shortlisted</span>
                <strong className="text-sm font-extrabold text-emerald-800">18</strong>
              </div>
            </div>

            {/* Challenges Cards */}
            <div className="space-y-2.5 pt-1">
              {keyChallenges.map((ch) => (
                <div
                  key={ch.id}
                  onClick={() => setActiveTab('challenges')}
                  className="p-3.5 rounded-2xl bg-slate-50/80 hover:bg-blue-50/50 border border-slate-100 hover:border-blue-200 transition-all cursor-pointer space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-[#1D64EC]">{ch.psCode} • {ch.department}</span>
                    <StatusBadge label={ch.status} variant={ch.status === 'In Pilot' ? 'emerald' : ch.status === 'Expert Evaluation' ? 'violet' : 'blue'} size="sm" />
                  </div>
                  <h4 className="font-bold text-xs text-navy-900 leading-snug">{ch.title}</h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>Proposals: <strong className="text-navy-900">{ch.proposalsReceived}</strong></span>
                    <span>Shortlisted: <strong className="text-navy-900">{ch.shortlistedCount} startups</strong></span>
                    <span className="text-slate-400">Lead: {ch.leadOfficer.split(' ')[1]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setActiveTab('challenges')}
              className="text-xs font-bold text-[#1D64EC] hover:underline flex items-center gap-1"
            >
              <span>Manage All Problem Statements</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Pilots & Startup Engagements (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-navy-900 font-display">
                  Pilots & Startup Engagements
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Monitor ongoing pilots, milestones, and field telemetry.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                9 Active
              </span>
            </div>

            {/* Summary Strip */}
            <div className="grid grid-cols-3 gap-2 py-3 text-center">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">In Review</span>
                <strong className="text-sm font-extrabold text-amber-800">2 Due</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Completed (6M)</span>
                <strong className="text-sm font-extrabold text-navy-900">7 Pilots</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Escalations</span>
                <strong className="text-sm font-extrabold text-slate-500">0 Critical</strong>
              </div>
            </div>

            {/* Active Pilots Rows */}
            <div className="space-y-2 pt-1">
              {activePilots.map((p, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <h5 className="font-bold text-navy-900">{p.startup}</h5>
                    <p className="text-[11px] text-slate-500">{p.ps} • {p.zone}</p>
                    <span className="text-[10px] text-emerald-700 font-bold mt-0.5 block">{p.milestone} — {p.status}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveTab('monitor')}
                    className="px-3 py-1.5 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-[11px] shrink-0 transition-colors"
                  >
                    {p.action}
                  </button>
                </div>
              ))}
            </div>

            {/* Flagship Pilot Highlight Box */}
            <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs mt-3 flex items-start justify-between gap-2">
              <div>
                <strong className="text-navy-900 block font-bold">Flagship Pilot Highlight:</strong>
                <p className="text-slate-600 leading-relaxed mt-0.5">AI-powered Water Leakage Detection (Pune Zone A) has achieved <strong className="text-[#1D64EC]">18.4% NRW reduction</strong> over 6 months.</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveCaseStudyModal(true)}
                className="text-[11px] font-bold text-[#1D64EC] hover:underline shrink-0 whitespace-nowrap mt-1"
              >
                View Case Study
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setActiveTab('monitor')}
              className="text-xs font-bold text-[#1D64EC] hover:underline flex items-center gap-1"
            >
              <span>Monitor All Pilots</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* SECTION 6: CONTRACTS & APPROVALS */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-navy-900 font-display">
              Contracts & Approvals
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Track approved bilateral contracts, milestone escrow disbursements, and compliance orders.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="text-slate-500">YTD Ratified: <strong>14 Contracts</strong></span>
            <span>•</span>
            <span className="text-[#1D64EC]">Value: <strong>INR 4.8 Cr</strong></span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentContracts.map((ctr, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{ctr.ps}</span>
                  <StatusBadge label={ctr.status} variant={ctr.status === 'Active' ? 'emerald' : 'amber'} size="sm" />
                </div>
                <h4 className="font-bold text-sm text-navy-900 leading-snug">{ctr.title}</h4>
                <div className="flex items-center gap-3 text-xs text-slate-600 mt-2 font-medium">
                  <span>Contract Value: <strong className="text-navy-900">{ctr.value}</strong></span>
                  <span>•</span>
                  <span>{ctr.lastMilestone}</span>
                </div>
                <p className="text-xs text-emerald-800 font-semibold mt-1">Next Escrow Release: {ctr.nextPayment}</p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveTab('contracts')}
                  className="px-4 py-1.5 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs transition-colors"
                >
                  View Contract
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('contracts')}
                  className="px-4 py-1.5 rounded-full bg-[#1D64EC] hover:bg-brand-cobalt text-white font-bold text-xs shadow-2xs transition-colors"
                >
                  Approve Payment
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={() => setActiveTab('contracts')}
            className="text-xs font-bold text-[#1D64EC] hover:underline flex items-center gap-1"
          >
            <span>View All Contracts & Compliance Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 7 & 8: RECENT ACTIVITY (AUDIT TRAIL) & QUICK ACTIONS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Recent Activity & Audit Trail (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-navy-900 font-display">
                Recent Activity & Audit Trail
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time challenge submissions, milestone approvals, and contract ratifications.
              </p>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="space-y-3">
            {recentActivities.map((act, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-center justify-between gap-3 hover:bg-blue-50/40 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    act.type === 'Challenge' ? 'bg-blue-50 text-[#1D64EC]' :
                    act.type === 'Proposal' ? 'bg-purple-50 text-purple-600' :
                    act.type === 'Pilot' ? 'bg-emerald-50 text-emerald-600' :
                    act.type === 'Contract' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {act.type === 'Challenge' ? <FileText className="w-4 h-4" /> :
                     act.type === 'Proposal' ? <Sparkles className="w-4 h-4" /> :
                     act.type === 'Pilot' ? <CheckCircle2 className="w-4 h-4" /> :
                     act.type === 'Contract' ? <Scale className="w-4 h-4" /> : <ClipboardCheck className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-navy-900 leading-snug">{act.title}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5 font-medium">
                      <span>{act.time}</span>
                      <span>•</span>
                      <span className="text-slate-600">{act.category}</span>
                      <span>•</span>
                      <span className="font-mono">{act.user}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleDownloadDepartmentReport}
              className="text-xs font-bold text-[#1D64EC] hover:underline flex items-center gap-1"
            >
              <span>View Full Activity Log & Compliance Trail</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Quick Actions & Command Shortcuts (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-navy-900 font-display">
                Quick Actions
              </h3>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Shortcuts</span>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => setIsNewChallengeModalOpen(true)}
                className="w-full p-2.5 px-3.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200/80 text-navy-900 font-bold text-xs flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <PlusCircle className="w-4 h-4 text-[#1D64EC]" />
                  <span>Create New Challenge</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1D64EC]" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('challenges')}
                className="w-full p-2.5 px-3.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200/80 text-navy-900 font-bold text-xs flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-slate-600" />
                  <span>Manage Problem Statements</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1D64EC]" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('directory')}
                className="w-full p-2.5 px-3.5 rounded-xl bg-slate-50 hover:bg-purple-50 border border-slate-200/80 text-navy-900 font-bold text-xs flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Compass className="w-4 h-4 text-purple-600" />
                  <span>Browse Startups</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('expert_clearance')}
                className="w-full p-2.5 px-3.5 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200/80 text-navy-900 font-bold text-xs flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <ClipboardCheck className="w-4 h-4 text-amber-600" />
                  <span>Review Expert Evaluations</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('monitor')}
                className="w-full p-2.5 px-3.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 text-navy-900 font-bold text-xs flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Activity className="w-4 h-4 text-emerald-600" />
                  <span>Monitor Active Pilots</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('contracts')}
                className="w-full p-2.5 px-3.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200/80 text-navy-900 font-bold text-xs flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Scale className="w-4 h-4 text-[#1D64EC]" />
                  <span>Approve Contracts</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1D64EC]" />
              </button>
            </div>

            {/* Frequent PS Quick Links */}
            <div className="pt-3 border-t border-slate-100 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Frequent Problem Statements</span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveTab('challenges')}
                  className="px-2.5 py-1 rounded-lg bg-blue-50 text-[#1D64EC] text-[10px] font-bold border border-blue-100 hover:bg-blue-100"
                >
                  PS1: Water Loss Reduction
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('challenges')}
                  className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 text-[10px] font-bold border border-purple-100 hover:bg-purple-100"
                >
                  PS5: Stormwater Flood
                </button>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={handleDownloadDepartmentReport}
              className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Department Report (PDF)</span>
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: OFFICIAL FULL PROFILE MODAL */}
      {/* ========================================================================= */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#1D64EC] text-white flex items-center justify-center text-lg font-bold font-display shadow-sm">
                  RD
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy-900 font-display">
                    {officialProfile.name}
                  </h3>
                  <p className="text-xs text-slate-500">{officialProfile.designation} • {officialProfile.userId}</p>
                </div>
              </div>

              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs"
              >
                ×
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Government Cadre & Office</span>
                <p className="font-bold text-navy-900">{officialProfile.department}, {officialProfile.ministry}</p>
                <p className="text-slate-600">{officialProfile.office}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Platform Delegation & Nodal Authority</span>
                <p className="font-bold text-[#1D64EC]">{officialProfile.primaryRole}</p>
                <p className="text-slate-600">Authorized for financial sign-offs up to INR 50 Lakhs per pilot under Government Resolution (GR) No. WTR-2026/081.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Digital Signing & Security Key</span>
                <p className="text-slate-700 font-mono">UIDAI Aadhaar eSign Stamped (Certificate Serial: MH-EGOV-89412-2026)</p>
                <p className="text-emerald-700 font-bold">CERT-In Two-Factor Security Enforced</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(false)}
                className="px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: CASE STUDY MODAL */}
      {/* ========================================================================= */}
      {activeCaseStudyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-4 border border-slate-200 shadow-2xl">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D64EC]">Maharashtra Flagship Case Study</span>
                <h3 className="text-lg font-bold text-navy-900 font-display mt-0.5">
                  AI-powered Water Leakage Detection (Pune Zone A)
                </h3>
              </div>
              <button
                onClick={() => setActiveCaseStudyModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs"
              >
                ×
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
              <p>
                Deployed across 120 km of pressurized municipal water distribution pipelines in Pune Zone A, <strong>AquaSense Technologies</strong> utilized non-invasive acoustic sensors and edge Fourier wavelet transforms to intercept 42 hidden underground leaks before surface rupture.
              </p>
              <div className="grid grid-cols-3 gap-2 py-2 text-center">
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                  <span className="text-[10px] text-emerald-800 uppercase block font-bold">NRW Loss Drop</span>
                  <strong className="text-sm font-extrabold text-emerald-900">18.4%</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100">
                  <span className="text-[10px] text-[#1D64EC] uppercase block font-bold">Alert Latency</span>
                  <strong className="text-sm font-extrabold text-navy-900">&lt; 15 mins</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-100">
                  <span className="text-[10px] text-purple-700 uppercase block font-bold">Est. Water Saved</span>
                  <strong className="text-sm font-extrabold text-navy-900">420 ML</strong>
                </div>
              </div>
              <p className="text-slate-500 font-medium">
                The solution has been cataloged under GeM Fast-Track and approved for statewide replication across 8 municipal corporations.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveCaseStudyModal(false)}
                className="px-5 py-2 rounded-full bg-[#1D64EC] hover:bg-brand-cobalt text-white font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Challenge Creation Modal */}
      <ProblemStatementModal
        isOpen={isNewChallengeModalOpen}
        onClose={() => setIsNewChallengeModalOpen(false)}
      />

    </div>
  );
};
