'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { TESTIMONIALS_DATA, TESTIMONIALS_SECTION } from '../data/content';

// "Rohit Sharma" -> "RS"
const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

export const TestimonialSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = TESTIMONIALS_DATA.length;

  if (total === 0) return null;

  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  const handleNext = () => setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'ArrowRight') handleNext();
  };

  const current = TESTIMONIALS_DATA[currentIndex];
  const pad = (n: number) => String(n).padStart(2, '0');

  const navButton =
    'flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-[#161619] text-[#d1d1d6] transition-colors hover:border-white/25 hover:bg-[#222228] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880]';

  return (
    <section
      id="testimonials"
      className="border-t border-white/5 bg-[#0d0d0f] py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* Left: heading and navigation */}
          <div className="space-y-6 lg:col-span-4">
            <div className="space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c5a880] sm:text-xs">
                {TESTIMONIALS_SECTION.kicker}
              </span>
              <h2
                className="text-3xl font-light leading-tight tracking-tight text-white sm:text-4xl"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {TESTIMONIALS_SECTION.title.line1} <br />
                <span className="font-normal text-[#f4efe6]">
                  {TESTIMONIALS_SECTION.title.line2}
                </span>
              </h2>
            </div>

            {total > 1 && (
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous review"
                  className={navButton}
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next review"
                  className={navButton}
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
                <span className="ml-2 text-xs tabular-nums text-[#71717a]">
                  {pad(currentIndex + 1)} / {pad(total)}
                </span>
              </div>
            )}
          </div>

          {/* Right: review card */}
          <div
            className="lg:col-span-8"
            role="group"
            aria-roledescription="carousel"
            aria-label="Customer reviews"
            onKeyDown={handleKeyDown}
          >
            <div
              key={current.id}
              aria-live="polite"
              className="relative rounded-3xl border border-white/10 bg-[#16161a] p-6 shadow-2xl sm:p-8 lg:p-10"
            >
              <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center sm:gap-8">
                {/* Quote and details */}
                <div className="flex flex-1 gap-4 sm:gap-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#c5a880] sm:h-12 sm:w-12">
                    <Quote className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                  </div>

                  <div className="flex-1 space-y-4">
                    <blockquote
                      className="text-base font-light italic leading-relaxed text-[#ededf0] sm:text-lg"
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      &ldquo;{current.quote}&rdquo;
                    </blockquote>

                    {/* Stars and source */}
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <div
                        className="flex items-center gap-1"
                        role="img"
                        aria-label={`${current.rating} out of 5 stars`}
                      >
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            aria-hidden="true"
                            className={`h-3.5 w-3.5 ${
                              i < current.rating
                                ? 'fill-[#e2c499] text-[#e2c499]'
                                : 'text-white/20'
                            }`}
                          />
                        ))}
                      </div>
                      {current.source && (
                        <span className="border-l border-white/10 pl-3 text-xs font-medium text-[#a1a1aa]">
                          {current.source}
                        </span>
                      )}
                    </div>

                    {/* Name, city and product */}
                    <div className="border-t border-white/10 pt-3">
                      <div className="text-sm font-semibold tracking-wide text-white">
                        {current.clientName}
                      </div>
                      {current.location && (
                        <div className="text-xs text-[#8e8e93]">{current.location}</div>
                      )}
                      {current.product && (
                        <div className="mt-1 text-xs text-[#c5a880]">
                          Bought: {current.product}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Avatar, or initials when there is no photo */}
                <div className="mx-auto shrink-0 sm:mx-0">
                  <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-[#c5a880]/50 bg-[#1f1f24] shadow-xl sm:h-24 sm:w-24">
                    {current.avatarUrl ? (
                      <Image
                        src={current.avatarUrl}
                        alt={current.clientName}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    ) : (
                      <span
                        className="text-2xl text-[#c5a880]"
                        style={{ fontFamily: 'var(--font-serif)' }}
                        aria-hidden="true"
                      >
                        {getInitials(current.clientName)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};