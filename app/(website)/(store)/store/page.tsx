// src/app/store/page.tsx   (URL: /store)
import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { ChevronRight } from 'lucide-react';
import { StoreClient, StoreSkeleton } from '../../../components/website/store/StoreClient';
import { PRODUCTS_DATA, STORE_PAGE } from '../../../data/product';
import { STORE_URL } from '../(store)/lib/store';

// Google aur link share ke liye (layout.tsx isme " | Backum Hills" jod deta hai)
export const metadata: Metadata = {
  title: 'Store',
  description:
    'Shop genuine leather belts by Backum Hills. Casual and Western belts in veg-tanned buffalo leather, with free shipping above \u20B9550.',
  alternates: { canonical: '/store' },
};

export default function StorePage() {
  // Google ko products ki list batane ke liye
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: PRODUCTS_DATA.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.title,
      url: `${STORE_URL}${p.href}`,
    })),
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0e0e10]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />

      {/* Halki gold chamak */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-[#c5a880]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 sm:pt-36 lg:px-8 lg:pb-28">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 flex justify-center">
          <ol className="flex items-center gap-1.5 text-xs text-[#8e8e93]">
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3 w-3" />
            </li>
            <li aria-current="page" className="text-[#c5a880]">
              Store
            </li>
          </ol>
        </nav>

        {/* Heading */}
        <header className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c5a880] sm:text-xs">
            {STORE_PAGE.kicker}
          </span>
          <h1
            className="mt-3 text-4xl font-light leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {STORE_PAGE.title}
          </h1>
          <p className="mt-4 text-sm font-light leading-relaxed text-[#a1a1aa] sm:text-base">
            {STORE_PAGE.text}
          </p>
        </header>

        {/* useSearchParams ke liye Suspense zaroori hai */}
        <Suspense fallback={<StoreSkeleton />}>
          <StoreClient />
        </Suspense>
      </div>
    </main>
  );
}