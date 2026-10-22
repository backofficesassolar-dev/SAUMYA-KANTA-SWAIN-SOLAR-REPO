import React, { useState } from 'react';
import { ScreenType, ProductItem, SurveyBooking } from './types';
import { Header } from './components/Header';
import { NavigationDrawer } from './components/NavigationDrawer';
import { BottomNav } from './components/BottomNav';
import { SystemBuilderModal } from './components/SystemBuilderModal';
import { HomeTelemetryScreen } from './screens/HomeTelemetryScreen';
import { SolarCalculatorScreen } from './screens/SolarCalculatorScreen';
import { ProductCatalogScreen } from './screens/ProductCatalogScreen';
import { SiteSurveyBookingScreen } from './screens/SiteSurveyBookingScreen';
import { TrackProjectScreen } from './screens/TrackProjectScreen';
import { CustomerPortalScreen } from './screens/CustomerPortalScreen';
import { SubsidyInfoScreen } from './screens/SubsidyInfoScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [surveyEstimate, setSurveyEstimate] = useState<{
    capacity: string;
    district: string;
    systemType: string;
    bill: number;
  } | null>(null);

  // System Builder Bill of Materials
  const [systemBom, setSystemBom] = useState<{ product: ProductItem; quantity: number }[]>([]);
  const [isBomModalOpen, setIsBomModalOpen] = useState<boolean>(false);

  // User Bookings
  const [userBookings, setUserBookings] = useState<SurveyBooking[]>([]);

  // Quote Request Modal
  const [quoteItem, setQuoteItem] = useState<string | null>(null);
  const [quoteSubmitted, setQuoteSubmitted] = useState<boolean>(false);

  const handleNavigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToSystem = (product: ProductItem) => {
    setSystemBom((prev) => {
      const idx = prev.findIndex((item) => item.product.id === product.id);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx].quantity += 1;
        return copy;
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateBomQuantity = (id: string, delta: number) => {
    setSystemBom((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === id) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as { product: ProductItem; quantity: number }[];
    });
  };

  const handleRemoveBomItem = (id: string) => {
    setSystemBom((prev) => prev.filter((item) => item.product.id !== id));
  };

  const handleAddBooking = (booking: SurveyBooking) => {
    setUserBookings((prev) => [booking, ...prev]);
  };

  return (
    <div className="bg-[#0B0F12] text-[#e0e3e7] min-h-screen flex flex-col relative selection:bg-[#10b981] selection:text-[#003824]">
      {/* Top Header */}
      <Header
        currentScreen={currentScreen}
        onOpenMenu={() => setIsDrawerOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Navigation Drawer */}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        currentScreen={currentScreen}
        onClose={() => setIsDrawerOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Main Content View with Top Padding for Fixed Header */}
      <main className="flex-1 w-full pt-20">
        {currentScreen === 'home' && (
          <HomeTelemetryScreen
            onNavigate={handleNavigate}
            onRequestQuote={(name) => setQuoteItem(name)}
          />
        )}

        {currentScreen === 'calculator' && (
          <SolarCalculatorScreen
            onNavigate={handleNavigate}
            onSetSurveyEstimate={(est) => setSurveyEstimate(est)}
          />
        )}

        {currentScreen === 'catalog' && (
          <ProductCatalogScreen
            onAddToSystem={handleAddToSystem}
            onRequestQuote={(name) => setQuoteItem(name)}
            onOpenSystemBuilder={() => setIsBomModalOpen(true)}
            systemBuilderCount={systemBom.reduce((sum, item) => sum + item.quantity, 0)}
          />
        )}

        {currentScreen === 'survey' && (
          <SiteSurveyBookingScreen
            initialEstimate={surveyEstimate}
            onNavigate={handleNavigate}
            onAddBooking={handleAddBooking}
          />
        )}

        {currentScreen === 'track' && (
          <TrackProjectScreen
            userBookings={userBookings}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'portal' && (
          <CustomerPortalScreen onNavigate={handleNavigate} />
        )}

        {currentScreen === 'subsidy' && (
          <SubsidyInfoScreen onNavigate={handleNavigate} />
        )}
      </main>

      {/* Persistent Bottom Tab Navigation */}
      <BottomNav
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
      />

      {/* System Builder Bill of Materials Modal */}
      <SystemBuilderModal
        items={systemBom}
        isOpen={isBomModalOpen}
        onClose={() => setIsBomModalOpen(false)}
        onUpdateQuantity={handleUpdateBomQuantity}
        onRemoveItem={handleRemoveBomItem}
        onBookSurveyWithSystem={() => {
          setIsBomModalOpen(false);
          handleNavigate('survey');
        }}
      />

      {/* Request Quote Modal */}
      {quoteItem && (
        <div className="fixed inset-0 z-50 bg-[#0B0F12]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl bg-[#12181F] p-6 space-y-4 shadow-2xl border border-white/10">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <div className="flex items-center gap-2 text-[#ffb95f]">
                <span className="material-symbols-outlined text-[22px]">request_quote</span>
                <h3 className="font-headline-sm text-[#F8FAFC]">Direct OEM Quote</h3>
              </div>
              <button
                onClick={() => {
                  setQuoteItem(null);
                  setQuoteSubmitted(false);
                }}
                className="w-8 h-8 rounded-full bg-[#262a2e] flex items-center justify-center text-[#94A3B8]"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {quoteSubmitted ? (
              <div className="text-center py-4 space-y-2">
                <span className="material-symbols-outlined text-[36px] text-[#4edea3]">check_circle</span>
                <h4 className="font-headline-sm text-[#F8FAFC]">Quotation Dispatched</h4>
                <p className="font-body-sm text-xs text-[#94A3B8]">
                  Our Odisha regional distributor representative will call you within 2 hours with project pricing and GST clearance.
                </p>
                <button
                  onClick={() => {
                    setQuoteItem(null);
                    setQuoteSubmitted(false);
                  }}
                  className="mt-2 w-full py-2.5 rounded-xl bg-[#10b981] text-[#00422b] font-label-md font-bold"
                  type="button"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setQuoteSubmitted(true);
                }}
                className="space-y-3"
              >
                <div>
                  <span className="font-label-sm text-[#64748B] block">Product Selected</span>
                  <span className="font-body-sm text-[#4edea3] font-semibold">{quoteItem}</span>
                </div>

                <div className="space-y-1">
                  <label className="font-label-sm text-[#94A3B8]">Contact Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Soumya Mohapatra"
                    className="w-full bg-[#0B0F12] text-[#F8FAFC] font-body-sm px-3 py-2.5 rounded-lg border border-white/5 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-label-sm text-[#94A3B8]">WhatsApp / Phone Number</label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="78940 12345"
                    className="w-full bg-[#0B0F12] text-[#F8FAFC] font-body-sm px-3 py-2.5 rounded-lg border border-white/5 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-label-sm text-[#94A3B8]">Odisha District</label>
                  <select className="w-full bg-[#0B0F12] text-[#F8FAFC] font-body-sm px-3 py-2.5 rounded-lg border border-white/5 outline-none">
                    <option>Bhubaneswar / Khordha</option>
                    <option>Cuttack</option>
                    <option>Puri</option>
                    <option>Balasore</option>
                    <option>Sambalpur</option>
                    <option>Other Odisha District</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#10b981] text-[#00422b] font-label-md font-bold hover:bg-[#4edea3] transition-colors shadow-md mt-2"
                >
                  Request Official Pricing
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
