// app/types.ts

// Used by ServicesSection (collections cards)
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  href?: string;
}

// Used by FeaturedProductsSection (replaces ProjectItem)
export interface ProductItem {
  id: string;
  title: string;
  category: string;
  price: number;
  originalPrice?: number; // shows the cut price and the discount badge
  reviews: number; // 0 hides the reviews label
  colors?: string[];
  description: string;
  imageUrl: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}


export interface TestimonialItem {
  id: string;
  quote: string;
  rating: number; // 1 to 5
  clientName: string;
  location?: string; // city
  product?: string; // what they bought
  source?: string; // e.g. "Google Review", "Verified Buyer"
  avatarUrl?: string; // optional, shows initials when missing
}
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
export interface CollectionItem {
  id: string;
  slug: string; // used in the link: /collections/<slug>
  title: string;
  description: string; // used for image alt text and SEO
  imageUrl: string;
  productCount: number; // 0 shows "Coming soon" and the card is not clickable
}

 
export interface GiftCardAmount {
  id: string;
  value: number;
  href?: string;
}



// src/app/types.ts  (is purani file ko isse badal dein)

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  href?: string;
}

// Home page ke "Best Sellers" section ke liye
export interface ProductItem {
  id: string;
  title: string;
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
  href?: string; // is colour ke product ka store page
}

// Store page, filters, quick view aur cart ke liye
export interface StoreProduct {
  id: string;
  slug: string;
  title: string;
  collection: string; // collection slug se milna chahiye, jaise "leather-belts"
  price: number;
  compareAtPrice?: number; // kati hui purani price, isse discount badge banta hai
  images: string[]; // pehli = main photo, doosri = hover par dikhne wali photo
  color?: string; // is product ka colour
  colors?: ProductColor[]; // colour ke dots
  sizes?: string[]; // agar diya, to customer ko size chunna padega
  inStock: boolean;
  createdAt: string; // ISO date, "Date" sort ke liye
  popularity: number; // zyada = zyada bikta hai, "Best selling" sort ke liye
  description: string;
  reviews: number;
  href: string; // main store par path
  variantId?: string; // Shopify variant id, "Checkout on store" ke liye
}