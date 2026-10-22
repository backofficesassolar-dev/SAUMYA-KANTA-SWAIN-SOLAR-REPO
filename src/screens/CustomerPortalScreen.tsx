import React, { useState } from 'react';
import { ScreenType } from '../types';

interface CustomerPortalScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const CustomerPortalScreen: React.FC<CustomerPortalScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'realtime' | 'analytics' | 'billing'>('realtime');

  return (
    <div className="flex flex-col w-full px-4 space-y-6 pb-28 max-w-xl mx-auto">
      {/* Header */}
      <section className="space-y-2 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-ping"></span>
            <span className="font-label-sm text-[#4edea3] uppercase tracking-wider font-semibold">
              Live IoT Telemetry Node
            </span>
          </div>
          <span className="bg-[#262a2e] px-2.5 py-0.5 rounded font-label-sm text-[#ffb95f] border border-white/5">
            Plant ID: ADI-OD-489
          </span>
        </div>

        <h1 className="font-headline-lg-mobile text-[#F8FAFC]">
          Customer Telemetry Portal
        </h1>
        <p className="font-body-sm text-[#94A3B8]">
          Real-time bi-directional generation, inverter operating diagnostics, and TPCODL net metering credits.
        </p>
      </section>

      {/* Tabs */}
      <div className="grid grid-cols-3 gap-1 p-1 bg-[#181c1f] rounded-xl border border-white/5">
        <button
          onClick={() => setActiveTab('realtime')}
          className={`py-2 rounded-lg font-label-sm text-center font-semibold transition-all ${
            activeTab === 'realtime' ? 'bg-[#262a2e] text-[#4edea3] shadow-sm' : 'text-[#64748B]'
          }`}
          type="button"
        >
          Real-Time
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`py-2 rounded-lg font-label-sm text-center font-semibold transition-all ${
            activeTab === 'analytics' ? 'bg-[#262a2e] text-[#4edea3] shadow-sm' : 'text-[#64748B]'
          }`}
          type="button"
        >
          Yield Curves
        </button>
        <button
          onClick={() => setActiveTab('billing')}
          className={`py-2 rounded-lg font-label-sm text-center font-semibold transition-all ${
            activeTab === 'billing' ? 'bg-[#262a2e] text-[#4edea3] shadow-sm' : 'text-[#64748B]'
          }`}
          type="button"
        >
          Net Meter Bills
        </button>
      </div>

      {activeTab === 'realtime' && (
        <div className="space-y-4">
          {/* Main Gauges Strip */}
          <div className="p-5 rounded-2xl bg-[#1c2023] shadow-xl border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-[#94A3B8]">Instantaneous Solar Power</span>
              <span className="font-label-sm px-2 py-0.5 rounded bg-[#10b981]/20 text-[#4edea3] font-mono">
                98.4% Efficiency
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="font-display-lg-mobile text-[#4edea3] font-bold">4.18</span>
              <span className="font-headline-sm text-[#F8FAFC]">kW</span>
              <span className="font-label-sm text-[#94A3B8] ml-auto">Peak Today: 4.82 kW</span>
            </div>

            {/* Split breakdown */}
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <div className="p-3 rounded-xl bg-[#181c1f] border border-white/5">
                <div className="flex items-center gap-1.5 text-[#0EA5E9] mb-1 font-label-sm">
                  <span className="material-symbols-outlined text-[18px]">home</span>
                  <span>Home Consumption</span>
                </div>
                <span className="font-headline-sm text-[#F8FAFC]">1.74 kW</span>
                <span className="font-label-sm text-[#64748B] block mt-0.5">ACs & Lights active</span>
              </div>

              <div className="p-3 rounded-xl bg-[#181c1f] border border-white/5">
                <div className="flex items-center gap-1.5 text-[#ffb95f] mb-1 font-label-sm">
                  <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
                  <span>Grid Export (Net)</span>
                </div>
                <span className="font-headline-sm text-[#ffb95f]">2.44 kW</span>
                <span className="font-label-sm text-[#64748B] block mt-0.5">Feeding TPCODL Grid</span>
              </div>
            </div>

            {/* Inverter telemetry parameters */}
            <div className="p-3.5 rounded-xl bg-[#0b0f12] grid grid-cols-3 gap-2 text-center font-label-sm border border-white/5">
              <div>
                <span className="text-[#64748B] block">Grid Voltage</span>
                <span className="text-[#F8FAFC] font-mono font-semibold">234.2 V</span>
              </div>
              <div>
                <span className="text-[#64748B] block">Frequency</span>
                <span className="text-[#F8FAFC] font-mono font-semibold">50.01 Hz</span>
              </div>
              <div>
                <span className="text-[#64748B] block">Inv Temp</span>
                <span className="text-[#4edea3] font-mono font-semibold">37.4 °C</span>
              </div>
            </div>
          </div>

          {/* Today's Cumulative Performance */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-[#181c1f] p-3 rounded-xl text-center border border-white/5">
              <span className="font-label-sm text-[#64748B] uppercase block">Today's Generation</span>
              <span className="font-headline-sm text-[#4edea3] font-bold mt-1 block">21.8</span>
              <span className="font-label-sm text-[#94A3B8]">kWh Units</span>
            </div>

            <div className="bg-[#181c1f] p-3 rounded-xl text-center border border-white/5">
              <span className="font-label-sm text-[#64748B] uppercase block">Exported to Grid</span>
              <span className="font-headline-sm text-[#ffb95f] font-bold mt-1 block">13.2</span>
              <span className="font-label-sm text-[#94A3B8]">kWh Units</span>
            </div>

            <div className="bg-[#181c1f] p-3 rounded-xl text-center border border-white/5">
              <span className="font-label-sm text-[#64748B] uppercase block">Daily Savings</span>
              <span className="font-headline-sm text-[#F8FAFC] font-bold mt-1 block">₹126</span>
              <span className="font-label-sm text-[#4edea3]">Avoided Cost</span>
            </div>
          </div>

          {/* Environmental Savings widget */}
          <div className="p-4 rounded-xl bg-[#181c1f] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#4edea3] text-[28px]">eco</span>
              <div>
                <span className="font-body-md text-[#F8FAFC] font-semibold block">Total Carbon Offset to Date</span>
                <span className="font-label-sm text-[#94A3B8]">4.62 Metric Tonnes CO₂ Saved</span>
              </div>
            </div>
            <span className="font-headline-sm text-[#4edea3] font-mono">75 Teaks</span>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-[#1c2023] border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-[#F8FAFC]">Today's Diurnal Solar Curve</h3>
              <span className="font-label-sm text-[#4edea3]">Bhubaneswar Sun Path</span>
            </div>

            <div className="w-full h-32 relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 320 100">
                <defs>
                  <linearGradient id="portalGlow" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#4edea3" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#4edea3" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 10,90 Q 50,85 90,45 T 160,15 T 230,50 T 310,90 L 310,100 L 10,100 Z"
                  fill="url(#portalGlow)"
                />
                <path
                  d="M 10,90 Q 50,85 90,45 T 160,15 T 230,50 T 310,90"
                  fill="none"
                  stroke="#4edea3"
                  strokeWidth="3"
                />
                <circle cx="160" cy="15" fill="#ffb95f" r="5" />
                <text fill="#ffb95f" fontFamily="JetBrains Mono" fontSize="9" textAnchor="middle" x="160" y="8">
                  12:30 PM: 4.82 kW
                </text>
              </svg>
            </div>

            <div className="flex justify-between font-label-sm text-[#64748B] pt-2 border-t border-white/5">
              <span>06:00 AM</span>
              <span>09:00 AM</span>
              <span>12:00 PM</span>
              <span>03:00 PM</span>
              <span>06:00 PM</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#181c1f] border border-white/5 space-y-2">
            <span className="font-label-sm text-[#94A3B8] uppercase block">Monthly Production Summary (2025)</span>
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-[#94A3B8]">October (Current):</span>
                <span className="text-[#4edea3] font-bold">542 kWh • ₹3,143 Saved</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-[#94A3B8]">September:</span>
                <span className="text-[#4edea3] font-bold">489 kWh • ₹2,836 Saved</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#94A3B8]">August (Monsoon):</span>
                <span className="text-[#4edea3] font-bold">410 kWh • ₹2,378 Saved</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'billing' && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-[#1c2023] border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-[#4edea3] uppercase tracking-wider font-semibold">
                TPCODL Bi-Directional Net Metering Statement
              </span>
              <span className="font-label-sm text-[#ffb95f]">CA: 100004928172</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0b0f12] space-y-2 border border-white/5">
              <div className="flex justify-between text-xs">
                <span className="text-[#94A3B8]">Import from Grid:</span>
                <span className="text-[#F8FAFC] font-mono">112 Units</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#94A3B8]">Export to Grid:</span>
                <span className="text-[#4edea3] font-mono font-bold">-384 Units</span>
              </div>
              <div className="flex justify-between text-xs pt-1 border-t border-white/5 font-bold">
                <span className="text-[#F8FAFC]">Net Banked Energy Credit:</span>
                <span className="text-[#4edea3] font-mono">+272 Units Carried Forward</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#181c1f] flex items-center justify-between">
              <div>
                <span className="font-label-sm text-[#64748B] block">Current Payable Bill</span>
                <span className="font-headline-sm text-[#4edea3] font-bold">₹0.00</span>
                <span className="font-label-sm text-[#94A3B8] block text-[11px]">Only fixed demand charge deducted</span>
              </div>
              <button
                onClick={() => alert('Official TPCODL Net Meter Energy Settlement Statement downloaded.')}
                className="px-3.5 py-2 rounded-xl bg-[#262a2e] text-[#F8FAFC] font-label-sm font-semibold hover:bg-[#313539] transition-colors border border-white/5 flex items-center gap-1"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">receipt</span>
                <span>Bill PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => onNavigate('calculator')}
        className="w-full py-3.5 rounded-xl bg-[#262a2e] text-[#F8FAFC] font-label-md font-semibold flex items-center justify-center gap-2 hover:bg-[#313539] transition-colors border border-white/5"
        type="button"
      >
        <span className="material-symbols-outlined text-[18px]">calculate</span>
        <span>Re-calculate or Upgrade Plant Capacity</span>
      </button>
    </div>
  );
};
