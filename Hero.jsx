import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Award, 
  ThermometerSnowflake, 
  ShieldCheck, 
  Wine, 
  Star 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { WINES } from '../data/wines';

export const Hero = () => {
  const { addToCart, setSelectedWine, setIsQuizOpen } = useShop();
  const spotlightWine = WINES[0]; // Château Margaux

  const scrollToCatalog = () => {
    const el = document.getElementById('cellar-catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-20 md:py-24 wine-gradient-bg border-b border-wine-900/40">
      {/* Background ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-wine-800/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-gold-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline and Call-to-actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs tracking-wider uppercase font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Historic 2015 Bordeaux Allocations Now Open</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold text-stone-100 tracking-tight leading-[1.12]">
              Crafted by Nature. <br />
              <span className="gold-gradient-text italic font-serif">
                Perfected by Time.
              </span>
            </h1>

            <p className="text-stone-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              Curated fine wines from premier châteaux and boutique estates across Bordeaux, Tuscany, Napa Valley, and beyond. Stored in climate-controlled cellars and dispatched under verified refrigerated transit.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={scrollToCatalog}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-wine-950 font-bold tracking-wide transition-all shadow-xl shadow-gold-500/20 hover:scale-105 flex items-center justify-center gap-2.5"
              >
                <span>Explore The Cellar</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsQuizOpen(true)}
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-wine-950/70 hover:bg-wine-900 text-stone-200 border border-gold-500/30 hover:border-gold-500 font-medium tracking-wide transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span>Sommelier Flavor Match</span>
              </button>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-stone-800/80">
              <div className="flex items-center gap-2.5 text-stone-300">
                <ThermometerSnowflake className="w-5 h-5 text-gold-400 shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-semibold text-stone-200">14°C Controlled</p>
                  <p className="text-[11px] text-stone-400">Refrigerated courier</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-stone-300">
                <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-semibold text-stone-200">100% Provenance</p>
                  <p className="text-[11px] text-stone-400">Direct estate cellar</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-stone-300 col-span-2 sm:col-span-1">
                <Award className="w-5 h-5 text-gold-400 shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-semibold text-stone-200">95+ Point Icons</p>
                  <p className="text-[11px] text-stone-400">Parker & Decanter</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Spotlight Wine Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              
              {/* Decorative vintage frame backdrop */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-gold-500/30 via-wine-700/40 to-gold-600/30 blur-md opacity-75" />

              <div className="relative rounded-2xl glass-panel p-6 border border-gold-500/30 overflow-hidden shadow-2xl">
                {/* Header ribbon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-wine-900/80 border border-gold-500/40 text-gold-300 text-xs font-semibold tracking-wider uppercase">
                    Cellar Spotlight
                  </span>
                  <div className="flex items-center gap-1 bg-gold-500/20 px-2.5 py-1 rounded-full border border-gold-500/30">
                    <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                    <span className="text-xs font-bold text-gold-200">{spotlightWine.criticScore.points} Pts</span>
                    <span className="text-[10px] text-stone-400">({spotlightWine.criticScore.source})</span>
                  </div>
                </div>

                {/* Bottle imagery with hover lighting */}
                <div 
                  className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedWine(spotlightWine)}
                >
                  <img
                    src={spotlightWine.image}
                    alt={spotlightWine.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cellar-950 via-transparent to-transparent opacity-85" />
                  
                  <div className="absolute bottom-3 left-4 right-4">
                    <p className="text-xs uppercase tracking-widest text-gold-400 font-semibold">
                      {spotlightWine.region} • {spotlightWine.vintage}
                    </p>
                    <h3 className="font-serif text-xl font-bold text-white leading-tight">
                      {spotlightWine.name}
                    </h3>
                  </div>
                </div>

                {/* Wine specs summary */}
                <div className="mt-4 pt-4 border-t border-stone-800 space-y-3">
                  <div className="flex justify-between items-center text-xs text-stone-400">
                    <span>Varietal: <strong className="text-stone-200">{spotlightWine.varietal}</strong></span>
                    <span>ABV: <strong className="text-stone-200">{spotlightWine.abv}</strong></span>
                  </div>

                  {/* Tasting notes chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {spotlightWine.tastingNotes.aroma.map((aroma, i) => (
                      <span key={i} className="text-[11px] bg-wine-950/80 text-stone-300 px-2.5 py-0.5 rounded-full border border-stone-800">
                        {aroma}
                      </span>
                    ))}
                  </div>

                  {/* Pricing and Action */}
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gold-400 font-serif">
                          ${spotlightWine.price}
                        </span>
                        <span className="text-xs text-stone-500 line-through">
                          ${spotlightWine.originalPrice}
                        </span>
                      </div>
                      <p className="text-[11px] text-emerald-400 font-medium">
                        Only {spotlightWine.inStock} bottles remaining
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedWine(spotlightWine)}
                        className="px-3 py-2 text-xs text-stone-300 hover:text-white border border-stone-700 rounded-lg transition-colors hover:bg-stone-800/60"
                      >
                        Tasting Notes
                      </button>
                      <button
                        onClick={() => addToCart(spotlightWine, 1)}
                        className="px-4 py-2 text-xs font-bold rounded-lg bg-gold-500 hover:bg-gold-400 text-wine-950 transition-all shadow-md hover:shadow-gold-500/20"
                      >
                        Acquire Bottle
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

