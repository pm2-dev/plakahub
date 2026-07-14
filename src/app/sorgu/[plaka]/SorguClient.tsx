"use client";

import Link from "next/link";
import { useI18n } from "@/i18n";
import DownloadApp from "@/components/DownloadApp";

interface SocialProfile {
  platform: string;
  username: string;
}

interface PlateSearchResult {
  found: boolean;
  plateNumber: string;
  isVerified?: boolean;
  isProfileComplete?: boolean;
  socialProfiles?: SocialProfile[];
}

const PLATFORM_ABBR: Record<string, string> = {
  INSTAGRAM: "IG",
  TWITTER: "X",
  TIKTOK: "TT",
  YOUTUBE: "YT",
  FACEBOOK: "FB",
  SNAPCHAT: "SC",
  TELEGRAM: "TG",
  DISCORD: "DC",
  TWITCH: "TW",
  LINKEDIN: "LI",
  THREADS: "TH",
};

function getAbbr(platform: string): string {
  return PLATFORM_ABBR[platform] || platform.slice(0, 2).toUpperCase();
}

function PixelPlate({ plaka }: { plaka: string }) {
  return (
    <div className="inline-flex items-stretch border-4 border-[#FFC812] bg-[#112240]">
      <div className="flex w-12 flex-col items-center justify-center bg-[#006FDF] px-2 py-2">
        <span className="text-[10px] font-bold text-[#FFC812]">***</span>
        <span className="text-xs font-extrabold text-white">TR</span>
      </div>
      <div className="flex items-center px-6 py-3">
        <span className="text-2xl sm:text-3xl font-extrabold tracking-[0.2em] text-white uppercase">
          {plaka}
        </span>
      </div>
    </div>
  );
}

function FoundResult({
  plaka,
  profiles,
}: {
  plaka: string;
  profiles: SocialProfile[];
}) {
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center gap-6">
      <PixelPlate plaka={plaka} />

      <p className="text-base font-bold text-[#FFC812] uppercase">
        {t.search.found}
      </p>

      <div className="w-full max-w-sm border-4 border-[#006FDF] bg-[#112240] p-6">
        <div className="flex flex-col gap-3">
          {profiles.map((profile) => (
            <div
              key={profile.platform}
              className="flex items-center gap-3 border-2 border-[#006FDF]/40 p-3 blur-sm select-none"
              aria-hidden="true"
            >
              <div className="flex h-10 w-10 items-center justify-center border-2 border-[#FFC812] bg-[#0a1628]">
                <span className="text-xs font-extrabold text-[#FFC812]">
                  {getAbbr(profile.platform)}
                </span>
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  @{profile.username}
                </p>
                <p className="text-xs text-[#006FDF]">
                  {profile.platform}
                </p>
              </div>
            </div>
          ))}

          {profiles.length === 0 && (
            <p className="text-center text-sm text-[#006FDF]">
              {t.search.noProfiles}
            </p>
          )}
        </div>
      </div>

      <p className="text-sm font-bold text-[#006FDF]">
        {t.search.downloadCta}
      </p>

      <DownloadApp />
    </div>
  );
}

function NotFoundResult({ plaka }: { plaka: string }) {
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center gap-6">
      <PixelPlate plaka={plaka} />

      <p className="text-base font-bold text-[#006FDF]">
        {t.search.notFound}
      </p>

      <a
        href="#indir"
        className="inline-flex w-full max-w-sm items-center justify-center border-4 border-[#FFC812] px-6 py-4 text-base font-bold text-[#FFC812] uppercase hover:bg-[#FFC812] hover:text-[#0a1628] transition-colors"
      >
        {t.search.claimCta}
      </a>

      <DownloadApp />
    </div>
  );
}

export default function SorguClient({ result }: { result: PlateSearchResult }) {
  const { t } = useI18n();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a1628] px-4 py-16">
      {result.found && result.socialProfiles ? (
        <FoundResult plaka={result.plateNumber} profiles={result.socialProfiles} />
      ) : (
        <NotFoundResult plaka={result.plateNumber} />
      )}

      <Link
        href="/"
        className="mt-10 text-sm font-bold text-[#006FDF] uppercase hover:text-[#FFC812] transition-colors"
      >
        {t.search.newSearch}
      </Link>
    </div>
  );
}
