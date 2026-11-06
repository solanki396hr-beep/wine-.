import React, { useState } from 'react';
import { 
  Heart, 
  Eye, 
  ShoppingBag, 
  Star, 
  Check, 
  Plus, 
  Minus 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const WineCard = ({ wine }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setSelectedWine 
  } = useShop();

  const [quantity, setQuantity] = useState(1);
  const isWishlisted = isInWishlist(wine.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(wine, quantity);
    setQuantity(1);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(wine);
  };

  return (
    <div 
      onClick={() => setSelectedWine(wine)}
      className="group glass-panel rounded-2xl overflow-hidden border border-stone-800/80 hover:border-gold-500/40 transition-all duration-300 flex flex-col cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-wine-950/40 hover:-translate-y-1.5"
    >
      {/* Top Media Container */}
      <div className="relative aspect-[3/4] w-full bg-cellar-900 overflow-hidden">
        <img
          src={wine.image}
          alt={wine.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 brightness-95 group-hover:brightness-100"
          loading="lazy"
        />

        {/* Ambient Dark Gradient on bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-cellar-950 via-cellar-950/20 to-transparent opacity-85" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 z-10">
          <div className="flex flex-col gap-1.5 items-start">
            {wine.badge && (
              <span className="px-2.5 py-1 rounded-md bg-wine-900/90 text-gold-300 text-[10px] font-bold tracking-wider uppercase border border-gold-500/30 backdrop-blur-md">
                {wine.badge}
              </span>
            )}
            <span className="px-2 py-0.5 rounded-md bg-stone-900/80 text-stone-300 text-[10px] font-semibold tracking-wide border border-stone-700/50 backdrop-blur-sm">
              Vintage {wine.vintage}
            </span>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            aria-label="Wishlist"
            className={`p-2 rounded-full backdrop-blur-md transition-all ${
              isWishlisted
                ? 'bg-wine-700 text-gold-300 border border-gold-400'
                : 'bg-stone-900/70 text-stone-300 hover:text-gold-400 hover:bg-stone-800 border border-stone-700/50'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Critic Score Overlay */}
        {wine.criticScore && (
          <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 bg-black/75 px-2.5 py-1 rounded-full border border-gold-500/40 backdrop-blur-md">
            <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
            <span className="text-xs font-bold text-gold-300">
              {wine.criticScore.points} Pts
            </span>
            <span className="text-[10px] text-stone-400 hidden sm:inline">
              ({wine.criticScore.source})
            </span>
          </div>
        )}

        {/* Quick View Button hover popup */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedWine(wine);
          }}
          className="absolute bottom-3 right-3 z-10 p-2 rounded-full bg-stone-900/80 hover:bg-gold-500 hover:text-wine-950 text-stone-200 border border-stone-700 transition-all opacity-0 group-hover:opacity-100"
          title="Quick View"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Region and Varietal */}
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-stone-400 mb-1">
            <span className="text-gold-400 font-medium truncate max-w-[70%]">{wine.region}</span>
            <span>{wine.abv}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg font-bold text-stone-100 group-hover:text-gold-300 transition-colors line-clamp-2 leading-snug">
            {wine.name}
          </h3>

          {/* Varietal description */}
          <p className="text-xs text-stone-400 mt-1 line-clamp-1">
            {wine.varietal}
          </p>

          {/* Tasting notes pill preview */}
          <div className="flex flex-wrap gap-1 mt-3">
            {wine.tastingNotes.aroma.slice(0, 3).map((note, idx) => (
              <span
                key={idx}
                className="text-[10px] bg-cellar-900 text-stone-300 px-2 py-0.5 rounded border border-stone-800"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Actions and Pricing */}
        <div className="pt-3 border-t border-stone-800/80 space-y-3">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-2xl font-bold text-gold-400">
                  ${wine.price}
                </span>
                {wine.originalPrice && (
                  <span className="text-xs text-stone-500 line-through">
                    ${wine.originalPrice}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-stone-400">{wine.volume}</p>
            </div>

            {/* In-Stock Indicator */}
            <span className="text-[11px] text-emerald-400 font-medium">
              In Stock ({wine.inStock})
            </span>
          </div>

          {/* Quantity + Add To Cart CTA */}
          <div className="flex items-center gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center bg-stone-900 border border-stone-800 rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="p-1.5 text-stone-400 hover:text-stone-200"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 text-xs font-semibold text-stone-200 min-w-[20px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(q => Math.min(wine.inStock, q + 1))}
                className="p-1.5 text-stone-400 hover:text-stone-200"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 py-2 px-3 rounded-lg bg-gold-500 hover:bg-gold-400 text-wine-950 font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md shadow-gold-500/10 active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cellar</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

