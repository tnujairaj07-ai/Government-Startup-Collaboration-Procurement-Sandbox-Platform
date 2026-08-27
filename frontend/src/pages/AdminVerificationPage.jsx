import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, CheckCircle2, XCircle, Clock, FileText, ArrowLeft } from 'lucide-react';

export default function AdminVerificationPage() {
  const { verificationQueue, setVerificationQueue, showToast } = useApp();

  const handleVerifyClaim = (id, approved = true) => {
    setVerificationQueue(verificationQueue.map(item => 
      item.id === id ? { ...item, status: approved ? "Verified 🟢" : "Rejected 🔴" } : item
    ));
    showToast(`Claim ${id} ${approved ? 'Verified & Published to Passport' : 'Rejected'}!`, approved ? 'success' : 'info');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="modern-card p-6 bg-white space-y-2">
        <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-purple-600" />
          <span>State Verification & Trust Accreditation Queue</span>
        </h1>
        <p className="text-xs text-slate-500">
          Administer and review pending startup DPIIT certificates, municipal deployment references, and cybersecurity audit reports.
        </p>
      </div>

      {/* Verification Items List */}
      <div className="modern-card p-6 bg-white space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Pending Accreditation Claims</h3>

        <div className="space-y-3">
          {verificationQueue.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-800">{item.id}</span>
                  <h4 className="font-bold text-slate-900">{item.entity}</h4>
                  <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">{item.type}</span>
                </div>
                <p className="text-slate-600">{item.claim}</p>
                <p className="text-[10px] text-slate-400">Submission Date: {item.date}</p>
              </div>

              <div className="flex items-center space-x-2">
                {item.status.includes('Verified') ? (
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    {item.status}
                  </span>
                ) : item.status.includes('Rejected') ? (
                  <span className="font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                    {item.status}
                  </span>
                ) : (
                  <>
                    <button
                      onClick={() => handleVerifyClaim(item.id, false)}
                      className="px-3 py-1.5 rounded-lg border border-rose-300 text-rose-700 hover:bg-rose-50 font-bold transition flex items-center space-x-1"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>

                    <button
                      onClick={() => handleVerifyClaim(item.id, true)}
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition flex items-center space-x-1 shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve & Verify</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
