import React from 'react';
import { Filter, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { TYPES, REGIONS } from '../data/wines';

export const WineFilters = ({ totalMatching }) => {
  const {
    selectedType,
    setSelectedType,
    selectedRegion,
    setSelectedRegion,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    resetFilters,
  } = useShop();

  return (
    <div className="bg-cellar-900/90 rounded-2xl border border-stone-800/80 p-5 mb-8 shadow-xl">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        
        {/* Type Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {TYPES.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap ${
                selectedType === type
                  ? 'bg-gold-500 text-wine-950 shadow-md shadow-gold-500/20'
                  : 'bg-stone-900/80 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-800'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Right side controls: Region, Price Slider, Sort, Reset */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Region Dropdown */}
          <div className="relative">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-stone-900/90 border border-stone-800 hover:border-gold-500/40 text-stone-200 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-gold-400 cursor-pointer"
            >
              {REGIONS.map(region => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-stone-900/90 border border-stone-800 hover:border-gold-500/40 text-stone-200 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-gold-400 cursor-pointer"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Critic Score (Highest)</option>
              <option value="vintage">Vintage (Oldest First)</option>
            </select>
          </div>

          {/* Price Range Slider */}
          <div className="flex items-center gap-2 bg-stone-900/90 border border-stone-800 px-3.5 py-2 rounded-xl text-xs text-stone-300">
            <span>Max: <strong className="text-gold-400 font-serif">${priceRange[1]}</strong></span>
            <input
              type="range"
              min="30"
              max="1000"
              step="20"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
              className="w-24 accent-gold-500 cursor-pointer"
            />
          </div>

          {/* Reset Filters */}
          <button
            onClick={resetFilters}
            title="Reset Filters"
            className="p-2.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-400 hover:text-stone-200 border border-stone-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Filter status strip */}
      <div className="mt-4 pt-3 border-t border-stone-800/60 flex items-center justify-between text-xs text-stone-400">
        <div>
          Showing <span className="text-gold-400 font-semibold">{totalMatching}</span> fine wines matching your cellar criteria
        </div>
        {(selectedType !== 'All Types' || selectedRegion !== 'All Regions' || priceRange[1] < 1000) && (
          <button
            onClick={resetFilters}
            className="text-gold-400 hover:underline text-[11px]"
          >
            Clear all active filters
          </button>
        )}
      </div>
    </div>
  );
};

