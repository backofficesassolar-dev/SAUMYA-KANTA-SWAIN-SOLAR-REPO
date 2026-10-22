import React from 'react';
import { ProductItem } from '../types';

interface ComparisonModalProps {
  items: ProductItem[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  items,
  isOpen,
  onClose,
  onRemoveItem,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0B0F12]/85 backdrop-blur-md flex items-end justify-center p-0 sm:p-4">
      <div className="w-full max-w-2xl bg-[#12181F] border border-white/[0.08] rounded-t-3xl sm:rounded-2xl max-h-[85vh] overflow-y-auto p-5 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4edea3] text-[22px]">compare_arrows</span>
            <div>
              <h3 className="font-headline-sm text-[#F8FAFC] font-bold">
                Hardware Specification Face-Off
              </h3>
              <p className="font-body-sm text-[#94A3B8]">
                Direct technical matrix comparing performance metrics under coastal Odisha climatic stress.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#262a2e] flex items-center justify-center text-[#94A3B8] hover:text-[#F8FAFC]"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="py-12 text-center text-[#94A3B8]">
            <p className="font-body-md">No products selected for comparison.</p>
            <p className="text-xs text-[#64748B] mt-1">Tap the compare button on any hardware card to stage.</p>
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <div className={`grid grid-cols-${items.length} gap-3 min-w-[320px]`}>
              {items.map((item) => (
                <div key={item.id} className="p-3.5 rounded-xl bg-[#1c2023] border border-white/5 flex flex-col gap-2.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-label-sm text-[#ffb95f] font-bold block">{item.brand}</span>
                      <h4 className="font-headline-sm text-[16px] text-[#4edea3] font-bold leading-snug">
                        {item.name}
                      </h4>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[#64748B] hover:text-[#EF4444] p-1"
                      title="Remove"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </div>

                  <span className="text-[#F8FAFC] font-bold font-label-md text-sm">{item.price}</span>

                  <div className="pt-2 border-t border-white/[0.08] space-y-2 text-xs">
                    <div>
                      <span className="text-[#64748B] block text-[11px]">Primary Spec</span>
                      <span className="text-[#F8FAFC] font-mono font-medium">{item.specs.value1}</span>
                    </div>
                    <div>
                      <span className="text-[#64748B] block text-[11px]">Secondary Spec</span>
                      <span className="text-[#F8FAFC] font-mono font-medium">{item.specs.value2}</span>
                    </div>
                    <div>
                      <span className="text-[#64748B] block text-[11px]">Cyclone Rating</span>
                      <span className="text-[#ffb95f] font-mono font-medium">{item.specs.value4}</span>
                    </div>
                    <div>
                      <span className="text-[#64748B] block text-[11px]">DISCOM Integration</span>
                      <span className="text-[#4edea3] font-mono">{item.discomApproval}</span>
                    </div>
                    <div>
                      <span className="text-[#64748B] block text-[11px]">Warranty Term</span>
                      <span className="text-[#94A3B8]">{item.warranty}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-5 pt-3 flex items-center gap-2 border-t border-white/[0.08]">
          <button
            onClick={onClearAll}
            className="flex-1 py-3 rounded-xl bg-[#262a2e] text-[#94A3B8] hover:text-[#F8FAFC] font-label-md font-medium transition-colors"
            type="button"
          >
            Clear All
          </button>
          <button
            onClick={() => {
              alert('Technical comparison matrix exported to PDF & sent to clipboard.');
              onClose();
            }}
            className="flex-1 py-3 rounded-xl bg-[#10b981] text-[#003824] font-label-md font-bold shadow-md hover:bg-[#4edea3] transition-colors"
            type="button"
          >
            Export Tech Matrix
          </button>
        </div>
      </div>
    </div>
  );
};
