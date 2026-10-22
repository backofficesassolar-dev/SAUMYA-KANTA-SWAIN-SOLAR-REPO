import React from 'react';
import { ProductItem } from '../types';

interface DatasheetModalProps {
  product: ProductItem | null;
  onClose: () => void;
}

export const DatasheetModal: React.FC<DatasheetModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0B0F12]/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-lg bg-[#12181F] border border-white/[0.08] rounded-t-3xl sm:rounded-2xl max-h-[85vh] overflow-y-auto p-5 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4edea3] text-[24px]">description</span>
            <div>
              <span className="font-label-sm text-[#4edea3] font-semibold uppercase tracking-wider block">
                Technical Specification Sheet
              </span>
              <h3 className="font-headline-sm text-[#F8FAFC] leading-tight mt-0.5">
                {product.name}
              </h3>
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

        {/* Product Image & Meta */}
        <div className="flex gap-4 items-center py-4 border-b border-white/[0.06]">
          <img
            src={product.image}
            alt={product.name}
            className="w-20 h-20 object-cover rounded-xl bg-[#0b0f12] border border-white/5"
          />
          <div className="flex-1">
            <span className="font-label-sm text-[#ffb95f] font-bold block">{product.brand}</span>
            <span className="font-headline-sm text-[#F8FAFC] font-semibold">{product.price}</span>
            <span className="font-label-sm text-[#64748B] block mt-0.5">{product.stockStatus}</span>
          </div>
        </div>

        {/* Technical Data Table */}
        <div className="mt-4 space-y-3">
          <h4 className="font-label-md text-[#4edea3] font-semibold uppercase tracking-wider">
            Verified Engineering Parameters
          </h4>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-[#1c2023] border border-white/5">
              <span className="text-[#64748B] block">{product.specs.label1}</span>
              <span className="text-[#F8FAFC] font-mono font-semibold text-sm">{product.specs.value1}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#1c2023] border border-white/5">
              <span className="text-[#64748B] block">{product.specs.label2}</span>
              <span className="text-[#F8FAFC] font-mono font-semibold text-sm">{product.specs.value2}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#1c2023] border border-white/5">
              <span className="text-[#64748B] block">{product.specs.label3}</span>
              <span className="text-[#F8FAFC] font-mono font-semibold text-sm">{product.specs.value3}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#1c2023] border border-white/5">
              <span className="text-[#64748B] block">{product.specs.label4}</span>
              <span className="text-[#ffb95f] font-mono font-semibold text-sm">{product.specs.value4}</span>
            </div>
          </div>

          {/* Compliance & Certifications */}
          <div className="p-3.5 rounded-xl bg-[#181c1f] space-y-2 border border-white/5 mt-3">
            <div className="flex items-center justify-between font-label-sm">
              <span className="text-[#64748B]">Odisha DISCOM Grid Tie:</span>
              <span className="text-[#4edea3] font-semibold">{product.discomApproval}</span>
            </div>
            <div className="flex items-center justify-between font-label-sm">
              <span className="text-[#64748B]">Cyclone Resistance:</span>
              <span className="text-[#ffb95f] font-semibold">{product.cycloneRating}</span>
            </div>
            <div className="flex items-center justify-between font-label-sm">
              <span className="text-[#64748B]">Warranty Coverage:</span>
              <span className="text-[#F8FAFC] font-semibold">{product.warranty}</span>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="mt-3 space-y-1.5">
            <span className="font-label-sm text-[#94A3B8] uppercase tracking-wider block">Key Highlights</span>
            <ul className="space-y-1 text-xs text-[#94A3B8]">
              {product.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#4edea3] mt-0.5">•</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-3 flex gap-2 border-t border-white/[0.08]">
          <button
            onClick={() => {
              alert(`Official OEM PDF Datasheet for ${product.name} downloaded successfully.`);
            }}
            className="flex-1 py-3 rounded-xl bg-[#262a2e] hover:bg-[#313539] text-[#F8FAFC] font-label-md font-semibold flex items-center justify-center gap-2 transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Download PDF</span>
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-[#10b981] hover:bg-[#4edea3] text-[#003824] font-label-md font-bold transition-colors"
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
