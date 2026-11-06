import React, { useMemo } from 'react';
import { WineCard } from './WineCard';
import { WineFilters } from './WineFilters';
import { useShop } from '../context/ShopContext';
import { WINES } from '../data/wines';
import { Wine, Sparkles } from 'lucide-react';

export const WineGrid = () => {
  const {
    selectedType,
    selectedRegion,
    priceRange,
    searchQuery,
    sortBy,
    resetFilters
  } = useShop();

  const filteredWines = useMemo(() => {
    return WINES.filter(wine => {
      // Type match
      if (selectedType !== 'All Types' && wine.type.toLowerCase() !== selectedType.toLowerCase()) {
        return false;
      }
      // Region match
      if (selectedRegion !== 'All Regions' && !wine.country.toLowerCase().includes(selectedRegion.toLowerCase()) && !wine.region.toLowerCase().includes(selectedRegion.toLowerCase())) {
        return false;
      }
      // Price match
      if (wine.price > priceRange[1]) {
        return false;
      }
      // Search match
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = wine.name.toLowerCase().includes(q);
        const matchesRegion = wine.region.toLowerCase().includes(q);
        const matchesVarietal = wine.varietal.toLowerCase().includes(q);
        const matchesWinery = wine.winery.toLowerCase().includes(q);
        if (!matchesName && !matchesRegion && !matchesVarietal && !matchesWinery) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.criticScore?.points || 0) - (a.criticScore?.points || 0);
      if (sortBy === 'vintage') {
        const vA = typeof a.vintage === 'number' ? a.vintage : 9999;
        const vB = typeof b.vintage === 'number' ? b.vintage : 9999;
        return vA - vB;
      }
      // default 'featured'
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [selectedType, selectedRegion, priceRange, searchQuery, sortBy]);

  return (
    <section id="cellar-catalog" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase">
          <Wine className="w-3.5 h-3.5" /> Hand-Selected Cellar Allocations
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-100">
          The Grand Cru Collection
        </h2>
        <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
          From first-growth Bordeaux and cult Napa Valley Cabernet to crystalline Burgundy and aged Vintage Champagnes. Every bottle is authenticated and protected in temperature-regulated vaults.
        </p>
      </div>

      {/* Filter Component */}
      <WineFilters totalMatching={filteredWines.length} />

      {/* Wine Cards Grid */}
      {filteredWines.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredWines.map(wine => (
            <WineCard key={wine.id} wine={wine} />
          ))}
        </div>
      ) : (
        /* Empty Results State */
        <div className="text-center py-20 bg-cellar-900/40 rounded-3xl border border-stone-800/80 p-8">
          <Wine className="w-12 h-12 text-stone-600 mx-auto mb-4" />
          <h3 className="font-serif text-xl font-bold text-stone-200">
            No rare vintages match your current criteria
          </h3>
          <p className="text-stone-400 text-sm max-w-md mx-auto mt-2">
            Try adjusting your price range, clearing region filters, or resetting search terms to explore our other cellar treasures.
          </p>
          <button
            onClick={resetFilters}
            className="mt-6 px-6 py-2.5 rounded-full bg-gold-500 text-wine-950 font-bold text-xs uppercase tracking-wider hover:bg-gold-400 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </section>
  );
};

