import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { StageBadge, CyberScoreBadge, Badge } from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Star, 
  FileText, 
  FileSignature, 
  Rocket, 
  Eye, 
  UserCheck,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';

const COLUMNS = [
  { id: 'screening', title: '1. Screening & Eligibility', color: 'border-cyan-500 bg-cyan-50/20' },
  { id: 'expert_review', title: '2. Expert Technical Review', color: 'border-amber-500 bg-amber-50/20' },
  { id: 'contract_approval', title: '3. Contract & Compliance Signing', color: 'border-purple-500 bg-purple-50/20' },
  { id: 'active_sandbox', title: '4. Active Sandbox Execution', color: 'border-emerald-500 bg-emerald-50/20' },
  { id: 'gem_transition', title: '5. GeM Ready & Scaling', color: 'border-blue-500 bg-blue-50/20' },
];

export default function GovPipelinePage() {
  const { applications, refreshData, showToast, setSelectedAppId, setCurrentView } = useApp();

  const [selectedApp, setSelectedApp] = useState(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  // Expert Review Form State
  const [expertForm, setExpertForm] = useState({
    expert_name: 'Dr. V. K. Saraswat',
    designation: 'Principal Scientific & Technical Advisor',
    technical_feasibility: 9,
    gov_impact: 9,
    cyber_readiness: 9,
    commercial_viability: 8,
    comments: 'Strong technology architecture, full compliance with sovereign benchmarks.',
    recommendation: 'Approve for Sandbox'
  });

  const handleAdvanceStage = async (app, targetStage) => {
    try {
      await api.updateStage(app.id, targetStage);
      await refreshData();
      showToast(`Proposal advanced to ${targetStage.replace('_', ' ').toUpperCase()}!`, 'success');
      if (selectedApp) {
        const updated = await api.getApplicationById(app.id);
        setSelectedApp(updated);
      }
    } catch (err) {
      showToast('Failed to update stage', 'error');
    }
  };

  const handleReject = async (e) => {
    e.preventDefault();
    if (!selectedApp) return;
    try {
      await api.updateStage(selectedApp.id, 'rejected', rejectionReason);
      await refreshData();
      showToast('Application marked as Rejected', 'info');
      setRejectModalOpen(false);
      setSelectedApp(null);
    } catch (err) {
      showToast('Failed to reject application', 'error');
    }
  };

  const handleAddExpertReview = async (e) => {
    e.preventDefault();
    if (!selectedApp) return;
    try {
      await api.submitExpertReview(selectedApp.id, expertForm);
      await refreshData();
      showToast('Expert evaluation scorecard submitted successfully!', 'success');
      setReviewModalOpen(false);
      const updated = await api.getApplicationById(selectedApp.id);
      setSelectedApp(updated);
    } catch (err) {
      showToast('Failed to submit review', 'error');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-xl border border-slate-200">
        <div>
          <h2 className="text-base font-bold text-slate-900">Sandbox Review Pipeline & Evaluation Gates</h2>
          <p className="text-xs text-slate-500">Kanban workflow guiding proposals from screening to expert review, contract signing, and active sandbox milestones.</p>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto">
        {COLUMNS.map(col => {
          const colApps = applications.filter(a => a.stage === col.id);

          return (
            <div key={col.id} className={`flex flex-col rounded-xl border ${col.color} bg-white p-3 shadow-xs min-h-[500px]`}>
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-800">{col.title}</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {colApps.length}
                </span>
              </div>

              {/* Cards in column */}
              <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                {colApps.length === 0 ? (
                  <div className="h-32 flex items-center justify-center text-[11px] text-slate-400 border border-dashed border-slate-200 rounded-lg">
                    No proposals in this stage
                  </div>
                ) : (
                  colApps.map(app => (
                    <div
                      key={app.id}
                      onClick={() => setSelectedApp(app)}
                      className="p-3.5 bg-white rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow-md transition cursor-pointer space-y-2"
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-bold text-slate-900 line-clamp-1">{app.startup_name}</span>
                        {app.avg_expert_score > 0 && (
                          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                            ★ {app.avg_expert_score}
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-slate-600 line-clamp-2">{app.challenge_title}</p>
                      
                      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                        <span className="font-semibold text-slate-700">₹{(app.total_budget_inr / 100000).toFixed(1)}L</span>
                        <span>{app.id}</span>
                      </div>

                      {/* Quick stage action */}
                      <div className="pt-2 flex items-center justify-between gap-1">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedApp(app);
                          }}
                          className="text-[10px] font-semibold text-blue-600 hover:text-blue-800"
                        >
                          View Details
                        </button>

                        {col.id === 'screening' && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAdvanceStage(app, 'expert_review');
                            }}
                            className="px-2 py-1 rounded bg-blue-600 text-white text-[10px] font-semibold hover:bg-blue-700 transition"
                          >
                            To Review &rarr;
                          </button>
                        )}

                        {col.id === 'expert_review' && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAdvanceStage(app, 'contract_approval');
                            }}
                            className="px-2 py-1 rounded bg-purple-600 text-white text-[10px] font-semibold hover:bg-purple-700 transition"
                          >
                            Approve Terms &rarr;
                          </button>
                        )}

                        {col.id === 'contract_approval' && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedAppId(app.id);
                              setCurrentView('contract');
                            }}
                            className="px-2 py-1 rounded bg-indigo-600 text-white text-[10px] font-semibold hover:bg-indigo-700 transition"
                          >
                            Sign Contract
                          </button>
                        )}

                        {col.id === 'active_sandbox' && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedAppId(app.id);
                              setCurrentView('projects');
                            }}
                            className="px-2 py-1 rounded bg-emerald-600 text-white text-[10px] font-semibold hover:bg-emerald-700 transition"
                          >
                            Monitor Work &rarr;
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Application Detail Modal */}
      {selectedApp && (
        <Modal
          isOpen={!!selectedApp && !reviewModalOpen && !rejectModalOpen}
          onClose={() => setSelectedApp(null)}
          title={`Application Detail: ${selectedApp.id} - ${selectedApp.startup_name}`}
          maxWidth="max-w-4xl"
        >
          <div className="space-y-5">
            {/* Header info */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase">{selectedApp.ministry}</span>
                <h3 className="text-sm font-bold text-slate-900 mt-0.5">{selectedApp.challenge_title}</h3>
                <p className="text-xs text-slate-600 mt-1">Submitted by <strong>{selectedApp.startup_name}</strong> ({selectedApp.startup_sector})</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <StageBadge stage={selectedApp.stage} />
                <span className="text-xs font-bold text-slate-800">Budget: ₹{(selectedApp.total_budget_inr / 100000).toFixed(1)} Lakh</span>
              </div>
            </div>

            {/* Proposal Details */}
            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase">Proposal Solution Summary</h4>
                <p className="text-xs text-slate-600 mt-1 bg-white p-3 rounded-lg border border-slate-200 leading-relaxed">
                  {selectedApp.proposal_summary}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase">Architecture & Testbed Methodology</h4>
                <p className="text-xs text-slate-600 mt-1 bg-white p-3 rounded-lg border border-slate-200 leading-relaxed">
                  {selectedApp.solution_architecture}
                </p>
              </div>
            </div>

            {/* Expert Reviews Section */}
            <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-amber-900 uppercase flex items-center space-x-1.5">
                  <Star className="w-4 h-4 text-amber-600" />
                  <span>Expert Technical Assessment ({selectedApp.expert_reviews?.length || 0} Reviews)</span>
                </h4>
                <button
                  type="button"
                  onClick={() => setReviewModalOpen(true)}
                  className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shadow-xs transition"
                >
                  + Add Expert Review Scorecard
                </button>
              </div>

              {(!selectedApp.expert_reviews || selectedApp.expert_reviews.length === 0) ? (
                <p className="text-xs text-slate-500 italic">No expert scores registered yet. Click above to submit technical review.</p>
              ) : (
                <div className="space-y-3">
                  {selectedApp.expert_reviews.map((r, i) => (
                    <div key={i} className="bg-white p-3 rounded-lg border border-amber-200 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900">{r.expert_name} ({r.designation})</span>
                        <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {r.recommendation}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                        <div className="bg-slate-50 p-1.5 rounded">
                          <span className="text-slate-400 block font-semibold">Technical</span>
                          <span className="font-bold text-slate-800">{r.technical_feasibility}/10</span>
                        </div>
                        <div className="bg-slate-50 p-1.5 rounded">
                          <span className="text-slate-400 block font-semibold">Gov Impact</span>
                          <span className="font-bold text-slate-800">{r.gov_impact}/10</span>
                        </div>
                        <div className="bg-slate-50 p-1.5 rounded">
                          <span className="text-slate-400 block font-semibold">Cyber Score</span>
                          <span className="font-bold text-slate-800">{r.cyber_readiness}/10</span>
                        </div>
                        <div className="bg-slate-50 p-1.5 rounded">
                          <span className="text-slate-400 block font-semibold">Commercial</span>
                          <span className="font-bold text-slate-800">{r.commercial_viability}/10</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 italic">"{r.comments}"</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setRejectModalOpen(true)}
                className="flex items-center space-x-1 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg transition"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject Proposal</span>
              </button>

              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg"
                >
                  Close
                </button>

                {selectedApp.stage === 'screening' && (
                  <button
                    type="button"
                    onClick={() => handleAdvanceStage(selectedApp, 'expert_review')}
                    className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
                  >
                    Pass Screening &rarr; Expert Review
                  </button>
                )}

                {selectedApp.stage === 'expert_review' && (
                  <button
                    type="button"
                    onClick={() => handleAdvanceStage(selectedApp, 'contract_approval')}
                    className="px-4 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-sm"
                  >
                    Approve for Contract & Compliance
                  </button>
                )}

                {selectedApp.stage === 'contract_approval' && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAppId(selectedApp.id);
                      setSelectedApp(null);
                      setCurrentView('contract');
                    }}
                    className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm"
                  >
                    Go to Contract E-Sign Suite
                  </button>
                )}

                {selectedApp.stage === 'active_sandbox' && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAppId(selectedApp.id);
                      setSelectedApp(null);
                      setCurrentView('projects');
                    }}
                    className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm"
                  >
                    Open Project Work Monitor
                  </button>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Expert Scorecard Modal */}
      {reviewModalOpen && selectedApp && (
        <Modal
          isOpen={reviewModalOpen}
          onClose={() => setReviewModalOpen(false)}
          title={`Submit Technical Evaluation: ${selectedApp.startup_name}`}
        >
          <form onSubmit={handleAddExpertReview} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Evaluator Name *</label>
                <input
                  type="text"
                  required
                  value={expertForm.expert_name}
                  onChange={(e) => setExpertForm({ ...expertForm, expert_name: e.target.value })}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Designation *</label>
                <input
                  type="text"
                  required
                  value={expertForm.designation}
                  onChange={(e) => setExpertForm({ ...expertForm, designation: e.target.value })}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Score Sliders */}
            <div className="space-y-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Technical Feasibility & Architecture:</span>
                  <span className="text-blue-600">{expertForm.technical_feasibility}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={expertForm.technical_feasibility}
                  onChange={(e) => setExpertForm({ ...expertForm, technical_feasibility: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Government Impact & Problem Fit:</span>
                  <span className="text-blue-600">{expertForm.gov_impact}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={expertForm.gov_impact}
                  onChange={(e) => setExpertForm({ ...expertForm, gov_impact: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Cybersecurity Readiness (CERT-In / DPDP):</span>
                  <span className="text-blue-600">{expertForm.cyber_readiness}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={expertForm.cyber_readiness}
                  onChange={(e) => setExpertForm({ ...expertForm, cyber_readiness: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Commercial & GeM Scaling Viability:</span>
                  <span className="text-blue-600">{expertForm.commercial_viability}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={expertForm.commercial_viability}
                  onChange={(e) => setExpertForm({ ...expertForm, commercial_viability: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Recommendation *</label>
              <select
                value={expertForm.recommendation}
                onChange={(e) => setExpertForm({ ...expertForm, recommendation: e.target.value })}
                className="w-full text-xs border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Approve for Sandbox">Approve for Sandbox</option>
                <option value="Request Revisions">Request Revisions</option>
                <option value="Reject">Reject</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Technical Comments & Assessment *</label>
              <textarea
                rows={3}
                required
                value={expertForm.comments}
                onChange={(e) => setExpertForm({ ...expertForm, comments: e.target.value })}
                className="w-full text-xs border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3">
              <button
                type="button"
                onClick={() => setReviewModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm"
              >
                Record Evaluation
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Reject Modal */}
      {rejectModalOpen && selectedApp && (
        <Modal
          isOpen={rejectModalOpen}
          onClose={() => setRejectModalOpen(false)}
          title={`Reject Application: ${selectedApp.startup_name}`}
        >
          <form onSubmit={handleReject} className="space-y-4">
            <p className="text-xs text-rose-700 bg-rose-50 p-3 rounded-lg border border-rose-200">
              Please specify the formal reason for rejection. This notification will be delivered to the startup.
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Rejection Reason *</label>
              <textarea
                rows={3}
                required
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="e.g. Does not meet TRL 6 benchmark or lack of CERT-In compliance documentation..."
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3">
              <button
                type="button"
                onClick={() => setRejectModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm"
              >
                Confirm Rejection
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
