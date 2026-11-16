'use client';

// src/components/store/StoreToolbar.tsx
// Products ke upar ki patti: result count, search, sort, grid switcher,
// aur mobile par "Filters" button.
import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Search, SlidersHorizontal, X } from 'lucide-react';
import { SORT_OPTIONS, STORE_PAGE } from '../../../data/product';
import type { SortKey, ViewMode } from '../../../app/(website)/lib/store';

interface StoreToolbarProps {
  total: number;
  sort: SortKey;
  onSortChange: (sort: SortKey) => void;
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
  search: string;
  onSearchChange: (q: string) => void;
  activeFilterCount: number;
  onOpenFilters: () => void;
}

// Grid ke chhote icons (library ke icon par bharosa nahi karte, isliye khud bane hain)
const ViewIcon = ({ mode }: { mode: ViewMode }) => {
  if (mode === 'list') {
    return (
      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
        <rect x="2" y="3" width="16" height="3" rx="1" />
        <rect x="2" y="8.5" width="16" height="3" rx="1" />
        <rect x="2" y="14" width="16" height="3" rx="1" />
      </svg>
    );
  }
  const cols = Number(mode);
  const gap = 2;
  const size = (16 - gap * (cols - 1)) / cols;
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      {[3, 11].flatMap((y) =>
        Array.from({ length: cols }).map((_, i) => (
          <rect
            key={`${y}-${i}`}
            x={2 + i * (size + gap)}
            y={y}
            width={size}
            height={6}
            rx={1}
          />
        ))
      )}
    </svg>
  );
};

const VIEW_BUTTONS: { mode: ViewMode; label: string; className: string }[] = [
  { mode: '2', label: 'Show 2 columns', className: '' },
  { mode: '3', label: 'Show 3 columns', className: 'hidden md:inline-flex' },
  { mode: '4', label: 'Show 4 columns', className: 'hidden xl:inline-flex' },
  { mode: 'list', label: 'Show as list', className: '' },
];

export const StoreToolbar: React.FC<StoreToolbarProps> = ({
  total,
  sort,
  onSortChange,
  view,
  onViewChange,
  search,
  onSearchChange,
  activeFilterCount,
  onOpenFilters,
}) => {
  // Search: type karte waqt ruk kar (0.35 second) ek baar filter lagate hain
  const [text, setText] = useState(search);
  const lastSent = useRef(search);
  const changeRef = useRef(onSearchChange);
  changeRef.current = onSearchChange;

  // Bahar se badle (jaise "Clear all filters") to box bhi badle,
  // par apni hi bheji hui value wapas aaye to type kiya hua text mat chhedo
  useEffect(() => {
    if (search !== lastSent.current) {
      lastSent.current = search;
      setText(search);
    }
  }, [search]);

  useEffect(() => {
    if (text === lastSent.current) return;
    const timer = window.setTimeout(() => {
      lastSent.current = text;
      changeRef.current(text);
    }, 350);
    return () => window.clearTimeout(timer);
  }, [text]);

  const clearSearch = () => {
    setText('');
    lastSent.current = '';
    changeRef.current('');
  };

  const viewButton =
    'h-9 w-9 cursor-pointer items-center justify-center rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880]';

  return (
    <div className="space-y-4">
      {/* Upar: count aur search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#a1a1aa]" role="status" aria-live="polite">
          {total === 0
            ? 'No results found'
            : `There ${total === 1 ? 'is 1 result' : `are ${total} results`} in total`}
        </p>

        <div className="relative w-full sm:max-w-xs">
          <label htmlFor="store-search" className="sr-only">
            Search products
          </label>
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#71717a]"
            aria-hidden="true"
          />
          <input
            id="store-search"
            type="search"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={STORE_PAGE.searchPlaceholder}
            autoComplete="off"
            className="h-11 w-full rounded-full border border-white/15 bg-[#0e0e10] pl-11 pr-10 text-sm text-white placeholder:text-[#71717a] focus:border-[#c5a880] focus:outline-none focus:ring-2 focus:ring-[#c5a880]/30 [&::-webkit-search-cancel-button]:hidden"
          />
          {text && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-[#a1a1aa] transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Neeche: filters button, sort, view */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-y border-white/10 py-3">
        <button
          type="button"
          onClick={onOpenFilters}
          className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-[#161619] px-4 text-sm text-white transition-colors hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880] lg:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          Filters
          {activeFilterCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#c5a880] px-1 text-[11px] font-semibold text-[#111113]">
              {activeFilterCount}
            </span>
          )}
        </button>

        <div className="ml-auto flex items-center gap-3 sm:gap-4">
          {/* Sort */}
          <div className="flex items-center gap-2">
            <label htmlFor="store-sort" className="hidden text-sm text-[#a1a1aa] sm:block">
              Sort by:
            </label>
            <div className="relative">
              <select
                id="store-sort"
                value={sort}
                onChange={(e) => onSortChange(e.target.value as SortKey)}
                className="h-10 cursor-pointer appearance-none rounded-full border border-white/15 bg-[#161619] pl-4 pr-9 text-sm text-white focus:border-[#c5a880] focus:outline-none focus:ring-2 focus:ring-[#c5a880]/30"
                aria-label="Sort products"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a1a1aa]"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Grid switcher */}
          <div className="flex items-center gap-1.5" role="group" aria-label="Product layout">
            {VIEW_BUTTONS.map((b) => {
              const active = view === b.mode;
              return (
                <button
                  key={b.mode}
                  type="button"
                  onClick={() => onViewChange(b.mode)}
                  aria-pressed={active}
                  aria-label={b.label}
                  title={b.label}
                  className={`${viewButton} ${b.className || 'inline-flex'} ${
                    active
                      ? 'border-[#c5a880] bg-[#c5a880]/10 text-[#c5a880]'
                      : 'border-white/10 bg-transparent text-[#a1a1aa] hover:border-white/30 hover:text-white'
                  }`}
                >
                  <ViewIcon mode={b.mode} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};