import React, { useState, useMemo } from 'react';
import { ProductItem } from '../types';
import { PRODUCTS_CATALOG } from '../data/mockData';
import { DatasheetModal } from '../components/DatasheetModal';
import { ComparisonModal } from '../components/ComparisonModal';

interface ProductCatalogScreenProps {
  onAddToSystem: (product: ProductItem) => void;
  onRequestQuote: (name: string) => void;
  onOpenSystemBuilder: () => void;
  systemBuilderCount: number;
}

export const ProductCatalogScreen: React.FC<ProductCatalogScreenProps> = ({
  onAddToSystem,
  onRequestQuote,
  onOpenSystemBuilder,
  systemBuilderCount,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [compareItems, setCompareItems] = useState<ProductItem[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [viewingDatasheet, setViewingDatasheet] = useState<ProductItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleToggleCompare = (product: ProductItem) => {
    const exists = compareItems.find((p) => p.id === product.id);
    if (exists) {
      setCompareItems((prev) => prev.filter((p) => p.id !== product.id));
      showToast(`Removed ${product.name.split(' ')[0]} from comparison`);
    } else {
      if (compareItems.length >= 3) {
        showToast('Max 3 items can be compared side-by-side');
        return;
      }
      setCompareItems((prev) => [...prev, product]);
      showToast(`Added ${product.name.split(' ')[0]} to comparison`);
    }
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS_CATALOG.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);

      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      const matchesBrand = !selectedBrand || item.brand === selectedBrand;

      return matchesQuery && matchesCategory && matchesBrand;
    });
  }, [searchQuery, selectedCategory, selectedBrand]);

  const categories = [
    'All',
    'Solar Panels (PV)',
    'Grid-Tie Inverters',
    'Hybrid & Batteries',
    'Mounting & BOS',
  ];

  const brands = ['Waaree', 'Tata Power Solar', 'Vikram Solar', 'Growatt', 'Sungrow', 'Microtek'];

  return (
    <div className="flex flex-col w-full pb-32 max-w-xl mx-auto">
      {/* Top Banner */}
      <div className="relative px-4 pt-3 pb-4 overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#10b981]/10 text-[#4edea3] border border-[#10b981]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-ping"></span>
            <span className="font-label-sm uppercase tracking-wider font-semibold">Tier-1 OEM Direct Supply</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#262a2e] text-[#ffb95f] border border-white/5">
            <span className="material-symbols-outlined text-[14px]">cyclone</span>
            <span className="font-label-sm">Coastal Rated</span>
          </div>
        </div>

        <h2 className="font-headline-lg-mobile text-[#F8FAFC] tracking-tight font-semibold">
          Certified Solar Hardware
        </h2>
        <p className="font-body-sm text-[#94A3B8] mt-1">
          Genuine Tier-1 Solar PV Modules, Inverters, & Cyclone-Resistant Mounting Hardware for Odisha installations.
        </p>

        {/* Search Bar */}
        <div className="relative mt-4">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            id="catalog-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search model, brand, capacity (e.g. Waaree 550W, Growatt)..."
            className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#181c1f] text-[#F8FAFC] placeholder:text-[#64748B] font-body-sm outline-none shadow-md transition-all focus:bg-[#1c2023] border border-white/5"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#64748B] hover:text-[#F8FAFC]"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto mt-3 pb-1 -mx-4 px-4 scrollbar-none">
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                type="button"
                className={`px-3.5 py-2 rounded-xl font-label-md whitespace-nowrap transition-all shadow-sm ${
                  active
                    ? 'bg-[#10b981] text-[#00422b] font-semibold'
                    : 'bg-[#262a2e] text-[#bbcabf] hover:text-[#F8FAFC] border border-white/5'
                }`}
              >
                {cat === 'All' ? 'All Equipment' : cat}
              </button>
            );
          })}
        </div>

        {/* Brand Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto mt-2 pb-1 -mx-4 px-4 scrollbar-none">
          <span className="font-label-sm text-[#64748B] mr-1 self-center uppercase tracking-wider">Brand:</span>
          {brands.map((brand) => {
            const active = selectedBrand === brand;
            return (
              <button
                key={brand}
                onClick={() => setSelectedBrand(active ? null : brand)}
                type="button"
                className={`px-2.5 py-1 rounded-lg font-label-sm transition-colors border ${
                  active
                    ? 'bg-[#4edea3] text-[#003824] font-bold border-[#4edea3]'
                    : 'bg-[#1c2023] text-[#bbcabf] hover:text-[#4edea3] border-white/5'
                }`}
              >
                {brand}
              </button>
            );
          })}
        </div>
      </div>

      {/* Telemetry Live Status Strip */}
      <div className="px-4 py-2 mx-4 rounded-xl bg-[#181c1f] flex items-center justify-between shadow-sm border border-white/5">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#4edea3] text-[18px]">verified_user</span>
          <span className="font-label-sm text-[#F8FAFC]">MNRE ALMM Approved Catalog</span>
        </div>
        <div className="flex items-center gap-1.5 font-label-sm text-[#ffb95f]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ffb95f] animate-pulse"></span>
          <span>Bhubaneswar Depot Active</span>
        </div>
      </div>

      {/* Catalog Cards Feed */}
      <div className="px-4 mt-4 space-y-4">
        {filteredProducts.map((product) => {
          const isComparing = compareItems.some((p) => p.id === product.id);

          return (
            <article
              key={product.id}
              className="rounded-2xl bg-[#12181F]/90 backdrop-blur-xl p-4 shadow-xl transition-all hover:bg-[#262a2e]/80 border border-white/5 flex flex-col gap-3"
            >
              {/* Product Image & Badges */}
              <div className="relative w-full h-44 rounded-xl overflow-hidden mb-1 bg-[#0b0f12]">
                <img
                  className="w-full h-full object-cover"
                  src={product.image}
                  alt={product.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12181F] via-transparent to-transparent opacity-90 pointer-events-none" />
                <div className="absolute top-2 left-2 flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-[#0b0f12]/80 backdrop-blur-md text-[#4edea3] font-label-sm font-semibold flex items-center gap-1 border border-white/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></span>
                    {product.badge1}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#ee9800]/90 text-[#5b3800] font-label-sm font-bold shadow-sm">
                    {product.badge2}
                  </span>
                </div>
                <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
                  <span className="font-label-sm text-[#94A3B8]">{product.stockStatus}</span>
                  <span className="font-headline-sm text-[#F8FAFC] font-bold">
                    {product.price}
                  </span>
                </div>
              </div>

              {/* Title & Brand */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-label-sm text-[#4edea3] font-semibold uppercase tracking-wider">
                      {product.brand}
                    </span>
                    <span className="font-label-sm text-[#64748B]">• {product.category}</span>
                  </div>
                  <h3 className="font-headline-sm text-[#F8FAFC] font-bold truncate mt-0.5">
                    {product.name}
                  </h3>
                </div>
                <button
                  aria-label="Add to comparison"
                  onClick={() => handleToggleCompare(product)}
                  className={`p-2 rounded-xl transition-colors flex-shrink-0 border ${
                    isComparing
                      ? 'bg-[#10b981]/25 text-[#4edea3] border-[#10b981]/50'
                      : 'bg-[#1c2023] hover:bg-[#262a2e] text-[#64748B] hover:text-[#4edea3] border-white/5'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">swap_horiz</span>
                </button>
              </div>

              {/* Specs Matrix */}
              <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-[#181c1f] font-label-sm border border-white/5">
                <div className="flex flex-col">
                  <span className="text-[#64748B] text-[11px]">{product.specs.label1}</span>
                  <span className="text-[#4edea3] font-semibold font-mono">{product.specs.value1}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#64748B] text-[11px]">{product.specs.label2}</span>
                  <span className="text-[#F8FAFC] font-semibold font-mono">{product.specs.value2}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#64748B] text-[11px]">{product.specs.label3}</span>
                  <span className="text-[#F8FAFC] font-mono">{product.specs.value3}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#64748B] text-[11px]">{product.specs.label4}</span>
                  <span className="text-[#ffb95f] font-semibold font-mono">{product.specs.value4}</span>
                </div>
              </div>

              {/* Verified Pill */}
              <div className="flex items-center justify-between text-[#64748B] font-label-sm">
                <div className="flex items-center gap-1.5 text-[#4edea3]">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>{product.discomApproval}</span>
                </div>
                <span>Dispatch &lt; 24h</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1 border-t border-white/[0.06]">
                <button
                  onClick={() => setViewingDatasheet(product)}
                  className="flex-1 py-2.5 rounded-xl bg-[#262a2e] hover:bg-[#313539] text-[#F8FAFC] font-label-md font-medium flex items-center justify-center gap-1.5 transition-colors border border-white/5"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#64748B]">description</span>
                  <span>Datasheet</span>
                </button>

                {product.priceNumeric > 0 ? (
                  <button
                    onClick={() => {
                      onAddToSystem(product);
                      showToast(`${product.name.split(' ')[0]} added to Bill of Materials`);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-[#10b981] hover:bg-[#4edea3] text-[#003824] font-label-md font-semibold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">add_circle</span>
                    <span>Add to System</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onRequestQuote(product.name)}
                    className="flex-1 py-2.5 rounded-xl bg-[#ee9800] hover:brightness-110 text-[#5b3800] font-label-md font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">calculate</span>
                    <span>Request Quote</span>
                  </button>
                )}
              </div>
            </article>
          );
        })}

        {filteredProducts.length === 0 && (
          <div className="px-6 py-12 text-center flex flex-col items-center justify-center bg-[#181c1f] rounded-2xl border border-white/5">
            <div className="w-16 h-16 rounded-full bg-[#262a2e] flex items-center justify-center text-[#64748B] mb-3">
              <span className="material-symbols-outlined text-[32px]">manage_search</span>
            </div>
            <h3 className="font-headline-sm text-[#F8FAFC] font-bold">No Hardware Matches Found</h3>
            <p className="font-body-sm text-[#94A3B8] mt-1 max-w-xs">
              Try searching for brands like Waaree, Tata, Growatt, or reset category filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedBrand(null);
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#10b981] text-[#00422b] font-label-md font-semibold"
              type="button"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* EPC Authenticity Guarantee Banner */}
      <div className="mx-4 mt-6 p-4 rounded-2xl bg-[#181c1f] shadow-lg border border-white/5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#10b981]/10 text-[#4edea3] flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#10b981]/20">
            <span className="material-symbols-outlined text-[24px]">verified</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-[#F8FAFC] font-semibold">
              100% Genuine Distributor Sourced
            </span>
            <p className="font-body-sm text-[#94A3B8] mt-1 leading-relaxed">
              Adishakti Solar sources exclusively through direct OEM partnerships. All PV modules and inverters are scanned and registered via serial number barcode for hassle-free 25-30 year manufacturer warranty claims in Odisha.
            </p>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1 font-label-sm text-[#4edea3]">
                <span className="material-symbols-outlined text-[16px]">qr_code_scanner</span>
                <span>QR Verified</span>
              </div>
              <div className="flex items-center gap-1 font-label-sm text-[#ffb95f]">
                <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                <span>Official GST Invoices</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Floating Sticky Bar: System Builder & Comparison Quick Dock */}
      {(compareItems.length > 0 || systemBuilderCount > 0) && (
        <div className="fixed bottom-20 inset-x-0 z-30 px-4 pointer-events-none">
          <div className="max-w-lg mx-auto p-3 rounded-2xl bg-[#12181F]/90 backdrop-blur-2xl shadow-2xl flex items-center justify-between pointer-events-auto border border-white/[0.12]">
            <div className="flex items-center gap-2.5 min-w-0 pr-2">
              <div className="w-9 h-9 rounded-xl bg-[#10b981] text-[#00422b] flex items-center justify-center flex-shrink-0 font-label-md font-bold">
                {compareItems.length > 0 ? compareItems.length : systemBuilderCount}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-[#4edea3] font-bold uppercase tracking-wider">
                  {compareItems.length > 0
                    ? `${compareItems.length} Products Staged`
                    : `${systemBuilderCount} Items in System BOM`}
                </span>
                <span className="font-body-sm text-[#F8FAFC] truncate text-xs">
                  {compareItems.length > 0
                    ? compareItems.map((i) => i.name.split(' ')[0]).join(' vs ')
                    : 'Custom Solar Architecture'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              {compareItems.length > 0 && (
                <button
                  onClick={() => setIsCompareModalOpen(true)}
                  className="px-3 py-2 rounded-xl bg-[#262a2e] hover:bg-[#313539] text-[#F8FAFC] font-label-md font-semibold transition-colors flex items-center gap-1 border border-white/5"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">compare</span>
                  <span>Compare</span>
                </button>
              )}

              {systemBuilderCount > 0 && (
                <button
                  onClick={onOpenSystemBuilder}
                  className="px-3 py-2 rounded-xl bg-[#10b981]/20 text-[#4edea3] font-label-md font-semibold hover:bg-[#10b981]/30 transition-colors flex items-center gap-1 border border-[#10b981]/30"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">build</span>
                  <span>BOM ({systemBuilderCount})</span>
                </button>
              )}

              <a
                className="px-3.5 py-2 rounded-xl bg-[#ee9800] hover:brightness-110 text-[#5b3800] font-label-md font-bold transition-all flex items-center gap-1 shadow-md"
                href="tel:+917894012345"
              >
                <span className="material-symbols-outlined text-[18px]">request_quote</span>
                <span>Bulk EPC</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Datasheet Modal */}
      <DatasheetModal product={viewingDatasheet} onClose={() => setViewingDatasheet(null)} />

      {/* Comparison Modal */}
      <ComparisonModal
        items={compareItems}
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        onRemoveItem={(id) => setCompareItems((prev) => prev.filter((p) => p.id !== id))}
        onClearAll={() => {
          setCompareItems([]);
          setIsCompareModalOpen(false);
          showToast('Comparison cleared');
        }}
      />

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-[#262a2e]/95 backdrop-blur-xl text-[#F8FAFC] font-label-md flex items-center gap-2 shadow-2xl border border-white/10 animate-fade-in">
          <span className="material-symbols-outlined text-[#4edea3] text-[18px]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
