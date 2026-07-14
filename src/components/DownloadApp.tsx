"use client";

import { useI18n } from "@/i18n";

export default function DownloadApp() {
  const { t } = useI18n();

  return (
    <div className="w-full max-w-sm border-4 border-[#006FDF] bg-[#112240] p-6">
      <h3 className="mb-5 text-center text-sm font-extrabold text-[#FFC812] uppercase">
        {t.search.downloadTitle}
      </h3>

      <div className="flex gap-3">
        <a
          href="#"
          className="flex flex-1 items-center justify-center gap-2 border-2 border-[#FFC812] px-4 py-3 text-[#FFC812] font-bold text-xs uppercase hover:bg-[#FFC812] hover:text-[#0a1628] transition-colors"
        >
          {t.search.appStore}
        </a>

        <div className="flex flex-1 items-center justify-center gap-2 border-2 border-[#006FDF]/40 px-4 py-3 text-[#006FDF]/40 font-bold text-xs uppercase pointer-events-none select-none">
          {t.search.playSoon}
        </div>
      </div>
    </div>
  );
}
