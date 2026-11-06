import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Wine, 
  UtensilsCrossed, 
  Flame, 
  Check, 
  ArrowRight, 
  RotateCcw,
  Award
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { WINES } from '../data/wines';

export const SommelierQuiz = () => {
  const { isQuizOpen, setIsQuizOpen, addToCart, setSelectedWine } = useShop();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [occasion, setOccasion] = useState('');
  const [food, setFood] = useState('');
  const [flavor, setFlavor] = useState('');
  const [recommendation, setRecommendation] = useState(null);

  if (!isQuizOpen) return null;

  const occasions = [
    { id: 'collector', label: 'Cellar Investment / Rare Gift', desc: 'Prestige, age-worthy icons' },
    { id: 'romantic', label: 'Intimate Dinner / Date Night', desc: 'Velvety, aromatic reds or grand crus' },
    { id: 'celebration', label: 'Milestone Celebration', desc: 'Champagne, vibrant bubbles & sparkles' },
    { id: 'casual', label: 'Relaxed Evening with Friends', desc: 'Approachable, expressive & lively' }
  ];

  const foods = [
    { id: 'steak', label: 'Prime Ribeye, Wagyu, or Lamb', icon: '🥩' },
    { id: 'seafood', label: 'Fresh Oysters, Turbot, or Scallops', icon: '🦪' },
    { id: 'cheese', label: 'Artisanal Cheeses & Charcuterie', icon: '🧀' },
    { id: 'dessert', label: 'Dark Chocolate or Fruit Tarts', icon: '🍫' },
    { id: 'standalone', label: 'Enjoying on its own (Aperitif)', icon: '🍷' }
  ];

  const flavors = [
    { id: 'bold', label: 'Bold, deep tannins & dark berries', matchType: 'Red' },
    { id: 'crisp', label: 'Crisp, flinty, high-toned minerality', matchType: 'White' },
    { id: 'bubbly', label: 'Fine effervescence, toasted brioche', matchType: 'Sparkling' },
    { id: 'rich-sweet', label: 'Honeyed, nectarous & caramelized', matchType: 'Dessert' }
  ];

  const handleNext = () => {
    if (currentStep === 1 && occasion) {
      setCurrentStep(2);
    } else if (currentStep === 2 && food) {
      setCurrentStep(3);
    } else if (currentStep === 3 && flavor) {
      // Compute recommendation
      calculateRecommendation();
      setCurrentStep(4);
    }
  };

  const calculateRecommendation = () => {
    let match = null;

    if (flavor === 'bubbly' || occasion === 'celebration') {
      match = WINES.find(w => w.type === 'Sparkling') || WINES[2];
    } else if (flavor === 'rich-sweet' || food === 'dessert') {
      match = WINES.find(w => w.type === 'Dessert') || WINES[9];
    } else if (food === 'steak' || flavor === 'bold') {
      match = occasion === 'collector' ? WINES[0] : WINES[1];
    } else if (food === 'seafood' || flavor === 'crisp') {
      match = WINES.find(w => w.type === 'White') || WINES[3];
    } else {
      match = WINES[4] || WINES[0];
    }

    setRecommendation(match);
  };

  const resetQuiz = () => {
    setCurrentStep(1);
    setOccasion('');
    setFood('');
    setFlavor('');
    setRecommendation(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl glass-panel rounded-3xl p-6 sm:p-8 border border-gold-500/30 shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setIsQuizOpen(false)}
          className="absolute top-5 right-5 p-2 text-stone-400 hover:text-white rounded-full bg-stone-900/60 border border-stone-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Sommelier AI Match
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100">
            {currentStep < 4 ? 'Discover Your Perfect Vintage' : 'Your Sommelier Recommendation'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            {currentStep < 4 ? `Step ${currentStep} of 3` : 'Tailored exclusively to your palate & moment'}
          </p>
        </div>

        {/* Step Progress Bar */}
        {currentStep < 4 && (
          <div className="w-full bg-stone-800 h-1.5 rounded-full mb-6 overflow-hidden">
            <div 
              className="bg-gold-500 h-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        )}

        {/* STEP 1: OCCASION */}
        {currentStep === 1 && (
          <div className="space-y-3">
            <label className="text-sm font-medium text-stone-300 block mb-2">
              What is the grand occasion?
            </label>
            {occasions.map(item => (
              <button
                key={item.id}
                onClick={() => setOccasion(item.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                  occasion === item.id
                    ? 'border-gold-400 bg-gold-500/15 text-stone-100'
                    : 'border-stone-800 hover:border-gold-500/30 bg-cellar-900/60 text-stone-300'
                }`}
              >
                <div>
                  <p className="font-medium text-sm text-stone-100">{item.label}</p>
                  <p className="text-xs text-stone-400">{item.desc}</p>
                </div>
                {occasion === item.id && <Check className="w-4 h-4 text-gold-400 shrink-0" />}
              </button>
            ))}
          </div>
        )}

        {/* STEP 2: FOOD PAIRING */}
        {currentStep === 2 && (
          <div className="space-y-3">
            <label className="text-sm font-medium text-stone-300 block mb-2">
              What culinary pairing are you serving?
            </label>
            {foods.map(item => (
              <button
                key={item.id}
                onClick={() => setFood(item.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                  food === item.id
                    ? 'border-gold-400 bg-gold-500/15 text-stone-100'
                    : 'border-stone-800 hover:border-gold-500/30 bg-cellar-900/60 text-stone-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm font-medium text-stone-200">{item.label}</span>
                </div>
                {food === item.id && <Check className="w-4 h-4 text-gold-400 shrink-0" />}
              </button>
            ))}
          </div>
        )}

        {/* STEP 3: FLAVOR PROFILE */}
        {currentStep === 3 && (
          <div className="space-y-3">
            <label className="text-sm font-medium text-stone-300 block mb-2">
              Which sensory profile speaks to you right now?
            </label>
            {flavors.map(item => (
              <button
                key={item.id}
                onClick={() => setFlavor(item.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                  flavor === item.id
                    ? 'border-gold-400 bg-gold-500/15 text-stone-100'
                    : 'border-stone-800 hover:border-gold-500/30 bg-cellar-900/60 text-stone-300'
                }`}
              >
                <div>
                  <p className="font-medium text-sm text-stone-100">{item.label}</p>
                  <p className="text-xs text-gold-400/90 font-medium">Style: {item.matchType}</p>
                </div>
                {flavor === item.id && <Check className="w-4 h-4 text-gold-400 shrink-0" />}
              </button>
            ))}
          </div>
        )}

        {/* STEP 4: RECOMMENDATION RESULT */}
        {currentStep === 4 && recommendation && (
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-cellar-900/80 border border-gold-500/30 flex flex-col sm:flex-row gap-4 items-center">
              <img
                src={recommendation.image}
                alt={recommendation.name}
                className="w-24 h-32 object-cover rounded-xl border border-gold-500/20"
              />
              <div className="space-y-1.5 text-center sm:text-left flex-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-xs uppercase font-bold tracking-wider text-gold-400">
                    {recommendation.region} • {recommendation.vintage}
                  </span>
                  <span className="bg-wine-900/80 text-gold-300 text-[10px] px-2 py-0.5 rounded-full border border-gold-500/30">
                    {recommendation.criticScore.points} Pts
                  </span>
                </div>
                <h4 className="font-serif text-lg font-bold text-white leading-snug">
                  {recommendation.name}
                </h4>
                <p className="text-xs text-stone-300 line-clamp-2">
                  {recommendation.description}
                </p>
                <div className="text-lg font-serif font-bold text-gold-400 pt-1">
                  ${recommendation.price}{' '}
                  <span className="text-xs text-stone-500 line-through font-sans">
                    ${recommendation.originalPrice}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-wine-950/60 border border-wine-800/60 text-xs text-stone-300 space-y-1">
              <strong className="text-gold-400 block flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" /> Sommelier Rationale:
              </strong>
              <p>
                Chosen because its vibrant structure balances your selected culinary menu while honoring the nuances of your preferred flavor notes.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  addToCart(recommendation, 1);
                  setIsQuizOpen(false);
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-wine-950 font-bold text-sm transition-all shadow-lg hover:shadow-gold-500/20 text-center"
              >
                Add To Cellar Cart (${recommendation.price})
              </button>
              <button
                onClick={() => {
                  setSelectedWine(recommendation);
                  setIsQuizOpen(false);
                }}
                className="py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold"
              >
                Inspect
              </button>
            </div>
          </div>
        )}

        {/* Modal Footer Controls */}
        <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-center justify-between">
          {currentStep > 1 && currentStep < 4 ? (
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="text-xs text-stone-400 hover:text-white"
            >
              Back
            </button>
          ) : (
            <span />
          )}

          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              disabled={(currentStep === 1 && !occasion) || (currentStep === 2 && !food) || (currentStep === 3 && !flavor)}
              className="px-5 py-2.5 rounded-full bg-gold-500 disabled:opacity-40 disabled:hover:bg-gold-500 text-wine-950 font-bold text-xs tracking-wider transition-all flex items-center gap-1.5"
            >
              <span>{currentStep === 3 ? 'Reveal Match' : 'Continue'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={resetQuiz}
              className="text-xs text-stone-400 hover:text-gold-400 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Retake Sommelier Quiz
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

