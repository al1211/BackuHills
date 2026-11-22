"use client";

import React from "react";
import { ShieldCheck, Award, Flame, ArrowRight, HeartHandshake } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[#0f0f12] text-neutral-200 selection:bg-[#c5a880] selection:text-black">
      
      {/* Hero Header Banner */}
      <div className="border-b border-white/10 bg-[#141418]/60 backdrop-blur-md py-20 px-6 text-center">
        <span className="text-[10px] tracking-[0.25em] uppercase text-[#c5a880] font-semibold">
          Authentic Craftsmanship
        </span>
        <h1
          className="text-3xl sm:text-5xl font-light text-white mt-2 mb-4"
          style={{ fontFamily: "var(--font-serif), serif" }}
        >
          About Backum Hills
        </h1>
        <p className="text-xs sm:text-base text-[#8e8e93] max-w-2xl mx-auto font-light leading-relaxed">
          Crafting premium leather bags, belts, and luxury travel accessories with timeless design, durability, and authentic Indian craftsmanship.
        </p>
      </div>

      {/* Main Content Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#c5a880] font-semibold">
              Our Legacy
            </span>
            <h2
              className="text-2xl sm:text-3xl font-light text-white"
              style={{ fontFamily: "var(--font-serif), serif" }}
            >
              Born from the Heartland of Leather Craftsmanship
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa] font-light leading-relaxed">
              Based in Kanpur—the leather hub of India—Backum Hills was created with a singular vision: to blend age-old artisanal leather working techniques with sleek, modern minimalism.
            </p>
            <p className="text-xs sm:text-sm text-[#8e8e93] font-light leading-relaxed">
              Every bag, belt, and accessory we craft is made using genuine full-grain and top-grain hides, designed to age gracefully over time and tell a story of longevity and luxury.
            </p>
          </div>

          {/* Image Showcase Box */}
          <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-[#141418] p-2 shadow-2xl">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900">
              <img
                src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop"
                alt="Backum Hills Leather Craftsmanship"
                className="w-full h-full object-cover grayscale contrast-125 opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>

        {/* Brand Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
          <div className="p-6 rounded-3xl bg-[#141418] border border-white/15 space-y-3 shadow-xl">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-[#c5a880] w-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-medium text-white">Genuine Materials</h3>
            <p className="text-xs text-[#8e8e93] leading-relaxed font-light">
              We never compromise on material. Only authentic leather and solid metal hardware enter our production line.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#141418] border border-white/15 space-y-3 shadow-xl">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-[#c5a880] w-fit">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-medium text-white">Artisanal Precision</h3>
            <p className="text-xs text-[#8e8e93] leading-relaxed font-light">
              Hand-stitched details and hand-finished edges ensure every piece withstands the test of time.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#141418] border border-white/15 space-y-3 shadow-xl">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-[#c5a880] w-fit">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-base font-medium text-white">Fair & Direct</h3>
            <p className="text-xs text-[#8e8e93] leading-relaxed font-light">
              By bringing products straight from our factory to your doorstep, we offer luxury quality without inflated markups.
            </p>
          </div>
        </div>

        {/* Call to Action Box */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white/5 border border-white/10 text-center space-y-4">
          <h2
            className="text-2xl sm:text-3xl font-light text-white"
            style={{ fontFamily: "var(--font-serif), serif" }}
          >
            Explore Our Handcrafted Collections
          </h2>
          <p className="text-xs sm:text-sm text-[#8e8e93] max-w-lg mx-auto font-light">
            Discover our wide range of premium leather belts, utility bags, and western collections.
          </p>
          <div className="pt-2">
            <a
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#f1ece1] hover:bg-white text-black text-xs font-semibold shadow-lg transition-all"
            >
              <span>Shop Collections</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}