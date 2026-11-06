import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Toast = () => {
  const { toasts } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      {toasts.map(toast => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl border backdrop-blur-xl animate-in slide-in-from-right duration-300 text-xs font-medium ${
              isSuccess
                ? 'bg-wine-950/95 border-gold-500/40 text-stone-100 shadow-wine-950/80'
                : isError
                ? 'bg-red-950/95 border-red-500/50 text-red-100 shadow-red-950/80'
                : 'bg-stone-900/95 border-stone-700 text-stone-200'
            }`}
          >
            {isSuccess && <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />}
            {isError && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
            {!isSuccess && !isError && <Info className="w-4 h-4 text-stone-300 shrink-0" />}

            <span className="flex-1 leading-snug">{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
};

