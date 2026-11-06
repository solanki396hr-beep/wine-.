import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  ThermometerSnowflake, 
  Wine, 
  Lock, 
  Sparkles,
  ArrowRight,
  Package
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../context/ShopContext';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    cartSubtotal,
    shippingFee,
    promoDiscountAmount,
    caseDiscountAmount,
    clearCart,
    showToast
  } = useShop();

  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [formData, setFormData] = useState({
    fullName: 'Lady Genevieve Vance',
    email: 'genevieve.vance@chateaugrandcru.com',
    address: '450 Vintage Cellar Blvd, Suite 8',
    city: 'San Francisco',
    state: 'CA',
    zip: '94108',
    is21Confirmed: true,
    cardNum: '•••• •••• •••• 9821',
    expDate: '11/28',
    cvv: '892',
    deliveryNotes: 'Please ring front gate bell; adult signature ready.'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.is21Confirmed) {
      showToast('You must certify you are 21 years of age or older to purchase wine.', 'error');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const generatedId = 'CGC-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedId);
      setIsProcessing(false);
      setStep('success');

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#722f37', '#ffffff']
        });
      } catch (err) {
        // ignore if confetti fails
      }

      clearCart();
    }, 1200);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep('form');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl overflow-hidden border border-gold-500/30 shadow-2xl my-6 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <Lock className="w-3.5 h-3.5" /> 256-Bit Encrypted Cellar Checkout
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100">
                Secure Fine Wine Acquisition
              </h2>
              <p className="text-xs text-stone-400 mt-1">
                Shipment handled exclusively through certified temperature-controlled logistics.
              </p>
            </div>

            {/* Legal Age Verification Guarantee */}
            <div className="p-4 rounded-2xl bg-wine-950/80 border border-wine-800/80 flex items-start gap-3">
              <input
                type="checkbox"
                id="age-check"
                checked={formData.is21Confirmed}
                onChange={(e) => setFormData({ ...formData, is21Confirmed: e.target.checked })}
                className="mt-1 w-4 h-4 rounded text-gold-500 accent-gold-500 bg-stone-900 border-stone-700 focus:ring-0"
              />
              <label htmlFor="age-check" className="text-xs text-stone-200 leading-relaxed cursor-pointer">
                <strong>Statutory Age Declaration:</strong> I hereby certify that I am at least 21 years of age, and that an adult of legal drinking age will be present with valid government photo ID to sign for this alcoholic beverage delivery.
              </label>
            </div>

            {/* Shipping Coordinates */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400">
                Delivery Address
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-[11px] text-stone-400 block mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-stone-400 block mb-1">Email (for Tracking)</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-stone-400 block mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-stone-400 block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-stone-400 block mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Details */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5" /> Payment Method
              </h4>
              <div className="p-3.5 rounded-2xl bg-cellar-900 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-gold-400" />
                    <span className="font-semibold text-stone-100">Centurion Reserve / Visa Signature</span>
                  </div>
                  <span className="text-[11px] text-gold-400 font-mono">Encrypted</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={formData.cardNum}
                    readOnly
                    className="col-span-2 bg-stone-950/80 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-300 font-mono"
                  />
                  <input
                    type="text"
                    value={formData.expDate}
                    readOnly
                    className="bg-stone-950/80 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-300 font-mono text-center"
                  />
                </div>
              </div>
            </div>

            {/* Temperature-Safe Packaging Guarantee */}
            <div className="p-3.5 rounded-2xl bg-cellar-900/60 border border-stone-800/80 flex items-center gap-3">
              <ThermometerSnowflake className="w-5 h-5 text-gold-400 shrink-0" />
              <div className="text-xs">
                <span className="font-semibold text-stone-200 block">Climate Guard Guarantee Included</span>
                <span className="text-stone-400 text-[11px] block">
                  Shipped in styrofoam-free honeycomb thermal pods with food-grade gel refrigerants maintaining 12-15°C throughout transit.
                </span>
              </div>
            </div>

            {/* Total and Submit */}
            <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-stone-400 block">Total Due:</span>
                <span className="font-serif text-3xl font-bold text-gold-400">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 disabled:opacity-50 text-wine-950 font-bold text-sm tracking-wide transition-all shadow-xl shadow-gold-500/20 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-wine-950 border-t-transparent rounded-full animate-spin" />
                    Allocating Bottles...
                  </span>
                ) : (
                  <>
                    <span>Confirm Order & Dispatch</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>
        ) : (
          /* SUCCESS CONFIRMATION SCREEN */
          <div className="p-8 sm:p-10 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-gold-500/10 border-2 border-gold-500 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-gold-400" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
                Order Confirmed & Estate Allocated
              </span>
              <h2 className="font-serif text-3xl font-bold text-stone-100 mt-1">
                Santé! Your Fine Wine Is On Its Way
              </h2>
              <p className="text-sm text-stone-300 max-w-md mx-auto mt-2">
                Thank you, <strong className="text-white">{formData.fullName}</strong>. Your rare vintages have been safely reserved in our climate vaults for temperature-stabilized courier dispatch.
              </p>
            </div>

            {/* Order details summary card */}
            <div className="p-5 rounded-2xl bg-cellar-900 border border-stone-800 max-w-md mx-auto text-left space-y-2.5 text-xs">
              <div className="flex justify-between border-b border-stone-800 pb-2">
                <span className="text-stone-400">Order Reference:</span>
                <strong className="text-gold-400 font-mono text-sm">{orderId}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Destination:</span>
                <span className="text-stone-200">{formData.city}, {formData.state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Transit Mode:</span>
                <span className="text-emerald-400 font-medium">Refrigerated Express (14°C)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Adult Signature (21+):</span>
                <span className="text-stone-200">Required on delivery</span>
              </div>
              <div className="flex justify-between border-t border-stone-800 pt-2 font-bold text-stone-100">
                <span>Amount Charged:</span>
                <span className="text-gold-400 font-serif text-base">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-wine-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-gold-500/20"
            >
              Return to The Cellar
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

