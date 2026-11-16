"use client";

import React, { useState } from "react";
import { MapPin, Phone, Clock, Mail, Send, CheckCircle2 } from "lucide-react";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    comment: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API request / backend call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", comment: "" });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0f0f12] text-neutral-200 selection:bg-[#c5a880] selection:text-black">
      {/* Header Banner */}
      <div className="border-b border-white/10 bg-[#141418]/60 backdrop-blur-md py-16 px-6 text-center">
        <span className="text-[10px] tracking-[0.25em] uppercase text-[#c5a880] font-semibold">
          Get In Touch
        </span>
        <h1
          className="text-3xl sm:text-4xl font-light text-white mt-1 mb-3"
          style={{ fontFamily: "var(--font-serif), serif" }}
        >
          Contact Us
        </h1>
        <p className="text-xs sm:text-sm text-[#8e8e93] max-w-xl mx-auto font-light">
          We’re here to help with product inquiries, order support, collaborations, and customer assistance.
        </p>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Information Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Visit Our Factory Card */}
            <div className="p-6 rounded-3xl bg-[#141418] border border-white/15 space-y-3 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-[#c5a880]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] tracking-wider uppercase text-[#8e8e93] font-medium">
                    Location
                  </span>
                  <h2 className="text-sm font-semibold text-white">Visit Our Factory</h2>
                </div>
              </div>
              <p className="text-xs text-[#a1a1aa] font-light leading-relaxed pl-1">
                Backum Hills<br />
                1016/1017 Wajidpur, Jajmau, Kanpur, Uttar Pradesh
              </p>
            </div>

            {/* Phone Support Card */}
            <div className="p-6 rounded-3xl bg-[#141418] border border-white/15 space-y-3 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-[#c5a880]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] tracking-wider uppercase text-[#8e8e93] font-medium">
                    Customer Care
                  </span>
                  <h2 className="text-sm font-semibold text-white">Phone Support</h2>
                </div>
              </div>
              <a
                href="tel:+917524854640"
                className="inline-block text-xs text-[#c5a880] hover:underline font-medium pl-1"
              >
                +91 7524854640
              </a>
            </div>

            {/* Business Hours Card */}
            <div className="p-6 rounded-3xl bg-[#141418] border border-white/15 space-y-3 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-[#c5a880]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] tracking-wider uppercase text-[#8e8e93] font-medium">
                    Operating Hours
                  </span>
                  <h2 className="text-sm font-semibold text-white">Business Hours</h2>
                </div>
              </div>
              <div className="text-xs text-[#a1a1aa] font-light space-y-1 pl-1">
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span>Monday — Saturday</span>
                  <span className="text-white font-medium">10:00 AM — 7:00 PM</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>Sunday</span>
                  <span className="text-[#8e8e93]">Closed</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#141418] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#c5a880] font-semibold">
                Direct Message
              </span>
              <h2
                className="text-2xl sm:text-3xl font-light text-white mt-1"
                style={{ fontFamily: "var(--font-serif), serif" }}
              >
                Have a question? Contact us!
              </h2>
              <p className="text-xs text-[#8e8e93] mt-1">
                Fill in the details below and our team will get back to you within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3 animate-fade-in">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="text-base font-medium text-white">Thank You!</h3>
                <p className="text-xs text-[#a1a1aa]">
                  Your message has been sent successfully. We will reach out to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs text-[#c5a880] underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#a1a1aa] font-medium">
                      Your Name <span className="text-[#c5a880]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-[#52525b] focus:outline-none focus:border-[#c5a880] transition-colors"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#a1a1aa] font-medium">
                      Email Address <span className="text-[#c5a880]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. rahul@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-[#52525b] focus:outline-none focus:border-[#c5a880] transition-colors"
                    />
                  </div>

                </div>

                {/* Subject Input */}
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#a1a1aa] font-medium">
                    Subject <span className="text-[#c5a880]">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Product Inquiry / Order Support"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-[#52525b] focus:outline-none focus:border-[#c5a880] transition-colors"
                  />
                </div>

                {/* Comment / Message Area */}
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#a1a1aa] font-medium">
                    Write Your Comment <span className="text-[#c5a880]">*</span>
                  </label>
                  <textarea
                    name="comment"
                    required
                    rows={4}
                    value={formData.comment}
                    onChange={handleChange}
                    placeholder="Write your message or inquiry here..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-[#52525b] focus:outline-none focus:border-[#c5a880] transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#f1ece1] hover:bg-white text-black text-xs font-semibold cursor-pointer shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

              </form>
            )}
          </div>

        </div>

     
<div className="bg-[#141418] border border-white/15 rounded-3xl p-2 shadow-2xl">
  <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-neutral-900">
    <iframe
      title="Factory Location"
      src="https://maps.google.com/maps?q=Wajidpur,%20Jajmau,%20Kanpur&t=&z=14&ie=UTF8&iwloc=&output=embed"
      className="w-full h-full border-0"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </div>
</div>

      </div>
    </div>
  );
}