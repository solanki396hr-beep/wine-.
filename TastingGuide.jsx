import React, { useState } from 'react';
import { 
  Eye, 
  RotateCw, 
  Wind, 
  Sparkles, 
  GlassWater, 
  CheckCircle2, 
  Award,
  Thermometer
} from 'lucide-react';
import { TASTING_STEPS } from '../data/wines';

export const TastingGuide = () => {
  const [activeStep, setActiveStep] = useState(0);

  const stepIcons = [Eye, RotateCw, Wind, GlassWater];

  const tips = [
    {
      title: 'Decanting Vintage Reds',
      desc: 'Wines aged 10+ years benefit from 45 minutes in a crystal decanter to separate delicate sediments and open tight tertiary aromas.'
    },
    {
      title: 'Glassware Matters',
      desc: 'Use wide-bowled Bordeaux glasses for Cabernet and Nebbiolo to let tannins soften, and tapered flute glasses for Champagne to concentrate bubbles.'
    },
    {
      title: 'Temperature Precision',
      desc: 'Serving red wine at room temperature (often 22°C+) makes alcohol burn forward. Keep fine reds at 16°-18°C for ideal aromatic lift.'
    }
  ];

  return (
    <section id="tasting-guide" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5" /> Master Sommelier Masterclass
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-100">
          The Art of Tasting Fine Wine
        </h2>
        <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
          Unlock the complex layers woven into every grand cru vintage. Follow the four timeless rituals practiced by court sommeliers worldwide.
        </p>
      </div>

      {/* 4 Interactive Tasting Steps */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
        {TASTING_STEPS.map((step, idx) => {
          const Icon = stepIcons[idx] || Sparkles;
          const isSelected = activeStep === idx;

          return (
            <div
              key={step.step}
              onClick={() => setActiveStep(idx)}
              className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between border ${
                isSelected
                  ? 'bg-gradient-to-b from-wine-900/60 to-cellar-900 border-gold-500 shadow-xl shadow-wine-950/60 -translate-y-2'
                  : 'bg-cellar-900/60 border-stone-800/80 hover:border-gold-500/30 hover:bg-cellar-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-2xl font-bold text-gold-400">
                    {step.step}
                  </span>
                  <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-gold-500 text-wine-950' : 'bg-stone-800 text-stone-400'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-serif text-xl font-bold text-stone-100 mb-2">
                  {step.title}
                </h3>

                <p className="text-xs text-stone-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-800/60 flex items-center justify-between text-[11px]">
                <span className={isSelected ? 'text-gold-400 font-semibold' : 'text-stone-500'}>
                  {isSelected ? 'Active Ritual Focus' : 'Click to highlight'}
                </span>
                {isSelected && <CheckCircle2 className="w-4 h-4 text-gold-400" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sommelier Pro Advice Strip */}
      <div className="rounded-3xl glass-panel p-8 border border-gold-500/25">
        <h4 className="font-serif text-2xl font-bold text-stone-100 mb-6 flex items-center gap-2">
          <Thermometer className="w-6 h-6 text-gold-400" />
          <span>Cellar Secrets for Peak Tasting Experience</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tips.map((tip, i) => (
            <div key={i} className="p-4 rounded-xl bg-cellar-900/80 border border-stone-800/80 space-y-2">
              <h5 className="font-serif text-base font-bold text-gold-300">
                {tip.title}
              </h5>
              <p className="text-xs text-stone-400 leading-relaxed">
                {tip.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

