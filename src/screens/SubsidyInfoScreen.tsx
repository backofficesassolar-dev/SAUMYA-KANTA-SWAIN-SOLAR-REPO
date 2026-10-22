import React from 'react';
import { ScreenType } from '../types';

interface SubsidyInfoScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const SubsidyInfoScreen: React.FC<SubsidyInfoScreenProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col w-full px-4 space-y-6 pb-28 max-w-xl mx-auto">
      {/* Header */}
      <section className="space-y-2 pt-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#ffb95f] text-[22px]">account_balance</span>
          <span className="font-label-sm text-[#ffb95f] uppercase tracking-wider font-semibold">
            Government Grant Framework
          </span>
        </div>
        <h1 className="font-headline-lg-mobile text-[#F8FAFC]">
          PM Surya Ghar Muft Bijli Yojana
        </h1>
        <p className="font-body-sm text-[#94A3B8]">
          Direct Benefit Transfer (DBT) central subsidy combined with Odisha State clean energy grants for rooftop residential consumers.
        </p>
      </section>

      {/* Subsidy Table Card */}
      <div className="p-5 rounded-2xl bg-[#1c2023] shadow-xl border border-white/5 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
          <h3 className="font-headline-sm text-[#F8FAFC]">Subsidy Slabs for Odisha</h3>
          <span className="font-label-sm px-2.5 py-1 rounded bg-[#10b981]/15 text-[#4edea3] font-semibold">
            Direct Aadhaar DBT
          </span>
        </div>

        <div className="space-y-3 font-label-sm">
          <div className="p-3 rounded-xl bg-[#181c1f] flex items-center justify-between border border-white/5">
            <div>
              <span className="font-headline-sm text-[16px] text-[#F8FAFC] font-bold block">1 kW Plant</span>
              <span className="text-[#64748B]">2 × 550W Panels • 100 sq.ft</span>
            </div>
            <div className="text-right">
              <span className="text-[#4edea3] font-headline-sm text-[16px] font-bold block">₹33,000</span>
              <span className="text-[#64748B] text-[10px]">Central Subsidy</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#181c1f] flex items-center justify-between border border-white/5">
            <div>
              <span className="font-headline-sm text-[16px] text-[#F8FAFC] font-bold block">2 kW Plant</span>
              <span className="text-[#64748B]">4 × 550W Panels • 200 sq.ft</span>
            </div>
            <div className="text-right">
              <span className="text-[#4edea3] font-headline-sm text-[16px] font-bold block">₹66,000</span>
              <span className="text-[#64748B] text-[10px]">Central Subsidy</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#181c1f] flex items-center justify-between border border-[#4edea3]/30 bg-[#10b981]/5">
            <div>
              <span className="font-headline-sm text-[16px] text-[#ffb95f] font-bold block">3 kW & Above (Recommended)</span>
              <span className="text-[#64748B]">6+ × 550W Panels • 300+ sq.ft</span>
            </div>
            <div className="text-right">
              <span className="text-[#4edea3] font-headline-sm text-[18px] font-bold block">₹78,000</span>
              <span className="text-[#ffb95f] text-[10px] font-bold">Max Central Cap</span>
            </div>
          </div>

          {/* Odisha State Bonus */}
          <div className="p-3 rounded-xl bg-[#262a2e] flex items-center justify-between border border-white/5">
            <div>
              <span className="font-body-md text-[#F8FAFC] font-semibold block">Odisha State Clean Bonus</span>
              <span className="text-[#64748B]">Additional OERC green incentive</span>
            </div>
            <div className="text-right">
              <span className="text-[#ffb95f] font-headline-sm text-[16px] font-bold block">+₹20,000</span>
              <span className="text-[#64748B] text-[10px]">State Credit</span>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#0b0f12] text-xs text-[#94A3B8] border border-white/5">
          Total Combined Maximum Grant: <strong className="text-[#4edea3] text-sm">₹98,000</strong> per residential connection across TPCODL, TPNODL, TPSODL & TPWODL.
        </div>
      </div>

      {/* Mandatory Document Checklist */}
      <div className="p-5 rounded-2xl bg-[#1c2023] border border-white/5 space-y-3">
        <h3 className="font-headline-sm text-[#F8FAFC] flex items-center gap-2">
          <span className="material-symbols-outlined text-[#4edea3]">folder_open</span>
          <span>Required Document Checklist</span>
        </h3>
        <p className="font-body-sm text-[#94A3B8] text-xs">
          Adishakti Solar engineers will scan and upload all documents on the National Solar Portal for you during the site survey.
        </p>

        <div className="space-y-2 pt-1">
          {[
            { icon: 'receipt_long', title: 'Latest Electricity Bill', desc: 'Past 3-month TPCODL / TPNODL / TPWODL / TPSODL bill with matching name' },
            { icon: 'badge', title: 'Aadhaar Card of Electricity Account Holder', desc: 'Linked to active mobile number for National Portal OTP' },
            { icon: 'account_balance', title: 'Cancelled Cheque or Bank Passbook Copy', desc: 'Aadhaar-seeded bank account for direct DBT subsidy transfer' },
            { icon: 'home', title: 'Rooftop Ownership or NOC', desc: 'Tax receipt, sale deed copy, or society NOC for apartment rooftop' },
          ].map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-[#181c1f] flex items-start gap-3 border border-white/5">
              <span className="material-symbols-outlined text-[#ffb95f] text-[20px] mt-0.5 shrink-0">
                {item.icon}
              </span>
              <div>
                <span className="font-body-sm text-sm text-[#F8FAFC] font-medium block">{item.title}</span>
                <span className="font-label-sm text-xs text-[#64748B]">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4-Step Subsidy Transfer Lifecycle */}
      <div className="p-5 rounded-2xl bg-[#1c2023] border border-white/5 space-y-3">
        <h3 className="font-headline-sm text-[#F8FAFC]">4-Step DBT Disbursement Flow</h3>
        <div className="space-y-3 text-xs">
          <div className="flex gap-3 items-start">
            <span className="w-6 h-6 rounded-full bg-[#10b981] text-[#00422b] font-bold flex items-center justify-center shrink-0">
              1
            </span>
            <div>
              <strong className="text-[#F8FAFC] block text-sm">Site Feasibility & Application Filing</strong>
              <span className="text-[#94A3B8]">Adishakti files online registration with your DISCOM division office.</span>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <span className="w-6 h-6 rounded-full bg-[#10b981] text-[#00422b] font-bold flex items-center justify-center shrink-0">
              2
            </span>
            <div>
              <strong className="text-[#F8FAFC] block text-sm">ALMM Hardware Installation</strong>
              <span className="text-[#94A3B8]">Certified installation of Waaree / Tata Power modules and Growatt inverters.</span>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <span className="w-6 h-6 rounded-full bg-[#10b981] text-[#00422b] font-bold flex items-center justify-center shrink-0">
              3
            </span>
            <div>
              <strong className="text-[#F8FAFC] block text-sm">DISCOM Joint Inspection & Net Meter</strong>
              <span className="text-[#94A3B8]">DISCOM SDO conducts site testing and seals bi-directional meter.</span>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <span className="w-6 h-6 rounded-full bg-[#ffb95f] text-[#472a00] font-bold flex items-center justify-center shrink-0">
              4
            </span>
            <div>
              <strong className="text-[#ffb95f] block text-sm">Direct Bank Credit (Within 30 Days)</strong>
              <span className="text-[#94A3B8]">MNRE credits up to ₹78,000 directly to your Aadhaar-linked bank account.</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="pt-2 space-y-2">
        <button
          onClick={() => onNavigate('survey')}
          className="w-full py-4 px-5 rounded-xl bg-[#10b981] text-[#00422b] font-headline-sm font-semibold flex items-center justify-center gap-2 shadow-lg hover:bg-[#4edea3] transition-colors"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">engineering</span>
          <span>Book Free Survey for Subsidy Application</span>
        </button>
      </div>
    </div>
  );
};
