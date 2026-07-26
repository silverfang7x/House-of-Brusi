'use client';

import React from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const PRICE_RANGES = [
  { label: 'All Prices', value: 'all' },
  { label: 'Under ₹15,000', value: 'under-15k' },
  { label: '₹15,000 – ₹25,000', value: '15k-25k' },
  { label: 'Over ₹25,000', value: 'over-25k' },
];

export function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeSize = searchParams.get('size') || 'all';
  const activePrice = searchParams.get('price') || 'all';

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all' || !value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const queryString = params.toString();
    const targetUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(targetUrl, { scroll: false });
  };

  const resetFilters = () => {
    router.push(pathname, { scroll: false });
  };

  const hasActiveFilters = activeSize !== 'all' || activePrice !== 'all';

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-y border-dust/30 py-4 mb-8">
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2 font-mono text-xs text-brass uppercase tracking-wider">
          <SlidersHorizontal className="h-4 w-4" />
          <span>Filters:</span>
        </div>

        {/* Size Filter Pills */}
        <div className="flex items-center space-x-1.5">
          <span className="font-body text-xs text-saddle mr-1">Size:</span>
          <button
            onClick={() => updateFilter('size', 'all')}
            className={`px-2.5 py-1 font-mono text-xs rounded-sm border transition-colors ${
              activeSize === 'all'
                ? 'border-brass bg-ink text-bone font-bold'
                : 'border-dust/30 bg-bone text-ink hover:border-saddle'
            }`}
          >
            All
          </button>
          {SIZES.map((sz) => (
            <button
              key={sz}
              onClick={() => updateFilter('size', sz)}
              className={`px-2.5 py-1 font-mono text-xs rounded-sm border transition-colors ${
                activeSize === sz
                  ? 'border-brass bg-ink text-bone font-bold'
                  : 'border-dust/30 bg-bone text-ink hover:border-saddle'
              }`}
            >
              {sz}
            </button>
          ))}
        </div>

        {/* Price Range Select */}
        <div className="flex items-center space-x-2">
          <span className="font-body text-xs text-saddle">Price:</span>
          <select
            value={activePrice}
            onChange={(e) => updateFilter('price', e.target.value)}
            className="bg-bone border border-dust/30 px-3 py-1 font-mono text-xs text-ink focus:outline-none focus:border-brass rounded-sm cursor-pointer"
          >
            {PRICE_RANGES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reset Action */}
      {hasActiveFilters && (
        <button
          onClick={resetFilters}
          className="flex items-center gap-1 font-mono text-xs text-merlot hover:underline focus:outline-none"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Clear Filters</span>
        </button>
      )}
    </div>
  );
}
