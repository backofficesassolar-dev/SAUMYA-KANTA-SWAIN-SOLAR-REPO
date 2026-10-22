import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { DiscomType, ScreenType, SurveyBooking } from '../types';

interface SiteSurveyBookingScreenProps {
  initialEstimate?: { capacity: string; district: string; systemType: string; bill: number } | null;
  onNavigate: (screen: ScreenType) => void;
  onAddBooking: (booking: SurveyBooking) => void;
}

export const SiteSurveyBookingScreen: React.FC<SiteSurveyBookingScreenProps> = ({
  initialEstimate,
  onNavigate,
  onAddBooking,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Client & Location
  const [name, setName] = useState<string>('Soumya Ranjan Mohapatra');
  const [mobile, setMobile] = useState<string>('7894012345');
  const [email, setEmail] = useState<string>('soumya.solar@gmail.com');
  const [district, setDistrict] = useState<string>('Bhubaneswar (Khurda)');
  const [area, setArea] = useState<string>('Near Patia Square / KIIT');
  const [pin, setPin] = useState<string>('751024');

  // Step 2: Electrical & DISCOM
  const [discom, setDiscom] = useState<DiscomType>('TPCODL');
  const [consumerNo, setConsumerNo] = useState<string>('100004928172');
  const [sanctionedLoad, setSanctionedLoad] = useState<number>(3);
  const [monthlyBill, setMonthlyBill] = useState<number>(3200);
  const [meterPhase, setMeterPhase] = useState<'Single Phase' | 'Three Phase'>('Single Phase');

  // Step 3: Rooftop & Schedule
  const [propertyType, setPropertyType] = useState<string>('Bungalow');
  const [roofSurface, setRoofSurface] = useState<string>('RCC Flat');
  const [roofArea, setRoofArea] = useState<number>(450);
  const [roofAccess, setRoofAccess] = useState<string>('Direct Staircase');
  const [slot, setSlot] = useState<string>('Tomorrow Morning');
  const [consent, setConsent] = useState<boolean>(true);

  // Confirmed booking token modal
  const [confirmedBooking, setConfirmedBooking] = useState<SurveyBooking | null>(null);

  // Pre-fill from calculator if passed
  useEffect(() => {
    if (initialEstimate) {
      if (initialEstimate.district) {
        const dLower = initialEstimate.district.toLowerCase();
        if (dLower.includes('bhubaneswar')) setDistrict('Bhubaneswar (Khurda)');
        else if (dLower.includes('cuttack')) setDistrict('Cuttack');
        else if (dLower.includes('puri')) setDistrict('Puri');
        else if (dLower.includes('balasore')) {
          setDistrict('Balasore');
          setDiscom('TPNODL');
        } else if (dLower.includes('sambalpur')) {
          setDistrict('Sambalpur');
          setDiscom('TPWODL');
        } else if (dLower.includes('berhampur')) {
          setDistrict('Berhampur');
          setDiscom('TPSODL');
        }
      }
      if (initialEstimate.bill) {
        setMonthlyBill(initialEstimate.bill);
      }
    }
  }, [initialEstimate]);

  const handleNextStep1 = () => {
    if (!name.trim() || mobile.trim().length < 10 || pin.trim().length < 6) {
      alert('Please fill out your Name, 10-digit WhatsApp number, and valid 6-digit Odisha PIN code.');
      return;
    }
    setCurrentStep(2);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const handleNextStep2 = () => {
    setCurrentStep(3);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      alert('Please authorize the DISCOM net-metering feasibility inspection.');
      return;
    }

    const token = `ADI-2025-OD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: SurveyBooking = {
      token,
      name,
      mobile,
      email,
      district,
      area,
      pin,
      discom,
      consumerNo,
      sanctionedLoad,
      monthlyBill,
      phase: meterPhase,
      propertyType,
      roofSurface,
      roofArea,
      roofAccess,
      slot,
      recommendedKw: initialEstimate ? initialEstimate.capacity : `${(sanctionedLoad * 1.1).toFixed(1)} kWp`,
      status: 'Survey Scheduled',
      createdAt: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    onAddBooking(newBooking);
    setConfirmedBooking(newBooking);

    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#4edea3', '#10b981', '#ffb95f', '#ffffff'],
      });
    } catch {
      // safe fallback
    }
  };

  const estUnits = Math.round(monthlyBill / 7.6);

  return (
    <div className="flex flex-col w-full px-4 pb-28 space-y-6 max-w-xl mx-auto">
      {/* Top Visual Banner & Scrim */}
      <div className="relative overflow-hidden rounded-2xl bg-[#181c1f] shadow-xl border border-white/5">
        <div
          className="relative h-44 w-full bg-cover bg-center"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB7b_LrtAGqgKOvXs6O0UW26PrGKbgRvqGWv-pxu2amvNgIQr64WXp7PsxKpwq5K1Zq15-83cSxSRKK6xN6awTk1ijcH_IHhcIPuSQKXacE_SQWZxp8wIVpHCwtVchroiZ3_ED8Sb06HYAf46GvDmKl4kzswF2PWzVbQlPT3Q8n7HYDlixkVl7OFdztWzd4xFpccFd5r4Aq9rmjsBO_Ay_8Oa6hai5sLXvBUGKLF49L20BwdJNOmSvuhw')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#181c1f] via-[#181c1f]/75 to-transparent pointer-events-none" />
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0B0F12]/80 backdrop-blur-md border border-white/5">
            <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-ping"></span>
            <span className="font-label-sm text-[#4edea3] uppercase tracking-wider font-semibold">
              Engineers On-Field
            </span>
          </div>
        </div>

        <div className="p-4 pt-1 flex flex-col space-y-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4edea3] text-[20px]">engineering</span>
            <span className="font-label-sm uppercase tracking-widest text-[#4edea3] font-semibold">
              Technical Feasibility
            </span>
          </div>
          <h1 className="font-headline-lg-mobile text-[#F8FAFC] tracking-tight">
            Book Your Engineering Site Survey
          </h1>
          <p className="font-body-sm text-[#94A3B8] leading-relaxed">
            A certified solar engineer will inspect your roof structure, shadow casting, electrical load, and DISCOM meter feasibility across Odisha.
          </p>

          {/* Trust Badges Bento */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#1c2023] text-center border border-white/5">
              <span className="material-symbols-outlined text-[#ffb95f] text-[20px] mb-1">verified_user</span>
              <span className="font-label-sm text-[#F8FAFC] font-medium">Zero Cost</span>
              <span className="font-label-sm text-[#64748B]">No Commitment</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#1c2023] text-center border border-white/5">
              <span className="material-symbols-outlined text-[#4edea3] text-[20px] mb-1">flight_takeoff</span>
              <span className="font-label-sm text-[#F8FAFC] font-medium">Drone LiDAR</span>
              <span className="font-label-sm text-[#64748B]">Shadow Mapping</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#1c2023] text-center border border-white/5">
              <span className="material-symbols-outlined text-[#0EA5E9] text-[20px] mb-1">pin_drop</span>
              <span className="font-label-sm text-[#F8FAFC] font-medium">30 Districts</span>
              <span className="font-label-sm text-[#64748B]">Odisha Covered</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pre-fill Alert if from Calculator */}
      {initialEstimate && (
        <div className="p-3.5 rounded-xl bg-[#10b981]/10 border border-[#10b981]/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4edea3] text-[20px]">assignment_turned_in</span>
            <span className="text-[#F8FAFC]">
              Pre-filled from Calculator: <strong className="text-[#4edea3]">{initialEstimate.capacity}</strong> ({initialEstimate.systemType})
            </span>
          </div>
        </div>
      )}

      {/* Wizard Step Indicator */}
      <div className="p-3.5 rounded-xl bg-[#262a2e] shadow-md border border-white/5">
        <div className="flex items-center justify-between mb-2">
          <span className="font-label-sm text-[#64748B] uppercase tracking-wider">
            {currentStep === 1 && 'Step 1 of 3: Location & Contact'}
            {currentStep === 2 && 'Step 2 of 3: Electrical Profile'}
            {currentStep === 3 && 'Step 3 of 3: Rooftop & Schedule'}
          </span>
          <span className="font-label-sm text-[#4edea3] font-bold">
            {currentStep === 1 && '33% Completed'}
            {currentStep === 2 && '66% Completed'}
            {currentStep === 3 && '100% Ready'}
          </span>
        </div>

        <div className="w-full h-1.5 rounded-full bg-[#0b0f12] overflow-hidden flex">
          <div
            className="h-full bg-[#10b981] transition-all duration-300 rounded-full"
            style={{ width: `${currentStep * 33.33}%` }}
          />
        </div>

        <div className="flex justify-between items-center mt-3 pt-1">
          <button
            onClick={() => setCurrentStep(1)}
            className={`flex items-center gap-1.5 ${currentStep === 1 ? 'text-[#4edea3]' : 'text-[#64748B]'}`}
            type="button"
          >
            <span className={`w-5 h-5 rounded-full font-label-sm flex items-center justify-center font-bold ${
              currentStep === 1 ? 'bg-[#10b981] text-[#00422b]' : 'bg-[#313539] text-[#94A3B8]'
            }`}>
              1
            </span>
            <span className="font-label-sm font-semibold">Contact</span>
          </button>

          <div className="h-px w-6 bg-[#313539]" />

          <button
            onClick={() => setCurrentStep(2)}
            className={`flex items-center gap-1.5 ${currentStep === 2 ? 'text-[#4edea3]' : 'text-[#64748B]'}`}
            type="button"
          >
            <span className={`w-5 h-5 rounded-full font-label-sm flex items-center justify-center font-bold ${
              currentStep === 2 ? 'bg-[#10b981] text-[#00422b]' : 'bg-[#313539] text-[#94A3B8]'
            }`}>
              2
            </span>
            <span className="font-label-sm font-semibold">Electrical</span>
          </button>

          <div className="h-px w-6 bg-[#313539]" />

          <button
            onClick={() => setCurrentStep(3)}
            className={`flex items-center gap-1.5 ${currentStep === 3 ? 'text-[#4edea3]' : 'text-[#64748B]'}`}
            type="button"
          >
            <span className={`w-5 h-5 rounded-full font-label-sm flex items-center justify-center font-bold ${
              currentStep === 3 ? 'bg-[#10b981] text-[#00422b]' : 'bg-[#313539] text-[#94A3B8]'
            }`}>
              3
            </span>
            <span className="font-label-sm font-semibold">Rooftop</span>
          </button>
        </div>
      </div>

      {/* Main Multi-Step Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* STEP 1: CONTACT & PROPERTY LOCATION */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#1c2023] space-y-4 shadow-md border border-white/5">
              <div className="flex items-center gap-2 pb-2 border-b border-white/[0.06]">
                <span className="material-symbols-outlined text-[#ffb95f] text-[22px]">person_pin_circle</span>
                <div>
                  <h2 className="font-headline-sm text-[#F8FAFC] leading-tight">Client & Location</h2>
                  <p className="font-body-sm text-[#64748B]">Where should our survey team arrive?</p>
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="font-label-md text-[#94A3B8] flex items-center gap-1.5">
                  Full Customer Name <span className="text-[#F27D26]">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] text-[18px]">
                    badge
                  </span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Soumya Ranjan Mohapatra"
                    className="w-full bg-[#0B0F12] text-[#F8FAFC] font-body-md pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:bg-[#12181F] border border-white/5"
                  />
                </div>
              </div>

              {/* Mobile & WhatsApp */}
              <div className="space-y-1.5">
                <label className="font-label-md text-[#94A3B8] flex items-center justify-between">
                  <span>WhatsApp Mobile Number <span className="text-[#F27D26]">*</span></span>
                  <span className="text-[#4edea3] font-label-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span> OTP Verified
                  </span>
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center px-3 bg-[#0B0F12] rounded-lg text-[#64748B] font-label-md border border-white/5">
                    +91
                  </div>
                  <div className="relative flex-1">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] text-[18px]">
                      phone_android
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="78940 12345"
                      className="w-full bg-[#0B0F12] text-[#F8FAFC] font-body-md pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:bg-[#12181F] border border-white/5"
                    />
                  </div>
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="font-label-md text-[#94A3B8] flex items-center gap-1.5">
                  Email ID <span className="text-[#64748B] font-label-sm">(For CAD & 3D Shadow Report)</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] text-[18px]">
                    mail
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="soumya.solar@gmail.com"
                    className="w-full bg-[#0B0F12] text-[#F8FAFC] font-body-md pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:bg-[#12181F] border border-white/5"
                  />
                </div>
              </div>

              {/* District & City Dropdown */}
              <div className="space-y-1.5">
                <label className="font-label-md text-[#94A3B8] flex items-center gap-1.5">
                  District / Urban Zone <span className="text-[#F27D26]">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] text-[18px]">
                    location_city
                  </span>
                  <select
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-[#0B0F12] text-[#F8FAFC] font-body-md pl-10 pr-8 py-3 rounded-lg appearance-none focus:outline-none border border-white/5"
                  >
                    <option value="Bhubaneswar (Khurda)">Bhubaneswar (Khurda - Capital Hub)</option>
                    <option value="Cuttack">Cuttack (Millennium City)</option>
                    <option value="Puri">Puri (Coastal Zone / Anti-Corrosion Focus)</option>
                    <option value="Khordha">Khordha (Industrial / Jatni)</option>
                    <option value="Balasore">Balasore (North Corridor)</option>
                    <option value="Sambalpur">Sambalpur (Western Industrial)</option>
                    <option value="Rourkela">Rourkela (Sundargarh Industrial)</option>
                    <option value="Berhampur">Berhampur (Ganjam South Hub)</option>
                    <option value="Angul">Angul - Talcher Energy Belt</option>
                    <option value="Other">Other Odisha District</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none text-[18px]">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Landmark & PIN */}
              <div className="grid grid-cols-5 gap-2">
                <div className="col-span-3 space-y-1.5">
                  <label className="font-label-md text-[#94A3B8]">Area / Landmark</label>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="Near Patia Square / KIIT"
                    className="w-full bg-[#0B0F12] text-[#F8FAFC] font-body-md px-3 py-3 rounded-lg focus:outline-none border border-white/5"
                  />
                </div>
                <div className="col-span-2 space-y-1.5">
                  <label className="font-label-md text-[#94A3B8]">
                    PIN Code <span className="text-[#F27D26]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="751024"
                    className="w-full bg-[#0B0F12] text-[#F8FAFC] font-body-md px-3 py-3 rounded-lg focus:outline-none border border-white/5"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleNextStep1}
              className="w-full py-3.5 px-4 rounded-xl bg-[#10b981] text-[#00422b] font-label-lg font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-[#4edea3] active:scale-95 transition-all"
              type="button"
            >
              <span>Proceed to Electrical Setup</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        )}

        {/* STEP 2: ELECTRICAL & CONNECTION DETAILS */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#1c2023] space-y-4 shadow-md border border-white/5">
              <div className="flex items-center gap-2 pb-2 border-b border-white/[0.06]">
                <span className="material-symbols-outlined text-[#ffb95f] text-[22px]">electric_meter</span>
                <div>
                  <h2 className="font-headline-sm text-[#F8FAFC] leading-tight">Grid & Metering Profile</h2>
                  <p className="font-body-sm text-[#64748B]">DISCOM integration for seamless net metering</p>
                </div>
              </div>

              {/* Utility Provider (Odisha DISCOMs) */}
              <div className="space-y-2">
                <label className="font-label-md text-[#94A3B8] flex items-center justify-between">
                  <span>Odisha DISCOM Utility Provider <span className="text-[#F27D26]">*</span></span>
                  <span className="font-label-sm text-[#ffb95f]">TP Distribution</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'TPCODL', name: 'TPCODL', sub: 'Central (BBSR, CTC, Puri)' },
                    { id: 'TPNODL', name: 'TPNODL', sub: 'North (Balasore, Bhadrak)' },
                    { id: 'TPSODL', name: 'TPSODL', sub: 'South (Berhampur, Rayagada)' },
                    { id: 'TPWODL', name: 'TPWODL', sub: 'West (Sambalpur, Rourkela)' },
                  ].map((d) => {
                    const active = discom === d.id;
                    return (
                      <div
                        key={d.id}
                        onClick={() => setDiscom(d.id as DiscomType)}
                        className={`p-3 rounded-xl cursor-pointer flex flex-col justify-between transition-all border ${
                          active
                            ? 'bg-[#262a2e] border-[#4edea3]/40 shadow-sm'
                            : 'bg-[#0B0F12] border-white/5 opacity-80 hover:opacity-100'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-label-md font-bold text-[#F8FAFC]">{d.name}</span>
                          <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                            active ? 'bg-[#10b981]' : 'bg-[#313539]'
                          }`} />
                        </div>
                        <span className="font-label-sm text-[#64748B]">{d.sub}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Consumer Number */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="font-label-md text-[#94A3B8]">Consumer No. / Account ID</label>
                  <span className="font-label-sm text-[#64748B]">Found on electricity bill</span>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] text-[18px]">
                    receipt_long
                  </span>
                  <input
                    type="text"
                    value={consumerNo}
                    onChange={(e) => setConsumerNo(e.target.value)}
                    placeholder="e.g. 100004928172"
                    className="w-full bg-[#0B0F12] text-[#F8FAFC] font-body-md pl-10 pr-3 py-3 rounded-lg focus:outline-none border border-white/5"
                  />
                </div>
              </div>

              {/* Sanctioned Load Interactive Selector */}
              <div className="space-y-2">
                <label className="font-label-md text-[#94A3B8] flex items-center justify-between">
                  <span>Existing Sanctioned Load</span>
                  <span className="font-label-sm text-[#4edea3] font-mono">{sanctionedLoad}.0 kW</span>
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {[1, 2, 3, 5, 10].map((kw) => (
                    <button
                      key={kw}
                      type="button"
                      onClick={() => setSanctionedLoad(kw)}
                      className={`py-2 rounded-lg font-label-md font-semibold text-center transition-all ${
                        sanctionedLoad === kw
                          ? 'bg-[#10b981] text-[#00422b] font-bold shadow-sm'
                          : 'bg-[#0B0F12] text-[#64748B] hover:text-[#F8FAFC] border border-white/5'
                      }`}
                    >
                      {kw} {kw === 10 ? 'kW+' : 'kW'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Monthly Electricity Bill */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="font-label-md text-[#94A3B8]">Average Monthly Bill (₹)</label>
                  <span className="font-label-sm text-[#ffb95f] font-mono">
                    Approx. {estUnits} Units/mo
                  </span>
                </div>
                <div className="relative">
                  <span className="font-headline-sm absolute left-3.5 top-1/2 -translate-y-1/2 text-[#ffb95f] font-mono">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(parseInt(e.target.value, 10) || 0)}
                    placeholder="3200"
                    className="w-full bg-[#0B0F12] text-[#F8FAFC] font-body-md pl-10 pr-3 py-3 rounded-lg focus:outline-none border border-white/5"
                  />
                </div>
              </div>

              {/* Meter Phase Type */}
              <div className="space-y-2">
                <label className="font-label-md text-[#94A3B8]">Meter Phase Connection</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'Single Phase', sub: 'Up to 5 kW' },
                    { id: 'Three Phase', sub: '5 kW and above' },
                  ].map((p) => {
                    const active = meterPhase === p.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setMeterPhase(p.id as any)}
                        className={`p-3 rounded-lg cursor-pointer flex items-center justify-between border ${
                          active
                            ? 'bg-[#262a2e] border-[#4edea3]/40'
                            : 'bg-[#0B0F12] border-white/5'
                        }`}
                      >
                        <div>
                          <span className="font-label-md text-[#F8FAFC] block">{p.id}</span>
                          <span className="font-label-sm text-[#64748B]">{p.sub}</span>
                        </div>
                        <span className={`w-3.5 h-3.5 rounded-full ${active ? 'bg-[#10b981]' : 'bg-[#313539]'}`} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentStep(1)}
                className="w-1/3 py-3.5 px-3 rounded-xl bg-[#262a2e] text-[#F8FAFC] font-label-md font-semibold flex items-center justify-center gap-1 active:scale-95 transition-all border border-white/5"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                <span>Back</span>
              </button>
              <button
                onClick={handleNextStep2}
                className="w-2/3 py-3.5 px-4 rounded-xl bg-[#10b981] text-[#00422b] font-label-lg font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-[#4edea3] active:scale-95 transition-all"
                type="button"
              >
                <span>Continue to Roof Specs</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: ROOF & INSTALLATION SPECIFICS */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#1c2023] space-y-4 shadow-md border border-white/5">
              <div className="flex items-center gap-2 pb-2 border-b border-white/[0.06]">
                <span className="material-symbols-outlined text-[#ffb95f] text-[22px]">roofing</span>
                <div>
                  <h2 className="font-headline-sm text-[#F8FAFC] leading-tight">Roofing & Inspection Slot</h2>
                  <p className="font-body-sm text-[#64748B]">Physical specs for drone mapping & mounting design</p>
                </div>
              </div>

              {/* Property Structure */}
              <div className="space-y-2">
                <label className="font-label-md text-[#94A3B8]">Property Structure</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'Bungalow', label: 'Bungalow / Villa', sub: 'Independent' },
                    { id: 'Apartment', label: 'G+2/3 Apartment', sub: 'Society Roof' },
                    { id: 'Commercial', label: 'Commercial Office', sub: 'High Consumption' },
                    { id: 'Industrial', label: 'Factory Shed', sub: 'Heavy Metal Roof' },
                  ].map((p) => {
                    const active = propertyType === p.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setPropertyType(p.id)}
                        className={`p-2.5 rounded-xl cursor-pointer flex flex-col border ${
                          active
                            ? 'bg-[#262a2e] border-[#4edea3]/40'
                            : 'bg-[#0B0F12] border-white/5 opacity-80 hover:opacity-100'
                        }`}
                      >
                        <span className="font-label-md text-[#F8FAFC] truncate font-medium">{p.label}</span>
                        <span className="font-label-sm text-[#64748B]">{p.sub}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Roof Construction Surface Type */}
              <div className="space-y-2">
                <label className="font-label-md text-[#94A3B8]">Roof Surface Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'RCC Flat', label: 'RCC Flat Concrete' },
                    { id: 'Tin Shed', label: 'Tin / GI Metal Shed' },
                    { id: 'Mangalore Tile', label: 'Mangalore Clay Tile' },
                    { id: 'Elevated Gazebo', label: 'Elevated Superstructure' },
                  ].map((rf) => {
                    const active = roofSurface === rf.id;
                    return (
                      <button
                        key={rf.id}
                        type="button"
                        onClick={() => setRoofSurface(rf.id)}
                        className={`p-3 rounded-xl font-label-md text-left flex items-center justify-between border ${
                          active
                            ? 'bg-[#262a2e] text-[#4edea3] font-semibold border-[#4edea3]/40 shadow-sm'
                            : 'bg-[#0B0F12] text-[#64748B] border-white/5'
                        }`}
                      >
                        <span>{rf.label}</span>
                        <span className={`material-symbols-outlined text-[16px] ${active ? 'opacity-100 text-[#4edea3]' : 'opacity-0'}`}>
                          check_circle
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Usable Area & Roof Accessibility */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-label-md text-[#94A3B8]">Usable Roof Area</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={roofArea}
                      onChange={(e) => setRoofArea(parseInt(e.target.value, 10) || 0)}
                      className="w-full bg-[#0B0F12] text-[#F8FAFC] font-body-md px-3 py-3 rounded-lg pr-14 focus:outline-none border border-white/5"
                    />
                    <span className="font-label-sm text-[#64748B] absolute right-3 top-1/2 -translate-y-1/2">
                      sq.ft
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-label-md text-[#94A3B8]">Roof Access</label>
                  <div className="relative">
                    <select
                      value={roofAccess}
                      onChange={(e) => setRoofAccess(e.target.value)}
                      className="w-full bg-[#0B0F12] text-[#F8FAFC] font-body-md px-3 py-3 rounded-lg appearance-none focus:outline-none border border-white/5"
                    >
                      <option value="Direct Staircase">Direct Staircase</option>
                      <option value="Spiral Ladder">Spiral Ladder</option>
                      <option value="Temporary Ladder">Requires Ladder</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none text-[16px]">
                      expand_more
                    </span>
                  </div>
                </div>
              </div>

              {/* Preferred Date & Slot */}
              <div className="space-y-2 pt-1">
                <label className="font-label-md text-[#94A3B8] flex items-center justify-between">
                  <span>Preferred Inspection Date & Time</span>
                  <span className="font-label-sm text-[#4edea3] font-semibold">Priority Dispatch</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'Tomorrow Morning', title: 'Tomorrow', sub: '9 AM - 12 PM' },
                    { id: 'Tomorrow Afternoon', title: 'Tomorrow', sub: '2 PM - 5 PM' },
                    { id: 'This Weekend', title: 'Weekend', sub: 'Flexible Sat/Sun' },
                  ].map((s) => {
                    const active = slot === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSlot(s.id)}
                        className={`py-2.5 px-2 rounded-xl text-center border ${
                          active
                            ? 'bg-[#262a2e] text-[#4edea3] font-semibold border-[#4edea3]/40 shadow-sm'
                            : 'bg-[#0B0F12] text-[#64748B] border-white/5'
                        }`}
                      >
                        <span className="block font-label-md font-bold">{s.title}</span>
                        <span className="font-label-sm text-[#94A3B8]">{s.sub}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer p-3 rounded-xl bg-[#0B0F12] border border-white/5">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    required
                    className="mt-0.5 accent-[#10b981] h-4 w-4 rounded"
                  />
                  <span className="font-body-sm text-[#94A3B8] leading-snug">
                    I authorize Adishakti Solar engineers to review DISCOM net-metering feasibility & roof LiDAR clearance for my power connection under PM Surya Ghar Muft Bijli Yojana.
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentStep(2)}
                className="w-1/3 py-4 px-3 rounded-xl bg-[#262a2e] text-[#F8FAFC] font-label-md font-semibold flex items-center justify-center gap-1 active:scale-95 transition-all border border-white/5"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                <span>Back</span>
              </button>
              <button
                className="w-2/3 py-4 px-4 rounded-xl bg-[#10b981] text-[#00422b] font-label-lg font-bold flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(16,185,129,0.4)] hover:brightness-110 active:scale-95 transition-all"
                type="submit"
              >
                <span className="material-symbols-outlined text-[20px] animate-pulse">check_circle</span>
                <span>Confirm & Schedule</span>
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Real-time Feasibility Telemetry Snippet */}
      <div className="p-4 rounded-xl bg-[#181c1f] space-y-3 border border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4edea3] text-[18px]">radar</span>
            <span className="font-label-sm uppercase tracking-wider text-[#F8FAFC] font-bold">
              Estimated Feasibility
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#10b981]/10 text-[#4edea3] font-label-sm border border-[#10b981]/20">
            High Sunlight Yield
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="p-2.5 rounded-lg bg-[#0B0F12] flex flex-col border border-white/5">
            <span className="font-label-sm text-[#64748B]">Recommended Plant</span>
            <span className="font-headline-sm text-[#F8FAFC] mt-0.5">
              {(sanctionedLoad * 1.1).toFixed(1)} kW
            </span>
            <span className="font-label-sm text-[#ffb95f]">₹78,000 Subsidy Valid</span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#0B0F12] flex flex-col border border-white/5">
            <span className="font-label-sm text-[#64748B]">Estimated Generation</span>
            <span className="font-headline-sm text-[#4edea3] mt-0.5">
              {Math.round(sanctionedLoad * 1.1 * 4.2 * 30)} kWh
            </span>
            <span className="font-label-sm text-[#64748B]">per month in Odisha</span>
          </div>
        </div>
      </div>

      {/* Lead Engineer Guarantee Card */}
      <div className="p-4 rounded-xl bg-[#262a2e] space-y-3 border border-white/5 shadow-md">
        <div className="flex items-start gap-3">
          <div
            className="w-12 h-12 rounded-xl bg-cover bg-center shrink-0 border border-white/10"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDIYy6RkADY69lMkbD8hPgwfzQ9qqJV8B4gQoFTWFMKdicFIUjjbpQfg7MiHgLkDQXnwo4DBR5e1wbb4DGJb66XJ_MeKJmZyE2qKbbk9C4tEascQsVKfDcWbW7kCRL__jetil1tepS-8W6btRZQWLwQFsSCrXUSwQedPk8V_Hm8Sy6hIQk_oc4A_j2wxs3OLjBQlKMU-IKsTc-LL_y91xMEExAxs1RcIzm3LVWFjJ54QClCbkWEkXg7cA')`,
            }}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-label-md text-[#F8FAFC] font-bold">Er. Debasis Pradhan</span>
              <span className="material-symbols-outlined text-[#4edea3] text-[16px]">verified</span>
            </div>
            <p className="font-body-sm text-[#94A3B8] truncate text-xs">
              Chief Technical Surveyor (MNRE Certified)
            </p>
            <span className="inline-flex items-center gap-1 mt-1 font-label-sm text-[#ffb95f]">
              <span className="material-symbols-outlined text-[13px]">bolt</span>
              <span>DISCOM Net-Meter Liaison Lead</span>
            </span>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between text-[#64748B] border-t border-white/5">
          <div className="flex items-center gap-1 font-label-sm">
            <span className="material-symbols-outlined text-[16px] text-[#4edea3]">schedule</span>
            <span>24h Rapid Visit Protocol</span>
          </div>
          <a
            className="font-label-sm text-[#4edea3] font-bold hover:underline flex items-center gap-1"
            href="tel:+917894012345"
          >
            <span>Instant Hotline</span>
            <span className="material-symbols-outlined text-[14px]">call</span>
          </a>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmedBooking && (
        <div className="fixed inset-0 z-50 bg-[#0B0F12]/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-[#12181F] p-6 space-y-4 shadow-2xl border border-white/10">
            <div className="w-14 h-14 rounded-full bg-[#10b981]/20 text-[#4edea3] mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined text-[32px] animate-bounce">check_circle</span>
            </div>
            <div className="text-center space-y-1">
              <span className="font-label-sm uppercase tracking-widest text-[#4edea3] font-mono">
                Survey Dispatched
              </span>
              <h3 className="font-headline-sm text-[#F8FAFC] font-bold">Appointment Confirmed!</h3>
              <p className="font-body-sm text-[#94A3B8] leading-relaxed">
                Your site survey token has been registered in Odisha DISCOM network.
              </p>
            </div>

            {/* Booking Pass */}
            <div className="p-3.5 rounded-xl bg-[#0B0F12] space-y-2 border border-white/5">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-[#64748B]">Tracking Token</span>
                <span className="font-label-md font-bold text-[#ffb95f] font-mono tracking-wider">
                  {confirmedBooking.token}
                </span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="font-label-sm text-[#64748B]">Assigned Hub</span>
                <span className="font-body-sm text-[#F8FAFC] font-medium">
                  {confirmedBooking.district}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-[#64748B]">Inspection Slot</span>
                <span className="font-body-sm text-[#4edea3] font-medium">
                  {confirmedBooking.slot}
                </span>
              </div>
            </div>

            {/* Reassurance Info */}
            <div className="p-3 rounded-xl bg-[#1c2023] flex items-start gap-2 border border-white/5">
              <span className="material-symbols-outlined text-[#ffb95f] text-[18px] shrink-0 mt-0.5">
                mark_chat_read
              </span>
              <p className="font-body-sm text-[#94A3B8] text-xs">
                A confirmation SMS & WhatsApp survey dossier has been dispatched to {confirmedBooking.mobile} with lead engineer Er. Debasis Pradhan's route.
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => {
                  setConfirmedBooking(null);
                  onNavigate('track');
                }}
                className="w-full py-3.5 rounded-xl bg-[#10b981] text-[#00422b] font-label-md font-bold flex items-center justify-center gap-2 hover:bg-[#4edea3] transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">radar</span>
                <span>Track 10-Stage Milestone Now</span>
              </button>

              <button
                onClick={() => {
                  setConfirmedBooking(null);
                  onNavigate('home');
                }}
                className="w-full py-2.5 rounded-xl bg-[#262a2e] text-[#94A3B8] font-label-md hover:text-[#F8FAFC] transition-colors"
                type="button"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
