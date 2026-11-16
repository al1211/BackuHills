'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Check, Gift } from 'lucide-react';
import {
  GIFT_CARD_AMOUNTS,
  GIFT_CARD_PAGE,
} from '@/data/content';

// Where customers buy. Set NEXT_PUBLIC_STORE_URL in .env.local if it changes.
const STORE_URL = process.env.NEXT_PUBLIC_STORE_URL ?? 'https://www.backumhills.com';

const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

export const GiftCardSection: React.FC = () => {
  // Second amount is selected by default
  const [selectedId, setSelectedId] = useState(
    GIFT_CARD_AMOUNTS[1]?.id ?? GIFT_CARD_AMOUNTS[0]?.id
  );

  const selected =
    GIFT_CARD_AMOUNTS.find((a) => a.id === selectedId) ?? GIFT_CARD_AMOUNTS[0];

  if (!selected) return null;

  const buyHref = `${STORE_URL}${selected.href ?? GIFT_CARD_PAGE.storePath}`;

  return (
    <>
      {/* Preview and amount picker */}
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left: card preview */}
        <div className="lg:col-span-6">
          <div className="relative mx-auto w-full max-w-lg">
            {/* Glow behind the card */}
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-[2.5rem] bg-[#c5a880]/10 blur-3xl"
            />

            <div
              role="img"
              aria-label={`Backum Hills gift card worth ${formatPrice(selected.value)}`}
              className="relative aspect-[1.586/1] w-full overflow-hidden rounded-3xl border border-[#c5a880]/30 bg-gradient-to-br from-[#2e2218] via-[#1b140e] to-[#0e0b09] shadow-2xl"
            >
              {/* Soft sheen */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.06] to-transparent"
              />

              {/* Leather stitching */}
              <div
                aria-hidden="true"
                className="absolute inset-3 rounded-2xl border border-dashed border-[#c5a880]/40 sm:inset-4"
              />

              <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
                <div className="flex items-start justify-between gap-3">
                  <Image
                    src="/logos.png"
                    alt=""
                    width={280}
                    height={100}
                    className="h-7 w-auto max-w-[150px] object-contain sm:h-9"
                  />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c5a880] sm:text-xs">
                    Gift Card
                  </span>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/50">
                    Value
                  </p>
                  <p
                    className="text-5xl font-light tabular-nums leading-none text-[#f4efe6] sm:text-6xl"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {formatPrice(selected.value)}
                  </p>
                </div>

                <div className="flex items-end justify-between gap-3 text-[10px] text-white/50 sm:text-xs">
                  <span>Genuine leather. Made to last.</span>
                  <span className="tracking-[0.3em]" aria-hidden="true">
                    &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull;
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: picker */}
        <div className="space-y-8 lg:col-span-6">
          <div className="space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c5a880] sm:text-xs">
              {GIFT_CARD_PAGE.kicker}
            </span>
            <h1
              className="text-4xl font-light leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {GIFT_CARD_PAGE.title.line1} <br />
              <span className="font-normal text-[#f4efe6]">
                {GIFT_CARD_PAGE.title.line2}
              </span>
            </h1>
            <p className="max-w-md text-sm font-light leading-relaxed text-[#a1a1aa] sm:text-base">
              {GIFT_CARD_PAGE.text}
            </p>
          </div>

          <fieldset>
            <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#d1d1d6]">
              {GIFT_CARD_PAGE.amountLabel}
            </legend>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {GIFT_CARD_AMOUNTS.map((amount) => {
                const isSelected = amount.id === selected.id;
                return (
                  <label key={amount.id} className="relative cursor-pointer">
                    <input
                      type="radio"
                      name="gift-card-amount"
                      value={amount.id}
                      checked={isSelected}
                      onChange={() => setSelectedId(amount.id)}
                      className="peer sr-only"
                    />
                    <span
                      className={`flex h-14 items-center justify-center rounded-2xl border text-base font-medium tabular-nums transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#c5a880] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#0e0e10] ${
                        isSelected
                          ? 'border-[#c5a880] bg-[#c5a880]/10 text-[#f4efe6]'
                          : 'border-white/10 bg-[#161619] text-[#d1d1d6] hover:border-white/25'
                      }`}
                    >
                      {isSelected && (
                        <Check className="mr-1.5 h-4 w-4 text-[#c5a880]" aria-hidden="true" />
                      )}
                      {formatPrice(amount.value)}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="space-y-3">
            <a
              href={buyHref}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#f1ece1] py-3 pl-6 pr-2 text-sm font-medium tracking-wide text-[#111113] shadow-2xl transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e0e10] sm:w-auto sm:justify-start"
            >
              <Gift className="h-4 w-4" aria-hidden="true" />
              <span>
                {GIFT_CARD_PAGE.cta}, {formatPrice(selected.value)}
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#141417] text-white transition-transform group-hover:translate-x-1">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </a>
            <p className="text-xs text-[#71717a]">{GIFT_CARD_PAGE.ctaNote}</p>
          </div>
        </div>
      </div>

      {/* How it works */}
      <section aria-labelledby="how-it-works" className="mt-20 sm:mt-28">
        <h2
          id="how-it-works"
          className="mb-8 text-center text-2xl font-light text-white sm:text-3xl"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          How it works
        </h2>
        <ol className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {GIFT_CARD_PAGE.steps.map((step, index) => (
            <li
              key={step.id}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#161619] p-6"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-1 -top-3 select-none text-7xl font-light leading-none text-white/[0.04]"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c5a880]">
                Step {index + 1}
              </p>
              <h3
                className="mt-2 text-xl text-white"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {step.title}
              </h3>
              <p className="mt-2 text-sm font-light leading-relaxed text-[#a1a1aa]">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Good to know */}
      <section aria-labelledby="good-to-know" className="mx-auto mt-16 max-w-3xl sm:mt-20">
        <h2
          id="good-to-know"
          className="mb-6 text-center text-2xl font-light text-white sm:text-3xl"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Good to know
        </h2>
        <div className="space-y-3">
          {GIFT_CARD_PAGE.goodToKnow.map((item) => (
            <details
              key={item.id}
              className="group rounded-2xl border border-white/10 bg-[#161619] open:border-[#c5a880]/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880] sm:px-6 [&::-webkit-details-marker]:hidden">
                <span
                  className="text-base sm:text-lg"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#c5a880] transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="px-5 pb-5 text-sm font-light leading-relaxed text-[#a1a1aa] sm:px-6">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
};