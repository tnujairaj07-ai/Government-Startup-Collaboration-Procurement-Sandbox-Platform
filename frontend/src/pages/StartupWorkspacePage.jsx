import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { StageBadge, Badge } from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { 
  Rocket, 
  Upload, 
  CheckCircle2, 
  Clock, 
  Coins, 
  ExternalLink, 
  Code, 
  Key, 
  Terminal, 
  ShoppingCart, 
  FileText,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function StartupWorkspacePage() {
  const { currentStartup, applications, selectedAppId, setSelectedAppId, refreshData, showToast, setCurrentView } = useApp();

  const myApplications = applications.filter(a => a.startup_id === currentStartup?.id);
  const activeApp = applications.find(a => a.id === selectedAppId) || myApplications.find(a => a.stage === 'active_sandbox' || a.stage === 'gem_transition') || applications[0];

  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [submissionUrl, setSubmissionUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // GeM Onboarding Modal
  const [gemModalOpen, setGemModalOpen] = useState(false);
  const [gemForm, setGemForm] = useState({
    catalog_title: '',
    product_category: 'Defence & UAV Systems / Direct PAC',
    unit_price_inr: 1850000,
    delivery_terms: '30 Days to Ministry / Defense Base Delivery'
  });
  const [onboardingGem, setOnboardingGem] = useState(false);

  const handleSubmitMilestone = async (e) => {
    e.preventDefault();
    if (!activeApp || !selectedMilestone) return;

    try {
      setSubmitting(true);
      await api.submitMilestone(activeApp.id, selectedMilestone.id, {
        submission_notes: submissionNotes,
        submission_url: submissionUrl || 'https://sandbox.gov.in/telemetry/report.pdf'
      });
      await refreshData();
      showToast(`Deliverables for Milestone ${selectedMilestone.id} submitted for Government Review!`, 'success');
      setSubmitModalOpen(false);
    } catch (err) {
      showToast('Failed to submit milestone', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenGemOnboard = () => {
    setGemForm({
      catalog_title: `${activeApp.startup_name} ${activeApp.challenge_title.split(' ')[0]} Production Suite`,
      product_category: activeApp.startup_sector,
      unit_price_inr: Math.round(activeApp.total_budget_inr * 0.35),
      delivery_terms: '30 Days to Government Department with SLA & AMC Support'
    });
    setGemModalOpen(true);
  };

  const handleGeMSubmit = async (e) => {
    e.preventDefault();
    if (!activeApp) return;

    try {
      setOnboardingGem(true);
      await api.onboardToGeM({
        application_id: activeApp.id,
        ...gemForm
      });
      await refreshData();
      showToast('Startup Solution successfully onboarded onto GeM Direct Procurement Catalog!', 'success');
      setGemModalOpen(false);
      setCurrentView('gem-catalog');
    } catch (err) {
      showToast(err.message || 'Failed to onboard onto GeM', 'error');
    } finally {
      setOnboardingGem(false);
    }
  };

  if (!activeApp) {
    return (
      <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
        <p className="text-sm text-slate-500">No active application or sandbox project available.</p>
      </div>
    );
  }

  const milestones = activeApp.milestones || [];
  const allMilestonesDone = milestones.length > 0 && milestones.every(m => m.status === 'payment_disbursed' || m.status === 'approved');

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-xl border border-slate-200">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <Rocket className="w-5 h-5 text-emerald-600" />
            <span>Sandbox Work Area & Milestone Execution Workspace</span>
          </h2>
          <p className="text-xs text-slate-500">Submit deliverables, test against sandbox APIs, unlock escrow tranches, and transition into GeM.</p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-500 font-semibold">Active Project:</span>
          <select
            value={activeApp.id}
            onChange={(e) => setSelectedAppId(e.target.value)}
            className="text-xs font-bold border border-slate-300 rounded-lg p-2 bg-slate-50 focus:ring-2 focus:ring-emerald-500"
          >
            {applications.map(a => (
              <option key={a.id} value={a.id}>
                {a.startup_name} - {a.id} ({a.stage})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Project Overview Card */}
      <div className="gov-card p-6 bg-slate-900 text-white space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase">ACTIVE PILOT SANDBOX</span>
            <h3 className="text-base font-bold mt-0.5">{activeApp.challenge_title}</h3>
            <p className="text-xs text-slate-300 mt-1">Client: <strong>{activeApp.ministry}</strong> • Grant Cap: ₹{(activeApp.total_budget_inr / 100000).toFixed(1)} Lakh</p>
          </div>

          {allMilestonesDone && (
            <button
              onClick={handleOpenGemOnboard}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-lg transition"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Graduate to GeM Direct Marketplace &rarr;</span>
            </button>
          )}
        </div>

        {/* Sandbox API & Credentials Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-slate-800 text-xs">
          <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
            <div className="flex items-center space-x-1.5 text-slate-400 text-[10px] uppercase font-bold">
              <Key className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sandbox API Key</span>
            </div>
            <p className="font-mono text-emerald-400 font-bold mt-1 text-[11px]">gov_sbx_9842f7_live</p>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
            <div className="flex items-center space-x-1.5 text-slate-400 text-[10px] uppercase font-bold">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span>Mock Ingestion Telemetry Endpoint</span>
            </div>
            <p className="font-mono text-blue-300 font-bold mt-1 text-[11px]">https://nic-sandbox.gov.in/v1/telemetry</p>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
            <div className="flex items-center space-x-1.5 text-slate-400 text-[10px] uppercase font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Encrypted C2 Channel</span>
            </div>
            <p className="font-mono text-purple-300 font-bold mt-1 text-[11px]">AES-256 GCM Cleared</p>
          </div>
        </div>
      </div>

      {/* Milestones Submission Ledger */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Milestone Execution & Deliverables Submission</h3>

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
                    : 'border-l-slate-400 bg-white'
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
                          <span>Escrow Paid (₹{(m.payout_amount_inr / 100000).toFixed(1)}L)</span>
                        </span>
                      )}
                      {isUnderReview && (
                        <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Submitted & Under Gov Review</span>
                        </span>
                      )}
                      {isPending && (
                        <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          Ready for Submission
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600">{m.description}</p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span><strong>Expected Deliverable:</strong> {m.deliverable_type}</span>
                      <span>•</span>
                      <span><strong>Due:</strong> {m.due_date}</span>
                      <span>•</span>
                      <span><strong>Grant Share:</strong> {m.payout_percentage}% (₹{(m.payout_amount_inr / 100000).toFixed(1)} Lakh)</span>
                    </div>

                    {m.submission_notes && (
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 mt-2 space-y-1">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                          <span>Your Uploaded Deliverables Proof:</span>
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
                            <span>View Submitted Attachment / Telemetry URL</span>
                          </a>
                        )}
                      </div>
                    )}

                    {m.transaction_ref && (
                      <p className="text-[11px] font-mono text-emerald-700 font-semibold">
                        PFMS Treasury Reference: {m.transaction_ref} (Disbursed to your registered bank account)
                      </p>
                    )}
                  </div>

                  {/* Submission Action */}
                  <div className="flex flex-col items-end justify-between self-stretch">
                    <span className="text-sm font-bold text-slate-900">
                      ₹{(m.payout_amount_inr / 100000).toFixed(1)} Lakh
                    </span>

                    {isPending && (
                      <button
                        onClick={() => {
                          setSelectedMilestone(m);
                          setSubmissionNotes(`Completed benchmark verification for ${m.title}. Attached test data logs and architecture schematic.`);
                          setSubmissionUrl(`https://github.com/aeroguard/defense-sandbox/releases/tag/${m.id.toLowerCase()}`);
                          setSubmitModalOpen(true);
                        }}
                        className="mt-3 flex items-center space-x-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Submit Deliverables &rarr;</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Submit Milestone Modal */}
      {submitModalOpen && selectedMilestone && (
        <Modal
          isOpen={submitModalOpen}
          onClose={() => setSubmitModalOpen(false)}
          title={`Submit Deliverables for ${selectedMilestone.id}: ${selectedMilestone.title}`}
        >
          <form onSubmit={handleSubmitMilestone} className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-xs text-blue-900 font-semibold">
                Required Output: {selectedMilestone.deliverable_type}
              </p>
              <p className="text-xs text-blue-800">
                Grant Payout upon approval: <strong>₹{(selectedMilestone.payout_amount_inr / 100000).toFixed(1)} Lakh</strong>
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Submission Notes & Technical Summary *</label>
              <textarea
                rows={3}
                required
                value={submissionNotes}
                onChange={(e) => setSubmissionNotes(e.target.value)}
                placeholder="Explain the results of the bench test, benchmark metrics achieved, accuracy rates..."
                className="w-full text-xs border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Deliverables Artifact URL / Repository Link *</label>
              <input
                type="url"
                required
                value={submissionUrl}
                onChange={(e) => setSubmissionUrl(e.target.value)}
                placeholder="https://github.com/... or https://sandbox.gov.in/test-report.pdf"
                className="w-full text-xs border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setSubmitModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition"
              >
                {submitting ? 'Submitting...' : 'Submit to Government Evaluators'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* GeM Onboarding Modal */}
      {gemModalOpen && (
        <Modal
          isOpen={gemModalOpen}
          onClose={() => setGemModalOpen(false)}
          title="Onboard Startup Solution onto GeM Direct Procurement"
          maxWidth="max-w-2xl"
        >
          <form onSubmit={handleGeMSubmit} className="space-y-4">
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
              <div className="flex items-center space-x-1.5 text-amber-900 font-bold text-xs">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Sandbox Graduation & PAC Fast-Track Procurement</span>
              </div>
              <p className="text-xs text-amber-800">
                Having completed all sandbox milestones, your solution qualifies for direct PAC listing on the Government e-Marketplace (GeM) with exemption from prior turnover constraints.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">GeM Product / Solution Title *</label>
              <input
                type="text"
                required
                value={gemForm.catalog_title}
                onChange={(e) => setGemForm({ ...gemForm, catalog_title: e.target.value })}
                className="w-full text-xs border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Product Category</label>
                <input
                  type="text"
                  required
                  value={gemForm.product_category}
                  onChange={(e) => setGemForm({ ...gemForm, product_category: e.target.value })}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Unit Commercial Price (₹ INR)</label>
                <input
                  type="number"
                  required
                  value={gemForm.unit_price_inr}
                  onChange={(e) => setGemForm({ ...gemForm, unit_price_inr: Number(e.target.value) })}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Supply & Delivery Terms</label>
              <input
                type="text"
                required
                value={gemForm.delivery_terms}
                onChange={(e) => setGemForm({ ...gemForm, delivery_terms: e.target.value })}
                className="w-full text-xs border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setGemModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={onboardingGem}
                className="px-5 py-2 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-600 rounded-lg shadow-md transition"
              >
                {onboardingGem ? 'Publishing to GeM...' : 'Publish to GeM Direct Marketplace'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
