'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowUp ,Loader2 } from 'lucide-react';
import { FOOTER_DATA } from '../../data/content';
import Link from 'next/link';

interface FooterProps {
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
  /**
   * Called with the email when someone subscribes.
   * Connect it to your email service (Mailchimp, Brevo, Shopify, Resend...).
   * Throw an error if it fails, and the form will show the error message.
   */
  onSubscribe?: (email: string) => Promise<void>;
}

// lucide-react no longer ships brand icons, so these are inline SVGs
const SocialIcon = ({ name, className }: { name: string; className?: string }) => {
  const common = {
    viewBox: '0 0 24 24',
    className,
    'aria-hidden': true as const,
  };
  if (name === 'Instagram') {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
      </svg>
    );
  }
  if (name === 'Facebook') {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    );
  }
  return (
    <svg {...common} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <path d="m9.75 15.02 5.75-3.02-5.75-3.02z" fill="currentColor" />
    </svg>
  );
};

type Status = 'idle' | 'loading' | 'success' | 'error' | 'invalid';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenTerms,
  onSubscribe,
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
   const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  const { newsletter } = FOOTER_DATA;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = email.trim();

    if (!EMAIL_PATTERN.test(value)) {
      setStatus('invalid');
      return;
    }

    setStatus('loading');
    try {
      await onSubscribe?.(value);
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  const message =
    status === 'success'
      ? newsletter.success
      : status === 'error'
      ? newsletter.error
      : status === 'invalid'
      ? newsletter.invalid
      : '';

  const linkClass =
    'text-sm text-[#8e8e93] transition-colors hover:text-white focus-visible:outline-none focus-visible:text-white';

  const activeSocials = FOOTER_DATA.socials.filter((s) => s.href);

  const legalHandlers: Record<string, (() => void) | undefined> = {
    'Privacy Policy': onOpenPrivacy,
    'Terms & Conditions': onOpenTerms,
  };

  return (
    <footer className="border-t border-white/5 bg-[#0a0a0c] text-[#8e8e93]">
      <div className="mx-auto max-w-7xl px-4  sm:px-6 lg:px-8">
        {/* Newsletter band */}
        <div className="py-12 sm:py-14">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#141417] p-6 sm:p-10 lg:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#c5a880]/10 blur-3xl"
            />

            <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="space-y-3 lg:col-span-6">
                <h2
                  className="text-3xl font-light leading-tight tracking-tight text-white sm:text-4xl"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {newsletter.title.line1} <br />
                  <span className="font-normal text-[#f4efe6]">
                    {newsletter.title.line2}
                  </span>
                </h2>
                <p className="max-w-md text-sm font-light leading-relaxed text-[#a1a1aa]">
                  {newsletter.text}
                </p>
              </div>

              <div className="lg:col-span-6">
                <form onSubmit={handleSubmit} noValidate className="space-y-3">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <label htmlFor="footer-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="footer-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      inputMode="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status !== 'idle' && status !== 'loading') setStatus('idle');
                      }}
                      placeholder={newsletter.placeholder}
                      aria-invalid={status === 'invalid'}
                      aria-describedby="footer-email-message"
                      disabled={status === 'loading'}
                      className="h-12 w-full rounded-full border border-white/15 bg-[#0e0e10] px-5 text-sm text-white placeholder:text-[#71717a] focus:border-[#c5a880] focus:outline-none focus:ring-2 focus:ring-[#c5a880]/30 disabled:opacity-60"
                    />
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="group inline-flex h-12 shrink-0 cursor-pointer items-center justify-center gap-3 rounded-full bg-[#f1ece1] pl-6 pr-2 text-sm font-medium text-[#111113] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141417] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <span>{newsletter.button}</span>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#141417] text-white transition-transform group-hover:translate-x-0.5">
                        {status === 'loading' ? (
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        ) : (
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        )}
                      </span>
                    </button>
                  </div>

                  <p
                    id="footer-email-message"
                    role="status"
                    aria-live="polite"
                    className={`min-h-[1.25rem] text-xs ${
                      status === 'success' ? 'text-[#c5a880]' : 'text-red-400'
                    }`}
                  >
                    {message}
                  </p>

                  <p className="text-[11px] leading-relaxed text-[#52525b]">
                    By subscribing you agree to our Privacy Policy.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-10 border-t border-white/5 pb-10 pt-12 md:grid-cols-12">
          {/* Brand */}
          <div className="col-span-2 space-y-5 md:col-span-5">
            <Link
              href="#home"
              aria-label={`${FOOTER_DATA.brandName}, back to top`}
              className="inline-block"
            >
              <Image
                src="/logos.png"
                alt={FOOTER_DATA.brandName}
                width={200}
                height={100}
                className="h-10 w-auto"
              />
            </Link>
            <p className="max-w-xs text-sm font-light leading-relaxed">
              {FOOTER_DATA.about}
            </p>

            {activeSocials.length > 0 && (
              <div className="flex items-center gap-2">
                {activeSocials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${FOOTER_DATA.brandName} on ${social.name}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#141417] transition-colors hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880]"
                  >
                    <SocialIcon name={social.name} className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Shop */}
          <nav aria-label="Shop" className="md:col-span-3 md:col-start-7">
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c5a880]">
              Shop
            </h3>
            <ul className="space-y-3">
              {FOOTER_DATA.shopLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Help */}
          <nav aria-label="Help" className="md:col-span-3">
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c5a880]">
              Help
            </h3>
            <ul className="space-y-3">
              {FOOTER_DATA.helpLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 py-6 text-xs sm:flex-row">
          <span className="text-center sm:text-left">
            &copy; {year ?? "2026"} {FOOTER_DATA.brandName}. All rights reserved.
          </span>

          <div className="flex items-center gap-4">
            <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              {FOOTER_DATA.legal.map((link) => {
                const handler = legalHandlers[link.label];
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={
                        handler
                          ? (e) => {
                              e.preventDefault();
                              handler();
                            }
                          : undefined
                      }
                      className="transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-[#141417] transition-colors hover:border-[#c5a880] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880]"
            >
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};