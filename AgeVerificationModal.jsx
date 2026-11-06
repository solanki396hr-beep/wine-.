import React, { useState } from 'react';
import { Wine, ShieldCheck, Lock } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AgeVerificationModal = () => {
  const { isAgeVerified, verifyAge } = useShop();
  const [rememberMe, setRememberMe] = useState(true);
  const [underageWarning, setUnderageWarning] = useState(false);

  if (isAgeVerified) return null;

  const handleConfirm = () => {
    verifyAge(rememberMe);
  };

  const handleDecline = () => {
    setUnderageWarning(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
      <div className="relative w-full max-w-lg glass-panel rounded-3xl p-8 sm:p-10 border border-gold-500/40 text-center shadow-2xl animate-in zoom-in-95 duration-300">
        
        {/* Crest */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-wine-900 to-wine-950 border-2 border-gold-500/50 mx-auto flex items-center justify-center mb-6 shadow-xl shadow-wine-950/80">
          <Wine className="w-8 h-8 text-gold-400" />
        </div>

        <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold block mb-2">
          Maison Fondée en 1892
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100 mb-3">
          CHÂTEAU GRAND CRU
        </h2>

        <p className="text-xs text-stone-400 max-w-sm mx-auto leading-relaxed mb-6">
          To enter our private vintage cellar, you must be of legal drinking age in your country or jurisdiction of residence (21+ in the United States).
        </p>

        {underageWarning ? (
          <div className="p-4 rounded-2xl bg-wine-950 border border-wine-800 text-xs text-stone-300 mb-6">
            <p className="font-semibold text-wine-200 mb-1">Access Restricted</p>
            You must be at least 21 years of age to view or purchase fine wines from our cellars. Thank you for your understanding.
          </div>
        ) : (
          <div className="space-y-4">
            {/* Remember Checkbox */}
            <label className="flex items-center justify-center gap-2 text-xs text-stone-400 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-gold-500 accent-gold-500 bg-stone-900 border-stone-700"
              />
              <span>Remember my age verification on this device</span>
            </label>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleConfirm}
                className="flex-1 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-wine-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-gold-500/20 active:scale-98"
              >
                I Am 21 Or Older • Enter
              </button>

              <button
                onClick={handleDecline}
                className="px-6 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-stone-200 border border-stone-800 text-xs uppercase tracking-wider transition-colors"
              >
                I Am Under 21
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-stone-800/80 flex items-center justify-center gap-2 text-[11px] text-stone-500">
          <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
          <span>Please enjoy our fine wines responsibly.</span>
        </div>

      </div>
    </div>
  );
};

