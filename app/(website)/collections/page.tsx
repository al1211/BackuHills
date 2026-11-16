import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { CollectionCard } from "../../../components/website/CollectionCard";
import { COLLECTIONS_DATA, COLLECTIONS_PAGE } from '../../../data/content';

// This text is used by Google and when the page is shared
export const metadata: Metadata = {
  title: 'All Collections', // layout adds " | Backum Hills"
  description:
    'Explore Backum Hills collections: genuine leather belts, bags, travel and utility pieces, and our Western collection.',
  alternates: { canonical: '/collections' },
};

export default function CollectionsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0e0e10]">
      {/* Soft warm glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-[#c5a880]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 sm:pt-40 lg:px-8 lg:pb-28">
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
              Collections
            </li>
          </ol>
        </nav>

        {/* Heading */}
        <header className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c5a880] sm:text-xs">
            {COLLECTIONS_PAGE.kicker}
          </span>
          <h1
            className="mt-3 text-4xl font-light leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {COLLECTIONS_PAGE.title}
          </h1>
          <p className="mt-4 text-sm font-light leading-relaxed text-[#a1a1aa] sm:text-base">
            {COLLECTIONS_PAGE.text}
          </p>
        </header>

        {/* Collection cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {COLLECTIONS_DATA.map((collection, index) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              priority={index < 2}
            />
          ))}
        </div>

        {/* Help line */}
        <div className="mt-14 flex flex-col items-center justify-center gap-3 text-center sm:mt-20">
          <p className="text-sm font-light text-[#a1a1aa]">
            Not sure what to pick? We are happy to help.
          </p>
          <Link
            href="/#contact"
            className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-[#1b1b1f] py-2 pl-5 pr-2 text-xs font-medium tracking-wide text-white transition-colors hover:border-white/30 hover:bg-[#25252b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880]"
          >
            <span>Talk to us</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-transform group-hover:translate-x-1">
              <ArrowRight className="h-3 w-3 text-[#c5a880]" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}