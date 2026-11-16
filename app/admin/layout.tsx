import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SideBar from "../../components/admin/SideBar";
import Header from "@/components/admin/Header";
import MobileNavProvider from "@/components/admin/MobileNavBar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Backum Hills Admin",
  description: "Backum Hills admin panel",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MobileNavProvider>
          {/* Mobile: 1 column (sidebar drawer ban jaata hai). Desktop: 16rem sidebar + content */}
          <div className="grid h-dvh grid-cols-1 grid-rows-[auto_1fr] md:grid-cols-[16rem_minmax(0,1fr)]">
            <SideBar />
            <Header />
            <main className="overflow-y-auto bg-[#F7F9F8]">{children}</main>
          </div>
        </MobileNavProvider>
      </body>
    </html>
  );
}