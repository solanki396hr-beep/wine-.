import React from 'react';
import { 
  Sparkles, 
  Check, 
  Wine, 
  Award, 
  ShieldCheck, 
  Crown 
} from 'lucide-react';
import { CLUB_TIERS } from '../data/wines';
import { useShop } from '../context/ShopContext';

export const WineClub = () => {
  const { showToast } = useShop();

  const handleJoin = (tierName) => {
    showToast(`Welcome to ${tierName}! Your inaugural allocation is being prepared.`, 'success');
  };

  return (
    <section id="wine-club" className="py-20 bg-cellar-950/70 border-t border-stone-800/80 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-wine-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-gold-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider">
            <Crown className="w-3.5 h-3.5" /> Private Member Allocations
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-100">
            The Connoisseur’s Society
          </h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            Gain preferential allocation access to limited library releases, en-primeur futures, and private estate bottlings never released to the commercial market.
          </p>
        </div>

        {/* Membership Tiers Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {CLUB_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 glass-panel ${
                tier.popular
                  ? 'border-gold-500/60 shadow-2xl shadow-wine-900/40 md:-translate-y-3 bg-gradient-to-b from-cellar-900 via-wine-950/40 to-cellar-900'
                  : 'border-stone-800 hover:border-gold-500/30 hover:-translate-y-1'
              }`}
            >
              {/* Most Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold-500 text-wine-950 text-xs font-extrabold uppercase tracking-widest shadow-md">
                  Most Coveted Allocation
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-stone-100">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1 min-h-[36px]">
                    {tier.description}
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1.5 pb-4 border-b border-stone-800">
                  <span className="font-serif text-4xl sm:text-5xl font-bold text-gold-400">
                    ${tier.price}
                  </span>
                  <span className="text-xs text-stone-400 font-medium">
                    / {tier.frequency}
                  </span>
                </div>

                {/* Bottles count pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-200">
                  <Wine className="w-3.5 h-3.5 text-gold-400" />
                  <span><strong>{tier.bottles} Curated Bottles</strong> per delivery</span>
                </div>

                {/* Perks list */}
                <div className="space-y-3 pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                    Included Benefits:
                  </span>
                  {tier.perks.map((perk, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-stone-300">
                      <div className="w-4 h-4 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="leading-tight">{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-8">
                <button
                  onClick={() => handleJoin(tier.name)}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    tier.popular
                      ? 'bg-gold-500 hover:bg-gold-400 text-wine-950 shadow-lg shadow-gold-500/20'
                      : 'bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Request Membership</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Member Guarantee Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-cellar-900 border border-stone-800/80 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-around gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-gold-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-stone-200">No Commitments</p>
              <p className="text-[11px] text-stone-400">Pause, skip, or cancel any time with 1-click</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-gold-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-stone-200">Sommelier Guarantee</p>
              <p className="text-[11px] text-stone-400">If a bottle doesn't delight you, we replace it instantly</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

