'use client';

import React from 'react';
import {
  ArrowRight,
  Link2,
  ShoppingBag,
  Briefcase,
  Star,
  Gift,
  Ruler,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SERVICES_DATA, SERVICES_SECTION } from '../data/content';
import { ServiceItem } from '@/app/types';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

// Icon for each card, matched by iconName in SERVICES_DATA
const ICONS: Record<string, LucideIcon> = {
  Belt: Link2,
  ShoppingBag,
  Briefcase,
  Star,
  Gift,
  Ruler,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
}) => {
  return (
    <section
      id="services"
      className="border-t border-white/5 bg-[#0d0d0f] py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 max-w-2xl sm:mb-16">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c5a880] sm:text-xs">
            {SERVICES_SECTION.kicker}
          </span>
          <h2
            className="mt-2 text-3xl font-light leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {SERVICES_SECTION.title.line1} <br />
            <span className="font-normal text-[#f4efe6]">
              {SERVICES_SECTION.title.line2}
            </span>
          </h2>
        </div>

        {/* 6 cards: 1 column on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {SERVICES_DATA.map((service) => {
            const Icon = ICONS[service.iconName] ?? Star;
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => onSelectService(service)}
                className="group relative flex w-full cursor-pointer flex-col justify-between rounded-2xl border border-white/10 bg-[#161619] p-6 text-left transition-all duration-300 hover:border-[#c5a880]/50 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880] motion-safe:hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-colors group-hover:bg-[#c5a880]/10">
                  <Icon className="h-5 w-5 text-[#c5a880]" aria-hidden="true" />
                </div>

                {/* Title and description */}
                <div className="mb-8 flex-1 space-y-2">
                  <h3 className="text-base font-semibold tracking-wide text-white transition-colors group-hover:text-[#c5a880]">
                    {service.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-[#a1a1aa]">
                    {service.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="pt-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#d1d1d6] transition-all group-hover:border-[#c5a880] group-hover:bg-[#c5a880] group-hover:text-black">
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
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