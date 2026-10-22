import React, { useState, useMemo } from 'react';
import { ScreenType, SystemTopology } from '../types';

interface SolarCalculatorScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onSetSurveyEstimate: (estimate: { capacity: string; district: string; systemType: string; bill: number }) => void;
}

export const SolarCalculatorScreen: React.FC<SolarCalculatorScreenProps> = ({
  onNavigate,
  onSetSurveyEstimate,
}) => {
  const [bill, setBill] = useState<number>(3500);
  const [propertyType, setPropertyType] = useState<string>('res-1p');
  const [district, setDistrict] = useState<string>('bhubaneswar');
  const [roofArea, setRoofArea] = useState<number>(350);
  const [substrate, setSubstrate] = useState<string>('RCC Flat');
  const [systemType, setSystemType] = useState<SystemTopology>('ongrid');
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false);
  const [showProposalModal, setShowProposalModal] = useState<boolean>(false);

  // Dynamic calculations based on OERC Odisha slab rates (~₹5.80/unit)
  const calculation = useMemo(() => {
    const monthlyUnits = Math.round(bill / 5.8);
    let kwCapacity = parseFloat((monthlyUnits / (4.2 * 30)).toFixed(1));
    if (kwCapacity < 1.0) kwCapacity = 1.0;
    if (kwCapacity > 20.0) kwCapacity = 20.0;

    const panelsCount = Math.ceil((kwCapacity * 1000) / 540);
    const monthlyGen = Math.round(kwCapacity * 4.2 * 30);
    const annualGen = Math.round(monthlyGen * 12);
    const annualSavings = Math.round(annualGen * 5.8);

    // Turnkey pricing baseline: ~₹63,500 / kW in Odisha
    let grossCost = Math.round(kwCapacity * 63500);
    if (systemType === 'hybrid') {
      grossCost += 75000; // LiFePO4 battery pack
    }

    // PM Surya Ghar subsidy brackets
    let centralSubsidy = 0;
    if (propertyType === 'res-1p' || propertyType === 'res-3p') {
      if (kwCapacity <= 1.2) {
        centralSubsidy = 33000;
      } else if (kwCapacity <= 2.2) {
        centralSubsidy = 66000;
      } else {
        centralSubsidy = 78000;
      }
    }

    // Odisha state renewable bonus incentive
    let stateSubsidy = 20000;
    if (propertyType === 'comm' || propertyType === 'agri') {
      centralSubsidy = 0; // PM Surya Ghar is residential
      stateSubsidy = 15000;
    }

    const netCost = Math.max(0, grossCost - centralSubsidy - stateSubsidy);
    const payback = annualSavings > 0 ? (netCost / annualSavings).toFixed(1) : '3.8';
    const lifetimeSavings = Math.round(annualSavings * 25 - netCost);
    const co2Saved = (annualGen * 0.00082).toFixed(1);
    const trees = Math.round(annualGen * 0.0125);

    return {
      kwCapacity,
      panelsCount,
      monthlyGen,
      annualGen,
      annualSavings,
      grossCost,
      centralSubsidy,
      stateSubsidy,
      netCost,
      payback,
      lifetimeSavings,
      co2Saved,
      trees,
      requiredSpace: Math.round(kwCapacity * 95),
    };
  }, [bill, propertyType, systemType]);

  const handleBookWithEstimate = () => {
    onSetSurveyEstimate({
      capacity: `${calculation.kwCapacity} kWp`,
      district: district,
      systemType: systemType === 'ongrid' ? 'On-Grid Bi-Directional' : 'Hybrid Cyclone-Ready',
      bill: bill,
    });
    onNavigate('survey');
  };

  return (
    <div className="flex flex-col w-full px-4 space-y-6 pb-28 max-w-xl mx-auto">
      {/* Micro Headline & Context Notice */}
      <section className="space-y-3 pt-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-[#262a2e] text-[#4edea3] border border-white/5">
            <span className="material-symbols-outlined text-[16px]">calculate</span>
          </span>
          <span className="font-label-sm text-[#4edea3] uppercase tracking-wider font-semibold">
            Tariff Model 2025 • OERC Compliant
          </span>
        </div>

        <h1 className="font-headline-lg-mobile text-[#F8FAFC] font-semibold tracking-tight">
          Odisha Solar Savings & Capacity Calculator
        </h1>

        <div className="p-3.5 rounded-xl bg-[#181c1f] shadow-sm flex items-start gap-3 border border-white/5">
          <span className="material-symbols-outlined text-[#ffb95f] text-[20px] shrink-0 mt-0.5">
            verified_user
          </span>
          <p className="font-body-sm text-[#94A3B8] leading-snug">
            Calibrated to current <strong className="text-[#F8FAFC] font-medium">TPCODL, TPNODL, TPSODL & TPWODL</strong> retail tariff slabs, MNRE benchmark ceiling rates, and active PM Surya Ghar Muft Bijli Yojana directives.
          </p>
        </div>
      </section>

      {/* Interactive Input Controls Console */}
      <section className="p-5 rounded-2xl bg-[#1c2023] shadow-md space-y-6 border border-white/5">
        <div className="flex items-center justify-between pb-1 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4edea3] text-[20px]">tune</span>
            <h2 className="font-headline-sm text-[#F8FAFC]">System Parameters</h2>
          </div>
          <span className="font-label-sm px-2.5 py-1 rounded-full bg-[#10b981]/10 text-[#4edea3] border border-[#10b981]/25">
            Live Calculation
          </span>
        </div>

        {/* Parameter 1: Monthly Electricity Bill */}
        <div className="space-y-3">
          <div className="flex justify-between items-baseline">
            <label className="font-label-md text-[#64748B]" htmlFor="bill-range">
              Average Monthly Bill
            </label>
            <span className="font-headline-sm text-[#ffb95f] font-semibold">
              ₹{bill.toLocaleString('en-IN')}
              <span className="font-label-sm text-[#64748B] font-normal"> / mo</span>
            </span>
          </div>

          <div className="relative w-full flex items-center">
            <input
              id="bill-range"
              type="range"
              min="1000"
              max="25000"
              step="250"
              value={bill}
              onChange={(e) => setBill(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-[#313539] rounded-lg appearance-none cursor-pointer accent-[#10b981]"
            />
          </div>

          <div className="flex justify-between font-label-sm text-[#64748B]">
            <span>₹1,000</span>
            <span>₹12,500</span>
            <span>₹25,000+</span>
          </div>
        </div>

        {/* Parameter 2: Property & Grid Connection */}
        <div className="space-y-2.5">
          <label className="font-label-md text-[#64748B]">Property & Grid Connection</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'res-1p', icon: 'home', label: 'Residential 1-Ph', sub: 'Sanctioned ≤ 5 kW' },
              { id: 'res-3p', icon: 'domain', label: 'Residential 3-Ph', sub: 'Sanctioned > 5 kW' },
              { id: 'comm', icon: 'storefront', label: 'Commercial', sub: 'Tariff GP / Commercial' },
              { id: 'agri', icon: 'agriculture', label: 'Agri (PM-KUSUM)', sub: 'Solar Pump / Farm' },
            ].map((prop) => {
              const active = propertyType === prop.id;
              return (
                <button
                  key={prop.id}
                  onClick={() => setPropertyType(prop.id)}
                  type="button"
                  className={`p-3 rounded-xl text-left transition-all active:scale-[0.98] border ${
                    active
                      ? 'bg-[#262a2e] border-[#4edea3]/40 shadow-sm'
                      : 'bg-[#181c1f] border-white/5 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`material-symbols-outlined text-[18px] ${active ? 'text-[#4edea3]' : 'text-[#64748B]'}`}>
                      {prop.icon}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${active ? 'bg-[#4edea3]' : 'bg-transparent'}`} />
                  </div>
                  <span className="font-body-sm text-[#F8FAFC] font-medium block">{prop.label}</span>
                  <span className="font-label-sm text-[#64748B] block">{prop.sub}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Parameter 3: Odisha Location Selection */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="font-label-md text-[#64748B]" htmlFor="odisha-district">
              Installation District & DISCOM
            </label>
            <span className="font-label-sm text-[#4edea3] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
              Solar Irradiance: 5.3 kWh/m²
            </span>
          </div>

          <div className="relative">
            <select
              id="odisha-district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-[#181c1f] text-[#F8FAFC] font-body-md appearance-none focus:outline-none focus:bg-[#262a2e] transition-colors border border-white/5"
            >
              <option value="bhubaneswar">Bhubaneswar (TPCODL - High Solar Insolation)</option>
              <option value="cuttack">Cuttack (TPCODL - Coastal Valley)</option>
              <option value="puri">Puri (TPCODL - Coastal Cyclone Fortified)</option>
              <option value="khordha">Khordha (TPCODL - Standard)</option>
              <option value="balasore">Balasore (TPNODL - North Eastern)</option>
              <option value="sambalpur">Sambalpur (TPWODL - High Yield Zone)</option>
              <option value="rourkela">Rourkela (TPWODL - Industrial Grid)</option>
              <option value="berhampur">Berhampur (TPSODL - Southern Grid)</option>
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#64748B]">
              <span className="material-symbols-outlined text-[20px]">expand_more</span>
            </div>
          </div>
        </div>

        {/* Parameter 4: Shadow-Free Rooftop Area */}
        <div className="space-y-3">
          <div className="flex justify-between items-baseline">
            <label className="font-label-md text-[#64748B]" htmlFor="roof-range">
              Shadow-Free Rooftop Area
            </label>
            <span className="font-label-lg text-[#F8FAFC] font-semibold">
              {roofArea} <span className="font-label-sm text-[#64748B] font-normal">sq.ft</span>
            </span>
          </div>

          <input
            id="roof-range"
            type="range"
            min="100"
            max="2000"
            step="50"
            value={roofArea}
            onChange={(e) => setRoofArea(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-[#313539] rounded-lg appearance-none cursor-pointer accent-[#10b981]"
          />

          {/* Substrate selector pill */}
          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-[#181c1f] border border-white/5">
            {['RCC Flat', 'Tin Shed', 'Tile / Slanted'].map((sub) => {
              const active = substrate === sub;
              return (
                <button
                  key={sub}
                  onClick={() => setSubstrate(sub)}
                  type="button"
                  className={`py-2 px-2 rounded-lg font-label-sm text-center font-medium transition-all ${
                    active ? 'bg-[#262a2e] text-[#4edea3] shadow-sm font-semibold' : 'text-[#64748B] hover:text-[#F8FAFC]'
                  }`}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        </div>

        {/* Parameter 5: Inverter & Storage Topology */}
        <div className="space-y-2.5">
          <label className="font-label-md text-[#64748B]">Inverter & Storage Topology</label>
          <div className="grid grid-cols-1 gap-2.5">
            {/* On-Grid */}
            <div
              onClick={() => setSystemType('ongrid')}
              className={`p-3.5 rounded-xl flex items-start gap-3.5 cursor-pointer transition-all border ${
                systemType === 'ongrid'
                  ? 'bg-[#262a2e] border-[#4edea3]/40'
                  : 'bg-[#181c1f] border-white/5 opacity-80 hover:opacity-100'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  systemType === 'ongrid' ? 'bg-[#10b981]' : 'bg-[#313539]'
                }`}
              >
                <span className={`material-symbols-outlined text-[14px] font-bold ${
                  systemType === 'ongrid' ? 'text-[#0B0F12]' : 'text-transparent'
                }`}>
                  check
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-body-md text-[#F8FAFC] font-medium">
                    On-Grid (Bi-Directional Net-Metered)
                  </span>
                  <span className="font-label-sm text-[#4edea3] px-2 py-0.5 rounded bg-[#10b981]/10">
                    Standard
                  </span>
                </div>
                <p className="font-body-sm text-[#64748B] mt-0.5">
                  Highest ROI. Feeds excess power into DISCOM grid. Zero battery maintenance.
                </p>
              </div>
            </div>

            {/* Hybrid */}
            <div
              onClick={() => setSystemType('hybrid')}
              className={`p-3.5 rounded-xl flex items-start gap-3.5 cursor-pointer transition-all border ${
                systemType === 'hybrid'
                  ? 'bg-[#262a2e] border-[#ffb95f]/40'
                  : 'bg-[#181c1f] border-white/5 opacity-80 hover:opacity-100'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  systemType === 'hybrid' ? 'bg-[#10b981]' : 'bg-[#313539]'
                }`}
              >
                <span className={`material-symbols-outlined text-[14px] font-bold ${
                  systemType === 'hybrid' ? 'text-[#0B0F12]' : 'text-transparent'
                }`}>
                  check
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-body-md text-[#F8FAFC] font-medium">
                    Hybrid + Cyclone Resilient Backup
                  </span>
                  <span className="font-label-sm text-[#ffb95f] px-2 py-0.5 rounded bg-[#ffb95f]/10">
                    Odisha Special
                  </span>
                </div>
                <p className="font-body-sm text-[#64748B] mt-0.5">
                  Includes LiFePO4 battery pack for continuous energy during cyclone grid blackouts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Plant Showcase Card */}
      <div className="rounded-2xl overflow-hidden bg-[#1c2023] shadow-md border border-white/5">
        <div className="relative h-36 w-full">
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6TnCmkbQkROzjHiG3Pg5q_g754hZeVGMmHanNPg6LXC3eFW_bPNE7uVa4CGwdA6QEwRz8AitzmUZITOoa2DpdJLzMcU5z4PUOPKLdCFh9XAFBtUVvYoD1wltx7QeoJ3QkNk_lGX9A-3UXUFwbCCC5d5b4ySdEeMJJc1n6rRB7lWGcFDKguIvZVwtggbEfqWKwsv_uxJf59yxlPAOL9OBeJHQwz0b6KIYqoQ1pkuzKkjlwMs9SFRlpJQ"
            alt="Rooftop solar photovoltaic panels installed on an Indian home in Bhubaneswar"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c2023] via-[#1c2023]/60 to-transparent flex items-end p-4">
            <div className="flex items-center justify-between w-full">
              <div>
                <span className="font-label-sm text-[#4edea3] uppercase tracking-wider block">
                  Recommended Engineering
                </span>
                <span className="font-body-md text-[#F8FAFC] font-medium">
                  Bi-Facial 545W Mono PERC Array
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-[#0B0F12]/80 backdrop-blur-sm text-[#ffb95f] font-label-sm flex items-center gap-1 border border-white/5">
                <span className="material-symbols-outlined text-[14px]">verified</span> 25-Yr Performance
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Real-Time Calculation Results Engine */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb95f] text-[22px]">insights</span>
            <h2 className="font-headline-sm text-[#F8FAFC]">System Yield & Financials</h2>
          </div>
          <span className="font-label-sm text-[#64748B]">MNRE Cap: 3 kW</span>
        </div>

        {/* Primary Hero Metric Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#262a2e] to-[#1c2023] shadow-lg space-y-4 border border-white/5">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-label-md text-[#64748B]">Recommended Plant Size</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display-lg-mobile text-[#4edea3] font-bold">
                  {calculation.kwCapacity}
                </span>
                <span className="font-headline-sm text-[#F8FAFC] font-medium">kWp</span>
              </div>
              <span className="font-label-sm text-[#94A3B8]">
                {calculation.panelsCount} × 550W High-Efficiency Monocrystalline Units
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#181c1f] text-right border border-white/5">
              <span className="font-label-sm text-[#64748B] block">Space Footprint</span>
              <span className="font-label-lg text-[#F8FAFC] font-semibold block mt-0.5">
                ~{calculation.requiredSpace} sq.ft
              </span>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 gap-2.5 pt-2">
            <div className="p-3 rounded-xl bg-[#0b0f12]/60 border border-white/5">
              <div className="flex items-center gap-1.5 text-[#64748B] mb-1">
                <span className="material-symbols-outlined text-[16px] text-[#4edea3]">solar_power</span>
                <span className="font-label-sm">Monthly Generation</span>
              </div>
              <span className="font-headline-sm text-[#F8FAFC] font-semibold">
                ~{calculation.monthlyGen.toLocaleString('en-IN')}
              </span>
              <span className="font-label-sm text-[#64748B] ml-1">kWh / mo</span>
            </div>

            <div className="p-3 rounded-xl bg-[#0b0f12]/60 border border-white/5">
              <div className="flex items-center gap-1.5 text-[#64748B] mb-1">
                <span className="material-symbols-outlined text-[16px] text-[#ffb95f]">savings</span>
                <span className="font-label-sm">Annual Bill Savings</span>
              </div>
              <span className="font-headline-sm text-[#ffb95f] font-semibold">
                ₹{calculation.annualSavings.toLocaleString('en-IN')}
              </span>
              <span className="font-label-sm text-[#64748B] ml-1">/ year</span>
            </div>
          </div>

          {/* Visual Solar Generation vs Grid Baseline Curve (Inline SVG) */}
          <div className="p-3.5 rounded-xl bg-[#0b0f12]/70 space-y-2 border border-white/5">
            <div className="flex items-center justify-between text-label-sm font-label-sm">
              <span className="text-[#64748B]">Annual Output Curve (Bhubaneswar Insolation)</span>
              <span className="text-[#4edea3] font-medium">
                {calculation.annualGen.toLocaleString('en-IN')} kWh/yr
              </span>
            </div>

            <div className="w-full h-16 relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 320 64">
                <defs>
                  <linearGradient id="solarGlow" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#4edea3" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#4edea3" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0,55 Q 35,48 70,38 T 140,16 T 210,18 T 280,42 T 320,50 L 320,64 L 0,64 Z"
                  fill="url(#solarGlow)"
                />
                <path
                  d="M 0,55 Q 35,48 70,38 T 140,16 T 210,18 T 280,42 T 320,50"
                  fill="none"
                  stroke="#4edea3"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                />
                <circle cx="175" cy="17" fill="#ffb95f" r="4" />
                <text fill="#ffb95f" fontFamily="JetBrains Mono" fontSize="8" textAnchor="middle" x="175" y="10">
                  May Peak: {Math.round(calculation.monthlyGen * 1.18)} kWh
                </text>
              </svg>
            </div>

            <div className="flex justify-between font-label-sm text-[#64748B] pt-1">
              <span>Jan</span>
              <span>Apr</span>
              <span>Jul (Monsoon dip)</span>
              <span>Oct</span>
              <span>Dec</span>
            </div>
          </div>
        </div>

        {/* Subsidy Breakdown & Net Effective Cost Matrix */}
        <div className="p-5 rounded-2xl bg-[#1c2023] shadow-md space-y-4 border border-white/5">
          <div className="flex items-center justify-between">
            <h3 className="font-headline-sm text-[#F8FAFC]">Capital & Subsidy Breakdown</h3>
            <span className="font-label-sm px-2.5 py-1 rounded bg-[#ffb95f]/15 text-[#ffb95f] font-medium">
              Direct DBT
            </span>
          </div>

          <div className="space-y-3 font-body-sm">
            <div className="flex justify-between items-center text-[#94A3B8]">
              <span>Indicative System Cost (Turnkey)</span>
              <span className="font-label-md text-[#F8FAFC]">
                ₹{calculation.grossCost.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex justify-between items-center text-[#4edea3] font-medium p-2.5 rounded-lg bg-[#10b981]/10 border border-[#10b981]/20">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">account_balance</span>
                <span>PM Surya Ghar Central Subsidy</span>
              </div>
              <span className="font-label-md">
                {calculation.centralSubsidy > 0
                  ? `-₹${calculation.centralSubsidy.toLocaleString('en-IN')}`
                  : '₹0 (Residential Only)'}
              </span>
            </div>

            <div className="flex justify-between items-center text-[#4edea3] font-medium p-2.5 rounded-lg bg-[#10b981]/10 border border-[#10b981]/20">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">flag</span>
                <span>Odisha State Clean Incentive</span>
              </div>
              <span className="font-label-md">-₹{calculation.stateSubsidy.toLocaleString('en-IN')}</span>
            </div>

            <div className="pt-2 flex justify-between items-baseline border-t border-white/[0.08]">
              <div>
                <span className="font-body-md text-[#F8FAFC] font-semibold block">
                  Net Effective Investment
                </span>
                <span className="font-label-sm text-[#64748B]">
                  Post DBT credit into your Aadhaar linked bank
                </span>
              </div>
              <span className="font-headline-sm text-[#4edea3] font-bold">
                ₹{calculation.netCost.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Financial Metrics Pill Cluster */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-[#262a2e] border border-white/5">
              <span className="font-label-sm text-[#64748B] uppercase tracking-wider block">
                Estimated Payback
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-headline-sm text-[#ffb95f] font-semibold">
                  {calculation.payback}
                </span>
                <span className="font-label-md text-[#94A3B8]">Years</span>
              </div>
              <span className="font-label-sm text-[#64748B] block mt-0.5">Free power post 48 months</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#262a2e] border border-white/5">
              <span className="font-label-sm text-[#64748B] uppercase tracking-wider block">
                25-Yr Lifetime Wealth
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-headline-sm text-[#4edea3] font-semibold">
                  ₹{Math.max(0, calculation.lifetimeSavings).toLocaleString('en-IN')}
                </span>
              </div>
              <span className="font-label-sm text-[#64748B] block mt-0.5">Cumulative avoided tariff hikes</span>
            </div>
          </div>
        </div>

        {/* Green Impact Card */}
        <div className="p-4 rounded-xl bg-[#181c1f] shadow-sm flex items-center gap-4 border border-white/5">
          <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 flex items-center justify-center shrink-0 border border-[#10b981]/20">
            <span className="material-symbols-outlined text-[#4edea3] text-[24px]">forest</span>
          </div>
          <div className="flex-1">
            <span className="font-label-sm text-[#4edea3] uppercase tracking-wide font-medium">
              Environmental Offset
            </span>
            <p className="font-body-sm text-[#F8FAFC] mt-0.5 leading-snug">
              Reduces <strong className="text-[#4edea3] font-medium">{calculation.co2Saved} Tonnes</strong> of CO₂ annually, equivalent to planting <strong className="text-[#4edea3] font-medium">{calculation.trees} full-grown teak trees</strong> in Odisha.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Assumptions & Formula Transparency Accordion */}
      <section className="rounded-2xl bg-[#1c2023] shadow-md overflow-hidden border border-white/5">
        <button
          className="w-full p-4 flex items-center justify-between text-left active:bg-[#262a2e] transition-colors"
          onClick={() => setAccordionOpen(!accordionOpen)}
          type="button"
        >
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#64748B] text-[20px]">science</span>
            <span className="font-body-md text-[#F8FAFC] font-medium">
              Engineering Assumptions & Tariff Math
            </span>
          </div>
          <span
            className={`material-symbols-outlined text-[#64748B] transition-transform duration-200 ${
              accordionOpen ? 'rotate-180' : ''
            }`}
          >
            expand_more
          </span>
        </button>

        {accordionOpen && (
          <div className="px-4 pb-4 space-y-3 font-body-sm text-[#94A3B8]">
            <div className="p-3 rounded-xl bg-[#181c1f] space-y-2 border border-white/5">
              <div className="flex justify-between">
                <span className="font-label-sm text-[#64748B]">Solar Yield Constant:</span>
                <span className="font-label-sm text-[#F8FAFC]">4.20 Peak Sun Hours/Day (Odisha Mean)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-label-sm text-[#64748B]">OERC Weighted Slab:</span>
                <span className="font-label-sm text-[#F8FAFC]">₹5.80 / kWh blended residential tariff</span>
              </div>
              <div className="flex justify-between">
                <span className="font-label-sm text-[#64748B]">PM Surya Ghar Bracket:</span>
                <span className="font-label-sm text-[#F8FAFC]">₹33k (1kW), ₹66k (2kW), ₹78k max (≥3kW)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-label-sm text-[#64748B]">DISCOM Sanction Fee:</span>
                <span className="font-label-sm text-[#F8FAFC]">₹1,000–₹2,500 test fee (Net-Meter extra)</span>
              </div>
            </div>
            <p className="font-label-sm text-[#64748B] leading-relaxed">
              * Estimates are indicative and generated using standard MNRE guidelines. Actual generation varies based on exact rooftop azimuthal azimuth angle, shadow obstruction from parapet walls, seasonal cloud cover, and sanctioned transformer capacity at your local sub-station.
            </p>
          </div>
        )}
      </section>

      {/* High-Conversion Action CTAs */}
      <section className="space-y-3 pt-2">
        <button
          onClick={handleBookWithEstimate}
          className="w-full py-4 px-5 rounded-xl bg-[#10b981] text-[#00422b] font-headline-sm font-semibold flex items-center justify-center gap-2 shadow-lg hover:brightness-105 active:scale-[0.98] transition-all"
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">engineering</span>
          <span>Book Free Site Survey with this Estimate</span>
        </button>

        <button
          onClick={() => setShowProposalModal(true)}
          className="w-full py-3.5 px-4 rounded-xl bg-[#262a2e] text-[#ffb95f] font-label-lg font-medium flex items-center justify-center gap-2 hover:bg-[#313539] active:scale-[0.98] transition-all border border-white/5"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">download</span>
          <span>Download Detailed PDF Proposal</span>
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[#64748B]">
          <span className="material-symbols-outlined text-[16px] text-[#4edea3]">lock</span>
          <span className="font-label-sm">No credit card or payment required. Free engineer visit.</span>
        </div>
      </section>

      {/* Proposal Download Modal */}
      {showProposalModal && (
        <div className="fixed inset-0 z-50 bg-[#0B0F12]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#12181F] border border-white/[0.08] rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <div className="flex items-center gap-2 text-[#4edea3]">
                <span className="material-symbols-outlined text-[24px]">picture_as_pdf</span>
                <h3 className="font-headline-sm text-[#F8FAFC]">Odisha Solar EPC Dossier</h3>
              </div>
              <button
                onClick={() => setShowProposalModal(false)}
                className="w-8 h-8 rounded-full bg-[#262a2e] flex items-center justify-center text-[#94A3B8]"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <p className="font-body-sm text-[#94A3B8]">
              A complete engineering feasibility report tailored for {district.toUpperCase()} ({calculation.kwCapacity} kWp plant):
            </p>

            <div className="p-3 rounded-xl bg-[#181c1f] space-y-1.5 font-label-sm text-xs">
              <div className="flex justify-between text-[#94A3B8]">
                <span>Turnkey Investment:</span>
                <span className="text-[#F8FAFC]">₹{calculation.grossCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#4edea3]">
                <span>PM Surya Ghar Subsidy:</span>
                <span>-₹{calculation.centralSubsidy.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#4edea3]">
                <span>Odisha State Incentive:</span>
                <span>-₹{calculation.stateSubsidy.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between font-bold text-[#F8FAFC] pt-1 border-t border-white/5">
                <span>Net Effective Cost:</span>
                <span className="text-[#4edea3]">₹{calculation.netCost.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => {
                  alert(`PDF Proposal for ${calculation.kwCapacity} kWp Plant saved to your downloads.`);
                  setShowProposalModal(false);
                }}
                className="flex-1 py-3 rounded-xl bg-[#10b981] text-[#00422b] font-label-md font-bold flex items-center justify-center gap-2 hover:bg-[#4edea3] transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>Confirm Download</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
