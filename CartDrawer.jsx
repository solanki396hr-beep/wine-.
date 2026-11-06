import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Sparkles, 
  Tag, 
  ShieldCheck, 
  ThermometerSnowflake 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartItemCount,
    cartSubtotal,
    hasCaseDiscount,
    caseDiscountAmount,
    promoDiscountAmount,
    appliedPromoName,
    shippingFee,
    shippingThreshold,
    cartTotal,
    promoCode,
    setPromoCode,
    applyPromo,
    removePromo,
    setIsCheckoutOpen
  } = useShop();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const ok = applyPromo(inputCode);
    if (ok) setInputCode('');
  };

  const amountNeededForFreeShipping = Math.max(0, shippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / shippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-cellar-950 border-l border-gold-500/20 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-wine-900/80 border border-gold-500/30 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-gold-400" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-100">Your Cellar Cart</h3>
                <p className="text-xs text-stone-400">{cartItemCount} {cartItemCount === 1 ? 'bottle' : 'bottles'} selected</p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress bar */}
          <div className="px-6 py-3.5 bg-cellar-900 border-b border-stone-800">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-stone-300 flex items-center gap-1.5">
                <ThermometerSnowflake className="w-3.5 h-3.5 text-gold-400" />
                {amountNeededForFreeShipping > 0 ? (
                  <>Add <strong className="text-gold-400">${amountNeededForFreeShipping.toFixed(0)}</strong> for Free Climate Shipping</>
                ) : (
                  <strong className="text-emerald-400">You unlocked Free Refrigerated Shipping!</strong>
                )}
              </span>
              <span className="text-stone-400 font-medium">{freeShippingProgress.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-wine-600 to-gold-500 h-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-20 space-y-3">
                <ShoppingBag className="w-12 h-12 text-stone-700 mx-auto" />
                <p className="text-stone-300 font-serif text-lg">Your cellar is empty</p>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Browse our Grand Cru collection and add exceptional vintages to your cellar.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-6 py-2.5 rounded-full bg-gold-500 text-wine-950 text-xs font-bold uppercase tracking-wider"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div 
                  key={item.id}
                  className="flex gap-3.5 p-3.5 rounded-2xl bg-cellar-900/60 border border-stone-800/80 items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-20 object-cover rounded-xl border border-stone-800 shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-gold-400 font-semibold block">
                          {item.region} • {item.vintage}
                        </span>
                        <h4 className="text-xs font-bold text-stone-100 truncate">
                          {item.name}
                        </h4>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-500 hover:text-wine-400 p-1"
                        title="Remove bottle"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center bg-stone-900 border border-stone-800 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-stone-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-stone-200 min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-stone-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-serif text-sm font-bold text-gold-400">
                          ${item.price * item.quantity}
                        </span>
                        <p className="text-[10px] text-stone-500">${item.price} each</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Section */}
          {cart.length > 0 && (
            <div className="p-6 bg-cellar-900 border-t border-stone-800 space-y-4">
              
              {/* Promo Code Input */}
              {appliedPromoName ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-gold-500/10 border border-gold-500/30 text-xs">
                  <div className="flex items-center gap-1.5 text-gold-300">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon <strong>{appliedPromoName}</strong> applied</span>
                  </div>
                  <button
                    onClick={removePromo}
                    className="text-stone-400 hover:text-stone-200 text-xs underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Promo code (e.g. CHEERS10)"
                    className="flex-1 bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-gold-400 uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-200"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Case Discount Highlight */}
              {hasCaseDiscount && (
                <div className="p-2.5 rounded-xl bg-wine-950 border border-wine-800/80 text-xs text-wine-200 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Case collector benefit: <strong>5% automatic discount</strong> included!</span>
                </div>
              )}

              {/* Cost Summary Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-stone-200">${cartSubtotal.toFixed(2)}</span>
                </div>

                {hasCaseDiscount && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Case Discount (5%)</span>
                    <span>-${caseDiscountAmount.toFixed(2)}</span>
                  </div>
                )}

                {promoDiscountAmount > 0 && (
                  <div className="flex justify-between text-gold-400">
                    <span>Promo Discount ({appliedPromoName})</span>
                    <span>-${promoDiscountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Refrigerated Courier (14°C)</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-400 uppercase">FREE</strong> : `$${shippingFee.toFixed(2)}`}</span>
                </div>

                <div className="pt-2 border-t border-stone-800 flex justify-between text-base font-bold text-stone-100">
                  <span className="font-serif">Estimated Total</span>
                  <span className="font-serif text-gold-400 text-lg">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-wine-950 font-bold text-sm tracking-wide transition-all shadow-xl shadow-gold-500/20 flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                <span>Adult signature (21+) legally required upon delivery</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

