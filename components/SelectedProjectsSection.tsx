'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Star } from 'lucide-react';
import { FEATURED_PRODUCTS, FEATURED_SECTION } from '../data/content';
import { ProductItem } from '@/app/types';

interface FeaturedProductsProps {
  onSelectProduct: (product: ProductItem) => void;
  onExploreAll: () => void;
}

const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

export const FeaturedProductsSection: React.FC<FeaturedProductsProps> = ({
  onSelectProduct,
  onExploreAll,
}) => {
  return (
    <section
      id="products"
      className="border-t border-white/5 bg-[#101012] py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 sm:mb-16 sm:flex-row sm:items-end">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c5a880] sm:text-xs">
              {FEATURED_SECTION.kicker}
            </span>
            <h2
              className="mt-2 text-3xl font-light leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {FEATURED_SECTION.title.line1} <br />
              <span className="font-normal text-[#f4efe6]">
                {FEATURED_SECTION.title.line2}
              </span>
            </h2>
          </div>

          <button
            type="button"
            onClick={onExploreAll}
            className="group inline-flex cursor-pointer items-center gap-3 self-start rounded-full border border-white/15 bg-[#1b1b1f] px-5 py-2.5 text-xs font-medium tracking-wide text-white shadow-lg transition-colors duration-200 hover:border-white/30 hover:bg-[#25252b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101012] sm:self-auto"
          >
            <span>{FEATURED_SECTION.cta}</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 transition-transform group-hover:translate-x-1">
              <ArrowRight className="h-3 w-3 text-[#c5a880]" aria-hidden="true" />
            </span>
          </button>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_PRODUCTS.map((product, index) => {
            const discount = product.originalPrice
              ? Math.round(
                  ((product.originalPrice - product.price) / product.originalPrice) * 100
                )
              : 0;

            return (
              <button
                key={product.id}
                type="button"
                onClick={() => onSelectProduct(product)}
                className="group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#161619] text-left shadow-xl transition-colors duration-500 hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880]"
              >
                {/* Image */}
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    priority={index === 0}
                    className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-90" />

                  {/* Category */}
                  <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[10px] uppercase tracking-wider text-[#d1d1d6] backdrop-blur-md">
                    {product.category}
                  </span>

                  {/* Discount */}
                  {discount > 0 && (
                    <span className="absolute right-3 top-3 rounded-full bg-[#c5a880] px-2.5 py-1 text-[10px] font-semibold text-[#111113]">
                      -{discount}%
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h3
                    className="text-lg font-normal leading-snug text-white transition-colors group-hover:text-[#c5a880]"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {product.title}
                  </h3>

                  <p className="line-clamp-2 text-xs leading-relaxed text-[#a1a1aa]">
                    {product.description}
                  </p>

                  {product.colors && (
                    <p className="text-[11px] text-[#8e8e93]">
                      {product.colors.length} colours available
                    </p>
                  )}

                  <div className="mt-auto flex items-end justify-between pt-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-medium tabular-nums text-white">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs tabular-nums text-[#8e8e93] line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    {product.reviews > 0 && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#a1a1aa]">
                        <Star
                          className="h-3 w-3 fill-[#c5a880] text-[#c5a880]"
                          aria-hidden="true"
                        />
                        {product.reviews} reviews
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};