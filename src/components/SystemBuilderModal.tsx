import React from 'react';
import { ProductItem } from '../types';

interface SystemBuilderModalProps {
  items: { product: ProductItem; quantity: number }[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onBookSurveyWithSystem: () => void;
}

export const SystemBuilderModal: React.FC<SystemBuilderModalProps> = ({
  items,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onBookSurveyWithSystem,
}) => {
  if (!isOpen) return null;

  const totalCost = items.reduce((sum, item) => sum + (item.product.priceNumeric * item.quantity), 0);

  return (
    <div className="fixed inset-0 z-50 bg-[#0B0F12]/85 backdrop-blur-md flex items-end justify-center p-0 sm:p-4">
      <div className="w-full max-w-lg bg-[#12181F] border border-white/[0.08] rounded-t-3xl sm:rounded-2xl max-h-[85vh] overflow-y-auto p-5 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4edea3] text-[22px]">build_circle</span>
            <div>
              <h3 className="font-headline-sm text-[#F8FAFC] font-bold">
                Custom System Bill of Materials (BOM)
              </h3>
              <p className="font-body-sm text-[#94A3B8]">
                Staged Tier-1 components for your Odisha installation.
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
            <span className="material-symbols-outlined text-[36px] text-[#64748B] mb-2">shopping_basket</span>
            <p className="font-body-md">Your Bill of Materials is empty.</p>
            <p className="text-xs text-[#64748B] mt-1">Browse the hardware catalog and tap "Add to System".</p>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="p-3 rounded-xl bg-[#1c2023] border border-white/5 flex items-center justify-between gap-3"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded-lg bg-[#0b0f12]"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-headline-sm text-sm text-[#F8FAFC] truncate">
                    {product.name}
                  </h4>
                  <span className="font-label-sm text-[#ffb95f] font-mono">
                    ₹{(product.priceNumeric * quantity).toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-[#262a2e] px-2 py-1 rounded-lg">
                  <button
                    onClick={() => onUpdateQuantity(product.id, -1)}
                    className="text-[#94A3B8] hover:text-[#F8FAFC] font-bold px-1"
                    type="button"
                  >
                    -
                  </button>
                  <span className="font-mono text-xs text-[#F8FAFC] font-bold min-w-[16px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(product.id, 1)}
                    className="text-[#94A3B8] hover:text-[#F8FAFC] font-bold px-1"
                    type="button"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => onRemoveItem(product.id)}
                  className="text-[#64748B] hover:text-[#EF4444] p-1"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            ))}

            {/* Total summary */}
            <div className="p-3.5 rounded-xl bg-[#181c1f] border border-white/5 space-y-1 mt-4">
              <div className="flex justify-between items-baseline font-body-sm">
                <span className="text-[#94A3B8]">Estimated Hardware Subtotal:</span>
                <span className="font-headline-sm text-[#4edea3] font-bold">
                  ₹{totalCost.toLocaleString('en-IN')}
                </span>
              </div>
              <span className="text-[11px] text-[#64748B] block">
                * Turnkey installation, DISCOM bidirectional meter, civil grouting, and PM Surya Ghar subsidy applied at survey.
              </span>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        {items.length > 0 && (
          <div className="mt-5 pt-3 border-t border-white/[0.08] space-y-2">
            <button
              onClick={() => {
                onClose();
                onBookSurveyWithSystem();
              }}
              className="w-full py-3.5 rounded-xl bg-[#10b981] text-[#003824] font-label-md font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-[#4edea3] transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">calendar_month</span>
              <span>Schedule Free Survey with this BOM</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
