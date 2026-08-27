import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import MetricCard from '../components/common/MetricCard';
import { Badge } from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { 
  ShoppingCart, 
  ShieldCheck, 
  Award, 
  ExternalLink, 
  CheckCircle2, 
  TrendingUp, 
  Building2,
  Download,
  Search,
  PackageCheck
} from 'lucide-react';

export default function GeMTransitionPage() {
  const { gemListings, currentView, setCurrentView, showToast } = useApp();

  const [selectedListing, setSelectedListing] = useState(null);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderQty, setOrderQty] = useState(2);
  const [procuringMinistry, setProcuringMinistry] = useState('Ministry of Defence / Coast Guard HQ');

  const totalCatalogVolume = gemListings.reduce((acc, curr) => acc + (curr.order_volume_inr || 0), 0);

  const handleCreateOrder = (e) => {
    e.preventDefault();
    if (!selectedListing) return;
    showToast(`Direct GeM Purchase Order issued for ₹${((orderQty * selectedListing.unit_price_inr) / 100000).toFixed(1)} Lakh to ${selectedListing.startup_name}!`, 'success');
    setOrderModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* GeM Portal Banner */}
      <div className="gov-card p-6 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-6 h-6 text-slate-950" />
              <span className="text-xl font-black tracking-tight">GeM Sandbox Direct Procurement Portal</span>
            </div>
            <p className="text-xs text-slate-900 font-medium max-w-2xl">
              Specialized fast-track procurement gateway enabling central and state ministries to directly procure sandbox-graduated innovations under Proprietary Article Certificate (PAC) guidelines.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-amber-700/30 p-2.5 rounded-xl border border-amber-400/50">
            <Award className="w-5 h-5 text-slate-950" />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-900">Exemption Status</p>
              <p className="text-xs font-black">Prior Turnover & Experience Waived</p>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard
          title="Sandbox Graduated Catalog Products"
          value={gemListings.length}
          subtitle="Available for Instant Government Order"
          icon={PackageCheck}
          color="amber"
        />
        <MetricCard
          title="Total GeM Order Volume"
          value={`₹${(totalCatalogVolume / 100000).toFixed(1)} Lakh`}
          subtitle="Direct PAC procurement executions"
          icon={TrendingUp}
          color="emerald"
        />
        <MetricCard
          title="Compliance & Cyber SLA"
          value="100% Cleared"
          subtitle="CERT-In & MeitY Empanelled"
          icon={ShieldCheck}
          color="purple"
        />
      </div>

      {/* Catalog Grid */}
      <div className="gov-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Sandbox Direct Procurement Catalog</h3>
            <p className="text-xs text-slate-500">Certified products ready for one-click PAC government purchase orders</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {gemListings.map(item => (
            <div key={item.id} className="p-5 rounded-xl border border-amber-200 bg-white hover:border-amber-400 hover:shadow-md transition space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 uppercase">
                      {item.gem_service_type}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">{item.catalog_title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5">OEM Startup: <strong className="text-blue-700">{item.startup_name}</strong></p>
                  </div>
                  <span className="text-sm font-mono font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded">
                    {item.id}
                  </span>
                </div>

                <div className="mt-3 p-3 bg-slate-50 rounded-lg text-xs space-y-1 text-slate-600">
                  <p><span className="font-semibold text-slate-700">Category:</span> {item.product_category}</p>
                  <p><span className="font-semibold text-slate-700">Delivery SLA:</span> {item.delivery_terms}</p>
                  <p><span className="font-semibold text-slate-700">Sandbox Ref:</span> <span className="font-mono text-emerald-700 font-bold">{item.sandbox_certification_ref}</span></p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Unit Direct Price</p>
                  <p className="text-base font-bold text-slate-900">₹{(item.unit_price_inr / 100000).toFixed(2)} Lakh</p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setSelectedListing(item);
                      setOrderModalOpen(true);
                    }}
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold shadow-sm transition"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Issue GeM Order</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GeM Purchase Order Modal */}
      {orderModalOpen && selectedListing && (
        <Modal
          isOpen={orderModalOpen}
          onClose={() => setOrderModalOpen(false)}
          title={`Direct GeM Purchase Order: ${selectedListing.catalog_title}`}
        >
          <form onSubmit={handleCreateOrder} className="space-y-4">
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
              <span className="text-xs font-bold text-amber-950">{selectedListing.catalog_title}</span>
              <p className="text-xs text-amber-800 mt-0.5">
                Vendor: <strong>{selectedListing.startup_name}</strong> • PAC Exemption Active
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Procuring Department / Ministry *</label>
              <input
                type="text"
                required
                value={procuringMinistry}
                onChange={(e) => setProcuringMinistry(e.target.value)}
                className="w-full text-xs border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Order Quantity *</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={orderQty}
                  onChange={(e) => setOrderQty(Number(e.target.value))}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Total Procurement Amount</label>
                <div className="text-xs font-bold text-emerald-700 p-2 bg-slate-50 border border-slate-200 rounded-lg">
                  ₹{((orderQty * selectedListing.unit_price_inr) / 100000).toFixed(2)} Lakh
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setOrderModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-600 rounded-lg shadow-md"
              >
                Confirm Direct Procurement Order
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
