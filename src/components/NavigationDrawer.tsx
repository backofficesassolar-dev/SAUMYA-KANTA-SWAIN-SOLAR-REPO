import React from 'react';
import { ScreenType } from '../types';

interface NavigationDrawerProps {
  isOpen: boolean;
  currentScreen: ScreenType;
  onClose: () => void;
  onNavigate: (screen: ScreenType) => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  currentScreen,
  onClose,
  onNavigate,
}) => {
  const navItems: { label: string; icon: string; screen: ScreenType; badge?: string }[] = [
    { label: 'Home Telemetry', icon: 'dashboard', screen: 'home' },
    { label: 'Solar Calculator', icon: 'calculate', screen: 'calculator', badge: 'OERC 2025' },
    { label: 'Certified Products', icon: 'inventory_2', screen: 'catalog', badge: 'Tier-1' },
    { label: 'Book Site Survey', icon: 'engineering', screen: 'survey', badge: 'Free' },
    { label: 'Track Project', icon: 'radar', screen: 'track' },
    { label: 'Subsidy Schemes', icon: 'account_balance', screen: 'subsidy', badge: '₹78,000' },
    { label: 'Customer Portal', icon: 'hub', screen: 'portal' },
  ];

  const handleSelect = (screen: ScreenType) => {
    onNavigate(screen);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-[#0b0f12]/80 backdrop-blur-md z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-[84%] max-w-[340px] z-50 bg-[#12181F]/95 backdrop-blur-2xl transition-transform duration-300 ease-out flex flex-col pt-safe pb-safe shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] border-r border-white/[0.08] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="h-20 px-4 flex items-center justify-between border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <img
              alt="Adishakti Solar Wordmark Logo"
              className="h-7 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1Vm88ZDPwf7GYn41bzhEr-T3FHuDVksIGwTeBX_xVZTsEPnZfo6wMpyCoP2gpNtzl58OaFEc1_OloM81DAq8LzG7xfPZDpSPiJS6nXWXv7LB3uuVrRZTu4XQkY8YkqrDh9AbXrIkd-k6YTcQ426fmjZJhAEcpko7YkItqikpLMBXnZBx2SXu4GHUM6y-0kBega6TOe55MGiL5Qi2xv8qYFdd4i9aivVfP4UYfEG0GqzebY40Si4HETitvY"
            />
          </div>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-xl text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5 transition-colors"
            onClick={onClose}
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Grid Interconnection Badge */}
        <div className="px-4 py-2.5 bg-[#181c1f]/80 mx-4 mt-3 rounded-xl flex items-center gap-2.5 border border-white/5">
          <span className="material-symbols-outlined text-[#ffb95f] text-[20px]">bolt</span>
          <div className="flex flex-col min-w-0">
            <span className="font-label-sm text-[#64748B] uppercase tracking-wider">
              Grid Interconnection
            </span>
            <span className="font-body-sm text-[#F8FAFC] font-medium truncate">
              TPCODL • TPNODL • TPSODL • TPWODL
            </span>
          </div>
        </div>

        {/* Nav Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = currentScreen === item.screen;
            return (
              <button
                key={item.screen}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left transition-all ${
                  isActive
                    ? 'bg-[#10b981]/15 text-[#4edea3] font-semibold border border-[#10b981]/25'
                    : 'text-[#bbcabf] hover:text-[#4edea3] hover:bg-[#262a2e]'
                }`}
                onClick={() => handleSelect(item.screen)}
                type="button"
              >
                <div className="flex items-center gap-3">
                  <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-[#4edea3]' : 'text-[#64748B]'}`}>
                    {item.icon}
                  </span>
                  <span className="font-body-md">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="font-label-sm px-2 py-0.5 rounded bg-white/5 text-[#ffb95f] font-mono text-[10px]">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer Helpline Card */}
        <div className="p-4 bg-[#0b0f12]/90 mt-auto border-t border-white/[0.06]">
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-[#64748B]">Odisha Helpline Desk</span>
              <span className="font-label-sm text-[#4edea3] flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></span>
                24x7 Active
              </span>
            </div>
            <a
              className="mt-1 font-label-md text-[#F8FAFC] flex items-center gap-2 hover:text-[#4edea3] transition-colors"
              href="tel:+917894012345"
            >
              <span className="material-symbols-outlined text-[#F27D26] text-[16px]">phone_in_talk</span>
              +91 78940 12345
            </a>
            <p className="text-[11px] text-[#64748B] mt-1">Patia, Bhubaneswar • Direct Field Dispatch</p>
          </div>
        </div>
      </aside>
    </>
  );
};
