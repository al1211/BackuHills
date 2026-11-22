'use client';

// src/components/store/StoreClient.tsx
// Store page ka dimaag: filter, sort, grid, cards, drawer aur quick view ko jodta hai.
// Filters URL mein save hote hain (jaise /store?sort=price-asc&stock=in).
import React, { useCallback, useMemo, useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import type { StoreProduct } from '@/app/types';
import { COLLECTIONS_DATA } from '@/data/content';
import { PRODUCTS_DATA } from '../../../data/product';
import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/components/website/cart/CartProvider';
import {
  EMPTY_FILTERS,
  applyFilters,
  countActiveFilters,
  formatPrice,
  getPriceBounds,
  parseQuery,
  sortProducts,
  toSearchParams,
  type SortKey,
  type StoreFilters,
  type StoreQuery,
  type ViewMode,
} from '../../../app/(website)/(store)/lib/store';
import { CollectionStrip } from './CollectionStrip';
import { FilterDrawer, FilterSidebar } from './FilterSlider';
import { ProductCard } from './ProductCard';
import { QuickViewModal } from './QuickViewModal';
import { StoreToolbar } from './StoreToolbar';

// Kitne column dikhenge (phone par hamesha 2)
const GRID_CLASS: Record<ViewMode, string> = {
  '2': 'grid-cols-2',
  '3': 'grid-cols-2 md:grid-cols-3',
  '4': 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4',
  list: 'grid-cols-1',
};

export function StoreClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const wishlist = useWishlist();
  const cart = useCart();

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [quick, setQuick] = useState<StoreProduct | null>(null);

  // URL hi asli sachchai hai: sort, view aur filters sab yahin se aate hain
  const query = useMemo(
    () => parseQuery(new URLSearchParams(searchParams.toString())),
    [searchParams]
  );
  const { sort, view, filters } = query;

  const update = useCallback(
    (patch: { sort?: SortKey; view?: ViewMode; filters?: Partial<StoreFilters> }) => {
      const next: StoreQuery = {
        sort: patch.sort ?? sort,
        view: patch.view ?? view,
        filters: { ...filters, ...patch.filters },
      };
      const qs = toSearchParams(next).toString();
      startTransition(() => {
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      });
    },
    [sort, view, filters, pathname, router]
  );

  // Ye sab data kabhi badalta nahi, isliye ek hi baar nikalte hain
  const bounds = useMemo(() => getPriceBounds(PRODUCTS_DATA), []);
  const collectionOptions = useMemo(
    () =>
      COLLECTIONS_DATA.map((c) => ({
        slug: c.slug,
        title: c.title,
        imageUrl: c.imageUrl,
        count: PRODUCTS_DATA.filter((p) => p.collection === c.slug).length,
      })),
    []
  );
  const stockCounts = useMemo(
    () => ({
      inStock: PRODUCTS_DATA.filter((p) => p.inStock).length,
      outOfStock: PRODUCTS_DATA.filter((p) => !p.inStock).length,
    }),
    []
  );

  const visible = useMemo(
    () => sortProducts(applyFilters(PRODUCTS_DATA, filters), sort),
    [filters, sort]
  );
  const activeCount = countActiveFilters(filters);

  const toggleCollection = (slug: string) =>
    update({
      filters: {
        collections: filters.collections.includes(slug)
          ? filters.collections.filter((s) => s !== slug)
          : [...filters.collections, slug],
      },
    });

  const clearAll = () => update({ filters: EMPTY_FILTERS });

  // Laage hue filters ke chhote "chips", har ek ko alag se hata sakte hain
  const chips: { key: string; label: string; onRemove: () => void }[] = [];
  filters.collections.forEach((slug) => {
    const title = collectionOptions.find((c) => c.slug === slug)?.title ?? slug;
    chips.push({
      key: `collection-${slug}`,
      label: title,
      onRemove: () =>
        update({ filters: { collections: filters.collections.filter((s) => s !== slug) } }),
    });
  });
  if (filters.inStock !== filters.outOfStock) {
    chips.push({
      key: 'stock',
      label: filters.inStock ? 'In stock' : 'Out of stock',
      onRemove: () => update({ filters: { inStock: false, outOfStock: false } }),
    });
  }
  if (filters.min !== null || filters.max !== null) {
    chips.push({
      key: 'price',
      label: `${formatPrice(filters.min ?? bounds.min)} - ${formatPrice(filters.max ?? bounds.max)}`,
      onRemove: () => update({ filters: { min: null, max: null } }),
    });
  }
  if (filters.q.trim()) {
    chips.push({
      key: 'search',
      label: `\u201C${filters.q.trim()}\u201D`,
      onRemove: () => update({ filters: { q: '' } }),
    });
  }

  // Sidebar aur mobile drawer, dono mein wahi filters
  const filterPanel = (
    <FilterSidebar
      collections={collectionOptions}
      filters={filters}
      stockCounts={stockCounts}
      bounds={bounds}
      activeCount={activeCount}
      onChange={(patch) => update({ filters: patch })}
      onClear={clearAll}
    />
  );

  return (
    <>
      <CollectionStrip
        collections={collectionOptions}
        active={filters.collections}
        onToggle={toggleCollection}
      />

      <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-28">{filterPanel}</div>
        </aside>

        <div className="min-w-0">
          <StoreToolbar
            total={visible.length}
            sort={sort}
            onSortChange={(s) => update({ sort: s })}
            view={view}
            onViewChange={(v) => update({ view: v })}
            search={filters.q}
            onSearchChange={(q) => update({ filters: { q } })}
            activeFilterCount={activeCount}
            onOpenFilters={() => setFiltersOpen(true)}
          />

          {/* Laage hue filters */}
          {chips.length > 0 && (
            <ul className="mt-4 flex flex-wrap items-center gap-2" aria-label="Active filters">
              {chips.map((chip) => (
                <li key={chip.key}>
                  <button
                    type="button"
                    onClick={chip.onRemove}
                    aria-label={`Remove filter: ${chip.label}`}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#c5a880]/40 bg-[#c5a880]/10 py-1.5 pl-3 pr-2 text-xs text-[#f4efe6] transition-colors hover:bg-[#c5a880]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880]"
                  >
                    {chip.label}
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={clearAll}
                  className="cursor-pointer px-2 text-xs text-[#a1a1aa] underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:underline"
                >
                  Clear all
                </button>
              </li>
            </ul>
          )}

          {/* Products, filter badalte waqt halka fade */}
          {visible.length > 0 ? (
            <div
              className={`mt-6 grid gap-3 transition-opacity duration-200 sm:gap-5 ${GRID_CLASS[view]} ${
                isPending ? 'opacity-50' : 'opacity-100'
              }`}
              aria-busy={isPending}
            >
              {visible.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  view={view === 'list' ? 'list' : 'grid'}
                  priority={index < 4}
                  isWishlisted={wishlist.has(product.id)}
                  onToggleWishlist={wishlist.toggle}
                  onQuickView={setQuick}
                  onAddToCart={(p) => cart.add(p)}
                />
              ))}
            </div>
          ) : (
            <div className="mt-6 flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-[#161619] px-6 py-16 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#c5a880]">
                <Search className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="text-2xl text-white" style={{ fontFamily: 'var(--font-serif)' }}>
                No products found
              </h2>
              <p className="max-w-sm text-sm font-light text-[#a1a1aa]">
                Nothing matches these filters. Try removing a filter or searching for something else.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="cursor-pointer rounded-full bg-[#f1ece1] px-6 py-3 text-sm font-medium text-[#111113] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880]"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <FilterDrawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        resultCount={visible.length}
      >
        {filterPanel}
      </FilterDrawer>

      {/* Quick view */}
      {quick && (
        <QuickViewModal
          key={quick.id}
          product={quick}
          isWishlisted={wishlist.has(quick.id)}
          onToggleWishlist={wishlist.toggle}
          onAddToCart={(p, options) => cart.add(p, options)}
          onClose={() => setQuick(null)}
        />
      )}
    </>
  );
}

// Page load hote waqt dikhne wala khaali dhancha (Suspense ke fallback ke liye)
export function StoreSkeleton() {
  return (
    <div aria-hidden="true" className="animate-pulse space-y-10">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="aspect-[4/3] rounded-2xl bg-white/5" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-[3/4] rounded-2xl bg-white/5" />
        ))}
      </div>
    </div>
  );
}