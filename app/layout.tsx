

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Backum Hills",
  description: "Genuine Leather Belts, Bags & Accessories",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}