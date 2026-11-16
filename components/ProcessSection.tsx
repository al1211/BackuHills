'use client';

import React from 'react';
import { ArrowRight, Search, Scissors, Sparkles, PackageCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PROCESS_SECTION, PROCESS_STEPS } from '../data/content';

interface ProcessSectionProps {
  onShopNow?: () => void;
}

const ICONS: Record<string, LucideIcon> = {
  Search,
  Scissors,
  Sparkles,
  PackageCheck,
};

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onShopNow }) => {
  return (
    <section
      id="process"
      className="relative overflow-hidden border-t border-white/5 bg-[#0d0d0f] py-20 lg:py-28"
    >
      {/* Soft warm glow in the background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-[#c5a880]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 grid grid-cols-1 items-end gap-6 sm:mb-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c5a880] sm:text-xs">
              {PROCESS_SECTION.kicker}
            </span>
            <h2
              className="mt-2 text-3xl font-light leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {PROCESS_SECTION.title.line1} <br />
              <span className="font-normal text-[#f4efe6]">
                {PROCESS_SECTION.title.line2}
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm font-light leading-relaxed text-[#a1a1aa] sm:text-base lg:col-span-5 lg:justify-self-end">
            {PROCESS_SECTION.intro}
          </p>
        </div>

        {/* Steps */}
        <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, index) => {
            const Icon = ICONS[step.iconName] ?? Search;
            const number = String(index + 1).padStart(2, '0');
            const isLast = index === PROCESS_STEPS.length - 1;

            return (
              <li
                key={step.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#161619] p-6 transition-colors duration-300 hover:border-[#c5a880]/50"
              >
                {/* Large faded step number */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 -top-4 select-none text-8xl font-light leading-none text-white/[0.04] transition-colors duration-300 group-hover:text-[#c5a880]/10"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {number}
                </span>

                {/* Icon */}
                <div className="relative mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-colors duration-300 group-hover:border-[#c5a880]/40 group-hover:bg-[#c5a880]/10">
                  <Icon className="h-5 w-5 text-[#c5a880]" aria-hidden="true" />
                </div>

                {/* Text */}
                <div className="relative space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c5a880]">
                    Step {number}
                  </p>
                  <h3
                    className="text-xl font-normal leading-snug text-white"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm font-light leading-relaxed text-[#a1a1aa]">
                    {step.description}
                  </p>
                </div>

                {/* Connector line to the next card (desktop only) */}
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute -right-5 top-12 hidden h-px w-5 bg-gradient-to-r from-[#c5a880]/40 to-transparent lg:block"
                  />
                )}
              </li>
            );
          })}
        </ol>

        {/* Call to action */}
        {onShopNow && (
          <div className="mt-12 flex justify-center sm:mt-14">
            <button
              type="button"
              onClick={onShopNow}
              className="group inline-flex cursor-pointer items-center gap-3 rounded-full border border-white/15 bg-[#1b1b1f] px-6 py-3 text-xs font-medium tracking-wide text-white shadow-lg transition-colors duration-200 hover:border-white/30 hover:bg-[#25252b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0f]"
            >
              <span>{PROCESS_SECTION.cta}</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 transition-transform group-hover:translate-x-1">
                <ArrowRight className="h-3 w-3 text-[#c5a880]" aria-hidden="true" />
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};