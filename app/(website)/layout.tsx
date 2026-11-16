import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Barlow } from 'next/font/google';
import '../globals.css';
import { Header } from '@/components/website/Header';
import { Footer } from '@/components/website/Footer';
import WhatsAppButton from '@/components/website/Whatsapp';
import { CartProvider } from '@/components/website/cart/CartProvider';

// Headings font (used everywhere as var(--font-serif))
const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-serif',
  display: 'swap',
});

// Body font
const sans = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-barlow',
  display: 'swap',
});

// TODO: set NEXT_PUBLIC_SITE_URL in .env.local to the real domain
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Backum Hills | Genuine Leather Belts, Bags & Accessories',
    template: '%s | Backum Hills', // pages only write their own short title
  },
  description:
    'Backum Hills makes genuine leather belts, bags and travel essentials. Handcrafted, built to last, and delivered across India.',
  openGraph: {
    type: 'website',
    siteName: 'Backum Hills',
    locale: 'en_IN',
    title: 'Backum Hills | Genuine Leather Belts, Bags & Accessories',
    description:
      'Genuine leather belts, bags and travel essentials, handcrafted to last for years.',
    // TODO: add a share image at public/og.jpg (1200x630)
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Backum Hills' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#0d0d0f',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[#0d0d0f] text-[#ececeb] selection:bg-[#c5a880] selection:text-black">
        <CartProvider>
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <WhatsAppButton />
        </CartProvider>
          
      </body>
    </html>
  );
}