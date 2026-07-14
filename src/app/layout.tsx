import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PlakaHub | Araç Sahibini Bul",
  description:
    "Trafikteki araç plakalarını aratarak sahiplerinin sosyal medya hesaplarını kolayca bulun. PlakaHub ile araç sahiplerine anında ulaşın.",
  keywords: [
    "plaka sorgulama",
    "araç sahibi bulma",
    "plaka sosyal medya",
    "PlakaHub",
  ],
  openGraph: {
    title: "PlakaHub | Araç Sahibini Bul",
    description:
      "Trafikteki araç plakalarını aratarak sahiplerinin sosyal medya hesaplarını kolayca bulun.",
    siteName: "PlakaHub",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PlakaHub | Araç Sahibini Bul",
    description:
      "Trafikteki araç plakalarını aratarak sahiplerinin sosyal medya hesaplarını kolayca bulun.",
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
    <html lang="tr" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-white text-slate-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
