'use client';

// src/components/store/QuickViewModal.tsx
// Card ki aankh dabane par ya "Select Size" dabane par khulne wala popup.
// Parent mein aise lagayein (key zaroori hai, taaki har product par size aur quantity naye se shuru ho):
//   {quick && <QuickViewModal key={quick.id} product={quick} ... />}
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Heart, Minus, Plus, Star, X } from 'lucide-react';
import { useModal } from '@/hooks/useModal';
import { MAX_QTY } from '@/components/cart/CartProvider';
import type { StoreProduct } from '@/app/types';
import { STORE_URL, discountPercent, formatPrice } from '../../app/lib/store';

interface QuickViewModalProps {
  product: StoreProduct;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  onAddToCart: (product: StoreProduct, options: { size?: string; qty: number }) => void;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onClose,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const sizeGroupRef = useRef<HTMLFieldSetElement>(null);
  useModal(true, onClose, panelRef);

  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);

  const needsSize = Boolean(product.sizes && product.sizes.length > 0);
  const discount = discountPercent(product);
  const saving =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? product.compareAtPrice - product.price
      : 0;
  const currentImage = product.images[activeImage] ?? product.images[0];

  const handleAdd = () => {
    if (needsSize && !size) {
      setSizeError(true);
      sizeGroupRef.current?.querySelector('input')?.focus();
      return;
    }
    onAddToCart(product, { size: size ?? undefined, qty });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[75] flex items-end justify-center sm:items-center sm:p-6">
      {/* Peeche ka parda */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Quick view: ${product.title}`}
        tabIndex={-1}
        className="relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-[#101012] shadow-2xl sm:max-w-4xl sm:rounded-3xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close quick view"
          className="absolute right-3 top-3 z-30 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880]"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="grid overflow-y-auto md:grid-cols-2">
          {/* Photos */}
          <div className="relative aspect-[4/5] bg-[#1d1d21] md:aspect-auto md:min-h-[30rem]">
            {currentImage && (
              <Image
                src={currentImage}
                alt={product.title}
                fill
                sizes="(min-width: 768px) 448px, 100vw"
                className="object-cover"
              />
            )}

            {discount > 0 && (
              <span className="absolute left-3 top-3 z-10 rounded bg-[#b3123a] px-2 py-1 text-[11px] font-semibold leading-none text-white">
                -{discount}%
              </span>
            )}

            {product.images.length > 1 && (
              <div className="absolute inset-x-3 bottom-3 z-10 flex gap-2">
                {product.images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`Show photo ${i + 1}`}
                    aria-current={i === activeImage ? 'true' : undefined}
                    className={`relative h-16 w-12 cursor-pointer overflow-hidden rounded-lg border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880] ${
                      i === activeImage ? 'border-[#c5a880]' : 'border-white/30 hover:border-white'
                    }`}
                  >
                    <Image src={src} alt="" fill sizes="48px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-5 p-6 sm:p-8">
            <div className="space-y-2 pr-8">
              {product.reviews > 0 && (
                <div className="flex items-center gap-1 text-xs text-[#a1a1aa]">
                  <Star className="h-3.5 w-3.5 fill-[#c5a880] text-[#c5a880]" aria-hidden="true" />
                  {product.reviews} {product.reviews === 1 ? 'review' : 'reviews'}
                </div>
              )}
              <h2
                className="text-2xl leading-snug text-white sm:text-3xl"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {product.title}
              </h2>
            </div>

            {/* Price */}
            <div>
              <div className="flex flex-wrap items-baseline gap-x-3">
                <span className="text-2xl font-medium tabular-nums text-white">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span className="tabular-nums text-[#8e8e93] line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
              </div>
              {saving > 0 && (
                <p className="mt-1 text-xs text-[#c5a880]">
                  You save {formatPrice(saving)} ({discount}%)
                </p>
              )}
            </div>

            <p className="text-sm font-light leading-relaxed text-[#a1a1aa]">
              {product.description}
            </p>

            {/* Colour */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <p className="mb-2 text-sm text-[#d1d1d6]">
                  Colour: <span className="text-white">{product.color}</span>
                </p>
                <ul className="flex flex-wrap items-center gap-2">
                  {product.colors.map((c) => {
                    const isCurrent = c.name === product.color;
                    const dot = `block h-6 w-6 rounded-full border border-white/25 ${
                      isCurrent ? 'ring-2 ring-[#c5a880] ring-offset-2 ring-offset-[#101012]' : ''
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
                            <span className={dot} style={{ backgroundColor: c.hex }} />
                          </a>
                        ) : (
                          <span title={c.name} className="block p-0.5">
                            <span
                              className={dot}
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
              </div>
            )}

            {/* Size */}
            {needsSize && (
              <fieldset ref={sizeGroupRef}>
                <div className="mb-2 flex items-center justify-between">
                  <legend className="text-sm text-[#d1d1d6]">
                    Size{size && <span className="text-white">: {size}</span>}
                  </legend>
                  <a
                    href={`${STORE_URL}/pages/size-guide`}
                    className="text-xs text-[#c5a880] underline-offset-4 hover:underline"
                  >
                    Size guide
                  </a>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes?.map((s) => (
                    <label key={s} className="relative cursor-pointer">
                      <input
                        type="radio"
                        name={`size-${product.id}`}
                        value={s}
                        checked={size === s}
                        onChange={() => {
                          setSize(s);
                          setSizeError(false);
                        }}
                        className="peer sr-only"
                      />
                      <span
                        className={`flex h-10 min-w-11 items-center justify-center rounded-full border px-3 text-sm tabular-nums transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#c5a880] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#101012] ${
                          size === s
                            ? 'border-[#c5a880] bg-[#c5a880]/10 text-[#f4efe6]'
                            : sizeError
                            ? 'border-red-400/60 text-[#d1d1d6]'
                            : 'border-white/15 text-[#d1d1d6] hover:border-white/35'
                        }`}
                      >
                        {s}
                      </span>
                    </label>
                  ))}
                </div>
                {sizeError && (
                  <p role="alert" className="mt-2 text-xs text-red-400">
                    Please select a size.
                  </p>
                )}
              </fieldset>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#d1d1d6]">Quantity</span>
              <div className="flex items-center rounded-full border border-white/15 bg-white/5">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  aria-label="Decrease quantity"
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880]"
                >
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </button>
                <span className="w-8 text-center tabular-nums text-white" aria-live="polite">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))}
                  disabled={qty >= MAX_QTY}
                  aria-label="Increase quantity"
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880]"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleAdd}
                disabled={!product.inStock}
                className="flex-1 cursor-pointer rounded-full bg-[#f1ece1] py-3.5 text-sm font-medium text-[#111113] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101012] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-[#8e8e93]"
              >
                {product.inStock
                  ? `Add to Cart, ${formatPrice(product.price * qty)}`
                  : 'Sold out'}
              </button>
              <button
                type="button"
                onClick={() => onToggleWishlist(product.id)}
                aria-pressed={isWishlisted}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-[#161619] text-white transition-colors hover:border-white/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880]"
              >
                <Heart
                  className={`h-5 w-5 ${isWishlisted ? 'fill-[#d6264f] text-[#d6264f]' : ''}`}
                  aria-hidden="true"
                />
              </button>
            </div>

            <a
              href={`${STORE_URL}${product.href}`}
              className="inline-flex items-center gap-1.5 self-start text-sm text-[#c5a880] underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:underline"
            >
              View full details
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <p className="border-t border-white/10 pt-4 text-xs text-[#71717a]">
              Genuine leather &middot; Free shipping on orders above &#8377;550
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};