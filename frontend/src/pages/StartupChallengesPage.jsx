import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { Badge } from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { 
  Search, 
  Filter, 
  Send, 
  Building2, 
  Coins, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';

export default function StartupChallengesPage() {
  const { challenges, currentStartup, refreshData, showToast, setCurrentView, setSelectedAppId } = useApp();

  const [search, setSearch] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  // Proposal Submission State
  const [proposalForm, setProposalForm] = useState({
    proposal_summary: '',
    solution_architecture: '',
    proposed_timeline: '90 Days',
    total_budget_inr: 5000000
  });
  const [submitting, setSubmitting] = useState(false);

  const filtered = challenges.filter(c => {
    const matchesSector = selectedSector === 'All' || c.sector === selectedSector;
    const q = search.toLowerCase();
    const matchesSearch = !q || c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.ministry.toLowerCase().includes(q);
    return matchesSector && matchesSearch;
  });

  const handleOpenApply = (chal) => {
    setSelectedChallenge(chal);
    setProposalForm({
      proposal_summary: `Direct application by ${currentStartup?.name} leveraging our proven ${currentStartup?.sector} tech stack.`,
      solution_architecture: `Deployment of edge-optimized containerized architecture with CERT-In audited AES-256 telemetry handshake.`,
      proposed_timeline: chal.sandbox_duration || '90 Days',
      total_budget_inr: chal.budget_inr
    });
    setApplyModalOpen(true);
  };

  const handleProposalSubmit = async (e) => {
    e.preventDefault();
    if (!selectedChallenge || !currentStartup) return;

    try {
      setSubmitting(true);
      const app = await api.submitProposal({
        challenge_id: selectedChallenge.id,
        startup_id: currentStartup.id,
        ...proposalForm
      });
      await refreshData();
      showToast('Proposal submitted successfully to Government Review Pipeline!', 'success');
      setApplyModalOpen(false);
      setSelectedChallenge(null);
      setSelectedAppId(app.id);
      setCurrentView('dashboard');
    } catch (err) {
      showToast(err.message || 'Failed to submit proposal', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-xl border border-slate-200">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            <span>Active Government Problem Statements & Sandbox Grants</span>
          </h2>
          <p className="text-xs text-slate-500">Discover live ministry challenges, evaluate eligibility constraints, and submit sandbox pilot proposals.</p>
        </div>
      </div>

      {/* Filter toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search challenges by keyword, ministry, or operational scope..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <select
          value={selectedSector}
          onChange={(e) => setSelectedSector(e.target.value)}
          className="py-2 px-3 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="All">All Sectors</option>
          <option value="Defence & Aerospace">Defence & Aerospace</option>
          <option value="HealthTech & Telemedicine">HealthTech & Telemedicine</option>
          <option value="Smart Cities & Urban Mobility">Smart Cities & Urban Mobility</option>
          <option value="Cybersecurity & Gov-Cloud">Cybersecurity & Gov-Cloud</option>
          <option value="Agritech & Rural Economy">Agritech & Rural Economy</option>
        </select>
      </div>

      {/* Challenge Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map(c => {
          const isSectorMatch = currentStartup?.sector === c.sector;
          const isEligible = currentStartup?.trl_level >= 6 && currentStartup?.cyber_score >= 80;

          return (
            <div key={c.id} className="gov-card p-6 flex flex-col justify-between hover:border-blue-400 transition space-y-4">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase">{c.ministry} • {c.department}</span>
                    <h3 className="text-sm font-bold text-slate-900 mt-1">{c.title}</h3>
                  </div>
                  <Badge variant="cyan">{c.sector}</Badge>
                </div>

                <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed">{c.description}</p>

                {/* Eligibility Match Card */}
                <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-700">Sandbox Grant: </span>
                    <span className="font-bold text-emerald-700">₹{(c.budget_inr / 100000).toFixed(1)} Lakh</span>
                    <span className="text-slate-400"> ({c.sandbox_duration})</span>
                  </div>
                  {isEligible ? (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Eligible Match</span>
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Check Constraints
                    </span>
                  )}
                </div>

                {/* Key Eligibility Chips */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {(c.eligibility_criteria || []).slice(0, 3).map((el, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      • {el}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedChallenge(c)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800"
                >
                  View Details & Scope
                </button>

                <button
                  onClick={() => handleOpenApply(c)}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Proposal</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Challenge Detail Modal */}
      {selectedChallenge && !applyModalOpen && (
        <Modal
          isOpen={!!selectedChallenge && !applyModalOpen}
          onClose={() => setSelectedChallenge(null)}
          title={`Problem Statement: ${selectedChallenge.title}`}
          maxWidth="max-w-3xl"
        >
          <div className="space-y-5">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase">{selectedChallenge.ministry} • {selectedChallenge.department}</span>
              <h3 className="text-base font-bold text-slate-900 mt-1">{selectedChallenge.title}</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="cyan">{selectedChallenge.sector}</Badge>
                <Badge variant="success">Grant Budget: ₹{(selectedChallenge.budget_inr / 100000).toFixed(1)} Lakh</Badge>
                <Badge variant="primary">Duration: {selectedChallenge.sandbox_duration}</Badge>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase">Operational Problem Scope</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{selectedChallenge.description}</p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase">Mandatory Eligibility Criteria</h4>
              <ul className="mt-1 space-y-1 text-xs text-slate-600 list-disc list-inside">
                {(selectedChallenge.eligibility_criteria || []).map((el, i) => (
                  <li key={i}>{el}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase">Cybersecurity & Data Privacy SLA</h4>
              <ul className="mt-1 space-y-1 text-xs text-emerald-800 list-disc list-inside">
                {(selectedChallenge.cybersecurity_requirements || []).map((cy, i) => (
                  <li key={i}>{cy}</li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => setSelectedChallenge(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleOpenApply(selectedChallenge);
                }}
                className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition"
              >
                Proceed to Submit Proposal &rarr;
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Proposal Submission Wizard Modal */}
      {applyModalOpen && selectedChallenge && (
        <Modal
          isOpen={applyModalOpen}
          onClose={() => setApplyModalOpen(false)}
          title={`Submit Sandbox Proposal: ${selectedChallenge.title}`}
          maxWidth="max-w-3xl"
        >
          <form onSubmit={handleProposalSubmit} className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-xs text-blue-900">
                Applying on behalf of: <strong>{currentStartup?.name}</strong> (DPIIT: {currentStartup?.dpiit_number})
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Executive Solution Summary *</label>
              <textarea
                rows={3}
                required
                value={proposalForm.proposal_summary}
                onChange={(e) => setProposalForm({ ...proposalForm, proposal_summary: e.target.value })}
                placeholder="Explain how your solution addresses the problem statement, key differentiators, and innovation quotient..."
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Technical Architecture & Sandbox Test Plan *</label>
              <textarea
                rows={3}
                required
                value={proposalForm.solution_architecture}
                onChange={(e) => setProposalForm({ ...proposalForm, solution_architecture: e.target.value })}
                placeholder="Detail technical hardware/software stack, edge encryption, data privacy safeguards, and bench test setup..."
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Proposed Sandbox Duration</label>
                <input
                  type="text"
                  value={proposalForm.proposed_timeline}
                  onChange={(e) => setProposalForm({ ...proposalForm, proposed_timeline: e.target.value })}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Total Grant Request (₹ INR)</label>
                <input
                  type="number"
                  value={proposalForm.total_budget_inr}
                  onChange={(e) => setProposalForm({ ...proposalForm, total_budget_inr: Number(e.target.value) })}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setApplyModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition"
              >
                {submitting ? 'Submitting...' : 'Dispatch Proposal to Review Gate'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
