import React, { useState } from 'react';
import { ScreenType, SystemTopology } from '../types';
import { SolarParticleSphere } from '../components/SolarParticleSphere';
import { PRODUCTS_CATALOG, TEN_STAGE_TIMELINE } from '../data/mockData';

interface HomeTelemetryScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onRequestQuote: (productName: string) => void;
}

export const HomeTelemetryScreen: React.FC<HomeTelemetryScreenProps> = ({
  onNavigate,
  onRequestQuote,
}) => {
  const [archMode, setArchMode] = useState<SystemTopology>('ongrid');

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Top Subsidy & Net-Metering Alert Ribbon */}
      <div className="w-full bg-[#181c1f] px-4 py-3 border-b border-white/[0.06]">
        <div className="max-w-xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="flex h-2 w-2 rounded-full bg-[#ffb95f] shrink-0 animate-ping"></span>
            <p className="font-body-sm text-[#e0e3e7] truncate text-xs sm:text-sm">
              <span className="font-semibold text-[#ffb95f]">PM Surya Ghar:</span> Subsidy up to{' '}
              <span className="text-[#4edea3] font-semibold">₹78,000</span> | TPCODL, TPNODL, TPSODL, TPWODL Approved
            </p>
          </div>
          <button
            onClick={() => onNavigate('subsidy')}
            className="shrink-0 flex items-center gap-1 font-label-sm text-[#4edea3] hover:text-[#6ffbbe] uppercase tracking-wider font-semibold"
            type="button"
          >
            <span>View Details</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative w-full px-4 pt-4 pb-8 overflow-hidden">
        <div className="max-w-xl mx-auto flex flex-col items-center text-center relative z-10">
          {/* Interactive 3D Real-Time Particle Sphere */}
          <SolarParticleSphere irradianceLabel="Odisha Sun Irradiance: 5.4 kWh/m²/day" />

          {/* Hero Headline */}
          <h1 className="font-display-lg-mobile uppercase tracking-tight text-[#F8FAFC] mt-4">
            Power Your World.{' '}
            <span className="bg-gradient-to-r from-[#4edea3] via-[#ffb95f] to-[#F27D26] bg-clip-text text-transparent">
              The Solar Way.
            </span>
          </h1>

          <p className="font-body-md text-[#94A3B8] mt-3 max-w-md">
            From your first site survey to installation, commissioning, and final testing — discover solar solutions engineered for Odisha’s climate.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full mt-6">
            <button
              onClick={() => onNavigate('survey')}
              className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-[#10b981] text-[#00422b] font-headline-sm flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(16,185,129,0.35)] hover:brightness-110 active:scale-95 transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">solar_power</span>
              <span>Book a Site Survey</span>
            </button>
            <button
              onClick={() => onNavigate('catalog')}
              className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-[#262a2e] text-[#F8FAFC] font-headline-sm flex items-center justify-center gap-2 hover:bg-[#313539] transition-colors border border-white/5"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">explore</span>
              <span>Explore Solar Products</span>
            </button>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 gap-2.5 w-full mt-4">
            <div className="bg-[#181c1f] p-3 rounded-xl flex items-center gap-2.5 text-left border border-white/5">
              <div className="w-9 h-9 rounded-lg bg-[#262a2e] flex items-center justify-center shrink-0 text-[#4edea3]">
                <span className="material-symbols-outlined text-[20px]">bolt</span>
              </div>
              <div>
                <p className="font-label-sm text-[#64748B] uppercase">Avg Odisha Setup</p>
                <p className="font-label-md text-[#F8FAFC] font-semibold">4.8 kW Rooftop</p>
              </div>
            </div>

            <div className="bg-[#181c1f] p-3 rounded-xl flex items-center gap-2.5 text-left border border-white/5">
              <div className="w-9 h-9 rounded-lg bg-[#262a2e] flex items-center justify-center shrink-0 text-[#ffb95f]">
                <span className="material-symbols-outlined text-[20px]">wb_sunny</span>
              </div>
              <div>
                <p className="font-label-sm text-[#64748B] uppercase">Annual Solar Yield</p>
                <p className="font-label-md text-[#F8FAFC] font-semibold">300+ Sunny Days</p>
              </div>
            </div>
          </div>

          {/* Quick Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            <span className="bg-[#262a2e] px-3 py-1 rounded-full font-label-sm text-[#94A3B8] flex items-center gap-1.5 border border-white/5">
              <span className="material-symbols-outlined text-[#4edea3] text-[14px]">verified</span>
              MNRE Certified Partner
            </span>
            <span className="bg-[#262a2e] px-3 py-1 rounded-full font-label-sm text-[#94A3B8] flex items-center gap-1.5 border border-white/5">
              <span className="material-symbols-outlined text-[#ffb95f] text-[14px]">electrical_services</span>
              Odisha DISCOM Grid Tie
            </span>
            <span className="bg-[#262a2e] px-3 py-1 rounded-full font-label-sm text-[#94A3B8] flex items-center gap-1.5 border border-white/5">
              <span className="material-symbols-outlined text-[#4edea3] text-[14px]">shield</span>
              25-Yr Linear Warranty
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Energy Flow Telemetry & Architecture */}
      <section className="w-full px-4 py-8 bg-[#0b0f12] border-t border-b border-white/[0.06]">
        <div className="max-w-xl mx-auto flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-ping"></span>
              <span className="font-label-sm text-[#4edea3] uppercase tracking-widest font-semibold">
                System Architecture
              </span>
            </div>
            <h2 className="font-headline-lg-mobile text-[#F8FAFC]">
              Live Energy Flow Telemetry
            </h2>
            <p className="font-body-sm text-[#64748B]">
              Dynamic bidirectional flow across generation, storage, home loads, and DISCOM net meter.
            </p>
          </div>

          {/* System Selector Tabs */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-[#181c1f] rounded-xl border border-white/5">
            <button
              className={`py-2 px-2 rounded-lg font-label-sm text-center font-semibold transition-all ${
                archMode === 'ongrid'
                  ? 'bg-[#262a2e] text-[#4edea3] shadow-sm'
                  : 'text-[#64748B] hover:text-[#F8FAFC]'
              }`}
              onClick={() => setArchMode('ongrid')}
              type="button"
            >
              On-Grid
            </button>
            <button
              className={`py-2 px-2 rounded-lg font-label-sm text-center font-semibold transition-all ${
                archMode === 'hybrid'
                  ? 'bg-[#262a2e] text-[#4edea3] shadow-sm'
                  : 'text-[#64748B] hover:text-[#F8FAFC]'
              }`}
              onClick={() => setArchMode('hybrid')}
              type="button"
            >
              Hybrid BESS
            </button>
            <button
              className={`py-2 px-2 rounded-lg font-label-sm text-center font-semibold transition-all ${
                archMode === 'offgrid'
                  ? 'bg-[#262a2e] text-[#4edea3] shadow-sm'
                  : 'text-[#64748B] hover:text-[#F8FAFC]'
              }`}
              onClick={() => setArchMode('offgrid')}
              type="button"
            >
              Off-Grid
            </button>
          </div>

          {/* Dynamic Architecture Box */}
          <div className="bg-[#1c2023] p-5 rounded-2xl flex flex-col gap-5 shadow-xl border border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4edea3] text-[20px]">schema</span>
                <span className="font-title-md text-[#F8FAFC]">
                  {archMode === 'ongrid' && 'On-Grid Rooftop Array'}
                  {archMode === 'hybrid' && 'Hybrid Grid + LiFePO4 Battery'}
                  {archMode === 'offgrid' && 'Standalone Off-Grid Array'}
                </span>
              </div>
              <span className="bg-[#262a2e] px-2.5 py-1 rounded font-label-sm text-[#4edea3] font-semibold border border-[#4edea3]/20">
                Status: ACTIVE GENERATING
              </span>
            </div>

            {/* Telemetry Pipeline Graphic */}
            <div className="relative w-full bg-[#0b0f12] p-4 rounded-xl flex flex-col items-center border border-white/5">
              <div className="w-full grid grid-cols-3 items-center gap-2 text-center">
                {/* Node 1: PV Array */}
                <div className="flex flex-col items-center p-2.5 bg-[#181c1f] rounded-xl border border-white/5">
                  <span className="material-symbols-outlined text-[#ffb95f] text-[28px]">solar_power</span>
                  <span className="font-label-sm text-[#F8FAFC] font-semibold mt-1">PV Modules</span>
                  <span className="font-label-sm text-[#4edea3] mt-0.5">
                    {archMode === 'ongrid' ? '3.92 kW' : archMode === 'hybrid' ? '4.80 kW' : '3.60 kW'}
                  </span>
                </div>

                {/* Flow Pulse 1 */}
                <div className="flex flex-col items-center justify-center">
                  <span className="material-symbols-outlined text-[#4edea3] animate-pulse text-[20px]">east</span>
                  <span className="font-label-sm text-[#64748B]">DC Direct</span>
                </div>

                {/* Node 2: Inverter */}
                <div className="flex flex-col items-center p-2.5 bg-[#181c1f] rounded-xl border border-white/5">
                  <span className="material-symbols-outlined text-[#4edea3] text-[28px]">electric_bolt</span>
                  <span className="font-label-sm text-[#F8FAFC] font-semibold mt-1">Dual MPPT</span>
                  <span className="font-label-sm text-[#94A3B8] mt-0.5">
                    {archMode === 'ongrid' ? '98.2% Eff' : archMode === 'hybrid' ? 'Hybrid Inv' : 'Off-Grid Inv'}
                  </span>
                </div>
              </div>

              {/* Vertical flow branch */}
              <div className="w-full flex items-center justify-around py-3">
                <span className="material-symbols-outlined text-[#4edea3] text-[20px]">south</span>
                <span className="material-symbols-outlined text-[#ffb95f] text-[20px]">south</span>
              </div>

              <div className="w-full grid grid-cols-2 gap-3 text-center">
                {/* Node 3: Home Critical Load */}
                <div className="flex flex-col items-center p-3 bg-[#181c1f] rounded-xl border border-white/5">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#0EA5E9] text-[22px]">home</span>
                    <span className="font-label-sm text-[#F8FAFC] font-semibold">Home Loads</span>
                  </div>
                  <p className="font-headline-sm text-[#F8FAFC] mt-1">1.8 kW</p>
                  <span className="font-label-sm text-[#64748B]">Self-consumed (66%)</span>
                </div>

                {/* Node 4: Dynamic Sink (Grid / Battery / Island) */}
                <div className="flex flex-col items-center p-3 bg-[#181c1f] rounded-xl border border-white/5">
                  {archMode === 'ongrid' && (
                    <>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[#ffb95f] text-[22px]">swap_horiz</span>
                        <span className="font-label-sm text-[#F8FAFC] font-semibold">Grid Export</span>
                      </div>
                      <p className="font-headline-sm text-[#ffb95f] mt-1">2.12 kW</p>
                      <span className="font-label-sm text-[#64748B]">Export to TPCODL</span>
                    </>
                  )}
                  {archMode === 'hybrid' && (
                    <>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[#4edea3] text-[22px]">battery_charging_full</span>
                        <span className="font-label-sm text-[#F8FAFC] font-semibold">BESS Storage</span>
                      </div>
                      <p className="font-headline-sm text-[#4edea3] mt-1">94% SOC</p>
                      <span className="font-label-sm text-[#64748B]">10.2 kWh Reserve Active</span>
                    </>
                  )}
                  {archMode === 'offgrid' && (
                    <>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[#F27D26] text-[22px]">power_off</span>
                        <span className="font-label-sm text-[#F8FAFC] font-semibold">Island Mode</span>
                      </div>
                      <p className="font-headline-sm text-[#F27D26] mt-1">100% Autonomy</p>
                      <span className="font-label-sm text-[#64748B]">Zero Grid Dependency</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Real-Time Metrics Strip */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-[#181c1f] p-2.5 rounded-lg text-center border border-white/5">
                <span className="font-label-sm text-[#64748B] uppercase">Today's Yield</span>
                <p className="font-headline-sm text-[#F8FAFC] mt-0.5">
                  18.4 <span className="font-label-sm text-[#4edea3]">kWh</span>
                </p>
              </div>
              <div className="bg-[#181c1f] p-2.5 rounded-lg text-center border border-white/5">
                <span className="font-label-sm text-[#64748B] uppercase">Exported</span>
                <p className="font-headline-sm text-[#ffb95f] mt-0.5">
                  6.2 <span className="font-label-sm text-[#ffb95f]">kWh</span>
                </p>
              </div>
              <div className="bg-[#181c1f] p-2.5 rounded-lg text-center border border-white/5">
                <span className="font-label-sm text-[#64748B] uppercase">Monthly Sav.</span>
                <p className="font-headline-sm text-[#4edea3] mt-0.5">₹3,410</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineered Solar Solutions for Odisha */}
      <section className="w-full px-4 py-8">
        <div className="max-w-xl mx-auto flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <span className="font-label-sm text-[#ffb95f] uppercase tracking-widest font-semibold">
              Specialized Segments
            </span>
            <h2 className="font-headline-lg-mobile text-[#F8FAFC]">
              Solar Solutions Built for Odisha
            </h2>
            <p className="font-body-sm text-[#64748B]">
              Engineered for coastal high-humidity, cyclonic wind loads (up to 200 km/h), and heavy monsoon conditions.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Solution 1: Residential Rooftop */}
            <div className="bg-[#181c1f] rounded-2xl overflow-hidden shadow-lg border border-white/5">
              <div
                className="bg-cover bg-center w-full h-44 relative p-3 flex flex-col justify-between"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCAP6NRjiAOk64M3jnBVpJu6iiBNxHY0EEqCh0lgtPKubQohKR9PHJBPalUJ29Eqwg3Rl2dopZikpssbQ82R4T5c72KDc551sbCasdZ-8oY26MqcuLK6CbkX21DK7pzUGA3_1rlLwVDFxWdhE_ZIHKsDFdProuDMeYwIwxUeArVrO7MqdYTg5Gcn3zS5XPV0pvmhtndpW2qGORx-zAPzGKctWtrgs8O1LwwSkGAPwJ4-zA8VIHDrnbJMQ')`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#181c1f] via-transparent to-black/30 pointer-events-none" />
                <span className="self-start relative z-10 bg-[#0b0f12]/90 px-2.5 py-1 rounded font-label-sm text-[#4edea3] font-semibold backdrop-blur-sm border border-white/5">
                  PM Surya Ghar Yojana
                </span>
                <span className="self-end relative z-10 bg-[#ffb95f] text-[#472a00] px-2.5 py-0.5 rounded font-label-sm font-bold shadow-md">
                  Subsidy ₹78,000 Direct DBT
                </span>
              </div>
              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-title-md text-[#F8FAFC]">Residential Rooftop Solar</h3>
                  <span className="font-label-md text-[#ffb95f] font-semibold">1 kW – 10 kW</span>
                </div>
                <p className="font-body-sm text-[#94A3B8]">
                  Zero upfront worry with bi-directional net-meter integration with TPCODL, TPNODL, TPWODL & TPSODL. Slash electricity bills by up to 90%.
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                  <span className="font-label-sm text-[#64748B]">Payback: 3.2 - 4 Years</span>
                  <button
                    onClick={() => onNavigate('calculator')}
                    className="font-label-md text-[#4edea3] hover:text-[#6ffbbe] flex items-center gap-1 font-semibold"
                    type="button"
                  >
                    Calculate Savings <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Solution 2: Commercial & Industrial */}
            <div className="bg-[#181c1f] rounded-2xl overflow-hidden shadow-lg border border-white/5">
              <div
                className="bg-cover bg-center w-full h-44 relative p-3 flex flex-col justify-between"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCPOdWWc3w7f5Sewl_gc70qijCTpg86xBGc2SttSgDvh0Hq7v1k_lcdbJ7cRwLwPnRvFa97iYBGrSFzYWwj2oEHBwVgyVKtLlr3_-8FMZoyR73f73Tvxw8RP_o-fEL5oTMRWnMLrPpbRv_qI_e4ckjCQ56kK-Mexou-NmKqp_WmLBH7jiIo0nST0BIE7wH-NrKtf78zZZHRqfmjKVkJzB_8XzH-pyTLlzT5sIYfir9szaUPzfHl_H5DMQ')`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#181c1f] via-transparent to-black/30 pointer-events-none" />
                <span className="self-start relative z-10 bg-[#0b0f12]/90 px-2.5 py-1 rounded font-label-sm text-[#0EA5E9] font-semibold backdrop-blur-sm border border-white/5">
                  CAPEX & OPEX / RESCO
                </span>
                <span className="self-end relative z-10 bg-[#0b0f12]/90 text-[#F8FAFC] px-2.5 py-0.5 rounded font-label-sm font-semibold border border-white/5">
                  Accelerated Depr. 40%
                </span>
              </div>
              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-title-md text-[#F8FAFC]">Commercial & Industrial</h3>
                  <span className="font-label-md text-[#ffb95f] font-semibold">10 kW – 500 kW+</span>
                </div>
                <p className="font-body-sm text-[#94A3B8]">
                  Designed for hospitals, manufacturing units, colleges, and commercial complexes across Khordha, Cuttack, and Jharsuguda industrial corridors.
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                  <span className="font-label-sm text-[#64748B]">HT/LT Interconnection Compliant</span>
                  <button
                    onClick={() => onNavigate('survey')}
                    className="font-label-md text-[#4edea3] hover:text-[#6ffbbe] flex items-center gap-1 font-semibold"
                    type="button"
                  >
                    Industrial Audit <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Solution 3: Solar Water Pumping (PM KUSUM) */}
            <div className="bg-[#181c1f] rounded-2xl overflow-hidden shadow-lg border border-white/5">
              <div
                className="bg-cover bg-center w-full h-44 relative p-3 flex flex-col justify-between"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCklKIHjg7bWC02Zwa8omZoVB1TN63yLk36AdM1HwtS7CYmgyYblFablJ-ibVYR4XyqXJ2WuNeZY1g1-aNVxX5q5umGVBTrNCgJuecXYdugem7yOd0WJoE2DCC9Sm_XPR92M0wZWmOhwurMWhHrYhg37AFVy36WLzpRh8sSmIYJVZJSsJzkNhk2lwtaSy_dQGvYp-G7THioxa9yTt_Pq9jFD-VUJuFFaBQydFbspu2f_GVL9ctKf-UslQ')`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#181c1f] via-transparent to-black/30 pointer-events-none" />
                <span className="self-start relative z-10 bg-[#0b0f12]/90 px-2.5 py-1 rounded font-label-sm text-[#4edea3] font-semibold backdrop-blur-sm border border-white/5">
                  PM-KUSUM Scheme Component-B
                </span>
                <span className="self-end relative z-10 bg-[#10b981] text-[#00422b] px-2.5 py-0.5 rounded font-label-sm font-bold shadow-md">
                  Up to 60% Farmer Subsidy
                </span>
              </div>
              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-title-md text-[#F8FAFC]">Solar Water Pumping Systems</h3>
                  <span className="font-label-md text-[#ffb95f] font-semibold">3 HP – 10 HP</span>
                </div>
                <p className="font-body-sm text-[#94A3B8]">
                  Reliable irrigation for farmers across Balasore, Ganjam, Sambalpur, and Bargarh without diesel costs or erratic rural grid voltage.
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                  <span className="font-label-sm text-[#64748B]">Submersible & Surface Pumps</span>
                  <button
                    onClick={() => onNavigate('survey')}
                    className="font-label-md text-[#4edea3] hover:text-[#6ffbbe] flex items-center gap-1 font-semibold"
                    type="button"
                  >
                    Agri Inquiry <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Solution 4: Cyclone-Resilient BESS Storage */}
            <div className="bg-[#181c1f] rounded-2xl p-4 flex flex-col gap-3 shadow-lg border border-white/5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#262a2e] flex items-center justify-center text-[#ffb95f] shrink-0 border border-white/5">
                  <span className="material-symbols-outlined text-[24px]">cyclone</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h3 className="font-title-md text-[#F8FAFC]">Cyclone-Resilient BESS</h3>
                    <span className="bg-[#262a2e] px-2 py-0.5 rounded font-label-sm text-[#4edea3]">
                      Coastal Grade
                    </span>
                  </div>
                  <p className="font-body-sm text-[#94A3B8] mt-1">
                    Engineered for Puri, Paradip, and Kendrapara coastal belts. Lithium Ferro Phosphate (LiFePO4) storage withstands storm blackout cut-offs with sub-20ms transfer time.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-white/[0.06]">
                <span className="font-label-sm text-[#64748B]">6000+ Cycles @ 90% DoD</span>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="font-label-md text-[#4edea3] hover:text-[#6ffbbe] flex items-center gap-1 font-semibold"
                  type="button"
                >
                  Learn BESS <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Genuine Tier-1 Hardware Catalog Showcase */}
      <section className="w-full px-4 py-8 bg-[#0b0f12] border-t border-b border-white/[0.06]">
        <div className="max-w-xl mx-auto flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="font-label-sm text-[#4edea3] uppercase tracking-widest font-semibold">
                Hardware Arsenal
              </span>
              <h2 className="font-headline-lg-mobile text-[#F8FAFC]">Candidate Tier-1 Hardware</h2>
            </div>
            <button
              onClick={() => onNavigate('catalog')}
              className="font-label-md text-[#4edea3] hover:text-[#6ffbbe] font-semibold flex items-center gap-1"
              type="button"
            >
              Catalog <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>

          {/* Cards for first 3 products */}
          {PRODUCTS_CATALOG.slice(0, 3).map((product) => (
            <div key={product.id} className="bg-[#181c1f] rounded-2xl p-4 flex flex-col gap-3 shadow-md border border-white/5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3">
                  <div className="w-16 h-16 rounded-xl bg-[#262a2e] overflow-hidden shrink-0 border border-white/5">
                    <img className="w-full h-full object-cover" src={product.image} alt={product.name} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-label-sm text-[#ffb95f] font-bold uppercase">{product.brand}</span>
                      <span className="bg-[#262a2e] px-1.5 py-0.5 rounded font-label-sm text-[#4edea3]">
                        {product.badge1}
                      </span>
                    </div>
                    <h3 className="font-title-md text-[#F8FAFC] leading-tight mt-0.5 truncate">{product.name}</h3>
                    <p className="font-label-sm text-[#64748B] mt-0.5">{product.stockStatus}</p>
                  </div>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-3 gap-2 bg-[#1c2023] p-2.5 rounded-xl font-label-sm border border-white/5">
                <div>
                  <span className="text-[#64748B] block truncate">{product.specs.label1}</span>
                  <span className="text-[#F8FAFC] font-semibold font-mono">{product.specs.value1}</span>
                </div>
                <div>
                  <span className="text-[#64748B] block truncate">{product.specs.label2}</span>
                  <span className="text-[#F8FAFC] font-semibold font-mono">{product.specs.value2}</span>
                </div>
                <div>
                  <span className="text-[#64748B] block truncate">{product.specs.label4}</span>
                  <span className="text-[#4edea3] font-semibold font-mono">{product.specs.value4}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="font-label-md text-[#ffb95f] font-semibold">{product.price}</span>
                <button
                  onClick={() => onRequestQuote(product.name)}
                  className="px-3.5 py-2 rounded-xl bg-[#262a2e] text-[#F8FAFC] font-label-md font-semibold hover:bg-[#313539] hover:text-[#4edea3] transition-colors flex items-center gap-1.5 border border-white/5"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">request_quote</span>
                  <span>Request Quote</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10-Stage Execution Timeline */}
      <section className="w-full px-4 py-8">
        <div className="max-w-xl mx-auto flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <span className="font-label-sm text-[#ffb95f] uppercase tracking-widest font-semibold">
              Engineering Protocol
            </span>
            <h2 className="font-headline-lg-mobile text-[#F8FAFC]">10-Stage Execution Timeline</h2>
            <p className="font-body-sm text-[#64748B]">
              Our documented methodology for swift clearance, structural endurance, and zero DISCOM net-meter delays.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {TEN_STAGE_TIMELINE.map((step, idx) => {
              const isFirst = idx <= 2;
              const isFourth = idx === 3;
              const isLast = idx === 9;

              return (
                <div
                  key={step.stageNumber}
                  className="bg-[#181c1f] p-4 rounded-xl flex items-start gap-3 border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-label-md font-bold shrink-0 ${
                      isLast
                        ? 'bg-[#10b981] text-[#00422b]'
                        : isFirst
                        ? 'bg-[#10b981]/20 text-[#4edea3]'
                        : isFourth
                        ? 'bg-[#ffb95f]/20 text-[#ffb95f]'
                        : 'bg-[#262a2e] text-[#94A3B8]'
                    }`}
                  >
                    {step.stageNumber}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h4 className="font-title-md text-[#F8FAFC] leading-snug">{step.title}</h4>
                    <p className="font-body-sm text-[#64748B] mt-0.5">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Odisha Service Coverage & DISCOM Integration Badges */}
      <section className="w-full px-4 py-8 bg-[#0b0f12] border-t border-b border-white/[0.06]">
        <div className="max-w-xl mx-auto flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <span className="font-label-sm text-[#4edea3] uppercase tracking-widest font-semibold">
              Territory Coverage
            </span>
            <h2 className="font-headline-lg-mobile text-[#F8FAFC]">Seamless All-Odisha Grid Tie</h2>
            <p className="font-body-sm text-[#64748B]">
              Pre-approved engineering compliance across all 4 Tata Power Odisha DISCOM jurisdictions.
            </p>
          </div>

          {/* DISCOM Cards Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-[#181c1f] p-3.5 rounded-xl flex flex-col justify-between border border-white/5">
              <div>
                <span className="font-label-sm text-[#ffb95f] font-bold">CENTRAL ODISHA</span>
                <h3 className="font-headline-sm text-[#F8FAFC] mt-0.5">TPCODL</h3>
                <p className="font-label-sm text-[#64748B] mt-1">Bhubaneswar, Cuttack, Puri, Khordha, Kendrapara, Dhenkanal</p>
              </div>
              <div className="flex items-center gap-1 mt-3 text-[#4edea3] font-label-sm font-semibold">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                <span>Net Meter Ready</span>
              </div>
            </div>

            <div className="bg-[#181c1f] p-3.5 rounded-xl flex flex-col justify-between border border-white/5">
              <div>
                <span className="font-label-sm text-[#ffb95f] font-bold">NORTHERN ODISHA</span>
                <h3 className="font-headline-sm text-[#F8FAFC] mt-0.5">TPNODL</h3>
                <p className="font-label-sm text-[#64748B] mt-1">Balasore, Bhadrak, Baripada, Keonjhar, Jajpur</p>
              </div>
              <div className="flex items-center gap-1 mt-3 text-[#4edea3] font-label-sm font-semibold">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                <span>Net Meter Ready</span>
              </div>
            </div>

            <div className="bg-[#181c1f] p-3.5 rounded-xl flex flex-col justify-between border border-white/5">
              <div>
                <span className="font-label-sm text-[#ffb95f] font-bold">WESTERN ODISHA</span>
                <h3 className="font-headline-sm text-[#F8FAFC] mt-0.5">TPWODL</h3>
                <p className="font-label-sm text-[#64748B] mt-1">Sambalpur, Rourkela, Bargarh, Jharsuguda, Balangir</p>
              </div>
              <div className="flex items-center gap-1 mt-3 text-[#4edea3] font-label-sm font-semibold">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                <span>Net Meter Ready</span>
              </div>
            </div>

            <div className="bg-[#181c1f] p-3.5 rounded-xl flex flex-col justify-between border border-white/5">
              <div>
                <span className="font-label-sm text-[#ffb95f] font-bold">SOUTHERN ODISHA</span>
                <h3 className="font-headline-sm text-[#F8FAFC] mt-0.5">TPSODL</h3>
                <p className="font-label-sm text-[#64748B] mt-1">Berhampur, Ganjam, Rayagada, Koraput, Jeypore</p>
              </div>
              <div className="flex items-center gap-1 mt-3 text-[#4edea3] font-label-sm font-semibold">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                <span>Net Meter Ready</span>
              </div>
            </div>
          </div>

          {/* Quick Coverage Verification Pills */}
          <div className="flex flex-col gap-2 bg-[#1c2023] p-3.5 rounded-xl border border-white/5">
            <span className="font-label-sm text-[#64748B] uppercase">Fast Track Survey Available In:</span>
            <div className="flex flex-wrap gap-1.5">
              {['Bhubaneswar', 'Cuttack', 'Puri', 'Khordha', 'Balasore', 'Sambalpur', 'Rourkela', 'Berhampur'].map((city) => (
                <span key={city} className="bg-[#262a2e] px-2.5 py-1 rounded-md font-label-sm text-[#F8FAFC] border border-white/5">
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Metrics & Regional Support Contact */}
      <section className="w-full px-4 py-8">
        <div className="max-w-xl mx-auto flex flex-col gap-5">
          {/* Trust Numbers Strip */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-[#181c1f] p-3 rounded-xl flex flex-col items-center border border-white/5">
              <span className="font-headline-lg-mobile text-[#4edea3] font-bold">1,840+</span>
              <span className="font-label-sm text-[#64748B] mt-0.5">kW Installed</span>
            </div>
            <div className="bg-[#181c1f] p-3 rounded-xl flex flex-col items-center border border-white/5">
              <span className="font-headline-lg-mobile text-[#ffb95f] font-bold">99.4%</span>
              <span className="font-label-sm text-[#64748B] mt-0.5">Grid Uptime</span>
            </div>
            <div className="bg-[#181c1f] p-3 rounded-xl flex flex-col items-center border border-white/5">
              <span className="font-headline-lg-mobile text-[#F8FAFC] font-bold">4.9★</span>
              <span className="font-label-sm text-[#64748B] mt-0.5">Rating (420+)</span>
            </div>
          </div>

          {/* Regional Headquarters Card */}
          <div className="bg-[#1c2023] p-5 rounded-2xl flex flex-col gap-4 shadow-xl border border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ffb95f] text-[22px]">corporate_fare</span>
                <h3 className="font-title-md text-[#F8FAFC]">Regional Headquarters</h3>
              </div>
              <span className="bg-[#262a2e] px-2.5 py-1 rounded font-label-sm text-[#4edea3] font-semibold border border-[#4edea3]/20">
                Open 09:00 - 19:00
              </span>
            </div>

            <div className="flex flex-col gap-2 font-body-sm text-[#94A3B8]">
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#64748B] text-[18px] shrink-0 mt-0.5">location_on</span>
                <span>Infocity Road, Patia, Bhubaneswar, Odisha 751024</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#64748B] text-[18px] shrink-0">phone_in_talk</span>
                <a className="text-[#F8FAFC] hover:text-[#4edea3] font-semibold" href="tel:+917894012345">
                  +91 78940 12345
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#64748B] text-[18px] shrink-0">mail</span>
                <a className="text-[#F8FAFC] hover:text-[#4edea3]" href="mailto:info@adishaktisolar.com">
                  info@adishaktisolar.com
                </a>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => onNavigate('survey')}
                className="w-full py-3.5 rounded-xl bg-[#10b981] text-[#00422b] font-headline-sm text-center flex items-center justify-center gap-2 font-semibold shadow-md active:scale-95 transition-all"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                <span>Schedule Free Roof Assessment</span>
              </button>
              <p className="font-label-sm text-[#64748B] text-center">
                Zero commitment • Instant feasibility & DISCOM subsidy calculation
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
