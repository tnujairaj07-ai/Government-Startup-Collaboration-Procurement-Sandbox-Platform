import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import Modal from '../common/Modal';
import { Plus, Trash2, CheckCircle2 } from 'lucide-react';

export default function ChallengeCreateModal({ isOpen, onClose }) {
  const { refreshData, showToast } = useApp();

  const [formData, setFormData] = useState({
    title: '',
    department: '',
    ministry: 'Ministry of Defence',
    sector: 'Defence & Aerospace',
    description: '',
    budget_inr: 5000000,
    sandbox_duration: '90 Days',
    eligibility_criteria: ['DPIIT Recognized Startup', 'TRL 6+ with bench-tested prototype'],
    cybersecurity_requirements: ['CERT-In security audit certificate', 'DPDP Act 2023 compliance'],
    milestone_templates: [
      { id: 'M1', title: 'Milestone 1: Proof of Concept & API Testbed', payout_percentage: 30, payout_amount_inr: 1500000, due_date: 'Day 30', deliverable_type: 'Technical Benchmark' },
      { id: 'M2', title: 'Milestone 2: Field Simulation & Security Audit', payout_percentage: 40, payout_amount_inr: 2000000, due_date: 'Day 60', deliverable_type: 'Live Test Telemetry' },
      { id: 'M3', title: 'Milestone 3: Pilot Sign-off & GeM Transition', payout_percentage: 30, payout_amount_inr: 1500000, due_date: 'Day 90', deliverable_type: 'GeM Catalog Ready' }
    ]
  });

  const [newElig, setNewElig] = useState('');
  const [newCyber, setNewCyber] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const ministries = [
    'Ministry of Defence',
    'Ministry of Health & Family Welfare',
    'Ministry of Housing and Urban Affairs',
    'Ministry of Electronics & Information Technology (MeitY)',
    'Ministry of Agriculture & Farmers Welfare',
    'Ministry of Road Transport and Highways'
  ];

  const sectors = [
    'Defence & Aerospace',
    'HealthTech & Telemedicine',
    'Smart Cities & Urban Mobility',
    'Agritech & Rural Economy',
    'Cybersecurity & Gov-Cloud',
    'GovTech & Citizen Services',
    'FinTech & Public Financials'
  ];

  const handleAddElig = () => {
    if (!newElig.trim()) return;
    setFormData({ ...formData, eligibility_criteria: [...formData.eligibility_criteria, newElig.trim()] });
    setNewElig('');
  };

  const handleRemoveElig = (index) => {
    const updated = formData.eligibility_criteria.filter((_, i) => i !== index);
    setFormData({ ...formData, eligibility_criteria: updated });
  };

  const handleAddCyber = () => {
    if (!newCyber.trim()) return;
    setFormData({ ...formData, cybersecurity_requirements: [...formData.cybersecurity_requirements, newCyber.trim()] });
    setNewCyber('');
  };

  const handleRemoveCyber = (index) => {
    const updated = formData.cybersecurity_requirements.filter((_, i) => i !== index);
    setFormData({ ...formData, cybersecurity_requirements: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.department) {
      showToast('Please fill all mandatory fields', 'error');
      return;
    }

    try {
      setSubmitting(true);
      await api.createChallenge(formData);
      await refreshData();
      showToast('Problem Statement posted successfully to Sandbox Platform!', 'success');
      onClose();
    } catch (err) {
      showToast('Failed to post challenge', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Post Government Problem Statement / Challenge" maxWidth="max-w-3xl">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Problem Title *</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. AI-driven Remote Early Warning Sensing for Border Security"
            className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Ministry *</label>
            <select
              value={formData.ministry}
              onChange={(e) => setFormData({ ...formData, ministry: e.target.value })}
              className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {ministries.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Department / Directorate *</label>
            <input
              type="text"
              required
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              placeholder="e.g. Directorate of Maritime Patrol"
              className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Sector *</label>
            <select
              value={formData.sector}
              onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
              className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {sectors.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Sandbox Grant Budget (₹ INR) *</label>
            <input
              type="number"
              required
              value={formData.budget_inr}
              onChange={(e) => setFormData({ ...formData, budget_inr: Number(e.target.value) })}
              className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Testing Duration</label>
            <input
              type="text"
              value={formData.sandbox_duration}
              onChange={(e) => setFormData({ ...formData, sandbox_duration: e.target.value })}
              placeholder="e.g. 90 Days"
              className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description & Operational Scope *</label>
          <textarea
            rows={3}
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Detail the exact technical challenge, expected deployment test conditions, and operational needs..."
            className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Eligibility Criteria */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Startup Eligibility Criteria</label>
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              value={newElig}
              onChange={(e) => setNewElig(e.target.value)}
              placeholder="e.g. Indigenous components >= 60%, TRL 7"
              className="flex-1 text-xs border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddElig}
              className="px-3 py-2 bg-slate-800 text-white rounded-lg text-xs font-semibold hover:bg-slate-700"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.eligibility_criteria.map((c, i) => (
              <span key={i} className="inline-flex items-center text-xs px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 border border-blue-200">
                {c}
                <button type="button" onClick={() => handleRemoveElig(i)} className="ml-1.5 text-blue-500 hover:text-blue-700">
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Cybersecurity Requirements */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Cybersecurity & Data Privacy Requirements</label>
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              value={newCyber}
              onChange={(e) => setNewCyber(e.target.value)}
              placeholder="e.g. End-to-end AES-256 telemetry, Indian data hosting"
              className="flex-1 text-xs border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddCyber}
              className="px-3 py-2 bg-slate-800 text-white rounded-lg text-xs font-semibold hover:bg-slate-700"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.cybersecurity_requirements.map((c, i) => (
              <span key={i} className="inline-flex items-center text-xs px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                {c}
                <button type="button" onClick={() => handleRemoveCyber(i)} className="ml-1.5 text-emerald-500 hover:text-emerald-700">
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition"
          >
            {submitting ? 'Publishing...' : 'Publish Problem Statement'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
