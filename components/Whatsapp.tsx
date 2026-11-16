
"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phoneNumber = "91XXXXXXXXXX"; // Apna WhatsApp number daalo
  const message = "Hello! I want to know more about your products.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-9999 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-[#20BA5A] sm:bottom-21 sm:right-35 sm:h-22 sm:w-22"
    >
      <MessageCircle size={32} strokeWidth={2.5} />

      <span className="absolute right-0 top-0 flex h-3.5 w-3.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75" />
        <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
      </span>
    </a>
  );
}
