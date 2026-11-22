import { Header } from '@/components/website/Header';
import { Footer } from '@/components/website/Footer';
import WhatsAppButton from '@/components/website/Whatsapp';

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />

      <main className="flex-1">
        {children}
      </main>

      <Footer />

      <WhatsAppButton />
    </>
  );
}