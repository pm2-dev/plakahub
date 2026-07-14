"use client";

import Link from "next/link";
import { useI18n } from "@/i18n";

export default function Navbar() {
  const { locale, setLocale, t } = useI18n();

  return (
    <nav className="fixed inset-x-0 top-0 z-50 w-full border-b-4 border-[#FFC812] bg-[#0a1628]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold tracking-tight text-[#FFC812] uppercase">
          {t.nav.brand}
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLocale(locale === "tr" ? "en" : "tr")}
            className="flex items-center gap-1 border-2 border-[#006FDF] px-2 py-1 text-xs font-bold text-[#006FDF] uppercase tracking-wider hover:border-[#FFC812] hover:text-[#FFC812] transition-colors"
          >
            <span>{locale === "tr" ? "TR" : "EN"}</span>
            <span className="text-[#006FDF]/50">|</span>
            <span className="text-white/40">{locale === "tr" ? "EN" : "TR"}</span>
          </button>

          <a
            href="#indir"
            className="inline-flex items-center gap-2 border-2 border-[#FFC812] bg-transparent px-4 py-2 text-sm font-bold text-[#FFC812] uppercase tracking-wider hover:bg-[#FFC812] hover:text-[#0a1628] transition-colors"
          >
            {t.nav.download}
          </a>
        </div>
      </div>
    </nav>
  );
}
