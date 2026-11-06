import React, { useState } from 'react';
import { 
  Wine, 
  ShoppingBag, 
  Heart, 
  Search, 
  Sparkles, 
  Menu, 
  X, 
  Compass, 
  ShieldCheck,
  Award
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Navbar = ({ onOpenWishlist }) => {
  const { 
    cartItemCount, 
    setIsCartOpen, 
    wishlist, 
    searchQuery, 
    setSearchQuery, 
    setIsQuizOpen,
    isAgeVerified 
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-cellar-950/90 backdrop-blur-md border-b border-gold-500/15">
      {/* Top micro banner */}
      <div className="bg-wine-950 border-b border-wine-800/40 text-xs py-1.5 px-4 text-center text-stone-300 flex items-center justify-center gap-4">
        <span className="flex items-center gap-1.5 text-gold-400 font-medium">
          <Award className="w-3.5 h-3.5" /> 100% Guaranteed Provenance & Temperature-Controlled Courier
        </span>
        <span className="hidden md:inline text-stone-500">|</span>
        <span className="hidden md:inline text-stone-400">
          Complimentary shipping on orders over $200 with code <strong className="text-gold-300">CHEERS10</strong>
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-wine-900 to-wine-950 border border-gold-500/40 flex items-center justify-center shadow-lg shadow-wine-950/80">
              <Wine className="w-6 h-6 text-gold-400" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider gold-gradient-text block leading-none">
                CHÂTEAU GRAND CRU
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 block mt-1 font-sans">
                Fine Wines & Rare Vintages
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide">
            <button 
              onClick={() => scrollToSection('cellar-catalog')}
              className="text-stone-300 hover:text-gold-400 transition-colors"
            >
              The Cellar
            </button>
            <button 
              onClick={() => setIsQuizOpen(true)}
              className="flex items-center gap-1.5 text-gold-300 hover:text-gold-200 transition-colors px-2.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/20"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              Sommelier Match
            </button>
            <button 
              onClick={() => scrollToSection('wine-club')}
              className="text-stone-300 hover:text-gold-400 transition-colors"
            >
              Wine Club
            </button>
            <button 
              onClick={() => scrollToSection('tasting-guide')}
              className="text-stone-300 hover:text-gold-400 transition-colors"
            >
              Tasting Art
            </button>
          </nav>

          {/* Action Tools: Search, Wishlist, Cart */}
          <div className="flex items-center gap-3">
            {/* Search Bar / Toggle */}
            <div className="relative">
              {showSearchInput ? (
                <div className="flex items-center bg-cellar-900 border border-gold-500/40 rounded-full px-3 py-1.5 w-48 sm:w-64 transition-all">
                  <Search className="w-4 h-4 text-gold-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search wine, vintage, region..."
                    autoFocus
                    className="bg-transparent text-xs text-stone-200 placeholder-stone-500 focus:outline-none w-full"
                  />
                  <button 
                    onClick={() => { setShowSearchInput(false); setSearchQuery(''); }}
                    className="text-stone-400 hover:text-stone-200"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearchInput(true)}
                  aria-label="Search Wines"
                  className="p-2.5 text-stone-300 hover:text-gold-400 hover:bg-wine-950/60 rounded-full transition-colors border border-transparent hover:border-gold-500/20"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              aria-label="View Wishlist"
              className="relative p-2.5 text-stone-300 hover:text-gold-400 hover:bg-wine-950/60 rounded-full transition-colors border border-transparent hover:border-gold-500/20"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-wine-700 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-gold-400">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Cart"
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-wine-900 to-wine-800 hover:from-wine-800 hover:to-wine-700 text-stone-100 border border-gold-500/30 transition-all shadow-md group"
            >
              <ShoppingBag className="w-4 h-4 text-gold-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold hidden sm:inline">Cellar</span>
              <span className="bg-gold-500 text-wine-950 text-xs font-bold px-1.5 py-0.2 rounded-full min-w-[20px] text-center">
                {cartItemCount}
              </span>
            </button>

            {/* Age Verified Status Indicator */}
            {isAgeVerified && (
              <span className="hidden xl:flex items-center gap-1 text-[11px] text-emerald-400/90 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full" title="Age Verified 21+">
                <ShieldCheck className="w-3 h-3" /> 21+ Verified
              </span>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cellar-950 border-b border-gold-500/20 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="space-y-3">
            <button
              onClick={() => scrollToSection('cellar-catalog')}
              className="block w-full text-left py-2 text-base text-stone-200 hover:text-gold-400 border-b border-stone-800/60"
            >
              The Cellar Catalog
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); setIsQuizOpen(true); }}
              className="block w-full text-left py-2 text-base text-gold-300 hover:text-gold-200 border-b border-stone-800/60 font-medium"
            >
              Sommelier Wine Match Quiz
            </button>
            <button
              onClick={() => scrollToSection('wine-club')}
              className="block w-full text-left py-2 text-base text-stone-200 hover:text-gold-400 border-b border-stone-800/60"
            >
              Wine Club Memberships
            </button>
            <button
              onClick={() => scrollToSection('tasting-guide')}
              className="block w-full text-left py-2 text-base text-stone-200 hover:text-gold-400"
            >
              The Art of Tasting
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

