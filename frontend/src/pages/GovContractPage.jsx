import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FileSignature, ShieldCheck, CheckCircle2, Lock, ArrowRight, FileText, AlertTriangle } from 'lucide-react';

export default function GovContractPage() {
  const { activePilot, showToast, setCurrentView } = useApp();

  const [ipTermsApproved, setIpTermsApproved] = useState(true);
  const [cyberSlaApproved, setCyberSlaApproved] = useState(true);
  const [dpdpTermsApproved, setDpdpTermsApproved] = useState(true);
  const [signed, setSigned] = useState(true);

  const handleSignContract = () => {
    setSigned(true);
    showToast('Contract Approved & Digitally Signed by Municipal Commissioner!', 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
            <FileSignature className="w-5 h-5 text-blue-600" />
            <span>Sandbox Contract & Compliance Suite</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Binding legal agreement establishing Intellectual Property (IP) boundaries, CERT-In cybersecurity SLAs, and DPDP 2023 compliance.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            Status: Fully Executed Contract 🟢
          </span>
        </div>
      </div>

      {/* Contract Clauses Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Terms & Side-by-Side Clauses */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* IP Rights Card */}
          <div className="modern-card p-6 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <Lock className="w-4 h-4 text-blue-600" />
                <span>1. Intellectual Property (IP) Rights Clause</span>
              </h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Approved 🟢</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 text-slate-700">
              <p><strong>Background IP:</strong> Remains 100% proprietary to <strong>{activePilot.startup_name}</strong> (Algorithmic models, neural weights, and software codebase).</p>
              <p><strong>Foreground Solution:</strong> Government granted non-exclusive, perpetual sovereign usage license across all municipal departments in Maharashtra.</p>
            </div>
          </div>

          {/* Cybersecurity SLA Card */}
          <div className="modern-card p-6 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>2. Cybersecurity & CERT-In Compliance SLA</span>
              </h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Approved 🟢</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 text-slate-700">
              <p><strong>Encryption Standards:</strong> AES-256 in transit and at rest for all vehicle telemetry pings.</p>
              <p><strong>Audit Tier:</strong> CERT-In empanelled lab static code analysis & penetration test report valid for 12 months.</p>
              <p><strong>Incident SLA:</strong> Critical vulnerability patch turnaround within ≤ 4 hours.</p>
            </div>
          </div>

          {/* DPDP Act 2023 Data Privacy */}
          <div className="modern-card p-6 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>3. Sovereign Data Privacy (DPDP Act 2023)</span>
              </h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Approved 🟢</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 text-slate-700">
              <p><strong>Data Residency:</strong> 100% sovereign hosting on MeitY-empanelled India Cloud. No cross-border data transfer.</p>
              <p><strong>Purpose Limitation:</strong> Telemetry data restricted strictly to waste optimization testing with automatic 90-day anonymization.</p>
            </div>
          </div>

        </div>

        {/* Right 1 Col: Digital E-Sign Audit Box */}
        <div className="space-y-4">
          <div className="modern-card p-6 bg-white space-y-4 sticky top-24">
            <h3 className="text-sm font-bold text-slate-900">Digital Execution Certificate</h3>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1">
                <span className="text-[10px] font-bold uppercase text-blue-700">Government Signatory</span>
                <p className="font-bold text-slate-900">{activePilot.contract.gov_signer}</p>
                <span className="text-[10px] text-emerald-700 font-semibold flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Digitally Signed via DSC Token</span>
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <span className="text-[10px] font-bold uppercase text-emerald-700">Startup Signatory</span>
                <p className="font-bold text-slate-900">{activePilot.contract.startup_signer}</p>
                <span className="text-[10px] text-emerald-700 font-semibold flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Digitally Signed via Aadhaar e-Sign</span>
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setCurrentView('pilots')}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition flex items-center justify-center space-x-2"
              >
                <span>Enter Live Pilot Command Center &rarr;</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
