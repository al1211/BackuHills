'use client';

// src/components/cart/CartDrawer.tsx
// Side se nikalne wala cart. layout.tsx mein ek baar lagana hai.
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useModal } from '@/hooks/useModal';
import { CONTACT_INFO } from '@/data/content';
import { STORE_URL, formatPrice } from '../../../app/(website)/lib/store';
import { MAX_QTY, useCart } from './CartProvider';

const FREE_SHIPPING_ABOVE = 550;

export const CartDrawer: React.FC = () => {
  const { lines, count, subtotal, isOpen, close, setQty, remove, clear } = useCart();
  const panelRef = useRef<HTMLElement>(null);

  useModal(isOpen, close, panelRef);

  // WhatsApp par bhejne ke liye order ka message
  const whatsappMessage = [
    'Hi Backum Hills, I would like to order:',
    '',
    ...lines.map(
      (l, i) =>
        `${i + 1}. ${l.title}${l.size ? ` (Size ${l.size})` : ''} x${l.qty} - ${formatPrice(
          l.price * l.qty
        )}`
    ),
    '',
    `Total: ${formatPrice(subtotal)}`,
  ].join('\n');

  const whatsappHref = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  // Store par seedha checkout tabhi jab har item ka variantId diya ho
  const canCheckoutOnStore = lines.length > 0 && lines.every((l) => l.variantId);
  const storeCheckoutHref = canCheckoutOnStore
    ? `${STORE_URL}/cart/${lines.map((l) => `${l.variantId}:${l.qty}`).join(',')}`
    : '';

  return (
    <div
      className={`fixed inset-0 z-[80] transition-[visibility] duration-300 ${
        isOpen ? 'visible' : 'invisible'
      }`}
      aria-hidden={!isOpen}
    >
      {/* Peeche ka dhundhla parda */}
      <div
        onClick={close}
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        tabIndex={-1}
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#101012] shadow-2xl transition-transform duration-300 ease-out motion-reduce:transition-none ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Upar ki patti */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
          <h2
            className="text-xl text-white"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Your Cart{count > 0 && <span className="text-[#c5a880]"> ({count})</span>}
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close cart"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880]"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {lines.length === 0 ? (
          /* Khali cart */
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#c5a880]">
              <ShoppingBag className="h-7 w-7" aria-hidden="true" />
            </span>
            <p
              className="text-xl text-white"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Your cart is empty
            </p>
            <p className="max-w-xs text-sm font-light text-[#a1a1aa]">
              Pick a belt you like and it will show up here.
            </p>
            <Link
              href="/store"
              onClick={close}
              className="rounded-full bg-[#f1ece1] px-6 py-3 text-sm font-medium text-[#111113] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880]"
            >
              Go to Store
            </Link>
          </div>
        ) : (
          <>
            {/* Items */}
            <ul className="flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:px-6">
              {lines.map((line) => (
                <li
                  key={line.key}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-[#161619] p-3"
                >
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-[#1d1d21]">
                    {line.image && (
                      <Image
                        src={line.image}
                        alt={line.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    )}
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="space-y-0.5">
                      <a
                        href={`${STORE_URL}${line.href}`}
                        className="line-clamp-2 text-sm font-medium leading-snug text-white transition-colors hover:text-[#c5a880]"
                      >
                        {line.title}
                      </a>
                      {line.size && (
                        <p className="text-xs text-[#8e8e93]">Size: {line.size}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      {/* Quantity */}
                      <div className="flex items-center rounded-full border border-white/10 bg-white/5">
                        <button
                          type="button"
                          onClick={() => setQty(line.key, line.qty - 1)}
                          disabled={line.qty <= 1}
                          aria-label={`Decrease quantity of ${line.title}`}
                          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880]"
                        >
                          <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                        <span
                          className="w-7 text-center text-sm tabular-nums text-white"
                          aria-live="polite"
                        >
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(line.key, line.qty + 1)}
                          disabled={line.qty >= MAX_QTY}
                          aria-label={`Increase quantity of ${line.title}`}
                          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880]"
                        >
                          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>

                      <span className="text-sm font-medium tabular-nums text-white">
                        {formatPrice(line.price * line.qty)}
                      </span>

                      <button
                        type="button"
                        onClick={() => remove(line.key)}
                        aria-label={`Remove ${line.title} from cart`}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#8e8e93] transition-colors hover:bg-white/10 hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880]"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Neeche: total aur buttons */}
            <div className="space-y-4 border-t border-white/10 bg-[#0e0e10] px-5 py-5 sm:px-6">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-[#a1a1aa]">Subtotal</span>
                <span className="text-xl font-medium tabular-nums text-white">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <p className="text-xs text-[#8e8e93]">
                {subtotal >= FREE_SHIPPING_ABOVE
                  ? 'Free shipping applied.'
                  : `Add ${formatPrice(FREE_SHIPPING_ABOVE - subtotal)} more for free shipping.`}
              </p>

              <div className="space-y-3">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#f1ece1] py-3.5 text-sm font-medium text-[#111113] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e0e10]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Order on WhatsApp
                </a>

                {canCheckoutOnStore && (
                  <a
                    href={storeCheckoutHref}
                    className="flex w-full items-center justify-center rounded-full border border-white/15 bg-[#1b1b1f] py-3.5 text-sm font-medium text-white transition-colors hover:border-white/30 hover:bg-[#25252b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880]"
                  >
                    Checkout on Store
                  </a>
                )}

                <button
                  type="button"
                  onClick={clear}
                  className="w-full cursor-pointer text-center text-xs text-[#8e8e93] transition-colors hover:text-white focus-visible:outline-none focus-visible:text-white"
                >
                  Clear cart
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
};