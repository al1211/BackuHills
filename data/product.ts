// src/data/products.ts
//
// TODO (zaroori): neeche ki har value apni asli store se milayein:
//  - price aur kati hui price
//  - sizes (belt ke sizes video mein saaf nahi dikhe, isliye common sizes rakhe hain)
//  - createdAt aur popularity (sirf sort ke liye)
//  - 10th product (store 10 results dikhati hai, yahan 9 hain)
//  - variantId (Shopify), agar "Checkout on store" chahiye
//  - photos /public/products/ mein

import type { ProductColor, StoreProduct } from '@/app/types';

export const STORE_PAGE = {
  kicker: 'THE STORE',
  title: 'All Products',
  text: 'Genuine leather belts, handcrafted to last for years. Filter, sort and find yours.',
  searchPlaceholder: 'Search products',
};

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'best-selling', label: 'Best selling' },
  { value: 'title-asc', label: 'Alphabetically, A-Z' },
  { value: 'title-desc', label: 'Alphabetically, Z-A' },
  { value: 'price-asc', label: 'Price, low to high' },
  { value: 'price-desc', label: 'Price, high to low' },
  { value: 'date-asc', label: 'Date, old to new' },
  { value: 'date-desc', label: 'Date, new to old' },
] as const;

const BELT_SIZES = ['28', '30', '32', '34', '36', '38', '40', '42']; // TODO: confirm

const CASUAL = [
  { slug: 'black', name: 'Black', hex: '#111111' },
  { slug: 'coffee-brown', name: 'Coffee Brown', hex: '#4b2e1e' },
  { slug: 'elegant-tan', name: 'Elegant Tan', hex: '#b9824a' },
  { slug: 'rich-brown', name: 'Rich Brown', hex: '#6b3a1f' },
  { slug: 'royal-blue', name: 'Royal Blue', hex: '#1f3a8a' },
  { slug: 'royal-green', name: 'Royal Green', hex: '#1f5a3a' },
];

const casualHref = (slug: string) =>
  `/products/backum-hills-casual-leather-belt-${slug}`; // TODO: store ke URL se verify karein

const casualColors: ProductColor[] = CASUAL.map((c) => ({
  name: c.name,
  hex: c.hex,
  href: casualHref(c.slug),
}));

const casualBelts: StoreProduct[] = CASUAL.map((c, index) => ({
  id: `casual-plain-belt-${c.slug}`,
  slug: `casual-plain-belt-${c.slug}`,
  title: `Casual Plain Leather Belt, ${c.name}`,
  collection: 'leather-belts',
  price: 1999,
  compareAtPrice: 3599,
  images: [`/3.jpg`, `/2.jpg`],
  color: c.name,
  colors: casualColors,
  sizes: BELT_SIZES,
  inStock: true,
  createdAt: `2026-0${index + 1}-10`, // TODO: asli dates
  popularity: 60 - index * 5, // TODO: asli sales order
  description:
    'A clean, everyday genuine leather belt that goes with jeans, chinos and formals.',
  reviews: 0,
  href: casualHref(c.slug),
}));

const westernBelts: StoreProduct[] = [
  {
    id: 'western-tooled-black',
    slug: 'western-tooled-black',
    title: 'Western Tooled Belt, Black',
    collection: 'leather-belts',
    price: 2499,
    images: ['/products/western-tooled-black.jpg', '/products/western-tooled-black-2.jpg'],
    color: 'Black',
    sizes: BELT_SIZES,
    inStock: true,
    createdAt: '2026-07-15',
    popularity: 80,
    description:
      'Veg-tanned buffalo leather with tooled detailing and an engraved silver buckle.',
    reviews: 11,
    href: '/products/products-western-tooled-black-leather-belt-men',
  },
  {
    id: 'vintage-western-brown',
    slug: 'vintage-western-brown',
    title: 'Vintage Western Belt, Brown',
    collection: 'leather-belts',
    price: 2499,
    images: ['/products/vintage-western-brown.jpg', '/products/vintage-western-brown-2.jpg'],
    color: 'Brown',
    sizes: BELT_SIZES,
    inStock: true,
    createdAt: '2026-07-20',
    popularity: 90,
    description:
      'Veg-tanned buffalo leather in rich brown with an antique engraved buckle.',
    reviews: 12,
    href: '/products/vintage-western-leather-belt-for-men-in-veg-tanned-buffalo-leather-brown-antique-engraved-buckle',
  },
  {
    id: 'western-engraved-black',
    slug: 'western-engraved-black',
    title: 'Western Engraved Belt, Black',
    collection: 'leather-belts',
    price: 2499,
    images: ['/products/western-engraved-black.jpg', '/products/western-engraved-black-2.jpg'],
    color: 'Black',
    sizes: BELT_SIZES,
    inStock: true,
    createdAt: '2026-07-25',
    popularity: 95,
    description:
      'Premium veg-tanned buffalo leather with an antique silver engraved buckle.',
    reviews: 14,
    href: '/products/western-engraved-leather-belt-for-men-in-premium-veg-tanned-buffalo-leather-black-antique-silver-buckle',
  },
];

export const PRODUCTS_DATA: StoreProduct[] = [...casualBelts, ...westernBelts];