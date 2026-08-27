import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingCart, Award, CheckCircle2, Download, ExternalLink, ShieldCheck, FileCheck } from 'lucide-react';

export default function GovProcurementPage() {
  const { activePilot, showToast } = useApp();

  const [orderQty, setOrderQty] = useState(50);
  const unitPrice = 96000; // ₹96,000 per ward deployment license
  const totalAmount = orderQty * unitPrice;

  const handleGeneratePackage = () => {
    showToast('Procurement Dossier (PAC Certificate + SLA + Hash Manifest) generated!', 'success');
  };

  const handlePlaceGeMOrder = (e) => {
    e.preventDefault();
    showToast(`Direct GeM Purchase Order issued for ₹${(totalAmount / 100000).toFixed(2)} Lakh to ${activePilot.startup_name}!`, 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div className="modern-card p-6 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-6 h-6 text-slate-950" />
            <h1 className="text-xl font-black tracking-tight">GeM Sandbox Direct Procurement Gateway</h1>
          </div>
          <p className="text-xs text-slate-900 font-medium max-w-2xl mt-1">
            Fast-track procurement gateway enabling central and state departments to directly procure sandbox-graduated innovations under Proprietary Article Certificate (PAC) rules.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-amber-700/30 p-3 rounded-xl border border-amber-400/50">
          <Award className="w-5 h-5 text-slate-950" />
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-900">Startup India Exemption</p>
            <p className="text-xs font-black">Prior Turnover & Experience Waived</p>
          </div>
        </div>
      </div>

      {/* Procurement Readiness Checklist */}
      <div className="modern-card p-6 bg-white space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">PAC Procurement Compliance Matrix</h3>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            100% Eligible
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Vendor Identity</span>
            <p className="font-bold text-emerald-700">🟢 DPIIT Verified</p>
            <p className="text-[10px] text-slate-500">{activePilot.startup_name}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Pilot Outcome</span>
            <p className="font-bold text-emerald-700">🟢 28% Validated</p>
            <p className="text-[10px] text-slate-500">Exceeded 20% Goal</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">GeM PAC Certificate</span>
            <p className="font-bold text-emerald-700">🟢 Certified Ready</p>
            <p className="text-[10px] text-slate-500">PAC-2026-MCBM-08</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Prior Experience Exemption</span>
            <p className="font-bold text-emerald-700">🟢 Granted</p>
            <p className="text-[10px] text-slate-500">GFR Rule 173(i)</p>
          </div>
        </div>

        <div className="pt-2 flex justify-start">
          <button
            onClick={handleGeneratePackage}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition"
          >
            <Download className="w-4 h-4" />
            <span>Generate Full Procurement Dossier (PDF)</span>
          </button>
        </div>
      </div>

      {/* Direct Order Form */}
      <div className="modern-card p-6 bg-white space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Direct Purchase Order Simulator</h3>

        <form onSubmit={handlePlaceGeMOrder} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Procuring Ministry / Department</label>
              <input
                type="text"
                readOnly
                value="Municipal Corporation of Greater Mumbai"
                className="w-full text-xs border border-slate-200 bg-slate-50 rounded-xl p-3 font-semibold text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Deployment Wards Quantity</label>
              <input
                type="number"
                min="1"
                max="100"
                value={orderQty}
                onChange={(e) => setOrderQty(Number(e.target.value))}
                className="w-full text-xs border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-amber-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Total Procurement Amount</label>
              <div className="text-base font-black text-emerald-700 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                ₹{(totalAmount / 100000).toFixed(2)} Lakh (₹{(totalAmount / 10000000).toFixed(2)} Cr)
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/25 transition flex items-center space-x-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Issue Official GeM PAC Purchase Order</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
