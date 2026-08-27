import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { 
  FileSignature, ShieldCheck, Lock, CheckCircle2, 
  Download, ArrowRight, Check, KeyRound, Sparkles, FileText, Clock 
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { Modal } from '../common/Modal';
import confetti from 'canvas-confetti';

export const DigitalContractSigner: React.FC = () => {
  const { contracts, signStartupContract, currentStartup, setActiveTab } = usePlatform();

  const currentContract = contracts[0];

  // Signing flow states
  const [isSigningModalOpen, setIsSigningModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'Aadhaar' | 'DSC' | 'OTP'>('Aadhaar');
  const [signerName, setSignerName] = useState(currentStartup.founderName);
  const [aadhaarNumber, setAadhaarNumber] = useState('7890 1234 8812');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const isSigned = currentContract?.startupStatus === 'signed';

  const handleSendOtp = () => {
    setOtpSent(true);
    setOtp('492018');
  };

  const handleCompleteSign = () => {
    if (currentContract) {
      signStartupContract(
        currentContract.id,
        signerName,
        `XXXXXXXX${aadhaarNumber.slice(-4)}`
      );
      setIsSigningModalOpen(false);
      setOtpSent(false);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
    }
  };

  if (!currentContract) return null;

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="micro-label text-slate-400">Legal Agreement Signer</span>
            <span className="w-2 h-2 rounded-full bg-brand-royal" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-display">
            Digital Contract Signer
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Review, eSign, and track your government contracts with a complete audit trail.
          </p>
        </div>

        <StatusBadge
          label={isSigned ? 'Digitally Signed & Active' : 'Awaiting eSign'}
          variant={isSigned ? 'emerald' : 'amber'}
          size="md"
          icon={isSigned ? 'check' : 'clock'}
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Contract Document Reader (8 cols) */}
        <div className="lg:col-span-8 glass-panel rounded-3xl p-6 sm:p-8 shadow-glass space-y-6">
          
          {/* Header Summary */}
          <div className="border-b border-slate-200 pb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                GOVERNMENT OF MAHARASHTRA • PILOT AGREEMENT
              </span>
              <h2 className="text-xl font-bold text-navy-900 font-display mt-0.5">
                {currentContract.challengeTitle}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Department: <strong className="text-navy-900">Maharashtra Water Supply & Sanitation</strong> • Startup: <strong className="text-navy-900">{currentContract.startupName}</strong>
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xs font-bold text-slate-400 block">Contract Value</span>
              <span className="text-lg font-extrabold text-brand-royal font-display">{currentContract.totalValue}</span>
              <span className="text-[10px] text-slate-400 block font-medium">Duration: {currentContract.durationMonths} Months</span>
            </div>
          </div>

          {/* Key Clauses Preview */}
          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-1">
              <span className="micro-label text-brand-royal block">1. Scope of Work</span>
              <p className="text-slate-700 leading-relaxed font-medium">
                {currentContract.scopeOfWork}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-1">
              <span className="micro-label text-brand-royal block">2. Milestones & Escrow Payments</span>
              <p className="text-slate-700 leading-relaxed font-medium">
                {currentContract.escrowTerms}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-1">
              <span className="micro-label text-emerald-700 block">3. IP & Data Ownership</span>
              <p className="text-slate-700 leading-relaxed font-medium">
                {currentContract.ipOwnershipClause}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-1">
              <span className="micro-label text-purple-700 block">4. Cybersecurity Standards</span>
              <p className="text-slate-700 leading-relaxed font-medium">
                {currentContract.cyberSecurityClause}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-1">
              <span className="micro-label text-amber-700 block">5. Termination & Risks</span>
              <p className="text-slate-700 leading-relaxed font-medium">
                {currentContract.terminationClause}
              </p>
            </div>
          </div>

          {/* Signature Summary Section */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider">
              Execution Signatures
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="micro-label text-slate-400 block mb-1">Department Signatory</span>
                <p className="font-bold text-navy-900">Shri Rajesh Kumar</p>
                <p className="text-[11px] text-slate-500">Secretary – Water Supply & Sanitation</p>
                <span className="text-[10px] text-emerald-700 font-semibold mt-1 block">✓ Signed on 12 Aug 2026, 11:42 AM IST</span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="micro-label text-slate-400 block mb-1">Startup Signatory</span>
                <p className="font-bold text-navy-900">Ms. Anjali Patil</p>
                <p className="text-[11px] text-slate-500">CEO – AquaSense Technologies</p>
                <span className={`text-[10px] font-semibold mt-1 block ${isSigned ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {isSigned ? '✓ Digitally signed via Aadhaar eSign' : '🟡 Awaiting digital signature'}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Right: Signature Control & Audit Trail (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Action Pad */}
          <div className="glass-panel rounded-3xl p-6 shadow-glass space-y-4">
            <h3 className="text-sm font-bold text-navy-900 font-display flex items-center gap-2">
              <Lock className="w-4 h-4 text-brand-royal" />
              <span>Digital eSign Options</span>
            </h3>

            {!isSigned ? (
              <div className="space-y-3">
                <div className="space-y-1.5 text-xs font-semibold">
                  {['Aadhaar eSign', 'DSC (Digital Signature Certificate)', 'OTP-based eSign'].map(method => (
                    <label key={method} className="p-3 rounded-xl bg-white border border-slate-200 flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="radio"
                        name="signMethod"
                        checked={selectedMethod === method.split(' ')[0]}
                        onChange={() => setSelectedMethod(method.split(' ')[0] as any)}
                        className="text-brand-royal"
                      />
                      <span>{method}</span>
                    </label>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setIsSigningModalOpen(true)}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-brand-royal via-blue-600 to-brand-cobalt text-white font-bold text-xs shadow-action flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
                >
                  <FileSignature className="w-4 h-4" />
                  <span>Proceed to eSign</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-emerald-700 font-bold text-xs mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Contract Executed Successfully!</span>
                  </div>
                  <p className="text-[11px] text-emerald-800">
                    Signed by {currentContract.signerName} ({currentContract.signerDesignation})
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('execution')}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-action flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Go to Active Pilots Workspace</span>
                </button>
              </div>
            )}

            <button
              type="button"
              className="w-full py-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Contract (PDF)</span>
            </button>
          </div>

          {/* Audit Trail */}
          <div className="glass-panel rounded-3xl p-6 shadow-glass space-y-3">
            <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Audit Trail</span>
            </h3>

            <div className="space-y-2 text-xs">
              {currentContract.auditTrail.map((log, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
                  <div className="flex justify-between font-semibold text-navy-900">
                    <span>{log.action}</span>
                    <span className="text-[10px] text-slate-400">{log.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-mono">{log.actor} {log.ip && `• IP: ${log.ip}`}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Aadhaar eSign Simulator Modal */}
      <Modal
        isOpen={isSigningModalOpen}
        onClose={() => setIsSigningModalOpen(false)}
        title="Aadhaar eSign Gateway"
        subtitle="UIDAI / CDAC Digital Signature Authentication"
        maxWidth="lg"
      >
        <div className="space-y-4">
          <div className="p-3.5 rounded-2xl bg-brand-sky-light/60 border border-brand-sky text-xs text-slate-700 font-medium">
            Sign as: <strong>Ms. Anjali Patil, CEO – AquaSense Technologies</strong> for Agreement <strong className="font-mono">{currentContract.contractCode}</strong>.
          </div>

          <div>
            <label className="micro-label block mb-1">Aadhaar / Virtual ID (VID)</label>
            <input
              type="text"
              value={aadhaarNumber}
              onChange={(e) => setAadhaarNumber(e.target.value)}
              className="w-full p-3 rounded-xl bg-white border border-slate-200 text-xs font-mono font-bold text-navy-900 outline-none focus:border-brand-royal"
            />
          </div>

          {!otpSent ? (
            <button
              type="button"
              onClick={handleSendOtp}
              className="w-full py-3 rounded-full bg-brand-royal hover:bg-brand-cobalt text-white font-bold text-xs shadow-action flex items-center justify-center gap-2 transition-all"
            >
              <KeyRound className="w-4 h-4" />
              <span>Send OTP to Linked Mobile</span>
            </button>
          ) : (
            <div className="space-y-3 pt-2">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 flex items-center justify-between">
                <span>✓ OTP sent to Aadhaar-linked mobile</span>
                <span className="font-mono font-bold">Simulated OTP: 492018</span>
              </div>

              <div>
                <label className="micro-label block mb-1">Enter 6-Digit OTP</label>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white border border-slate-200 text-center text-lg font-mono font-bold tracking-widest text-navy-900 outline-none focus:border-brand-royal"
                />
              </div>

              <button
                type="button"
                onClick={handleCompleteSign}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-action flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Verify OTP & Apply eSign</span>
              </button>
            </div>
          )}
        </div>
      </Modal>

    </div>
  );
};
