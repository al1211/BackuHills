// src/app/types.ts

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  href?: string;
}

export interface ProductItem {
  id: string;
  title: string;
  city: string;
  location: string;
  area: string;
  year: string;
  category: string;
  price: number;
  originalPrice?: number;
  reviews: number;
  colors?: string[];
  description: string;
  imageUrl: string;
  href: string;

}

export interface ProductColor {
  name: string;
  hex: string;
  href?: string;
}

export interface StoreProduct {
  id: string;
  slug: string;
  title: string;
  collection: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  color?: string;
  colors?: ProductColor[];
  sizes?: string[];
  inStock: boolean;
  createdAt: string;
  popularity: number;
  description: string;
  reviews: number;
  href: string;
  variantId?: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  rating: number;
  clientName: string;
  location?: string;
  product?: string;
  source?: string;
  avatarUrl?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface CollectionItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  productCount: number;
}

export interface GiftCardAmount {
  id: string;
  value: number;
  href?: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  iconName: "Search" | "Scissors" | "Sparkles" | "PackageCheck";
}

export type AdminAuthState = {
  accessToken: string | null;
  // baaki properties...
};