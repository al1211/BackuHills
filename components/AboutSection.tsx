'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Gem, Truck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ABOUT_DATA } from '../data/content';

interface AboutSectionProps {
  onLearnMore?: () => void;
}

// Icon for each pillar, matched by the id in ABOUT_DATA
const PILLAR_ICONS: Record<string, LucideIcon> = {
  'genuine-leather': ShieldCheck,
  handcrafted: Gem,
  delivered: Truck,
};

export const AboutSection: React.FC<AboutSectionProps> = ({ onLearnMore }) => {
  return (
    <section
      id="about"
      className="relative border-t border-white/5 bg-[#101012] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left: content */}
          <div className="space-y-6 lg:col-span-6">
            <div className="space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c5a880] sm:text-xs">
                {ABOUT_DATA.kicker}
              </span>
              <h2
                className="text-3xl font-light leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {ABOUT_DATA.title.line1} <br />
                <span className="font-normal text-[#f4efe6]">
                  {ABOUT_DATA.title.line2}
                </span>
              </h2>
            </div>

            <p className="max-w-xl text-sm font-light leading-relaxed text-[#a1a1aa] sm:text-base">
              {ABOUT_DATA.description}
            </p>

            {/* Three pillars */}
            <div className="grid grid-cols-1 gap-6 border-t border-white/10 pt-6 sm:grid-cols-3">
              {ABOUT_DATA.pillars.map((pillar) => {
                const Icon = PILLAR_ICONS[pillar.id] ?? ShieldCheck;
                return (
                  <div key={pillar.id} className="space-y-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#c5a880]">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <h3 className="text-sm font-medium tracking-wide text-white">
                      {pillar.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-[#8e8e93]">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onLearnMore}
                className="group inline-flex cursor-pointer items-center gap-3 rounded-full border border-white/15 bg-[#1b1b1f] px-5 py-2.5 text-xs font-medium tracking-wide text-white shadow-lg transition-colors duration-200 hover:border-white/30 hover:bg-[#25252b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101012]"
              >
                <span>{ABOUT_DATA.cta}</span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 transition-transform group-hover:translate-x-1">
                  <ArrowRight className="h-3 w-3 text-[#c5a880]" aria-hidden="true" />
                </span>
              </button>
            </div>
          </div>

          {/* Right: image with floating badge */}
          <div className="relative lg:col-span-6">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              {/* Put your image at public/about.jpg */}
              <Image
                src="/3.jpg"
                alt={ABOUT_DATA.imageAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Badge, lower left */}
              <div className="absolute bottom-5 left-5 max-w-[210px] rounded-2xl border border-white/15 bg-[#141418]/85 p-4 shadow-2xl backdrop-blur-md sm:p-5">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c5a880]">
                  {ABOUT_DATA.badge.label}
                </div>
                <div
                  className="text-2xl font-medium text-white sm:text-3xl"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {ABOUT_DATA.badge.title}
                </div>
                <p className="mt-1 whitespace-pre-line text-[11px] leading-snug text-[#d1d1d6]">
                  {ABOUT_DATA.badge.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};