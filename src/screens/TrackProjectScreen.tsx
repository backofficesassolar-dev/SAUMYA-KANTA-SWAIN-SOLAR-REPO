import React, { useState } from 'react';
import { SAMPLE_PROJECTS } from '../data/mockData';
import { ScreenType, SurveyBooking } from '../types';

interface TrackProjectScreenProps {
  userBookings: SurveyBooking[];
  onNavigate: (screen: ScreenType) => void;
}

export const TrackProjectScreen: React.FC<TrackProjectScreenProps> = ({
  userBookings,
  onNavigate,
}) => {
  const [searchToken, setSearchToken] = useState<string>('ADI-2025-OD-7419');
  const [selectedToken, setSelectedToken] = useState<string>('ADI-2025-OD-7419');

  // Match from userBookings or sample projects
  const activeProject =
    SAMPLE_PROJECTS.find((p) => p.token === selectedToken) ||
    (userBookings.length > 0 && userBookings[0].token === selectedToken
      ? {
          token: userBookings[0].token,
          name: userBookings[0].name,
          address: `${userBookings[0].area}, ${userBookings[0].district}`,
          pin: userBookings[0].pin,
          discom: userBookings[0].discom,
          capacity: userBookings[0].recommendedKw || '3.3 kWp',
          inverter: 'Growatt MIN 5000TL-X',
          systemType: 'On-Grid Bi-Directional Net-Meter',
          leadEngineer: 'Er. Debasis Pradhan (MNRE Lead)',
          engineerContact: '+91 78940 12345',
          progressPercent: 25,
          currentStage: '02 - Drone / 3D Roof Shadow Mapping',
          milestones: SAMPLE_PROJECTS[0].milestones,
        }
      : SAMPLE_PROJECTS[0]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchToken.trim()) {
      setSelectedToken(searchToken.trim().toUpperCase());
    }
  };

  return (
    <div className="flex flex-col w-full px-4 space-y-6 pb-28 max-w-xl mx-auto">
      {/* Header Banner */}
      <section className="space-y-2 pt-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
          <span className="font-label-sm text-[#4edea3] uppercase tracking-wider font-semibold">
            Field Execution Telemetry
          </span>
        </div>
        <h1 className="font-headline-lg-mobile text-[#F8FAFC]">
          Project Milestone Tracker
        </h1>
        <p className="font-body-sm text-[#94A3B8]">
          Track real-time engineering clearance, structural erection, and Odisha DISCOM joint inspection progress.
        </p>
      </section>

      {/* Token Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchToken}
            onChange={(e) => setSearchToken(e.target.value)}
            placeholder="Enter Token (e.g. ADI-2025-OD-7419)"
            className="w-full pl-10 pr-3 py-3 rounded-xl bg-[#181c1f] text-[#F8FAFC] font-mono text-xs uppercase placeholder:text-[#64748B] outline-none border border-white/5 focus:bg-[#1c2023]"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-3 rounded-xl bg-[#10b981] text-[#00422b] font-label-md font-bold hover:bg-[#4edea3] transition-colors shadow-sm"
        >
          Track
        </button>
      </form>

      {/* Sample Token Quick Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1 scrollbar-none">
        <span className="text-[#64748B] shrink-0 font-label-sm uppercase">Quick Select:</span>
        <button
          onClick={() => {
            setSearchToken('ADI-2025-OD-7419');
            setSelectedToken('ADI-2025-OD-7419');
          }}
          className={`px-2.5 py-1 rounded-lg font-mono text-xs border ${
            selectedToken === 'ADI-2025-OD-7419'
              ? 'bg-[#4edea3]/20 text-[#4edea3] border-[#4edea3]/40'
              : 'bg-[#181c1f] text-[#94A3B8] border-white/5'
          }`}
          type="button"
        >
          ADI-2025-OD-7419 (Bhubaneswar)
        </button>
        <button
          onClick={() => {
            setSearchToken('ADI-2025-OD-3891');
            setSelectedToken('ADI-2025-OD-3891');
          }}
          className={`px-2.5 py-1 rounded-lg font-mono text-xs border ${
            selectedToken === 'ADI-2025-OD-3891'
              ? 'bg-[#4edea3]/20 text-[#4edea3] border-[#4edea3]/40'
              : 'bg-[#181c1f] text-[#94A3B8] border-white/5'
          }`}
          type="button"
        >
          ADI-2025-OD-3891 (Cuttack)
        </button>
      </div>

      {/* Active Project Status Card */}
      <div className="p-5 rounded-2xl bg-[#1c2023] shadow-lg border border-white/5 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <span className="font-label-sm text-[#ffb95f] font-mono tracking-wider font-semibold block">
              TOKEN: {activeProject.token}
            </span>
            <h2 className="font-headline-sm text-[#F8FAFC] mt-0.5">{activeProject.name}</h2>
            <p className="font-body-sm text-[#94A3B8] text-xs mt-0.5">{activeProject.address}</p>
          </div>
          <span className="bg-[#10b981]/15 text-[#4edea3] font-label-sm px-2.5 py-1 rounded-full border border-[#10b981]/30">
            {activeProject.discom} Approved
          </span>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between font-label-sm">
            <span className="text-[#94A3B8]">Commissioning Progress</span>
            <span className="text-[#4edea3] font-bold">{activeProject.progressPercent}% Completed</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#0b0f12] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#10b981] to-[#4edea3] rounded-full transition-all duration-500"
              style={{ width: `${activeProject.progressPercent}%` }}
            />
          </div>
          <span className="font-label-sm text-[#ffb95f] block text-xs mt-1">
            Current Stage: {activeProject.currentStage}
          </span>
        </div>

        {/* Hardware Specs summary */}
        <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
          <div className="p-2.5 rounded-xl bg-[#181c1f] border border-white/5">
            <span className="text-[#64748B] block">Plant Capacity</span>
            <span className="text-[#F8FAFC] font-semibold font-mono">{activeProject.capacity}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#181c1f] border border-white/5">
            <span className="text-[#64748B] block">Inverter Unit</span>
            <span className="text-[#F8FAFC] font-semibold truncate block font-mono">
              {activeProject.inverter}
            </span>
          </div>
        </div>

        {/* Lead Engineer Assigned */}
        <div className="p-3.5 rounded-xl bg-[#262a2e] flex items-center justify-between border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#10b981]/20 flex items-center justify-center text-[#4edea3]">
              <span className="material-symbols-outlined text-[20px]">engineering</span>
            </div>
            <div>
              <span className="font-label-sm text-[#64748B] block text-[10px]">Lead Project Engineer</span>
              <span className="font-label-md text-[#F8FAFC] font-bold">{activeProject.leadEngineer}</span>
            </div>
          </div>
          <a
            href={`tel:${activeProject.engineerContact}`}
            className="w-9 h-9 rounded-xl bg-[#10b981] text-[#00422b] flex items-center justify-center hover:bg-[#4edea3] transition-colors"
            title="Call Engineer"
          >
            <span className="material-symbols-outlined text-[18px]">phone</span>
          </a>
        </div>
      </div>

      {/* 10-Stage Milestone Step-by-Step Feed */}
      <div className="space-y-3">
        <h3 className="font-headline-sm text-[#F8FAFC] flex items-center gap-2">
          <span className="material-symbols-outlined text-[#4edea3]">checklist</span>
          <span>10-Stage Installation Timeline</span>
        </h3>

        <div className="space-y-3">
          {activeProject.milestones.map((milestone) => {
            const isCompleted = milestone.status === 'completed';
            const isInProgress = milestone.status === 'in-progress';

            return (
              <div
                key={milestone.stageNumber}
                className={`p-4 rounded-xl border transition-all ${
                  isInProgress
                    ? 'bg-[#1c2023] border-[#ffb95f]/50 shadow-md ring-1 ring-[#ffb95f]/20'
                    : isCompleted
                    ? 'bg-[#181c1f] border-white/5 opacity-90'
                    : 'bg-[#12181F] border-white/5 opacity-50'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        isCompleted
                          ? 'bg-[#10b981] text-[#00422b]'
                          : isInProgress
                          ? 'bg-[#ffb95f] text-[#472a00] animate-pulse'
                          : 'bg-[#262a2e] text-[#64748B]'
                      }`}
                    >
                      {isCompleted ? '✓' : milestone.stageNumber}
                    </div>
                    <div>
                      <h4 className="font-title-md text-sm text-[#F8FAFC] leading-snug">
                        {milestone.title}
                      </h4>
                      <p className="font-body-sm text-xs text-[#94A3B8] mt-0.5">{milestone.desc}</p>
                      {milestone.note && (
                        <p className="font-label-sm text-xs text-[#4edea3] mt-1.5 bg-[#0b0f12] px-2 py-1 rounded inline-block">
                          Field Log: {milestone.note}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="font-label-sm text-[#64748B] shrink-0">{milestone.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Documents Vault */}
      <div className="p-4 rounded-2xl bg-[#1c2023] border border-white/5 space-y-3">
        <span className="font-label-sm text-[#4edea3] uppercase tracking-wider font-semibold block">
          Authorized Engineering Vault
        </span>
        <div className="space-y-2">
          {[
            { title: 'Single Line Diagram (SLD) CAD Drawing', size: '1.4 MB PDF' },
            { title: 'TPCODL Bi-Directional Net-Meter Application Acknowledgement', size: '820 KB PDF' },
            { title: 'Tier-1 ALMM Batch Test Warranty Certificate', size: '2.1 MB PDF' },
          ].map((doc, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-[#181c1f] flex items-center justify-between border border-white/5 hover:border-white/15 cursor-pointer transition-colors"
              onClick={() => alert(`Downloading verified document: ${doc.title}`)}
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#ffb95f] text-[20px]">file_present</span>
                <div>
                  <span className="font-body-sm text-xs text-[#F8FAFC] block">{doc.title}</span>
                  <span className="font-label-sm text-[#64748B] text-[10px]">{doc.size}</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#4edea3] text-[18px]">download</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => onNavigate('survey')}
        className="w-full py-3.5 rounded-xl bg-[#262a2e] text-[#F8FAFC] font-label-md font-semibold flex items-center justify-center gap-2 hover:bg-[#313539] transition-colors border border-white/5"
        type="button"
      >
        <span className="material-symbols-outlined text-[18px]">add_circle</span>
        <span>Register Another Connection for Survey</span>
      </button>
    </div>
  );
};
