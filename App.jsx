import React, { useState } from 'react';
import { ShopProvider } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WineGrid } from './components/WineGrid';
import { SommelierQuiz } from './components/SommelierQuiz';
import { WineClub } from './components/WineClub';
import { TastingGuide } from './components/TastingGuide';
import { WineDetailModal } from './components/WineDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistModal } from './components/WishlistModal';
import { AgeVerificationModal } from './components/AgeVerificationModal';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

function WineApp() {
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cellar-950 text-stone-100 flex flex-col font-sans selection:bg-gold-500 selection:text-wine-950">
      {/* Age Verification Gate (21+) */}
      <AgeVerificationModal />

      {/* Navigation Header */}
      <Navbar onOpenWishlist={() => setIsWishlistOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Luxury Hero Banner with Spotlight bottle */}
        <Hero />

        {/* Fine Wine Catalog & Interactive Filters */}
        <WineGrid />

        {/* Sommelier Tasting Rituals & Guide */}
        <TastingGuide />

        {/* Private Wine Club Membership Tiers */}
        <WineClub />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals, Drawers & Overlays */}
      <SommelierQuiz />
      <WineDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <WishlistModal isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <WineApp />
    </ShopProvider>
  );
}

