"use client";

import React, { useState } from "react";
import { Ruler, ShieldCheck, HelpCircle, ArrowRight, Sparkles } from "lucide-react";

export default function BeltSizeGuidePage() {
  const [selectedWaist, setSelectedWaist] = useState<number>(34);

  const sizeTable = [
    { waist: 30, belt: 32 },
    { waist: 32, belt: 34 },
    { waist: 34, belt: 36 },
    { waist: 36, belt: 38 },
    { waist: 38, belt: 40 },
    { waist: 40, belt: 42 },
    { waist: 42, belt: 44 },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f12] text-neutral-200 selection:bg-[#c5a880] selection:text-black">
      {/* Header Banner */}
      <div className="border-b border-white/10 bg-[#141418]/60 backdrop-blur-md py-16 px-6 text-center">
        <span className="text-[10px] tracking-[0.25em] uppercase text-[#c5a880] font-semibold">
          Fit & Sizing
        </span>
        <h1
          className="text-3xl sm:text-4xl font-light text-white mt-1 mb-3"
          style={{ fontFamily: "var(--font-serif), serif" }}
        >
          Belt Size Guide
        </h1>
        <p className="text-xs sm:text-sm text-[#8e8e93] max-w-xl mx-auto font-light">
          Choosing the right belt size ensures both comfort and style. Backum Hills belts are crafted to provide a precise fit for everyday wear.
        </p>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        {/* Rule Highlight Card */}
        <div className="bg-[#141418] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center gap-6">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-[#c5a880] shrink-0">
            <Ruler className="w-8 h-8" />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] tracking-wider uppercase text-[#c5a880] font-semibold">
              The Golden Rule
            </span>
            <h2 className="text-lg font-medium text-white">How to Measure Your Belt Size</h2>
            <p className="text-xs sm:text-sm text-[#8e8e93] font-light leading-relaxed">
              For the best and most comfortable fit, always choose a belt that is approximately <strong className="text-white">2 inches larger</strong> than your actual waist size.
            </p>
          </div>
        </div>

        {/* Interactive Fit Calculator / Quick View */}
        <div className="bg-[#141418] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-base font-medium text-white">Quick Size Finder</h3>
              <p className="text-xs text-[#8e8e93]">Select your waist size to find your recommended belt size</p>
            </div>
            <Sparkles className="w-5 h-5 text-[#c5a880]" />
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
            {sizeTable.map((item) => {
              const isSelected = selectedWaist === item.waist;
              return (
                <button
                  key={item.waist}
                  onClick={() => setSelectedWaist(item.waist)}
                  className={`py-3 px-2 rounded-2xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#c5a880] text-black border-[#c5v880] font-semibold shadow-lg shadow-[#c5a880]/10"
                      : "bg-white/5 text-[#a1a1aa] border-white/10 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className="text-[10px] opacity-80 uppercase">Waist</div>
                  <div className="text-sm sm:text-base font-bold">{item.waist}&quot;</div>
                </button>
              );
            })}
          </div>

          {/* Result Box */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs sm:text-sm">
            <div className="text-[#8e8e93]">
              Your Waist: <strong className="text-white">{selectedWaist}&quot;</strong>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#8e8e93]">Recommended Belt:</span>
              <span className="px-3 py-1 rounded-xl bg-[#c5a880]/10 border border-[#c5a880]/30 text-[#c5a880] font-bold text-base">
                {selectedWaist + 2}&quot; Belt
              </span>
            </div>
          </div>
        </div>

        {/* Belt Size Chart Table */}
        <div className="bg-[#141418] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
          <h3 className="text-base font-medium text-white border-b border-white/10 pb-3">
            Complete Belt Size Chart
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-[#8e8e93] uppercase text-[11px]">
                  <th className="py-3 px-4 font-medium">Waist Size</th>
                  <th className="py-3 px-4 font-medium">Recommended Belt Size</th>
                  <th className="py-3 px-4 font-medium text-right">Fit Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-[#a1a1aa]">
                {sizeTable.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-white">{row.waist}&quot;</td>
                    <td className="py-3.5 px-4 text-[#c5a880] font-semibold">{row.belt}&quot;</td>
                    <td className="py-3.5 px-4 text-right text-xs text-[#8e8e93]">Optimal Fit (+2&quot;)</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Measuring Existing Belt Guide */}
        <div className="bg-[#141418] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-xl space-y-3">
          <h3 className="text-base font-medium text-white">Measuring an Existing Belt</h3>
          <p className="text-xs sm:text-sm text-[#8e8e93] font-light leading-relaxed">
            Lay your favorite belt flat and measure from the <strong className="text-white">buckle pin</strong> to the <strong className="text-white">hole you use most often</strong>. Compare this measurement with the size chart above to determine your ideal Backum Hills belt size.
          </p>
        </div>

        {/* Support Section */}
        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-[#c5a880] shrink-0 mx-auto">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Need Help With Sizing?</h4>
              <p className="text-xs text-[#8e8e93]">If you&apos;re unsure about your size, feel free to contact our support team.</p>
            </div>
          </div>
          <a
            href="/contact-us"
            className="px-6 py-2.5 rounded-full bg-[#f1ece1] hover:bg-white text-black text-xs font-semibold cursor-pointer shadow-lg transition-all flex items-center gap-1.5 shrink-0"
          >
            <span>Contact Support</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
}