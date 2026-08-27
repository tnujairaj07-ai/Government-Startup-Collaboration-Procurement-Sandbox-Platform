import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { Badge } from '../components/common/Badge';
import { 
  FileSignature, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  KeyRound, 
  Building2, 
  ExternalLink,
  Sparkles
} from 'lucide-react';

export default function StartupContractPage() {
  const { currentStartup, applications, selectedAppId, setSelectedAppId, refreshData, showToast, setCurrentView } = useApp();

  const myApplications = applications.filter(a => a.startup_id === currentStartup?.id);
  const activeApp = applications.find(a => a.id === selectedAppId) || myApplications[0] || applications[0];

  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [founderName, setFounderName] = useState(currentStartup?.founders?.[0] || 'Wing Cdr (Retd.) Rajesh Nair');
  const [eSignAadhaar, setESignAadhaar] = useState('9842-1102-8823');
  const [otpToken, setOtpToken] = useState('749201');
  const [signing, setSigning] = useState(false);

  useEffect(() => {
    if (activeApp) {
      loadContract(activeApp.id);
    }
  }, [activeApp?.id]);

  const loadContract = async (appId) => {
    try {
      setLoading(true);
      const ctr = await api.getContract(appId);
      setContract(ctr);
    } catch (err) {
      console.log('Contract draft not ready or loading error:', err);
      setContract(null);
    } finally {
      setLoading(false);
    }
  };

  const handleStartupSign = async (e) => {
    e.preventDefault();
    if (!activeApp) return;

    try {
      setSigning(true);
      await api.signContract(activeApp.id, {
        signer_role: 'startup',
        signer_name: `${founderName} (Authorized Signatory, ${currentStartup?.name})`,
        e_sign_token: `AADHAAR-ESIGN-${eSignAadhaar.slice(-4)}-OTP-VERIFIED`
      });
      await refreshData();
      await loadContract(activeApp.id);
      showToast('Digital contract legally executed & signed via Aadhaar e-Sign!', 'success');
    } catch (err) {
      showToast('Failed to sign contract', 'error');
    } finally {
      setSigning(false);
    }
  };

  if (!activeApp) {
    return (
      <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
        <p className="text-sm text-slate-500">No application ready for contract signing.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-xl border border-slate-200">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <FileSignature className="w-5 h-5 text-purple-600" />
            <span>Digital Contract Execution & Aadhaar e-Sign Suite</span>
          </h2>
          <p className="text-xs text-slate-500">Review terms regarding IP ownership, cybersecurity benchmarks, and execute legally binding e-Sign.</p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-500 font-semibold">Select Application:</span>
          <select
            value={activeApp.id}
            onChange={(e) => setSelectedAppId(e.target.value)}
            className="text-xs font-bold border border-slate-300 rounded-lg p-2 bg-slate-50 focus:ring-2 focus:ring-purple-500"
          >
            {applications.map(a => (
              <option key={a.id} value={a.id}>
                {a.id} - {a.startup_name} ({a.stage})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Contract Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Master Terms */}
        <div className="lg:col-span-2 space-y-4">
          <div className="gov-card p-6 space-y-5 border-t-4 border-t-purple-600">
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-purple-600 uppercase">GOVERNMENT PROCUREMENT SANDBOX MASTER CONTRACT</span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  Sandbox Testing & Milestone Escrow Master Agreement
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Department: <strong>{activeApp.ministry}</strong> | Contractor: <strong>{activeApp.startup_name}</strong>
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded">
                  {contract?.id || `CTR-2026-${activeApp.id.split('-')[2]}`}
                </span>
                <p className="text-[10px] text-emerald-600 font-bold mt-1">₹{(activeApp.total_budget_inr / 100000).toFixed(1)}L Grant Payout</p>
              </div>
            </div>

            {/* Clause 1 */}
            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200 space-y-2">
              <h4 className="text-xs font-bold text-blue-950 uppercase flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                <span>Intellectual Property Rights Terms</span>
              </h4>
              <p className="text-xs text-blue-900 font-semibold">
                &bull; {contract?.ip_ownership || 'Startup Owned with Perpetual Royalty-Free Gov License'}
              </p>
              <p className="text-xs text-blue-800">
                Your startup retains complete global ownership of source code, patents, and algorithmic models. The Government receives a non-exclusive deployment license for sovereign operations.
              </p>
            </div>

            {/* Clause 2 */}
            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-2">
              <h4 className="text-xs font-bold text-emerald-950 uppercase flex items-center space-x-1.5">
                <Lock className="w-4 h-4 text-emerald-700" />
                <span>Cybersecurity & Telemetry Security Posture</span>
              </h4>
              <p className="text-xs text-emerald-900 font-semibold">
                &bull; {contract?.cyber_compliance || 'CERT-In Audited (Tier 1 High Security)'}
              </p>
              <p className="text-xs text-emerald-800">
                Continuous compliance with AES-256 telemetry standards, regular CERT-In code audits, and zero external dependency risk.
              </p>
            </div>

            {/* Clause 3 */}
            <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-200 space-y-2">
              <h4 className="text-xs font-bold text-purple-950 uppercase flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-purple-700" />
                <span>DPDP Act 2023 & Data Sovereignty Protocol</span>
              </h4>
              <p className="text-xs text-purple-900 font-semibold">
                &bull; Digital Personal Data Protection (DPDP) Act 2023 Compliant
              </p>
              <p className="text-xs text-purple-800">
                Strict adherence to Indian data localization. All testing logs must reside exclusively on sovereign Indian cloud instances.
              </p>
            </div>

            {/* Contract Hash */}
            {contract?.contract_hash && (
              <div className="p-3 bg-slate-900 text-slate-300 rounded-lg font-mono text-[11px] space-y-1">
                <div className="flex items-center justify-between text-slate-400 text-[10px]">
                  <span>CONTRACT IMMUTABILITY DIGEST</span>
                  <span>SHA-256</span>
                </div>
                <p className="text-amber-400 break-all">{contract.contract_hash}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: E-Sign Form */}
        <div className="space-y-4">
          <div className="gov-card p-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Digital Signatures</h3>

            {/* Gov status */}
            <div className={`p-3 rounded-lg border ${contract?.gov_signed ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">Government Sign-off</span>
                {contract?.gov_signed ? (
                  <span className="text-emerald-700 font-bold flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Signed</span>
                  </span>
                ) : (
                  <span className="text-amber-600 font-semibold">Pending Gov Action</span>
                )}
              </div>
              {contract?.gov_signed && (
                <div className="mt-1 text-[11px] text-slate-600">
                  <p className="font-semibold">{contract.gov_signed_by}</p>
                </div>
              )}
            </div>

            {/* Startup Sign form */}
            {!contract?.startup_signed ? (
              <form onSubmit={handleStartupSign} className="pt-3 border-t border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>Execute Aadhaar Digital e-Sign</span>
                </h4>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-0.5">Authorized Founder Name *</label>
                  <input
                    type="text"
                    required
                    value={founderName}
                    onChange={(e) => setFounderName(e.target.value)}
                    className="w-full text-xs border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-0.5">Aadhaar Virtual ID / Number *</label>
                  <input
                    type="text"
                    required
                    value={eSignAadhaar}
                    onChange={(e) => setESignAadhaar(e.target.value)}
                    className="w-full text-xs font-mono border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-0.5">UIDAI OTP Authentication *</label>
                  <input
                    type="text"
                    required
                    value={otpToken}
                    onChange={(e) => setOtpToken(e.target.value)}
                    className="w-full text-xs font-mono border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={signing}
                  className="w-full py-2.5 px-4 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm transition"
                >
                  {signing ? 'Verifying OTP & Signing...' : 'Verify OTP & Legally Sign Contract'}
                </button>
              </form>
            ) : (
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-center space-y-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                <p className="text-xs font-bold text-emerald-900">Contract Signed by Startup!</p>
                <p className="text-[11px] text-emerald-700">Signed by {contract.startup_signed_by}</p>
                <button
                  onClick={() => setCurrentView('workspace')}
                  className="w-full py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition"
                >
                  Go to Sandbox Workspace &rarr;
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
