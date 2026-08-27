import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { StageBadge, Badge } from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { 
  Rocket, 
  CheckCircle2, 
  Clock, 
  Coins, 
  ExternalLink, 
  FileText, 
  ShieldCheck, 
  ArrowUpRight,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

export default function GovProjectMonitorPage() {
  const { applications, selectedAppId, setSelectedAppId, refreshData, showToast, setCurrentView } = useApp();

  const activeApp = applications.find(a => a.id === selectedAppId) || applications.find(a => a.stage === 'active_sandbox') || applications[0];

  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [approverName, setApproverName] = useState('Capt. M. S. Rawat (Technical Director, MoD)');
  const [approvalNotes, setApprovalNotes] = useState('Deliverable verified against Naval testbench parameters. Payout approved.');
  const [disbursePayment, setDisbursePayment] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleApproveMilestone = async (e) => {
    e.preventDefault();
    if (!activeApp || !selectedMilestone) return;

    try {
      setSubmitting(true);
      await api.approveMilestone(activeApp.id, selectedMilestone.id, {
        approver_name: approverName,
        approval_notes: approvalNotes,
        disburse_payment: disbursePayment
      });
      await refreshData();
      showToast(`Milestone ${selectedMilestone.id} Approved & ₹${(selectedMilestone.payout_amount_inr / 100000).toFixed(1)}L Escrow Disbursed via PFMS!`, 'success');
      setApproveModalOpen(false);
    } catch (err) {
      showToast('Failed to approve milestone', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (!activeApp) {
    return (
      <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
        <p className="text-sm text-slate-500">No active sandbox project found.</p>
      </div>
    );
  }

  // Calculate milestone progress
  const milestones = activeApp.milestones || [];
  const completedCount = milestones.filter(m => m.status === 'payment_disbursed' || m.status === 'approved').length;
  const progressPercent = milestones.length > 0 ? Math.round((completedCount / milestones.length) * 100) : 0;

  let totalDisbursedForApp = 0;
  milestones.forEach(m => {
    if (m.status === 'payment_disbursed') totalDisbursedForApp += m.payout_amount_inr;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & Project Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-xl border border-slate-200">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <Rocket className="w-5 h-5 text-emerald-600" />
            <span>Sandbox Work Area & Project Milestone Monitor</span>
          </h2>
          <p className="text-xs text-slate-500">Active project execution monitor, technical deliverables review, and PFMS milestone escrow sign-off.</p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-500 font-semibold">Active Project:</span>
          <select
            value={activeApp.id}
            onChange={(e) => setSelectedAppId(e.target.value)}
            className="text-xs font-bold border border-slate-300 rounded-lg p-2 bg-slate-50 focus:ring-2 focus:ring-blue-500"
          >
            {applications.map(a => (
              <option key={a.id} value={a.id}>
                {a.startup_name} - {a.id} ({a.stage})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Project KPI Summary Header */}
      <div className="gov-card p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-bold text-slate-900">{activeApp.challenge_title}</h3>
              <StageBadge stage={activeApp.stage} />
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Executing Partner: <strong className="text-blue-700">{activeApp.startup_name}</strong> • {activeApp.ministry}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Total Grant Escrow</p>
              <p className="text-base font-bold text-slate-900">₹{(activeApp.total_budget_inr / 100000).toFixed(1)} Lakh</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Disbursed to Date</p>
              <p className="text-base font-bold text-emerald-600">₹{(totalDisbursedForApp / 100000).toFixed(1)} Lakh</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
            <span>Overall Milestone Completion</span>
            <span>{progressPercent}% ({completedCount} of {milestones.length} Completed)</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      {/* Milestones List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Milestone Execution & Deliverables Ledger</h3>

        <div className="space-y-4">
          {milestones.map((m) => {
            const isDisbursed = m.status === 'payment_disbursed';
            const isUnderReview = m.status === 'under_review' || m.status === 'submitted';
            const isPending = m.status === 'pending';

            return (
              <div
                key={m.id}
                className={`gov-card p-5 border-l-4 transition ${
                  isDisbursed
                    ? 'border-l-emerald-500 bg-white'
                    : isUnderReview
                    ? 'border-l-amber-500 bg-amber-50/20'
                    : 'border-l-slate-300 bg-slate-50/50'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-white">
                        {m.id}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">{m.title}</h4>
                      
                      {isDisbursed && (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>PFMS Escrow Paid</span>
                        </span>
                      )}
                      {isUnderReview && (
                        <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Deliverables Awaiting Review</span>
                        </span>
                      )}
                      {isPending && (
                        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          In Progress by Startup
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600">{m.description}</p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span><strong>Type:</strong> {m.deliverable_type}</span>
                      <span>•</span>
                      <span><strong>Target Timeline:</strong> {m.due_date}</span>
                      <span>•</span>
                      <span><strong>Tranche:</strong> {m.payout_percentage}% (₹{(m.payout_amount_inr / 100000).toFixed(1)} Lakh)</span>
                    </div>

                    {/* Deliverable Submission info if submitted */}
                    {m.submission_notes && (
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 mt-2 space-y-1">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                          <span>Startup Submission Proof:</span>
                          <span className="text-slate-400 font-normal">{new Date(m.submitted_at).toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-slate-600 italic">"{m.submission_notes}"</p>
                        {m.submission_url && (
                          <a
                            href={m.submission_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 hover:text-blue-800 pt-1"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Inspect Deliverable Telemetry / Test Report</span>
                          </a>
                        )}
                      </div>
                    )}

                    {m.transaction_ref && (
                      <p className="text-[11px] font-mono text-emerald-700 font-semibold">
                        PFMS Treasury Reference: {m.transaction_ref} (Verified on {new Date(m.verified_at).toLocaleDateString()})
                      </p>
                    )}
                  </div>

                  {/* Action Column */}
                  <div className="flex flex-col items-end justify-between self-stretch">
                    <span className="text-sm font-bold text-slate-900">
                      ₹{(m.payout_amount_inr / 100000).toFixed(1)} Lakh
                    </span>

                    {isUnderReview && (
                      <button
                        onClick={() => {
                          setSelectedMilestone(m);
                          setApproveModalOpen(true);
                        }}
                        className="mt-3 flex items-center space-x-1 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition"
                      >
                        <Coins className="w-3.5 h-3.5" />
                        <span>Review & Disburse Payout</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Approve Milestone & Disburse Escrow Modal */}
      {approveModalOpen && selectedMilestone && (
        <Modal
          isOpen={approveModalOpen}
          onClose={() => setApproveModalOpen(false)}
          title={`Milestone Sign-Off & Escrow Disbursement: ${selectedMilestone.id}`}
        >
          <form onSubmit={handleApproveMilestone} className="space-y-4">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
              <span className="text-xs font-bold text-emerald-900">{selectedMilestone.title}</span>
              <p className="text-xs text-emerald-700">
                Grant Payout Amount: <strong>₹{(selectedMilestone.payout_amount_inr / 100000).toFixed(1)} Lakh</strong> ({selectedMilestone.payout_percentage}% Tranche)
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Approving Officer Name *</label>
              <input
                type="text"
                required
                value={approverName}
                onChange={(e) => setApproverName(e.target.value)}
                className="w-full text-xs border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Verification / Sign-Off Notes *</label>
              <textarea
                rows={3}
                required
                value={approvalNotes}
                onChange={(e) => setApprovalNotes(e.target.value)}
                className="w-full text-xs border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <input
                type="checkbox"
                id="disburse"
                checked={disbursePayment}
                onChange={(e) => setDisbursePayment(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded"
              />
              <label htmlFor="disburse" className="text-xs font-bold text-slate-800 cursor-pointer">
                Authorize direct electronic escrow disbursement via PFMS Treasury Gateway
              </label>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setApproveModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition"
              >
                {submitting ? 'Disbursing...' : 'Sign Off & Disburse Escrow'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
