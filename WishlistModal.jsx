import React from 'react';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Trash2, 
  Wine, 
  ArrowRight 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const WishlistModal = ({ isOpen, onClose }) => {
  const { wishlist, toggleWishlist, addToCart, setSelectedWine } = useShop();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-8 border border-gold-500/30 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-wine-900 border border-gold-500/30 flex items-center justify-center">
              <Heart className="w-5 h-5 text-gold-400 fill-current" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-100">Private Cellar Wishlist</h3>
              <p className="text-xs text-stone-400">{wishlist.length} {wishlist.length === 1 ? 'bottle' : 'bottles'} saved for later</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {wishlist.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Wine className="w-12 h-12 text-stone-700 mx-auto" />
              <p className="text-stone-300 font-serif text-lg">Your wishlist is empty</p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore our rare vintages and click the heart icon on any bottle to curate your personal cellar list.
              </p>
            </div>
          ) : (
            wishlist.map(wine => (
              <div
                key={wine.id}
                className="flex items-center gap-4 p-3.5 rounded-2xl bg-cellar-900 border border-stone-800 hover:border-gold-500/30 transition-all"
              >
                <img
                  src={wine.image}
                  alt={wine.name}
                  className="w-16 h-20 object-cover rounded-xl border border-stone-800 shrink-0 cursor-pointer"
                  onClick={() => {
                    setSelectedWine(wine);
                    onClose();
                  }}
                />

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-gold-400 font-semibold block">
                    {wine.region} • {wine.vintage}
                  </span>
                  <h4 
                    onClick={() => {
                      setSelectedWine(wine);
                      onClose();
                    }}
                    className="text-sm font-bold text-stone-100 hover:text-gold-300 truncate cursor-pointer"
                  >
                    {wine.name}
                  </h4>
                  <p className="text-xs text-stone-400 mt-0.5">${wine.price} • {wine.volume}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      addToCart(wine, 1);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-wine-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Add to Cart</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(wine)}
                    className="p-2 text-stone-500 hover:text-wine-400 rounded-lg hover:bg-stone-800"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="pt-4 border-t border-stone-800 flex justify-end">
            <button
              onClick={() => {
                wishlist.forEach(w => addToCart(w, 1));
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-wine-800 to-wine-700 hover:from-wine-700 hover:to-wine-600 text-stone-100 font-semibold text-xs tracking-wider uppercase border border-gold-500/30 transition-all flex items-center gap-2"
            >
              <span>Transfer All to Cart</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

