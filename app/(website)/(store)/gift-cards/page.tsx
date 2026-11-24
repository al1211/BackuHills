import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { GiftCardSection } from '../../../../components/website/GiftCard';

export const metadata: Metadata = {
  title: 'Gift Cards', // layout adds " | Backum Hills"
  description:
    'Give the gift of real leather. Backum Hills gift cards let them choose their own genuine leather belt or bag.',
  alternates: { canonical: '/gift-cards' },
};

export default function GiftCardsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0e0e10]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-[#c5a880]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 sm:pt-36 lg:px-8 lg:pb-28">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-10">
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
              Gift Cards
            </li>
          </ol>
        </nav>

        <GiftCardSection />
      </div>
    </main>
  );
}