'use client';

// src/components/store/ProductCard.tsx
// Ek product ka card. Grid aur list, dono design isi mein hain.
import React from 'react';
import Image from 'next/image';
import { Eye, Heart, Star } from 'lucide-react';
import type { StoreProduct } from '@/app/types';
import { STORE_URL, discountPercent, formatPrice } from '../../app/lib/store';

interface ProductCardProps {
  product: StoreProduct;
  view?: 'grid' | 'list';
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  onQuickView: (product: StoreProduct) => void;
  onAddToCart: (product: StoreProduct) => void;
  priority?: boolean; // pehle kuch cards jaldi load karne ke liye
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  view = 'grid',
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  priority = false,
}) => {
  const isList = view === 'list';
  const discount = discountPercent(product);
  const needsSize = Boolean(product.sizes && product.sizes.length > 0);
  const productUrl = `${STORE_URL}${product.href}`;
  const [mainImage, hoverImage] = product.images;

  const handleButton = () => {
    // Size chunna ho to quick view kholte hain, warna seedha cart mein
    if (needsSize) onQuickView(product);
    else onAddToCart(product);
  };

  const iconButton =
    'flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/90 text-[#111113] shadow-lg transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880]';

  return (
    <article
      className={`group relative flex overflow-hidden rounded-2xl border border-white/10 bg-[#161619] transition-colors duration-300 hover:border-white/25 ${
        isList ? 'flex-col sm:flex-row' : 'flex-col'
      }`}
    >
      {/* Photo */}
      <div
        className={`relative overflow-hidden bg-[#1d1d21] ${
          isList
            ? 'aspect-[4/5] sm:aspect-auto sm:min-h-[16rem] sm:w-56 sm:shrink-0 md:w-64'
            : 'aspect-[4/5]'
        }`}
      >
        {mainImage ? (
          <Image
            src={mainImage}
            alt={product.title}
            fill
            priority={priority}
            sizes={
              isList
                ? '(min-width: 640px) 256px, 100vw'
                : '(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw'
            }
            className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-[#71717a]">
            No photo
          </div>
        )}

        {/* Doosri photo, sirf hover par */}
        {hoverImage && (
          <Image
            src={hoverImage}
            alt=""
            fill
            sizes={
              isList
                ? '(min-width: 640px) 256px, 100vw'
                : '(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw'
            }
            aria-hidden="true"
            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}

        {/* Poore photo par link */}
        <a
          href={productUrl}
          aria-label={`View ${product.title}`}
          tabIndex={-1}
          className="absolute inset-0 z-[1]"
        />

        {/* Badges */}
        <div className="pointer-events-none absolute left-3 top-3 z-[2] flex flex-col items-start gap-2">
          {discount > 0 && product.inStock && (
            <span className="rounded bg-[#b3123a] px-2 py-1 text-[11px] font-semibold leading-none text-white">
              -{discount}%
            </span>
          )}
          {!product.inStock && (
            <span className="rounded bg-black/80 px-2 py-1 text-[11px] font-semibold uppercase leading-none tracking-wider text-white">
              Sold out
            </span>
          )}
        </div>

        {/* Dil aur aankh ke icons: bade screen par hover par, mobile par hamesha */}
        <div className="absolute right-3 top-3 z-10 flex flex-col gap-2 transition-all duration-300 lg:translate-x-2 lg:opacity-0 lg:group-focus-within:translate-x-0 lg:group-focus-within:opacity-100 lg:group-hover:translate-x-0 lg:group-hover:opacity-100">
          <button
            type="button"
            onClick={() => onToggleWishlist(product.id)}
            aria-pressed={isWishlisted}
            aria-label={
              isWishlisted
                ? `Remove ${product.title} from wishlist`
                : `Add ${product.title} to wishlist`
            }
            className={iconButton}
          >
            <Heart
              className={`h-4 w-4 ${isWishlisted ? 'fill-[#d6264f] text-[#d6264f]' : ''}`}
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            onClick={() => onQuickView(product)}
            aria-label={`Quick view ${product.title}`}
            className={iconButton}
          >
            <Eye className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Chalti hui "HOT SALE" patti (sirf sajaavat, isliye screen reader se chhupi) */}
        {discount > 0 && product.inStock && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] overflow-hidden bg-black py-1.5 text-[10px] font-semibold tracking-[0.2em] text-white"
          >
            <div className="flex w-max animate-marquee">
              {[0, 1].map((group) => (
                <div key={group} className="flex shrink-0 items-center">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <span key={i} className="flex items-center whitespace-nowrap">
                      <span className="px-3">HOT SALE {discount}% OFF</span>
                      <span className="text-[#c5a880]">&#9670;</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
        {product.reviews > 0 && (
          <div className="flex items-center gap-1 text-[11px] text-[#a1a1aa]">
            <Star className="h-3 w-3 fill-[#c5a880] text-[#c5a880]" aria-hidden="true" />
            <span>
              {product.reviews} {product.reviews === 1 ? 'review' : 'reviews'}
            </span>
          </div>
        )}

        <h3
          className="text-base leading-snug text-white sm:text-lg"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          <a
            href={productUrl}
            className="transition-colors hover:text-[#c5a880] focus-visible:text-[#c5a880] focus-visible:outline-none"
          >
            {product.title}
          </a>
        </h3>

        {isList && (
          <p className="hidden text-sm font-light leading-relaxed text-[#a1a1aa] sm:line-clamp-3 sm:block">
            {product.description}
          </p>
        )}

        {/* Price */}
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className="text-base font-medium tabular-nums text-white">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-xs tabular-nums text-[#8e8e93] line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>

        {/* Colour dots */}
        {product.colors && product.colors.length > 0 && (
          <ul className="flex flex-wrap items-center gap-2" aria-label="Available colours">
            {product.colors.map((c) => {
              const isCurrent = c.name === product.color;
              const dotClass = `block h-4 w-4 rounded-full border border-white/25 ${
                isCurrent
                  ? 'ring-2 ring-[#c5a880] ring-offset-2 ring-offset-[#161619]'
                  : ''
              }`;
              return (
                <li key={c.name}>
                  {c.href ? (
                    <a
                      href={`${STORE_URL}${c.href}`}
                      title={c.name}
                      aria-label={c.name}
                      aria-current={isCurrent ? 'true' : undefined}
                      className="block rounded-full p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880]"
                    >
                      <span className={dotClass} style={{ backgroundColor: c.hex }} />
                    </a>
                  ) : (
                    <span title={c.name} className="block p-0.5">
                      <span
                        className={dotClass}
                        style={{ backgroundColor: c.hex }}
                        role="img"
                        aria-label={c.name}
                      />
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {/* Button */}
        <button
          type="button"
          onClick={handleButton}
          disabled={!product.inStock}
          className={`mt-auto w-full cursor-pointer rounded-full bg-[#f1ece1] py-2.5 text-xs font-medium tracking-wide text-[#111113] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880] focus-visible:ring-offset-2 focus-visible:ring-offset-[#161619] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-[#8e8e93] sm:text-sm ${
            isList ? 'sm:w-auto sm:self-start sm:px-8' : ''
          }`}
        >
          {!product.inStock ? 'Sold out' : needsSize ? 'Select Size' : 'Add to Cart'}
        </button>
      </div>
    </article>
  );
};