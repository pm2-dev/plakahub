import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const pixelFont = JetBrains_Mono({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

export const metadata: Metadata = {
  title: "PlakaHub | Arac Sahibini Bul",
  description:
    "Trafikteki arac plakalarini aratarak sahiplerinin sosyal medya hesaplarini kolayca bulun. PlakaHub ile arac sahiplerine aninda ulasin.",
  keywords: [
    "plaka sorgulama",
    "arac sahibi bulma",
    "plaka sosyal medya",
    "PlakaHub",
  ],
  openGraph: {
    title: "PlakaHub | Arac Sahibini Bul",
    description:
      "Trafikteki arac plakalarini aratarak sahiplerinin sosyal medya hesaplarini kolayca bulun.",
    siteName: "PlakaHub",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PlakaHub | Arac Sahibini Bul",
    description:
      "Trafikteki arac plakalarini aratarak sahiplerinin sosyal medya hesaplarini kolayca bulun.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${pixelFont.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#0a1628] text-white font-mono">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
