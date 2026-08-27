import React from 'react';
import { useApp } from '../context/AppContext';
import PassportTicket from '../components/common/PassportTicket';
import { ShieldCheck, CheckCircle2, Award, FileText, ArrowRight, Lock, ExternalLink } from 'lucide-react';

export default function GovEvidencePage() {
  const { currentStartup, showToast, setCurrentView } = useApp();

  const handleDownloadPassport = () => {
    showToast(`Evidence Passport for ${currentStartup.name} generated & signed!`, 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <span>Evidence Passport & Claims Verification</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Cryptographically signed verification passport linking technology claims to underlying audit reports and pilot certificates.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('evaluations')}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition"
        >
          <span>Open Evaluation Workspace &rarr;</span>
        </button>
      </div>

      {/* Main Split: Ticket Pass (Image 1 Ref) on Left, Interactive Claims Tree on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left 1 Col: Boarding Pass Ticket */}
        <div className="space-y-4">
          <PassportTicket
            startupName={currentStartup.name}
            dpiitNo={currentStartup.dpiit_no}
            challengeTitle="Smart Waste Route Optimization"
            baselineKPI="30% Missed Pickups"
            targetKPI="≤20% Target"
            actualKPI="18% Validated"
            pilotDuration="60-Day Pilot (Day 42/60)"
            certInTier={currentStartup.evidence_passport?.security_tier || "Tier-1 Cleared"}
            hashId={currentStartup.evidence_passport?.hash || "SHA256:7F83...9069"}
            status="Verified"
            onDownload={handleDownloadPassport}
          />
        </div>

        {/* Right 2 Cols: Interactive Evidence Dependency Tree */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Passport Verification Matrix */}
          <div className="modern-card p-6 bg-white space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Verified Evidence Trust Ledger</h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                100% Validated
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Entity Identity</span>
                <p className="font-bold text-emerald-700 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>DPIIT Verified 🟢</span>
                </p>
                <p className="text-[10px] text-slate-500">Ministry of Commerce</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Past Deployments</span>
                <p className="font-bold text-emerald-700 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>4/4 Verified 🟢</span>
                </p>
                <p className="text-[10px] text-slate-500">Municipal Certificates</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Cybersecurity Audit</span>
                <p className="font-bold text-emerald-700 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>CERT-In Tier 1 🟢</span>
                </p>
                <p className="text-[10px] text-slate-500">Static/Dynamic Cleared</p>
              </div>
            </div>

            {/* Claims Graph Tree */}
            <div className="pt-3 border-t border-slate-100 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase">Interactive Evidence Tree</h4>

              <div className="space-y-2">
                {(currentStartup.evidence_passport?.claim_nodes || []).map((node) => (
                  <div
                    key={node.id}
                    className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 flex items-center justify-between hover:border-blue-300 transition"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{node.title}</p>
                        <p className="text-[11px] text-slate-500">Authority: {node.authority}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        {node.status}
                      </span>
                      <a
                        href="#inspect"
                        onClick={(e) => {
                          e.preventDefault();
                          showToast(`Opened audit file for ${node.title}`, 'info');
                        }}
                        className="p-1 text-blue-600 hover:text-blue-800"
                        title="View Certificate"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
