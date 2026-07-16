"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/i18n";

function PixelCar() {
  return (
    <div className="flex justify-center mb-6 select-none">
      <pre className="text-[#006FDF] text-xs sm:text-sm leading-tight">
{`    ___________
   /           \\
  |  [O]   [O]  |
  |_____________|
 /|  PlakaHub  |\\
|_|_____________|_|
   (O)     (O)`}
      </pre>
    </div>
  );
}

export default function Home() {
  const [plaka, setPlaka] = useState("");
  const router = useRouter();
  const { t } = useI18n();

  function handleSearch() {
    const cleaned = plaka.replace(/\s+/g, "").toUpperCase();
    if (!cleaned) return;
    router.push(`/sorgu/${encodeURIComponent(cleaned)}`);
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#0a1628] px-4 pt-16">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, #006FDF 3px, #006FDF 4px),
                          repeating-linear-gradient(90deg, transparent, transparent 3px, #006FDF 3px, #006FDF 4px)`,
      }} />

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center gap-6">
        <PixelCar />

        <div className="text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FFC812] uppercase">
            {t.home.title}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#006FDF]">
            {t.home.subtitle}
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="w-full max-w-md"
        >
          <div className="border-4 border-[#006FDF] bg-[#112240] p-1 w-full">
            <div className="flex items-stretch">
              <div className="flex w-14 shrink-0 flex-col items-center justify-center bg-[#006FDF] py-3">
                <span className="text-[10px] font-bold text-[#FFC812]">***</span>
                <span className="text-sm font-extrabold text-white mt-1">TR</span>
              </div>

              <input
                type="text"
                value={plaka}
                onChange={(e) => setPlaka(e.target.value.toUpperCase())}
                placeholder={t.home.placeholder}
                aria-label={t.home.ariaLabel}
                maxLength={12}
                autoComplete="off"
                spellCheck={false}
                className="h-[56px] sm:h-[68px] flex-1 min-w-0 bg-[#112240] px-3 sm:px-4 font-mono text-xl sm:text-3xl font-extrabold uppercase tracking-[0.1em] sm:tracking-[0.2em] text-white outline-none placeholder:text-white/30"
              />

              <button
                type="submit"
                aria-label={t.home.ariaLabel}
                className="flex w-14 sm:w-20 shrink-0 items-center justify-center bg-[#FFC812] text-[#0a1628] hover:bg-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 sm:h-7 sm:w-7">
                  <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </form>

        <div className="flex gap-4 mt-4">
          {["34", "06", "35", "16"].map((code) => (
            <button
              key={code}
              onClick={() => setPlaka(code)}
              className="border-2 border-[#006FDF]/50 px-3 py-1 text-xs text-[#006FDF] font-bold hover:border-[#FFC812] hover:text-[#FFC812] transition-colors"
            >
              {code}
            </button>
          ))}
        </div>
      </div>

      <p className="absolute bottom-6 z-10 px-4 text-center text-xs text-[#006FDF]/60 uppercase">
        {t.home.footer}
      </p>
    </div>
  );
}
