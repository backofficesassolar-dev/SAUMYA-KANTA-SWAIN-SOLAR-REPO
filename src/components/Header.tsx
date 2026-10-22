import React from 'react';
import { ScreenType } from '../types';

interface HeaderProps {
  currentScreen: ScreenType;
  onOpenMenu: () => void;
  onNavigate: (screen: ScreenType) => void;
}

const SCREEN_TITLES: Record<ScreenType, string> = {
  home: 'Home Telemetry',
  calculator: 'Solar Calculator',
  catalog: 'Product Catalog',
  survey: 'Site Survey Booking',
  track: 'Project Tracking',
  portal: 'Customer Portal',
  subsidy: 'PM Surya Ghar Subsidy',
};

export const Header: React.FC<HeaderProps> = ({ currentScreen, onOpenMenu, onNavigate }) => {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#0B0F12]/85 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.4)] border-b border-white/[0.06]">
      <div className="h-20 px-4 flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center gap-2">
          <button
            aria-label="Open Menu"
            className="w-11 h-11 flex items-center justify-center text-[#e0e3e7] hover:text-[#4edea3] rounded-xl hover:bg-[#1c2023] transition-colors"
            onClick={onOpenMenu}
            type="button"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>
          
          <div 
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => onNavigate('home')}
          >
            <img
              alt="Adishakti Solar Wordmark Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1Vm88ZDPwf7GYn41bzhEr-T3FHuDVksIGwTeBX_xVZTsEPnZfo6wMpyCoP2gpNtzl58OaFEc1_OloM81DAq8LzG7xfPZDpSPiJS6nXWXv7LB3uuVrRZTu4XQkY8YkqrDh9AbXrIkd-k6YTcQ426fmjZJhAEcpko7YkItqikpLMBXnZBx2SXu4GHUM6y-0kBega6TOe55MGiL5Qi2xv8qYFdd4i9aivVfP4UYfEG0GqzebY40Si4HETitvY"
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-[17px] leading-tight text-[#F8FAFC] tracking-tight">
                {SCREEN_TITLES[currentScreen] || 'Adishakti Solar'}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></span>
                <span className="font-label-sm text-[#94A3B8] truncate max-w-[160px] sm:max-w-none">
                  Odisha (DISCOM Net Metering)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            aria-label="Call Helpline +91 78940 12345"
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#262a2e]/70 text-[#ffb95f] hover:text-[#4edea3] hover:bg-[#313539] transition-colors border border-white/5"
            href="tel:+917894012345"
            title="Toll-free 24/7 Helpline"
          >
            <span className="material-symbols-outlined text-[20px]">support_agent</span>
          </a>

          <button
            aria-label="Customer Portal Account"
            className="w-9 h-9 rounded-full bg-[#10b981] hover:bg-[#4edea3] flex items-center justify-center text-[#003824] transition-colors shadow-sm active:scale-95"
            onClick={() => onNavigate('portal')}
            title="Customer Portal"
            type="button"
          >
            <span className="material-symbols-outlined text-[19px] font-bold">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
