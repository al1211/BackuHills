'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { Hero } from '@/components/website/Hero';
import { AboutSection } from '@/components/website/AboutSection';
import { ServicesSection } from '@/components/website/ServicesSection';
import { FeaturedProductsSection } from '@/components/website/SelectedProjectsSection'; // TODO: rename this file to FeaturedProductsSection.tsx
import { ProcessSection } from '@/components/website/ProcessSection';
import { TestimonialSection } from '@/components/website/TestimonialSection';
import { FaqSection } from '@/components/website/Faq'; // TODO: rename this file to FaqSection.tsx
import { CtaSection } from '@/components/website/CtaSection';
import type { ProductItem, ServiceItem } from '@/app/types';
import LeatherBagScroll from '@/components/website/LeatherBagScrool';

// Where customers actually buy. Product, policy and info pages open here.
// Set NEXT_PUBLIC_STORE_URL in .env.local if the store address changes.
const STORE_URL = process.env.NEXT_PUBLIC_STORE_URL ?? 'https://www.backumhills.com';

export default function HomePage() {
  const router = useRouter();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Pages that exist in this Next.js site stay here, everything else opens on the store
  const goTo = (href: string) => {
    const isLocal = href === '/' || href.startsWith('/collections') || href.startsWith('/#');
    if (isLocal) router.push(href);
    else window.location.assign(`${STORE_URL}${href}`);
  };

  return (
    <main className="flex flex-col">
      <Hero onExploreProjects={() => router.push('/collections')} />
        <LeatherBagScroll/>
      <ServicesSection
        onSelectService={(service: ServiceItem) => goTo(service.href ?? '/collections')}
        />

      <FeaturedProductsSection
        onSelectProduct={(product: ProductItem) => goTo(product.href)}
        onExploreAll={() => router.push('/collections/leather-belts')}
      />

      <AboutSection onLearnMore={() => scrollToSection('process')} />

      <ProcessSection onShopNow={() => router.push('/collections')} />

      <TestimonialSection />

      <FaqSection />

      <CtaSection />
    </main>
  );
}