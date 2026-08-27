import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import PassportTicket from '../components/common/PassportTicket';
import { ShieldCheck, Plus, Upload, CheckCircle2, AlertCircle, Clock, FileText } from 'lucide-react';

export default function StartupPassportPage() {
  const { currentStartup, showToast } = useApp();

  const [newClaimTitle, setNewClaimTitle] = useState('');
  const [newClaimAuthority, setNewClaimAuthority] = useState('');

  const claimsList = [
    { title: "DPIIT Startup India Recognition", status: "Verified", color: "emerald", authority: "Ministry of Commerce" },
    { title: "Pune Municipal Waste Telemetry Pilot", status: "Verified", color: "emerald", authority: "PMC Commissionerate" },
    { title: "CERT-In Static Code & API Security Audit", status: "Verified", color: "emerald", authority: "CERT-In Empanelled Lab" },
    { title: "Autonomous Edge Neural Model Patent", status: "Submitted", color: "amber", authority: "Indian Patent Office" },
    { title: "Semi-Urban Edge Battery Longevity Trial", status: "Self-Declared", color: "blue", authority: "Internal Lab Benchmarks" },
  ];

  const handleAddClaim = (e) => {
    e.preventDefault();
    if (!newClaimTitle) return;
    showToast(`Claim "${newClaimTitle}" submitted to Government Verification Queue!`, 'success');
    setNewClaimTitle('');
    setNewClaimAuthority('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="modern-card p-6 bg-white space-y-2">
        <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-blue-600" />
          <span>Founder Evidence Passport Studio</span>
        </h1>
        <p className="text-xs text-slate-500">
          Manage your verified technology claims, past government deployment certificates, and security clearances.
        </p>
      </div>

      {/* Main Split: Passport Ticket on Left, Claims Manager on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left 1 Col: Passport Ticket */}
        <div>
          <PassportTicket
            startupName={currentStartup.name}
            dpiitNo={currentStartup.dpiit_no}
            baselineKPI="30% Baseline"
            targetKPI="≤20% Goal"
            actualKPI="18% Validated"
            status="Verified"
            onDownload={() => showToast('Official Evidence Passport downloaded!', 'success')}
          />
        </div>

        {/* Right 2 Cols: Claims Manager */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Claims Status Grid */}
          <div className="modern-card p-6 bg-white space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Your Evidence Claims Ledger</h3>

            <div className="space-y-3">
              {claimsList.map((cl, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">{cl.title}</p>
                      <p className="text-[10px] text-slate-500">Issuer: {cl.authority}</p>
                    </div>
                  </div>

                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    cl.color === 'emerald' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                    cl.color === 'amber' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                    'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    {cl.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Submit New Claim Form */}
          <div className="modern-card p-6 bg-white space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Submit New Verification Claim</h3>

            <form onSubmit={handleAddClaim} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Claim Title / Capability *</label>
                <input
                  type="text"
                  required
                  value={newClaimTitle}
                  onChange={(e) => setNewClaimTitle(e.target.value)}
                  placeholder="e.g. Edge Hardware Inference Acceleration 2.4x"
                  className="w-full text-xs border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Verifying Authority / Client Entity *</label>
                <input
                  type="text"
                  required
                  value={newClaimAuthority}
                  onChange={(e) => setNewClaimAuthority(e.target.value)}
                  placeholder="e.g. Municipal Corporation or Testing Lab"
                  className="w-full text-xs border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition flex items-center space-x-1.5"
                >
                  <Upload className="w-4 h-4" />
                  <span>Submit Claim for State Verification</span>
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
