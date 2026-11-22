// src/lib/store.ts
// Store page ka logic: filter, sort, price format, aur URL se filters padhna/likhna.
import type { StoreProduct } from '@/app/types';

// Customer yahan kharidte hain. Product pages yahan khulte hain.
// Badalna ho to .env.local mein NEXT_PUBLIC_STORE_URL set karein.
export const STORE_URL =
  process.env.NEXT_PUBLIC_STORE_URL ?? 'https://www.backumhills.com';

export const SORT_KEYS = [
  'featured',
  'best-selling',
  'title-asc',
  'title-desc',
  'price-asc',
  'price-desc',
  'date-asc',
  'date-desc',
] as const;
export type SortKey = (typeof SORT_KEYS)[number];

export const VIEW_MODES = ['2', '3', '4', 'list'] as const;
export type ViewMode = (typeof VIEW_MODES)[number];

export interface StoreFilters {
  q: string; // search text
  collections: string[]; // chune hue collection slugs
  inStock: boolean;
  outOfStock: boolean;
  min: number | null; // null = koi limit nahi
  max: number | null;
}

export interface StoreQuery {
  sort: SortKey;
  view: ViewMode;
  filters: StoreFilters;
}

export const DEFAULT_SORT: SortKey = 'featured';
export const DEFAULT_VIEW: ViewMode = '3';

export const EMPTY_FILTERS: StoreFilters = {
  q: '',
  collections: [],
  inStock: false,
  outOfStock: false,
  min: null,
  max: null,
};

// 1999 -> "₹1,999"
export const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

// Purani aur nayi price se discount %, jaise 44
export const discountPercent = (p: StoreProduct) =>
  p.compareAtPrice && p.compareAtPrice > p.price
    ? Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100)
    : 0;

// Price slider ki sabse kam aur sabse zyada limit
export function getPriceBounds(products: StoreProduct[]) {
  if (products.length === 0) return { min: 0, max: 0 };
  const max = Math.max(...products.map((p) => p.price));
  return { min: 0, max: Math.ceil(max / 100) * 100 };
}

// Kitne filters laage hain (sidebar ke "Clear all" aur mobile badge ke liye)
export function countActiveFilters(f: StoreFilters) {
  return (
    f.collections.length +
    (f.inStock !== f.outOfStock ? 1 : 0) +
    (f.min !== null || f.max !== null ? 1 : 0) +
    (f.q.trim() ? 1 : 0)
  );
}

export function applyFilters(products: StoreProduct[], f: StoreFilters) {
  const q = f.q.trim().toLowerCase();

  return products.filter((p) => {
    if (q) {
      const haystack = `${p.title} ${p.description} ${p.color ?? ''}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    if (f.collections.length > 0 && !f.collections.includes(p.collection)) return false;

    // Dono box tick ho ya koi nahi = sab dikhao. Sirf ek tick ho to stock se filter karo.
    if (f.inStock !== f.outOfStock) {
      if (f.inStock && !p.inStock) return false;
      if (f.outOfStock && p.inStock) return false;
    }

    if (f.min !== null && p.price < f.min) return false;
    if (f.max !== null && p.price > f.max) return false;
    return true;
  });
}

export function sortProducts(products: StoreProduct[], sort: SortKey) {
  const list = [...products]; // original list ko nahi chhedte
  const time = (p: StoreProduct) => new Date(p.createdAt).getTime();

  switch (sort) {
    case 'best-selling':
      return list.sort((a, b) => b.popularity - a.popularity);
    case 'title-asc':
      return list.sort((a, b) => a.title.localeCompare(b.title));
    case 'title-desc':
      return list.sort((a, b) => b.title.localeCompare(a.title));
    case 'price-asc':
      return list.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return list.sort((a, b) => b.price - a.price);
    case 'date-asc':
      return list.sort((a, b) => time(a) - time(b));
    case 'date-desc':
      return list.sort((a, b) => time(b) - time(a));
    default:
      return list; // featured = data file ka order
  }
}

// ---------- URL se filters padhna aur likhna (taaki link share ho sake) ----------
// Jaise: /store?sort=price-asc&collection=leather-belts&stock=in&min=500&max=2000

const toNumber = (value: string | null) => {
  if (value === null || value === '') return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
};

export function parseQuery(params: URLSearchParams): StoreQuery {
  const sortParam = params.get('sort') as SortKey | null;
  const viewParam = params.get('view') as ViewMode | null;
  const stock = (params.get('stock') ?? '').split(',');

  return {
    sort: sortParam && SORT_KEYS.includes(sortParam) ? sortParam : DEFAULT_SORT,
    view: viewParam && VIEW_MODES.includes(viewParam) ? viewParam : DEFAULT_VIEW,
    filters: {
      q: params.get('q') ?? '',
      collections: (params.get('collection') ?? '').split(',').filter(Boolean),
      inStock: stock.includes('in'),
      outOfStock: stock.includes('out'),
      min: toNumber(params.get('min')),
      max: toNumber(params.get('max')),
    },
  };
}

// Default values URL mein nahi likhte, taaki link chhota rahe
export function toSearchParams(query: StoreQuery) {
  const params = new URLSearchParams();
  const { sort, view, filters } = query;

  if (sort !== DEFAULT_SORT) params.set('sort', sort);
  if (view !== DEFAULT_VIEW) params.set('view', view);
  if (filters.q.trim()) params.set('q', filters.q.trim());
  if (filters.collections.length) params.set('collection', filters.collections.join(','));

  const stock = [filters.inStock && 'in', filters.outOfStock && 'out'].filter(Boolean);
  if (stock.length) params.set('stock', stock.join(','));

  if (filters.min !== null) params.set('min', String(filters.min));
  if (filters.max !== null) params.set('max', String(filters.max));
  return params;
}