import React, { createContext, useContext, useState, useEffect } from 'react';
import { WINES } from '../data/wines';

const ShopContext = createContext();

export const CURRENCIES = {
  USD: { symbol: '$', rate: 1.0, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' },
  CAD: { symbol: 'CA$', rate: 1.36, label: 'CAD (CA$)' },
  JPY: { symbol: '¥', rate: 152.0, label: 'JPY (¥)' }
};

export const ShopProvider = ({ children }) => {
  // Currency State
  const [currency, setCurrency] = useState('USD');

  // Cart State with localStorage persistence
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('wine_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('wine_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Age Verification
  const [isAgeVerified, setIsAgeVerified] = useState(() => {
    try {
      return localStorage.getItem('wine_age_verified') === 'true';
    } catch {
      return false;
    }
  });

  // Gift Packaging State
  const [hasGiftPackaging, setHasGiftPackaging] = useState(false);
  const [giftEngraving, setGiftEngraving] = useState('');

  // UI Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isVintageChartOpen, setIsVintageChartOpen] = useState(false);
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const [selectedWine, setSelectedWine] = useState(null);
  
  // Toast notifications
  const [toasts, setToasts] = useState([]);

  // Promo Code
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [appliedPromoName, setAppliedPromoName] = useState('');

  // Catalog Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedFoodPairing, setSelectedFoodPairing] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  // Persist Cart
  useEffect(() => {
    localStorage.setItem('wine_cart', JSON.stringify(cart));
  }, [cart]);

  // Persist Wishlist
  useEffect(() => {
    localStorage.setItem('wine_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Toast handler
  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  // Format price helper with active currency
  const formatPrice = (usdPrice) => {
    if (usdPrice == null) return '';
    const curr = CURRENCIES[currency] || CURRENCIES.USD;
    const converted = usdPrice * curr.rate;
    if (currency === 'JPY') {
      return `${curr.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${curr.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  // Cart operations
  const addToCart = (wine, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === wine.id);
      if (existing) {
        return prev.map(item =>
          item.id === wine.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...wine, quantity }];
    });
    showToast(`Added ${quantity} × ${wine.name} to cellar cart!`);
  };

  const removeFromCart = (wineId) => {
    setCart(prev => prev.filter(item => item.id !== wineId));
    showToast('Bottle removed from cart', 'info');
  };

  const updateQuantity = (wineId, qty) => {
    if (qty <= 0) {
      removeFromCart(wineId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === wineId ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setHasGiftPackaging(false);
    setGiftEngraving('');
  };

  // Wishlist operations
  const toggleWishlist = (wine) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === wine.id);
      if (exists) {
        showToast(`Removed ${wine.name} from wishlist`, 'info');
        return prev.filter(item => item.id !== wine.id);
      } else {
        showToast(`Saved ${wine.name} to your private wishlist!`);
        return [...prev, wine];
      }
    });
  };

  const isInWishlist = (wineId) => {
    return wishlist.some(item => item.id === wineId);
  };

  // Promo code validation
  const applyPromo = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'CHEERS10' || clean === 'VINO10') {
      setAppliedDiscount(0.10);
      setAppliedPromoName(clean);
      showToast('Promo code applied: 10% off your entire order!', 'success');
      return true;
    } else if (clean === 'VINTAGE15' || clean === 'GRANDCRU15') {
      setAppliedDiscount(0.15);
      setAppliedPromoName(clean);
      showToast('Promo code applied: 15% VIP Sommelier discount!', 'success');
      return true;
    } else {
      showToast('Invalid promo code. Try CHEERS10 or VINTAGE15', 'error');
      return false;
    }
  };

  const removePromo = () => {
    setAppliedDiscount(0);
    setAppliedPromoName('');
    showToast('Promo code removed', 'info');
  };

  // Calculations in USD base
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  
  // Case discount: buy 6 or more bottles, get automatic 5% case discount
  const hasCaseDiscount = cartItemCount >= 6;
  const caseDiscountAmount = hasCaseDiscount ? cartSubtotal * 0.05 : 0;

  // Coupon discount amount
  const promoDiscountAmount = (cartSubtotal - caseDiscountAmount) * appliedDiscount;
  
  // Wooden crate gift fee ($35 or complimentary on orders > $600)
  const giftCrateFee = hasGiftPackaging ? (cartSubtotal >= 600 ? 0 : 35) : 0;

  // Shipping: Free if subtotal > $200, otherwise $25 refrigerated shipping
  const shippingThreshold = 200;
  const shippingFee = cartSubtotal >= shippingThreshold || cartSubtotal === 0 ? 0 : 25;
  
  // Estimated taxes
  const estimatedTax = (cartSubtotal - caseDiscountAmount - promoDiscountAmount) * 0.08;
  const cartTotal = Math.max(0, cartSubtotal - caseDiscountAmount - promoDiscountAmount + giftCrateFee + shippingFee + estimatedTax);

  // Age verification confirm
  const verifyAge = (remember = true) => {
    setIsAgeVerified(true);
    if (remember) {
      localStorage.setItem('wine_age_verified', 'true');
    }
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedType('All Types');
    setSelectedRegion('All Regions');
    setPriceRange([0, 1000]);
    setSelectedFoodPairing('All');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <ShopContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartItemCount,
        cartSubtotal,
        caseDiscountAmount,
        hasCaseDiscount,
        promoDiscountAmount,
        appliedPromoName,
        hasGiftPackaging,
        setHasGiftPackaging,
        giftEngraving,
        setGiftEngraving,
        giftCrateFee,
        shippingFee,
        shippingThreshold,
        estimatedTax,
        cartTotal,
        promoCode,
        setPromoCode,
        applyPromo,
        removePromo,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isAgeVerified,
        verifyAge,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isQuizOpen,
        setIsQuizOpen,
        isVintageChartOpen,
        setIsVintageChartOpen,
        isGiftModalOpen,
        setIsGiftModalOpen,
        selectedWine,
        setSelectedWine,
        toasts,
        showToast,
        searchQuery,
        setSearchQuery,
        selectedType,
        setSelectedType,
        selectedRegion,
        setSelectedRegion,
        priceRange,
        setPriceRange,
        selectedFoodPairing,
        setSelectedFoodPairing,
        sortBy,
        setSortBy,
        resetFilters,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
