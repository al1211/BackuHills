"use client";

import React from "react";
import { ShieldCheck, Lock, Cookie, Share2, Mail, Phone, MapPin } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0f0f12] text-neutral-200 selection:bg-[#c5a880] selection:text-black">
      {/* Header Banner */}
      <div className="border-b border-white/10 bg-[#141418]/60 backdrop-blur-md py-16 px-6 text-center">
        <span className="text-[10px] tracking-[0.25em] uppercase text-[#c5a880] font-semibold">
          Data & Legal Security
        </span>
        <h1
          className="text-3xl sm:text-4xl font-light text-white mt-1 mb-3"
          style={{ fontFamily: "var(--font-serif), serif" }}
        >
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-[#8e8e93] max-w-xl mx-auto font-light">
          Your privacy is important to us. Learn how Backum Hills collects, uses, and safeguards your personal information.
        </p>
        <p className="text-[11px] text-[#71717a] mt-3">
          Last Updated: October 2026
        </p>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        {/* Content Box */}
        <div className="bg-[#141418] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 text-xs sm:text-sm text-[#a1a1aa] leading-relaxed font-light">
          
          {/* 1. Information We Collect */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-white font-medium text-base border-b border-white/10 pb-2">
              <ShieldCheck className="w-5 h-5 text-[#c5a880]" />
              <h2>Information We Collect</h2>
            </div>
            <p>
              Backum Hills may collect personal information from customers when they place an order, subscribe to newsletters, contact customer support, or interact with the website in any other way.
            </p>
            <p>
              The information collected may include your <strong className="text-white">name, email address, phone number, shipping address, billing address, payment details</strong>, and other relevant information required to process your orders and improve your shopping experience.
            </p>
            <p>
              We may also use cookies and similar technologies to enhance website functionality and analyze visitor interactions and browsing behavior.
            </p>
          </section>

          {/* 2. How We Use Your Information */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-white font-medium text-base border-b border-white/10 pb-2">
              <Lock className="w-5 h-5 text-[#c5a880]" />
              <h2>How We Use Your Information</h2>
            </div>
            <p>The information collected may be used for the following purposes:</p>
            <ul className="list-disc list-inside space-y-2 text-[#8e8e93] pl-1">
              <li>To process and complete transactions securely and efficiently.</li>
              <li>To improve customer service and respond to inquiries or support requests.</li>
              <li>To personalize and improve your shopping experience.</li>
              <li>To send updates, promotional offers, and marketing communications if you have opted to receive them.</li>
              <li>To improve website performance, product offerings, and overall customer experience.</li>
            </ul>
            <p className="text-[11px] text-[#71717a] pt-1">
              * Customers who no longer wish to receive promotional communications may unsubscribe at any time.
            </p>
          </section>

          {/* 3. Protection Of Personal Information */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-white font-medium text-base border-b border-white/10 pb-2">
              <ShieldCheck className="w-5 h-5 text-[#c5a880]" />
              <h2>Protection Of Personal Information</h2>
            </div>
            <p>
              Backum Hills implements appropriate security measures to safeguard customer information. Personal data is stored on secure networks and is accessible only to authorized personnel who are required to maintain strict confidentiality.
            </p>
            <p>
              Sensitive payment information transmitted online is protected using <strong className="text-white">Secure Socket Layer (SSL)</strong> encryption technology and industry-standard security practices.
            </p>
          </section>

          {/* 4. Use Of Cookies */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-white font-medium text-base border-b border-white/10 pb-2">
              <Cookie className="w-5 h-5 text-[#c5a880]" />
              <h2>Use Of Cookies</h2>
            </div>
            <p>
              Cookies are small data files stored on your device through your web browser that help websites recognize your preferences and improve user experience. Cookies may be used to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#8e8e93] pl-1">
              <li>Remember shopping cart information and preferences.</li>
              <li>Improve website functionality and speed.</li>
              <li>Analyze website traffic and browsing behavior.</li>
            </ul>
            <p className="text-[11px] text-[#71717a] pt-1">
              You may choose to disable cookies through your browser settings. However, certain website features may not function properly if cookies are disabled.
            </p>
          </section>

          {/* 5. Sharing Of Information */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-white font-medium text-base border-b border-white/10 pb-2">
              <Share2 className="w-5 h-5 text-[#c5a880]" />
              <h2>Sharing Of Information</h2>
            </div>
            <p>
              Backum Hills does not sell, trade, or transfer personally identifiable information to third parties except trusted partners who assist in operating the website, processing payments, delivering orders, or servicing customers.
            </p>
            <p>
              Information may also be disclosed where required by law or to protect the rights, property, or safety of the company, customers, or others.
            </p>
          </section>

          {/* 6. Marketing Communications & Third-Party Services */}
          <section className="space-y-3">
            <div className="text-white font-medium text-base border-b border-white/10 pb-2">
              <h2>Marketing Communications & Third-Party Services</h2>
            </div>
            <p>
              By providing your email address or phone number, you may receive promotional emails, WhatsApp messages, SMS notifications, or calls regarding products, launches, collections, and special offers from Backum Hills. You may opt out at any time.
            </p>
            <p>
              <strong className="text-white">Third-Party Partners:</strong> Payments on this website are securely processed through trusted third-party payment gateways such as <strong className="text-white">Razorpay</strong>. Shipping and delivery services are fulfilled through logistics partners including <strong className="text-white">Shiprocket</strong> and associated courier providers.
            </p>
          </section>

          {/* 7. Children's Privacy & Policy Updates */}
          <section className="space-y-3">
            <div className="text-white font-medium text-base border-b border-white/10 pb-2">
              <h2>Children’s Privacy & Policy Updates</h2>
            </div>
            <p>
              Backum Hills encourages parents and guardians to supervise children’s online activities. Children should seek parental consent before sharing personal information online.
            </p>
            <p>
              We reserve the right to update or modify this Privacy Policy at any time without prior notice. Changes will be effective immediately upon posting on this page.
            </p>
          </section>

          {/* 8. Contact Us */}
          <section className="space-y-4 pt-4 border-t border-white/10">
            <div className="text-white font-medium text-base">
              <h2>Contact Us</h2>
            </div>
            <p>For any questions regarding this Privacy Policy or your personal data, you may contact us at:</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <MapPin className="w-4 h-4 text-[#c5a880]" />
                  <span>Office Address</span>
                </div>
                <p className="text-[#8e8e93] text-xs">
                  Backum Hills<br />
                  1016/1017 Wajidpur, Jajmau, Kanpur
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Phone className="w-4 h-4 text-[#c5a880]" />
                  <span>Direct Contact</span>
                </div>
                <p className="text-[#8e8e93] text-xs flex items-center gap-1.5 pt-1">
                  <Phone className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>+91 7524854640</span>
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}