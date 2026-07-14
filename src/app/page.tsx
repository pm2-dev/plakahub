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
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-50 px-4 pt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-300/25 via-indigo-200/20 to-sky-200/20 blur-[120px]"
      />

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-5">
        <h1 className="text-center text-5xl font-extrabold tracking-tight text-blue-950 sm:text-6xl lg:text-7xl">
          Bir{" "}
          <span className="bg-gradient-to-r from-blue-950 via-blue-700 to-sky-500 bg-clip-text text-transparent">
            Plaka
          </span>{" "}
          Sorgula.
        </h1>

        <p className="text-center text-lg text-slate-500 sm:text-xl">
          Trafikte gördüğün o aracın sahibini bul.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="group relative mt-8 w-full rounded-2xl border border-white/80 bg-white/90 p-2 shadow-2xl shadow-blue-900/5 backdrop-blur-sm transition-all duration-200 focus-within:border-blue-300/80 focus-within:ring-2 focus-within:ring-blue-500/20"
        >
          <input
            type="text"
            value={plaka}
            onChange={(e) => setPlaka(e.target.value)}
            placeholder="34 ABC 123"
            aria-label="Plaka numarası"
            className="h-16 w-full rounded-xl bg-transparent pl-5 pr-20 text-xl font-semibold uppercase tracking-wider text-slate-900 outline-none placeholder:font-medium placeholder:tracking-normal placeholder:text-slate-400"
          />

          <button
            type="submit"
            aria-label="Plaka sorgula"
            className="absolute right-3 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-xl bg-blue-950 text-white shadow-lg shadow-blue-950/20 transition-all duration-200 hover:bg-blue-800 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </form>
      </div>

      <p className="absolute bottom-6 z-10 px-4 text-center text-xs text-slate-400">
        Vercel üzerinde güvenle barındırılmaktadır · Sadece doğrulanmış araç
        sahipleri gösterilir.
      </p>
    </div>
  );
}
