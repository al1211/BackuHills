'use client';

import React, { useState } from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import { FAQ_DATA, FAQ_SECTION } from '../data/content';

export const FaqSection: React.FC = () => {
  // The first question is open by default. Use null to start with all closed.
  const [openId, setOpenId] = useState<string | null>(FAQ_DATA[0]?.id ?? null);

  if (FAQ_DATA.length === 0) return null;

  // Helps Google show these questions in search results
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_DATA.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <section
      id="faq"
      className="border-t border-white/5 bg-[#101012] py-20 lg:py-28"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: heading and help card */}
          <div className="space-y-8 lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <div className="space-y-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c5a880] sm:text-xs">
                {FAQ_SECTION.kicker}
              </span>
              <h2
                className="text-3xl font-light leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {FAQ_SECTION.title.line1} <br />
                <span className="font-normal text-[#f4efe6]">
                  {FAQ_SECTION.title.line2}
                </span>
              </h2>
              <p className="max-w-md text-sm font-light leading-relaxed text-[#a1a1aa] sm:text-base">
                {FAQ_SECTION.text}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#161619] p-6">
              <h3
                className="text-lg text-white"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {FAQ_SECTION.helpTitle}
              </h3>
              <p className="mt-1 text-sm font-light leading-relaxed text-[#a1a1aa]">
                {FAQ_SECTION.helpText}
              </p>
              <a
                href={FAQ_SECTION.helpHref}
                className="group mt-4 inline-flex items-center gap-3 rounded-full border border-white/15 bg-[#1b1b1f] py-2 pl-5 pr-2 text-xs font-medium tracking-wide text-white transition-colors hover:border-white/30 hover:bg-[#25252b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880]"
              >
                <span>{FAQ_SECTION.helpCta}</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-transform group-hover:translate-x-1">
                  <ArrowRight className="h-3 w-3 text-[#c5a880]" aria-hidden="true" />
                </span>
              </a>
            </div>
          </div>

          {/* Right: accordion */}
          <div className="space-y-3 lg:col-span-7">
            {FAQ_DATA.map((item) => {
              const isOpen = openId === item.id;
              const buttonId = `faq-button-${item.id}`;
              const panelId = `faq-panel-${item.id}`;

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border bg-[#161619] transition-colors duration-300 ${
                    isOpen ? 'border-[#c5a880]/40' : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880] sm:px-6 sm:py-5"
                    >
                      <span
                        className={`text-base leading-snug transition-colors sm:text-lg ${
                          isOpen ? 'text-[#f4efe6]' : 'text-white'
                        }`}
                        style={{ fontFamily: 'var(--font-serif)' }}
                      >
                        {item.question}
                      </span>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isOpen
                            ? 'rotate-45 border-[#c5a880] bg-[#c5a880] text-black'
                            : 'border-white/10 bg-white/5 text-[#c5a880]'
                        }`}
                      >
                        <Plus className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </button>
                  </h3>

                  {/* Smooth open and close using grid rows */}
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm font-light leading-relaxed text-[#a1a1aa] sm:px-6 sm:pb-6 sm:text-base">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};