import React from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { CONTACT_INFO, CONTACT_SECTION } from '../../data/content';

// WhatsApp brand icon (lucide no longer ships brand icons)
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.9 11.9 0 0 0 5.75 1.47h.01c6.55 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.44-8.44ZM12.06 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.74.98 1-3.65-.24-.38a9.88 9.88 0 0 1-1.52-5.26c0-5.46 4.45-9.9 9.92-9.9 2.64 0 5.13 1.03 7 2.9a9.84 9.84 0 0 1 2.9 7c0 5.46-4.45 9.9-9.9 9.9Zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
  </svg>
);

export const CtaSection: React.FC = () => {
  const phoneHref = `tel:${CONTACT_INFO.phone.replace(/[^\d+]/g, '')}`;
  const whatsappHref = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(
    CONTACT_INFO.whatsappMessage
  )}`;

  return (
    <section
      id="contact"
      className="border-t border-white/5 bg-[#101012] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#161619] p-6 shadow-2xl sm:p-10 lg:p-14">
          {/* Soft warm glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-[#c5a880]/5 blur-3xl"
          />

          <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            {/* Left: heading and contact details */}
            <div className="space-y-6 lg:col-span-7">
              <div className="space-y-3">
                <h2
                  className="text-3xl font-light leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {CONTACT_SECTION.title.line1} <br />
                  <span className="font-normal text-[#f4efe6]">
                    {CONTACT_SECTION.title.line2}
                  </span>
                </h2>
                <p className="max-w-xl text-sm font-light text-[#a1a1aa] sm:text-base">
                  {CONTACT_SECTION.text}
                </p>
              </div>

              {/* Contact details */}
              <div
                className={`grid grid-cols-1 gap-6 border-t border-white/10 pt-6 ${
                  CONTACT_INFO.address ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
                }`}
              >
                <a href={phoneHref} className="group block min-w-0 space-y-1">
                  <div className="flex items-center gap-2 text-white transition-colors group-hover:text-[#c5a880]">
                    <Phone className="h-4 w-4 shrink-0 text-[#c5a880]" aria-hidden="true" />
                    <span className="text-xs font-medium tracking-tight sm:text-sm">
                      {CONTACT_INFO.phone}
                    </span>
                  </div>
                  <div className="pl-6 text-[11px] text-[#71717a]">Call us</div>
                </a>

                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="group block min-w-0 space-y-1"
                >
                  <div className="flex items-center gap-2 text-white transition-colors group-hover:text-[#c5a880]">
                    <Mail className="h-4 w-4 shrink-0 text-[#c5a880]" aria-hidden="true" />
                    <span className="truncate text-xs font-medium tracking-tight sm:text-sm">
                      {CONTACT_INFO.email}
                    </span>
                  </div>
                  <div className="pl-6 text-[11px] text-[#71717a]">Email us</div>
                </a>

                {CONTACT_INFO.address && (
                  <div className="space-y-1">
                    <div className="flex items-start gap-2 text-white">
                      <MapPin
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#c5a880]"
                        aria-hidden="true"
                      />
                      <address className="text-xs not-italic leading-relaxed text-[#d1d1d6]">
                        {CONTACT_INFO.address}
                      </address>
                    </div>
                    <div className="pl-6 text-[11px] text-[#71717a]">Visit us</div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: image card with WhatsApp button */}
            <div className="flex justify-center lg:col-span-5 lg:justify-end">
              <div className="group relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/15 bg-[#1c1c20] shadow-2xl">
                <div className="relative h-48 overflow-hidden sm:h-52">
                  {/* Put your image at public/contact.jpg */}
                  <Image
                    src="/contact.jpg"
                    alt={CONTACT_SECTION.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 384px, 100vw"
                    className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="group/btn flex items-center gap-3 rounded-full bg-[#f1ece1] py-3 pl-5 pr-2 text-xs font-medium tracking-wide text-[#111113] shadow-2xl transition-all duration-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880] focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:text-sm motion-safe:hover:scale-105"
                    >
                      <WhatsAppIcon className="h-4 w-4 text-[#1f9d55]" />
                      <span>{CONTACT_SECTION.cta}</span>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#141417] text-white transition-transform group-hover/btn:translate-x-1">
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </a>
                    <span className="text-[11px] text-white/70">
                      {CONTACT_SECTION.ctaNote}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};