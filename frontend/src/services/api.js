const API_BASE = '/api';

export const api = {
  // Challenges
  async getChallenges(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/challenges${query ? `?${query}` : ''}`);
    if (!res.ok) throw new Error('Failed to fetch challenges');
    return res.json();
  },

  async getChallengeById(id) {
    const res = await fetch(`${API_BASE}/challenges/${id}`);
    if (!res.ok) throw new Error('Failed to fetch challenge');
    return res.json();
  },

  async createChallenge(data) {
    const res = await fetch(`${API_BASE}/challenges`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create challenge');
    return res.json();
  },

  // Startups
  async getStartups(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/startups${query ? `?${query}` : ''}`);
    if (!res.ok) throw new Error('Failed to fetch startups');
    return res.json();
  },

  async getStartupById(id) {
    const res = await fetch(`${API_BASE}/startups/${id}`);
    if (!res.ok) throw new Error('Failed to fetch startup');
    return res.json();
  },

  async registerOrUpdateStartup(data) {
    const res = await fetch(`${API_BASE}/startups`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to save startup');
    return res.json();
  },

  // Pipeline & Applications
  async getApplications(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/pipeline/applications${query ? `?${query}` : ''}`);
    if (!res.ok) throw new Error('Failed to fetch applications');
    return res.json();
  },

  async getApplicationById(id) {
    const res = await fetch(`${API_BASE}/pipeline/applications/${id}`);
    if (!res.ok) throw new Error('Failed to fetch application');
    return res.json();
  },

  async submitProposal(data) {
    const res = await fetch(`${API_BASE}/pipeline/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Failed to submit proposal');
    }
    return res.json();
  },

  async updateStage(appId, stage, reason = null) {
    const res = await fetch(`${API_BASE}/pipeline/applications/${appId}/stage`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stage, reason })
    });
    if (!res.ok) throw new Error('Failed to update stage');
    return res.json();
  },

  async submitExpertReview(appId, reviewData) {
    const res = await fetch(`${API_BASE}/pipeline/applications/${appId}/expert-review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData)
    });
    if (!res.ok) throw new Error('Failed to submit review');
    return res.json();
  },

  // Contracts
  async getContract(appId) {
    const res = await fetch(`${API_BASE}/contracts/application/${appId}`);
    if (!res.ok) throw new Error('Failed to fetch contract');
    return res.json();
  },

  async signContract(appId, signData) {
    const res = await fetch(`${API_BASE}/contracts/application/${appId}/sign`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signData)
    });
    if (!res.ok) throw new Error('Failed to sign contract');
    return res.json();
  },

  // Milestones & Escrow
  async getMilestones(appId) {
    const res = await fetch(`${API_BASE}/milestones/application/${appId}`);
    if (!res.ok) throw new Error('Failed to fetch milestones');
    return res.json();
  },

  async submitMilestone(appId, milestoneId, data) {
    const res = await fetch(`${API_BASE}/milestones/application/${appId}/${milestoneId}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to submit milestone deliverable');
    return res.json();
  },

  async approveMilestone(appId, milestoneId, data) {
    const res = await fetch(`${API_BASE}/milestones/application/${appId}/${milestoneId}/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to approve milestone');
    return res.json();
  },

  // GeM
  async getGeMListings() {
    const res = await fetch(`${API_BASE}/gem/listings`);
    if (!res.ok) throw new Error('Failed to fetch GeM listings');
    return res.json();
  },

  async onboardToGeM(data) {
    const res = await fetch(`${API_BASE}/gem/onboard`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Failed to onboard to GeM');
    }
    return res.json();
  },

  async resetData() {
    const res = await fetch(`${API_BASE}/gem/reset-data`, {
      method: 'POST'
    });
    return res.json();
  }
};
