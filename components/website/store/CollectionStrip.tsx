'use client';

// src/components/store/CollectionStrip.tsx
// Page ke upar ki collection photo wali patti.
// Photo dabane par us collection ka filter lagta hai (dobara dabane par hat jaata hai).
import React from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';

export interface StripCollection {
  slug: string;
  title: string;
  imageUrl: string;
  count: number;
}

interface CollectionStripProps {
  collections: StripCollection[];
  active: string[];
  onToggle: (slug: string) => void;
}

export const CollectionStrip: React.FC<CollectionStripProps> = ({
  collections,
  active,
  onToggle,
}) => {
  return (
    <section aria-label="Browse by collection">
      {/* Phone par side mein scroll, laptop par 4 barabar column */}
      <ul className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:pb-0">
        {collections.map((c) => {
          const isActive = active.includes(c.slug);
          const comingSoon = c.count === 0;

          return (
            <li key={c.slug} className="w-[72%] shrink-0 snap-start sm:w-[44%] lg:w-auto">
              <button
                type="button"
                onClick={() => onToggle(c.slug)}
                disabled={comingSoon}
                aria-pressed={isActive}
                className={`group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border bg-[#161619] text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e0e10] ${
                  isActive
                    ? 'border-[#c5a880]'
                    : 'border-white/10 enabled:hover:border-white/30'
                } ${comingSoon ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <Image
                  src={c.imageUrl}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 44vw, 72vw"
                  className={`object-cover transition-transform duration-700 ease-out ${
                    comingSoon ? 'opacity-60' : 'motion-safe:group-hover:scale-105'
                  }`}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                {comingSoon && (
                  <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#e2c499] backdrop-blur-md">
                    Coming soon
                  </span>
                )}

                {isActive && (
                  <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#c5a880] text-[#111113]">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                )}

                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p
                    className="text-lg leading-snug text-white"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {c.title}
                  </p>
                  <p className="text-xs text-white/70">
                    {comingSoon
                      ? 'New pieces on the way'
                      : `${c.count} ${c.count === 1 ? 'product' : 'products'}`}
                  </p>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};