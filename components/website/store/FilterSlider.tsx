'use client';

// src/components/store/FilterSidebar.tsx
// Filters: Collections, Availability, Price.
//  - FilterSidebar: asli filters (desktop par side mein)
//  - FilterDrawer: mobile par wahi filters ek drawer mein
import React, { useEffect, useId, useRef } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { useModal } from '@/hooks/useModal';
import type { StoreFilters } from '../../../app/(website)/(store)/lib/store';
import { PriceRangeSlider } from './PricRangeSlider';

export interface CollectionOption {
  slug: string;
  title: string;
  count: number;
}

interface FilterSidebarProps {
  collections: CollectionOption[];
  filters: StoreFilters;
  stockCounts: { inStock: number; outOfStock: number };
  bounds: { min: number; max: number };
  activeCount: number;
  onChange: (patch: Partial<StoreFilters>) => void;
  onClear: () => void;
}

const sectionTitle = 'text-lg text-white';
const summaryClass =
  'flex cursor-pointer list-none items-center justify-between gap-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880] [&::-webkit-details-marker]:hidden';

const Chevron = () => (
  <ChevronDown
    className="h-4 w-4 text-[#a1a1aa] transition-transform duration-200 group-open:rotate-180"
    aria-hidden="true"
  />
);

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  collections,
  filters,
  stockCounts,
  bounds,
  activeCount,
  onChange,
  onClear,
}) => {
  const groupId = useId(); // sidebar aur drawer dono ek saath hain, isliye alag naam

  const toggleCollection = (slug: string) => {
    const has = filters.collections.includes(slug);
    onChange({
      collections: has
        ? filters.collections.filter((s) => s !== slug)
        : [...filters.collections, slug],
    });
  };

  const checkboxRow = 'flex cursor-pointer items-center justify-between gap-3 py-1.5 text-sm';
  const checkbox = 'h-4 w-4 cursor-pointer accent-[#c5a880]';

  return (
    <div aria-label="Product filters" role="group" id={groupId}>
      {activeCount > 0 && (
        <button
          type="button"
          onClick={onClear}
          className="mb-2 cursor-pointer text-sm text-[#c5a880] underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:underline"
        >
          Clear all filters ({activeCount})
        </button>
      )}

      {/* Collections */}
      <details open className="group border-b border-white/10 py-5">
        <summary className={summaryClass}>
          <span className={sectionTitle} style={{ fontFamily: 'var(--font-serif)' }}>
            Collections
          </span>
          <Chevron />
        </summary>
        <div className="mt-3">
          {collections.map((c) => {
            const checked = filters.collections.includes(c.slug);
            const disabled = c.count === 0 && !checked;
            return (
              <label
                key={c.slug}
                className={`${checkboxRow} ${
                  disabled ? 'cursor-not-allowed text-[#52525b]' : 'text-[#d1d1d6]'
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className={checkbox}
                    checked={checked}
                    disabled={disabled}
                    onChange={() => toggleCollection(c.slug)}
                  />
                  {c.title}
                </span>
                <span className="text-xs tabular-nums text-[#71717a]">({c.count})</span>
              </label>
            );
          })}
        </div>
      </details>

      {/* Availability */}
      <details open className="group border-b border-white/10 py-5">
        <summary className={summaryClass}>
          <span className={sectionTitle} style={{ fontFamily: 'var(--font-serif)' }}>
            Availability
          </span>
          <Chevron />
        </summary>
        <div className="mt-3">
          <label className={`${checkboxRow} text-[#d1d1d6]`}>
            <span className="flex items-center gap-3">
              <input
                type="checkbox"
                className={checkbox}
                checked={filters.inStock}
                onChange={(e) => onChange({ inStock: e.target.checked })}
              />
              In stock
            </span>
            <span className="text-xs tabular-nums text-[#71717a]">({stockCounts.inStock})</span>
          </label>
          <label
            className={`${checkboxRow} ${
              stockCounts.outOfStock === 0 && !filters.outOfStock
                ? 'cursor-not-allowed text-[#52525b]'
                : 'text-[#d1d1d6]'
            }`}
          >
            <span className="flex items-center gap-3">
              <input
                type="checkbox"
                className={checkbox}
                checked={filters.outOfStock}
                disabled={stockCounts.outOfStock === 0 && !filters.outOfStock}
                onChange={(e) => onChange({ outOfStock: e.target.checked })}
              />
              Out of stock
            </span>
            <span className="text-xs tabular-nums text-[#71717a]">
              ({stockCounts.outOfStock})
            </span>
          </label>
        </div>
      </details>

      {/* Price */}
      <details open className="group py-5">
        <summary className={summaryClass}>
          <span className={sectionTitle} style={{ fontFamily: 'var(--font-serif)' }}>
            Price
          </span>
          <Chevron />
        </summary>
        <div className="mt-4 px-1">
          <PriceRangeSlider
            min={bounds.min}
            max={bounds.max}
            valueMin={filters.min}
            valueMax={filters.max}
            onCommit={(min, max) => onChange({ min, max })}
          />
        </div>
      </details>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Mobile drawer: bayein taraf se nikalta hai, sirf lg se chhote screen par
// ---------------------------------------------------------------------------

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  resultCount: number;
  children: React.ReactNode;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  open,
  onClose,
  resultCount,
  children,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  useModal(open, onClose, panelRef);

  // Screen bada ho jaye (phone ghumaya) to drawer band kar do
  useEffect(() => {
    if (!open) return;
    const media = window.matchMedia('(min-width: 1024px)');
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) onClose();
    };
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[70] transition-[visibility] duration-300 lg:hidden ${
        open ? 'visible' : 'invisible'
      }`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
        tabIndex={-1}
        className={`absolute left-0 top-0 flex h-full w-[88%] max-w-sm flex-col border-r border-white/10 bg-[#101012] shadow-2xl transition-transform duration-300 ease-out motion-reduce:transition-none ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="text-xl text-white" style={{ fontFamily: 'var(--font-serif)' }}>
            Filters
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880]"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-3">{children}</div>

        <div className="border-t border-white/10 bg-[#0e0e10] p-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full cursor-pointer rounded-full bg-[#f1ece1] py-3.5 text-sm font-medium text-[#111113] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880]"
          >
            Show {resultCount} {resultCount === 1 ? 'product' : 'products'}
          </button>
        </div>
      </div>
    </div>
  );
};