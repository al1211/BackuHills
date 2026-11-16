'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { CartButton } from '@/components/cart/CartButton';
import { Phone, ArrowRight, Menu, X } from 'lucide-react';

interface HeaderProps {
  /** Optional. When missing, the Shop Now button opens /collections. */
  onShopNow?: () => void;
}

// TODO: replace with the real phone number of the firm
const CONTACT = {
  phoneDisplay: '+91 00000 00000',
  phoneHref: 'tel:+910000000000',
  instagram: 'https://instagram.com/backumhills',
};

// Order matches the order of sections on the page
const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Collections', href: '#services' },
  { name: 'Store', href: '/store' },
  { name: 'About Us', href: '#about' },
  { name: 'Reviews', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

// lucide-react no longer ships brand icons, so Instagram is an inline SVG
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);

export const Header: React.FC<HeaderProps> = ({ onShopNow }) => {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';
  // On other pages, section links must point back to the home page (/#about)
  const linkBase = isHome ? '' : '/';
  const handleShop = () => (onShopNow ? onShopNow() : router.push('/store'));

  // #section links need a leading / on other pages, page links (/store) stay as they are
  const resolveHref = (href: string) => (href.startsWith('#') ? `${linkBase}${href}` : href);
  const isLinkActive = (href: string) =>
    href.startsWith('#') ? activeNav === href : pathname.startsWith(href);

  const [activeNav, setActiveNav] = useState('#home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Solid background after scrolling
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the link of the section currently in view
  useEffect(() => {
    const sections = NAV_LINKS.filter((l) => l.href.startsWith('#'))
      .map((l) => document.querySelector(l.href))
      .filter(
      (el): el is Element => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveNav(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  // No section is "active" on pages other than home
  useEffect(() => {
    if (!isHome) setActiveNav('');
  }, [isHome]);

  // Mobile menu: close on Escape, close when going to desktop, lock page scroll
  useEffect(() => {
    if (!isMenuOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [isMenuOpen]);

  const solid = isScrolled || isMenuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? 'border-b border-white/5 bg-[#0e0e10]/95 py-2.5 shadow-2xl backdrop-blur-md sm:py-3'
          : 'bg-transparent py-3 sm:py-5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          {/* Logo */}
          <a
            href={`${linkBase}#home`}
            onClick={() => setActiveNav('#home')}
            aria-label="Backum Hills, go to home"
            className="shrink-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880]"
          >
            <Image
              src="/logos.png"
              alt="Backum Hills"
              width={280}
              height={100}
              priority
              className="h-9 w-auto max-w-[220px] object-contain sm:h-11 lg:h-12"
            />
          </a>

          {/* Desktop navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center rounded-full border border-white/10 bg-[#151518]/85 px-1.5 py-1.5 shadow-xl backdrop-blur-md lg:flex"
          >
            {NAV_LINKS.map((link) => {
              const isActive = isLinkActive(link.href);
              return (
                <a
                  key={link.name}
                  href={resolveHref(link.href)}
                  onClick={() => setActiveNav(link.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880] xl:px-4 ${
                    isActive
                      ? 'bg-white font-semibold text-[#111113] shadow-md'
                      : 'text-[#d1d1d6] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={handleShop}
              className="group flex cursor-pointer items-center gap-2 rounded-full bg-white/95 py-1.5 pl-4 pr-1.5 text-xs font-medium text-[#121214] shadow-md transition-all duration-200 hover:bg-white hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880]"
            >
              <span>Shop Now</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#121214] text-white transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </button>

            <CartButton />

            <div className="hidden items-center gap-1.5 text-[#b0b0b8] xl:flex">
              <a
                href={CONTACT.phoneHref}
                aria-label="Call Backum Hills"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#161619]/80 transition-colors hover:border-white/30 hover:bg-[#202024] hover:text-white"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Backum Hills on Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#161619]/80 transition-colors hover:border-white/30 hover:bg-[#202024] hover:text-white"
              >
                <InstagramIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Mobile and tablet actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={handleShop}
              className="hidden rounded-full bg-white px-4 py-2 text-xs font-medium text-[#121214] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880] sm:inline-flex"
            >
              Shop Now
            </button>
            <CartButton />
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#161619] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880]"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-[#111114] px-4 pb-6 pt-4 sm:px-6 lg:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = isLinkActive(link.href);
              return (
                <a
                  key={link.name}
                  href={resolveHref(link.href)}
                  onClick={() => {
                    setActiveNav(link.href);
                    setIsMenuOpen(false);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`rounded-lg px-3 py-3 text-base transition-colors ${
                    isActive
                      ? 'bg-white/10 font-medium text-white'
                      : 'text-[#a1a1aa] hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => {
              setIsMenuOpen(false);
              handleShop();
            }}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-sm font-medium text-[#121214]"
          >
            Shop Now
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>

          <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
            <a href={CONTACT.phoneHref} className="text-sm text-[#a1a1aa]">
              {CONTACT.phoneDisplay}
            </a>
            <div className="flex items-center gap-2 text-white">
              <a
                href={CONTACT.phoneHref}
                aria-label="Call Backum Hills"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1c1c20]"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Backum Hills on Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1c1c20]"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};