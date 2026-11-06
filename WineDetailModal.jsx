import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Star, 
  ThermometerSnowflake, 
  UtensilsCrossed, 
  ShieldCheck, 
  Award,
  Plus,
  Minus,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const WineDetailModal = () => {
  const { 
    selectedWine, 
    setSelectedWine, 
    addToCart, 
    toggleWishlist, 
    isInWishlist,
    showToast 
  } = useShop();

  const [quantity, setQuantity] = useState(1);

  if (!selectedWine) return null;

  const isWishlisted = isInWishlist(selectedWine.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedWine.name,
        text: `Check out ${selectedWine.name} at Château Grand Cru!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl glass-panel rounded-3xl overflow-hidden border border-gold-500/30 shadow-2xl my-8 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedWine(null)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          
          {/* Left Column: Image and Badges */}
          <div className="md:col-span-5 relative bg-cellar-900 min-h-[340px] md:min-h-full">
            <img
              src={selectedWine.image}
              alt={selectedWine.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cellar-950 via-transparent to-transparent opacity-80" />
            
            {/* Critic badge overlay */}
            {selectedWine.criticScore && (
              <div className="absolute bottom-5 left-5 right-5 p-3 rounded-xl bg-black/75 border border-gold-500/40 backdrop-blur-md flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-gold-400 font-bold text-sm">
                    <Star className="w-4 h-4 fill-gold-400" />
                    <span>{selectedWine.criticScore.points} Points</span>
                  </div>
                  <p className="text-[11px] text-stone-400">
                    Officially scored by {selectedWine.criticScore.source}
                  </p>
                </div>
                <Award className="w-7 h-7 text-gold-400" />
              </div>
            )}
          </div>

          {/* Right Column: Wine Specifications & Tasting Art */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            
            <div className="space-y-5">
              {/* Category, Vintage & Region */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-wine-900/80 text-gold-300 text-xs font-bold uppercase tracking-wider border border-gold-500/30">
                  {selectedWine.type} Wine
                </span>
                <span className="text-xs text-stone-400">
                  Vintage <strong className="text-stone-200">{selectedWine.vintage}</strong>
                </span>
                <span className="text-stone-600">•</span>
                <span className="text-xs text-gold-400 font-medium">
                  {selectedWine.region}, {selectedWine.country}
                </span>
              </div>

              {/* Title & Winery */}
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100 leading-tight">
                  {selectedWine.name}
                </h2>
                <p className="text-sm text-stone-400 mt-1">
                  Estate Bottled by <strong className="text-stone-300">{selectedWine.winery}</strong>
                </p>
              </div>

              {/* Description */}
              <p className="text-sm text-stone-300 leading-relaxed">
                {selectedWine.description}
              </p>

              {/* Sommelier Tasting Matrix */}
              <div className="p-4 rounded-2xl bg-cellar-900/90 border border-stone-800 space-y-3">
                <h4 className="text-xs uppercase tracking-wider font-bold text-gold-400 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" /> Sommelier Tasting Notes
                </h4>

                {/* Aromas */}
                <div>
                  <span className="text-[11px] text-stone-400 block mb-1">Aroma Profile:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedWine.tastingNotes.aroma.map((a, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-stone-800 text-stone-200 border border-stone-700/60">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Palate */}
                <div>
                  <span className="text-[11px] text-stone-400 block mb-1">On The Palate:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedWine.tastingNotes.palate.map((p, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-wine-950/60 text-stone-300 border border-wine-800/40">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Finish */}
                <div className="pt-1">
                  <span className="text-[11px] text-stone-400 block">Finish:</span>
                  <p className="text-xs italic text-stone-300 mt-0.5">
                    "{selectedWine.tastingNotes.finish}"
                  </p>
                </div>
              </div>

              {/* Recommended Culinary Pairings & Temp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800 flex items-start gap-2.5">
                  <UtensilsCrossed className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-200 block">Recommended Pairings</span>
                    <span className="text-stone-400 text-[11px] block mt-0.5">
                      {selectedWine.foodPairing.join(', ')}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800 flex items-start gap-2.5">
                  <ThermometerSnowflake className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-200 block">Serving Temp & Cellar</span>
                    <span className="text-stone-400 text-[11px] block mt-0.5">
                      {selectedWine.servingTemp} • {selectedWine.volume}
                    </span>
                  </div>
                </div>
              </div>

              {/* Case discount announcement */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gold-500/10 border border-gold-500/20 text-xs text-gold-300">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>
                  <strong>Collector Case Incentive:</strong> Buy 6+ bottles across the cellar and save an automatic 5% at checkout.
                </span>
              </div>
            </div>

            {/* Price & Checkout Action Bar */}
            <div className="mt-6 pt-5 border-t border-stone-800/90 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-gold-400">
                    ${selectedWine.price}
                  </span>
                  {selectedWine.originalPrice && (
                    <span className="text-sm text-stone-500 line-through">
                      ${selectedWine.originalPrice}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-stone-400">
                  Taxes calculated at checkout • {selectedWine.inStock} bottles available
                </p>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                {/* Quantity */}
                <div className="flex items-center bg-stone-900 border border-stone-700 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-2.5 text-stone-400 hover:text-white"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 text-sm font-semibold text-stone-100 min-w-[28px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => Math.min(selectedWine.inStock, q + 1))}
                    className="p-2.5 text-stone-400 hover:text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => {
                    addToCart(selectedWine, quantity);
                    setSelectedWine(null);
                  }}
                  className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-wine-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-gold-500/20 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To Cart (${selectedWine.price * quantity})</span>
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(selectedWine)}
                  className={`p-3 rounded-xl border transition-colors ${
                    isWishlisted
                      ? 'bg-wine-900 text-gold-300 border-gold-400'
                      : 'bg-stone-900 text-stone-300 hover:text-gold-400 border-stone-700'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>

                {/* Share */}
                <button
                  onClick={handleShare}
                  className="p-3 rounded-xl bg-stone-900 text-stone-300 hover:text-gold-400 border border-stone-700 transition-colors"
                  title="Share Bottle"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

