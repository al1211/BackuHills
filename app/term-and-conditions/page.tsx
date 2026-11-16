"use client";

import React, { useState } from "react";
import { ScrollText, Truck, RotateCcw, ShieldCheck, AlertCircle } from "lucide-react";

type PolicyTab = "terms" | "shipping" | "returns" | "privacy";

export default function TermsAndPoliciesPage() {
  const [activeTab, setActiveTab] = useState<PolicyTab>("terms");

  return (
    <div className="min-h-screen bg-[#0f0f12] text-neutral-200 selection:bg-[#c5a880] selection:text-black">
      {/* Header Banner */}
      <div className="border-b border-white/10 bg-[#141418]/60 backdrop-blur-md py-16 px-6 text-center">
        <span className="text-[10px] tracking-[0.25em] uppercase text-[#c5a880] font-semibold">
          Legal & Compliance
        </span>
        <h1
          className="text-3xl sm:text-4xl font-light text-white mt-1 mb-3"
          style={{ fontFamily: "var(--font-serif), serif" }}
        >
          Store Terms & Policies
        </h1>
        <p className="text-xs sm:text-sm text-[#8e8e93] max-w-xl mx-auto font-light">
          Please review our terms of service, shipping guidelines, and return procedures carefully before placing an order.
        </p>
        <p className="text-[11px] text-[#71717a] mt-3">
          Last Updated: October 2026
        </p>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Quick Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 border-b border-white/10 pb-6">
          {[
            { id: "terms" as PolicyTab, label: "Terms & Conditions", icon: ScrollText },
            { id: "shipping" as PolicyTab, label: "Shipping & Delivery", icon: Truck },
            { id: "returns" as PolicyTab, label: "Returns & Exchange", icon: RotateCcw },
            { id: "privacy" as PolicyTab, label: "Privacy Policy", icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#c5a880] text-black font-semibold shadow-lg shadow-[#c5a880]/10"
                    : "bg-[#141418] text-[#a1a1aa] border border-white/10 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Content Display */}
        <div className="bg-[#141418] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl transition-all duration-300">
          
          {/* 1. Terms & Conditions */}
          {activeTab === "terms" && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-xl sm:text-2xl font-light text-white mb-1" style={{ fontFamily: "var(--font-serif), serif" }}>
                  1. General Terms & Conditions
                </h2>
                <p className="text-xs text-[#8e8e93]">Welcome to our official store platform.</p>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-[#a1a1aa] leading-relaxed font-light border-t border-white/10 pt-4">
                <p>
                  By accessing, browsing, or placing an order through this website, you agree to comply with and be bound by the following store policies and legal terms.
                </p>
                <ul className="list-disc list-inside space-y-2 text-[#8e8e93] pl-1">
                  <li>All product prices listed on the online catalog are in Indian Rupees (INR ₹) and inclusive of statutory taxes unless stated otherwise.</li>
                  <li>We reserve the right to modify prices, discontinue products, or alter specifications without prior notice.</li>
                  <li>Ongoing promotional offers, discount codes, or seasonal vouchers cannot be clubbed together unless explicitly authorized.</li>
                  <li>Clearance or final-sale items are sold strictly on a non-exchangeable and non-refundable basis.</li>
                </ul>
              </div>
            </div>
          )}

          {/* 2. Shipping & Delivery */}
          {activeTab === "shipping" && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-xl sm:text-2xl font-light text-white mb-1" style={{ fontFamily: "var(--font-serif), serif" }}>
                  2. Shipping & Delivery Guidelines
                </h2>
                <p className="text-xs text-[#8e8e93]">Fast, secure, and reliable dispatch across regions.</p>
              </div>
              <div className="space-y-4 text-xs sm:text-sm text-[#a1a1aa] leading-relaxed font-light border-t border-white/10 pt-4">
                <p>
                  Orders are processed promptly and handed over to trusted logistics partners. Shipping charges depend on order value and delivery destinations:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                    <div className="text-xs font-semibold text-[#c5a880]">Domestic Free Shipping</div>
                    <div className="text-[11px] text-[#8e8e93]">Applicable on all domestic orders above ₹550.</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                    <div className="text-xs font-semibold text-[#c5a880]">Standard Domestic Fee</div>
                    <div className="text-[11px] text-[#8e8e93]">Flat ₹150 delivery fee for orders below ₹550.</div>
                  </div>
                </div>
                <p className="text-[11px] text-[#8e8e93] pt-2">
                  * Note: International orders may incur destination customs duties, local taxes, or import clearance fees, which are the sole responsibility of the customer.
                </p>
              </div>
            </div>
          )}

          {/* 3. Returns & Exchange */}
          {activeTab === "returns" && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-xl sm:text-2xl font-light text-white mb-1" style={{ fontFamily: "var(--font-serif), serif" }}>
                  3. Returns, Cancellations & Damage Policy
                </h2>
                <p className="text-xs text-[#8e8e93]">Understand our cancellation windows and return criteria.</p>
              </div>
              <div className="space-y-4 text-xs sm:text-sm text-[#a1a1aa] leading-relaxed font-light border-t border-white/10 pt-4">
                <div>
                  <h3 className="text-sm font-medium text-white mb-1">Order Cancellation Window</h3>
                  <p className="text-[#8e8e93]">
                    Orders can only be successfully cancelled prior to dispatch. Once the parcel has been shipped from our facility, cancellation requests will no longer be accepted.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white mb-1">Transit Damage Claim</h3>
                  <p className="text-[#8e8e93]">
                    If your item arrives damaged or defective, please report the issue to our customer support desk within **24 to 48 hours** of delivery.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[#d4d4d8] flex gap-3 items-start">
                  <AlertCircle className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                  <span className="text-[11px] leading-relaxed">
                    Unboxing video proof showing the package opening and the defect is strictly mandatory for processing transit damage claims or replacements.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 4. Privacy Policy */}
          {activeTab === "privacy" && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-xl sm:text-2xl font-light text-white mb-1" style={{ fontFamily: "var(--font-serif), serif" }}>
                  4. Privacy Policy & Data Security
                </h2>
                <p className="text-xs text-[#8e8e93]">How we protect and handle your personal details.</p>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-[#a1a1aa] leading-relaxed font-light border-t border-white/10 pt-4">
                <p>
                  We value your trust and respect your privacy. Personal details collected during checkout (such as your name, shipping address, phone number, and email) are used exclusively for order fulfillment, courier coordination, and customer assistance.
                </p>
                <p className="text-[#8e8e93]">
                  We do not rent, sell, or trade your personal information to third parties. All online payments are processed through heavily encrypted payment gateway integrations without storing your raw banking passwords or sensitive card credentials.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="p-5 rounded-2xl bg-[#141418] border border-white/10 space-y-1.5">
            <ShieldCheck className="w-5 h-5 text-[#c5a880]" />
            <div className="text-sm font-semibold text-white">100% Authentic Quality</div>
            <div className="text-xs text-[#71717a]">Crafted with precision and genuine standards.</div>
          </div>
          <div className="p-5 rounded-2xl bg-[#141418] border border-white/10 space-y-1.5">
            <Truck className="w-5 h-5 text-[#c5a880]" />
            <div className="text-sm font-semibold text-white">Pan-India Dispatch</div>
            <div className="text-xs text-[#71717a]">Reliable doorstep delivery and tracking support.</div>
          </div>
          <div className="p-5 rounded-2xl bg-[#141418] border border-white/10 space-y-1.5">
            <RotateCcw className="w-5 h-5 text-[#c5a880]" />
            <div className="text-sm font-semibold text-white">Secure Transactions</div>
            <div className="text-xs text-[#71717a]">Encrypted checkout and hassle-free support.</div>
          </div>
        </div>

      </div>
    </div>
  );
}