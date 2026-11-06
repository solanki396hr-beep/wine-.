import React, { useState } from 'react';
import { 
  Wine, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer = () => {
  const { showToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    showToast('Inaugural cellar voucher dispatched! Use code CHEERS10 at checkout.');
  };

  return (
    <footer className="bg-cellar-950 border-t border-stone-800/80 text-stone-400 text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter Strip */}
        <div className="rounded-3xl glass-panel p-8 sm:p-10 border border-gold-500/25 mb-16 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Sommelier Gazette
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100">
                Join The Collector’s Circle
              </h3>
              <p className="text-stone-300 text-sm max-w-xl">
                Subscribe for private allocations, barrel release previews, and receive <strong className="text-gold-300">10% off</strong> your inaugural order with promo code <strong className="text-gold-300">CHEERS10</strong>.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="p-4 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-300 flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0" />
                  <span>Welcome to the Circle! Check your inbox for exclusive allocation invites.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 bg-stone-900 border border-stone-800 rounded-xl px-4 py-3 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-gold-400"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-wine-950 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-wine-900 border border-gold-500/40 flex items-center justify-center">
                <Wine className="w-5 h-5 text-gold-400" />
              </div>
              <span className="font-serif text-xl font-bold tracking-wider gold-gradient-text">
                CHÂTEAU GRAND CRU
              </span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
              Purveyors of verified grand crus, rare estate museum vintages, and bespoke cellar collections since 1892. Temperature-controlled transit across the United States and Europe.
            </p>
            <div className="pt-2 space-y-1.5 text-stone-300">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Cellar Vaults: 840 Vineyard Lane, Napa Valley & Bordeaux</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Sommelier Concierge: +1 (800) 946-3772</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-stone-100 uppercase tracking-wider">
              The Cellars
            </h4>
            <ul className="space-y-2">
              <li><a href="#cellar-catalog" className="hover:text-gold-400 transition-colors">Premier Grand Crus</a></li>
              <li><a href="#cellar-catalog" className="hover:text-gold-400 transition-colors">Napa Valley Icons</a></li>
              <li><a href="#cellar-catalog" className="hover:text-gold-400 transition-colors">Prestige Champagnes</a></li>
              <li><a href="#cellar-catalog" className="hover:text-gold-400 transition-colors">Super Tuscans</a></li>
              <li><a href="#cellar-catalog" className="hover:text-gold-400 transition-colors">Aged Vintage Port</a></li>
            </ul>
          </div>

          {/* Sommelier & Club */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-stone-100 uppercase tracking-wider">
              Membership
            </h4>
            <ul className="space-y-2">
              <li><a href="#wine-club" className="hover:text-gold-400 transition-colors">Connoisseur Club Tiers</a></li>
              <li><a href="#tasting-guide" className="hover:text-gold-400 transition-colors">Sommelier Tasting Masterclass</a></li>
              <li><span className="hover:text-gold-400 transition-colors cursor-pointer">Private Cellar Advisory</span></li>
              <li><span className="hover:text-gold-400 transition-colors cursor-pointer">Bespoke Gifting & Wooden Crates</span></li>
              <li><span className="hover:text-gold-400 transition-colors cursor-pointer">Corporate Entertaining</span></li>
            </ul>
          </div>

          {/* Trust & Guarantee */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-stone-100 uppercase tracking-wider">
              Our Standard
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li className="flex items-center gap-1.5 text-stone-300">
                <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
                <span>100% Provenance Guarantee</span>
              </li>
              <li className="flex items-center gap-1.5 text-stone-300">
                <Award className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Sommelier Inspected</span>
              </li>
              <li><span>14°C Controlled Courier</span></li>
              <li><span>Direct Estate En Primeur</span></li>
              <li><span>Climate Neutral Packaging</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Responsible Drinking Statement */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-stone-500 text-center md:text-left">
          <p>
            © {new Date().getFullYear()} Château Grand Cru LLC. All rights reserved. Fine Wine Curators & Merchants.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-stone-400">
            <span>Alcoholic beverages may only be sold and delivered to individuals 21 years of age or older.</span>
            <span className="text-stone-600">|</span>
            <span className="hover:text-stone-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-stone-300 cursor-pointer">Terms of Cellar Sale</span>
            <span className="hover:text-stone-300 cursor-pointer">Responsible Consumption</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

