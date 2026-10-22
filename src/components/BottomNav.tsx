import React from 'react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 pb-safe bg-[#0B0F12]/90 backdrop-blur-xl shadow-[0_-1px_12px_rgba(0,0,0,0.5)] border-t border-white/[0.08]"
      aria-label="Mobile Navigation Bar"
    >
      <div className="h-20 px-3 flex items-center justify-between gap-1 max-w-lg mx-auto">
        {/* Calculator */}
        <button
          className={`flex-1 flex flex-col items-center justify-center h-14 rounded-xl transition-all ${
            currentScreen === 'calculator'
              ? 'text-[#4edea3] font-bold bg-[#1c2023]/60'
              : 'text-[#bbcabf] hover:text-[#4edea3]'
          }`}
          onClick={() => onNavigate('calculator')}
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">calculate</span>
          <span className="font-label-sm mt-0.5 tracking-tight">Calculator</span>
        </button>

        {/* Book Survey Primary Action */}
        <button
          className={`flex-1 flex flex-col items-center justify-center h-14 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] ${
            currentScreen === 'survey'
              ? 'bg-[#10b981] text-[#00422b] font-bold brightness-110 ring-2 ring-[#4edea3]/50'
              : 'bg-[#10b981] text-[#00422b] hover:brightness-110 active:scale-95'
          }`}
          onClick={() => onNavigate('survey')}
          type="button"
        >
          <span className="material-symbols-outlined text-[22px] animate-bounce">calendar_today</span>
          <span className="font-label-md font-semibold mt-0.5 uppercase tracking-wide text-[11px]">
            Book Survey
          </span>
        </button>

        {/* Track Project */}
        <button
          className={`flex-1 flex flex-col items-center justify-center h-14 rounded-xl transition-all ${
            currentScreen === 'track'
              ? 'text-[#4edea3] font-bold bg-[#1c2023]/60'
              : 'text-[#bbcabf] hover:text-[#4edea3]'
          }`}
          onClick={() => onNavigate('track')}
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">radar</span>
          <span className="font-label-sm mt-0.5 tracking-tight">Track Project</span>
        </button>

        {/* Portal */}
        <button
          className={`flex-1 flex flex-col items-center justify-center h-14 rounded-xl transition-all ${
            currentScreen === 'portal'
              ? 'text-[#4edea3] font-bold bg-[#1c2023]/60'
              : 'text-[#bbcabf] hover:text-[#4edea3]'
          }`}
          onClick={() => onNavigate('portal')}
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">dashboard</span>
          <span className="font-label-sm mt-0.5 tracking-tight">Portal</span>
        </button>
      </div>
    </nav>
  );
};
