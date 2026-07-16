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
  verificationPhotoUrl?: string | null;
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
    <div className="inline-flex items-stretch border-4 border-[#FFC812] bg-[#112240] max-w-full">
      <div className="flex w-10 sm:w-12 shrink-0 flex-col items-center justify-center bg-[#006FDF] px-1.5 sm:px-2 py-2">
        <span className="text-[10px] font-bold text-[#FFC812]">***</span>
        <span className="text-xs font-extrabold text-white">TR</span>
      </div>
      <div className="flex items-center px-3 sm:px-6 py-3 min-w-0">
        <span className="text-lg sm:text-3xl font-extrabold tracking-[0.1em] sm:tracking-[0.2em] text-white uppercase truncate">
          {plaka}
        </span>
      </div>
    </div>
  );
}

function FoundResult({
  plaka,
  profiles,
  isVerified,
  verificationPhotoUrl,
}: {
  plaka: string;
  profiles: SocialProfile[];
  isVerified?: boolean;
  verificationPhotoUrl?: string | null;
}) {
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center gap-6">
      <PixelPlate plaka={plaka} />

      <p className="text-base font-bold text-[#FFC812] uppercase">
        {t.search.found}
      </p>

      {isVerified && verificationPhotoUrl && (
        <div className="w-full max-w-[calc(100%-2rem)] sm:max-w-sm border-4 border-[#4ADE80] bg-[#112240]">
          <img
            src={verificationPhotoUrl}
            alt={`${plaka} doğrulama fotoğrafı`}
            className="w-full object-cover"
          />
          <div className="flex items-center justify-center gap-2 border-t-2 border-[#4ADE80]/30 px-4 py-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0 text-[#4ADE80]">
              <path fillRule="evenodd" d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-bold uppercase tracking-wider text-[#4ADE80]">
              {t.search.verified}
            </span>
          </div>
        </div>
      )}

      <div className="w-full max-w-[calc(100%-2rem)] sm:max-w-sm border-4 border-[#006FDF] bg-[#112240] p-4 sm:p-6">
        <div className="flex flex-col gap-3">
          {profiles.map((profile) => (
            <div
              key={profile.platform}
              className="flex items-center gap-3 border-2 border-[#006FDF]/40 p-2.5 sm:p-3 blur-sm select-none"
              aria-hidden="true"
            >
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center border-2 border-[#FFC812] bg-[#0a1628]">
                <span className="text-[10px] sm:text-xs font-extrabold text-[#FFC812]">
                  {getAbbr(profile.platform)}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-white truncate">
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
        className="inline-flex w-full max-w-[calc(100%-2rem)] sm:max-w-sm items-center justify-center border-4 border-[#FFC812] px-4 sm:px-6 py-4 text-sm sm:text-base font-bold text-[#FFC812] uppercase hover:bg-[#FFC812] hover:text-[#0a1628] transition-colors text-center"
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a1628] px-4 py-12 sm:py-16 overflow-x-hidden">
      {result.found && result.socialProfiles ? (
        <FoundResult
          plaka={result.plateNumber}
          profiles={result.socialProfiles}
          isVerified={result.isVerified}
          verificationPhotoUrl={result.verificationPhotoUrl}
        />
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
