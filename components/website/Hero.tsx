'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, MapPin } from 'lucide-react';
import { HERO_DATA } from '../../data/content';

interface HeroProps {
  onExploreProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProjects }) => {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[92vh] flex-col justify-between overflow-hidden pt-24 pb-8 lg:min-h-screen"
    >
      {/* Background image: fill + priority = fast LCP, covers any screen size */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero2.jpeg"
          alt={HERO_DATA.imageAlt}
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-center motion-safe:scale-[1.02]"
        />

        {/* Top-to-bottom scrim: keeps the brand title readable and blends into the next section */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0d]/70 via-[#0b0b0d]/30 to-[#0e0e10]" />
        {/* Side scrim: adds depth and keeps left text and right cards readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0d]/75 via-transparent to-[#0b0b0d]/65" />
      </div>

      {/* Top: large brand title */}
      <div className="mx-auto w-full max-w-7xl select-none px-4 pt-4 text-center sm:px-6 sm:pt-6 lg:px-8">
        <h1
          className="text-[12vw] font-medium uppercase leading-none tracking-[0.24em] text-white/90 drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] sm:text-[11vw] lg:text-[7.5rem]"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {HERO_DATA.brandName}
        </h1>
      </div>

      {/* Middle: headline on the left, stat cards on the right */}
      <div className="mx-auto my-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          {/* Left: headline */}
          <div className="space-y-4 lg:col-span-6">
            <h2
              className="text-3xl font-light leading-tight tracking-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {HERO_DATA.headline.line1} <br />
              <span className="font-normal text-[#f0ede6]">{HERO_DATA.headline.line2}</span>
            </h2>

            <p className="max-w-md text-sm font-light leading-relaxed text-[#d1d0d8] drop-shadow sm:text-base">
              {HERO_DATA.subTagline.line1} <br />
              {HERO_DATA.subTagline.line2}
            </p>

            <div className="pt-2">
              <span className="border-b border-[#c5a880]/40 pb-0.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c5a880] sm:text-xs">
                {HERO_DATA.badge}
              </span>
            </div>
          </div>

          {/* Spacer so the cards sit on the right */}
          <div className="hidden lg:col-span-2 lg:block" />

          {/* Right: frosted glass stat cards */}
          <div className="flex flex-col gap-3 sm:gap-4 lg:col-span-4">
            {HERO_DATA.stats.map((stat, idx) => (
              <div
                key={idx}
                className="group rounded-2xl border border-white/10 bg-[#141418]/70 p-4 shadow-xl backdrop-blur-md transition-colors duration-300 hover:border-white/25 sm:p-5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div
                      className="text-2xl font-normal tabular-nums tracking-tight text-white sm:text-3xl"
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      {stat.value}
                    </div>
                    <div className="mt-0.5 text-xs font-medium text-[#a1a1aa]">
                      {stat.label}
                    </div>
                  </div>

                  {idx === 2 && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#c5a880]">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom: call to action */}
      <div className="mx-auto flex w-full max-w-7xl justify-center px-4 pt-2 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onExploreProjects}
          className="group flex cursor-pointer items-center gap-3 rounded-full bg-[#f1ece1] py-2 pl-6 pr-2 text-xs font-medium tracking-wide text-[#111113] shadow-2xl transition-all duration-300 hover:bg-white motion-safe:hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e0e10] sm:text-sm"
        >
          <span>{HERO_DATA.cta}</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#141417] text-white transition-transform group-hover:translate-x-1">
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </button>
      </div>
    </section>
  );
};