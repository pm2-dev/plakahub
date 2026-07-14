"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [plaka, setPlaka] = useState("");
  const router = useRouter();

  function handleSearch() {
    const cleaned = plaka.replace(/\s+/g, "").toUpperCase();
    if (!cleaned) return;
    router.push(`/sorgu/${encodeURIComponent(cleaned)}`);
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#f4f5f7] px-4 pt-16">
      <div className="flex w-full max-w-xl flex-col items-center gap-6">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-blue-950 sm:text-5xl">
            Bir Plaka Sorgula.
          </h1>
          <p className="mt-3 text-base text-slate-500 sm:text-lg">
            Trafikte gördüğün o aracın sahibini bul.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="w-full"
        >
          {/* Türk plakası formu */}
          <div className="mx-auto flex max-w-md items-stretch overflow-hidden rounded-[6px] border-[3px] border-[#1a1a1a] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-[box-shadow,transform] duration-200 focus-within:shadow-[0_12px_40px_rgba(0,0,0,0.18)] focus-within:-translate-y-0.5">
            {/* Sol mavi TR şeridi */}
            <div className="flex w-12 shrink-0 flex-col items-center justify-between bg-[#003399] px-1 py-2 sm:w-14">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 text-[#FFCC00] sm:h-6 sm:w-6"
                fill="currentColor"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="2" />
                <circle cx="12" cy="5.5" r="1.15" />
                <circle cx="12" cy="18.5" r="1.15" />
                <circle cx="5.5" cy="12" r="1.15" />
                <circle cx="18.5" cy="12" r="1.15" />
                <circle cx="7.4" cy="7.4" r="1" />
                <circle cx="16.6" cy="7.4" r="1" />
                <circle cx="7.4" cy="16.6" r="1" />
                <circle cx="16.6" cy="16.6" r="1" />
                <circle cx="6.2" cy="9.8" r="0.85" />
                <circle cx="17.8" cy="9.8" r="0.85" />
                <circle cx="6.2" cy="14.2" r="0.85" />
                <circle cx="17.8" cy="14.2" r="0.85" />
              </svg>
              <span className="text-[11px] font-bold leading-none tracking-wide text-white sm:text-xs">
                TR
              </span>
            </div>

            {/* Plaka yazı alanı */}
            <div className="relative flex min-w-0 flex-1 items-center bg-white">
              <input
                type="text"
                value={plaka}
                onChange={(e) => setPlaka(e.target.value.toUpperCase())}
                placeholder="34 ABC 123"
                aria-label="Plaka numarası"
                maxLength={12}
                autoComplete="off"
                spellCheck={false}
                className="h-[68px] w-full bg-transparent px-4 pr-14 font-mono text-2xl font-black uppercase tracking-[0.18em] text-[#111] outline-none placeholder:font-bold placeholder:tracking-[0.12em] placeholder:text-[#c5c5c5] sm:h-[76px] sm:px-5 sm:pr-16 sm:text-3xl"
              />

              <button
                type="submit"
                aria-label="Plaka sorgula"
                className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md bg-[#1a1a1a] text-white transition-colors hover:bg-[#003399] sm:right-3 sm:h-11 sm:w-11"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 sm:h-5 sm:w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>

      <p className="absolute bottom-6 px-4 text-center text-xs text-slate-400">
        Vercel üzerinde güvenle barındırılmaktadır · Sadece doğrulanmış araç
        sahipleri gösterilir.
      </p>
    </div>
  );
}
