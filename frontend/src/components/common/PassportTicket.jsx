import React from 'react';
import { ShieldCheck, CheckCircle2, Award, Download, QrCode, Plane, Lock } from 'lucide-react';

export default function PassportTicket({
  startupName = "RouteAI Systems",
  dpiitNo = "DIPP94821",
  challengeTitle = "Smart Waste Route Optimization",
  baselineKPI = "30% Missed Pickups",
  targetKPI = "≤20% Target",
  actualKPI = "18% Validated",
  pilotDuration = "60-Day Pilot (Day 42/60)",
  certInTier = "Tier-1 High Security",
  hashId = "SHA256:7F83B165...9069",
  status = "Validated",
  onDownload
}) {
  return (
    <div className="ticket-card p-6 max-w-md w-full mx-auto bg-white border border-slate-200">
      {/* Ticket Header */}
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-xs">
            🏛️
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">MAHAINNOVATE PASSPORT</span>
            <h4 className="text-xs font-bold text-slate-900 leading-tight">Evidence & Scale Certificate</h4>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center space-x-1">
          <CheckCircle2 className="w-3 h-3" />
          <span>{status}</span>
        </span>
      </div>

      {/* Flight-Route Style Evolution Line (Ref: Image 1) */}
      <div className="my-4 p-4 rounded-xl bg-gradient-to-r from-blue-50/80 via-indigo-50/40 to-blue-50/80 border border-blue-100">
        <div className="flex items-center justify-between text-center">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">PROBLEM BASELINE</p>
            <p className="text-sm font-black text-slate-900 mt-0.5">{baselineKPI}</p>
            <p className="text-[10px] text-slate-500">Municipal Pre-Pilot</p>
          </div>

          <div className="flex flex-col items-center px-3">
            <span className="text-[9px] font-bold text-blue-600 mb-1">{pilotDuration}</span>
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <div className="w-12 border-t border-dashed border-blue-400" />
              <Plane className="w-3.5 h-3.5 text-blue-600 transform rotate-90" />
              <div className="w-12 border-t border-dashed border-blue-400" />
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            </div>
            <span className="text-[9px] text-emerald-600 font-semibold mt-1">Goal: {targetKPI}</span>
          </div>

          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">VALIDATED OUTCOME</p>
            <p className="text-sm font-black text-emerald-600 mt-0.5">{actualKPI}</p>
            <p className="text-[10px] text-slate-500">Target Exceeded</p>
          </div>
        </div>
      </div>

      {/* Attributes Grid */}
      <div className="grid grid-cols-2 gap-3 text-xs pt-1">
        <div>
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">Innovator</span>
          <p className="font-bold text-slate-900 mt-0.5">{startupName}</p>
          <span className="text-[10px] text-blue-600 font-mono">DPIIT: {dpiitNo}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">Security & Privacy</span>
          <p className="font-bold text-slate-900 mt-0.5">{certInTier}</p>
          <span className="text-[10px] text-emerald-600 font-semibold">DPDP Act 2023 Compliant</span>
        </div>
      </div>

      {/* Perforated Tear-Line (Ref: Image 1) */}
      <div className="ticket-divider" />

      {/* Barcode & Hash Digest Section */}
      <div className="pt-2 flex flex-col items-center text-center space-y-2">
        <div className="w-full flex items-center justify-between text-[10px] text-slate-500">
          <span>Official Gate Verification</span>
          <span className="font-mono font-bold text-slate-800">GATE 08 • PAC READY</span>
        </div>

        {/* Barcode Graphic */}
        <div className="w-full h-9 bg-slate-900 rounded-sm flex items-center justify-center p-1.5 overflow-hidden">
          <div className="w-full h-full flex justify-between items-stretch opacity-90">
            {[4, 2, 6, 1, 3, 5, 2, 7, 2, 4, 1, 6, 3, 2, 5, 1, 4, 2, 8, 3, 2, 6, 1, 4, 2, 5, 3, 7, 1, 4].map((w, i) => (
              <div
                key={i}
                className="bg-white h-full"
                style={{ width: `${w * 1.5}px` }}
              />
            ))}
          </div>
        </div>
        <p className="text-[9px] font-mono text-slate-500 tracking-wider uppercase">
          IMMUTABLE HASH: {hashId}
        </p>

        {/* Action Button */}
        <button
          onClick={onDownload}
          className="w-full mt-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition flex items-center justify-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Download Official Evidence Passport</span>
        </button>
      </div>
    </div>
  );
}
