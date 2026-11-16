import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { CollectionItem } from '../data/content';

interface CollectionCardProps {
  collection: CollectionItem;
  priority?: boolean;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
  collection,
  priority = false,
}) => {
  const { title, slug, imageUrl, description, productCount } = collection;
  const comingSoon = productCount === 0;
  const countLabel = `${productCount} ${productCount === 1 ? 'Product' : 'Products'}`;

  // The same inner design is used for both the link and the "coming soon" card
  const content = (
    <>
      <Image
        src={imageUrl}
        alt={description}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className={`object-cover transition-transform duration-700 ease-out ${
          comingSoon ? '' : 'motion-safe:group-hover:scale-105'
        }`}
      />

      {/* Dark gradient so the text is always readable */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {comingSoon && (
        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#e2c499] backdrop-blur-md">
          Coming soon
        </span>
      )}

      {/* Glass panel at the bottom */}
      <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-md transition-colors duration-300 group-hover:border-[#c5a880]/60 group-hover:bg-white/15 sm:inset-x-4 sm:bottom-4">
        <div className="min-w-0">
          <h2
            className="truncate text-lg font-normal leading-snug text-white"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {title}
          </h2>
          <p className="text-xs text-white/70">
            {comingSoon ? 'New pieces on the way' : countLabel}
          </p>
        </div>

        {!comingSoon && (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f1ece1] text-[#111113] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        )}
      </div>
    </>
  );

  const baseClass =
    'group relative block aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-[#161619] shadow-xl';

  // A collection with no products is not a link, so nobody lands on an empty page
  if (comingSoon) {
    return <div className={`${baseClass} opacity-90`}>{content}</div>;
  }

  return (
    <Link
      href={`/collections/${slug}`}
      aria-label={`${title}, ${countLabel}`}
      className={`${baseClass} transition-colors duration-300 hover:border-[#c5a880]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e0e10]`}
    >
      {content}
    </Link>
  );
};