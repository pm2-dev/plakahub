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
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      <div className="flex w-full max-w-xl flex-col items-center gap-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-blue-950 sm:text-5xl">
          Bir Plaka Sorgula.
        </h1>

        <p className="text-base text-gray-500 sm:text-lg">
          Trafikte gördüğün o aracın sahibini bul.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="mt-6 flex w-full items-center gap-3"
        >
          <input
            type="text"
            value={plaka}
            onChange={(e) => setPlaka(e.target.value)}
            placeholder="34 ABC 123"
            className="h-14 flex-1 rounded-lg border border-gray-300 bg-white px-5 text-lg text-slate-900 placeholder:text-gray-400 outline-none transition-shadow focus:ring-2 focus:ring-blue-900 focus:border-blue-900"
          />

          <button
            type="submit"
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-blue-950 text-white transition-colors hover:bg-blue-900"
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

      <p className="absolute bottom-6 text-center text-xs text-blue-950/40">
        Vercel üzerinde güvenle barındırılmaktadır · Sadece doğrulanmış araç
        sahipleri gösterilir.
      </p>
    </div>
  );
}
