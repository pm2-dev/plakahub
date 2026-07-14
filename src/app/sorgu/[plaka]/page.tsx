import type { Metadata } from "next";
import Link from "next/link";
import DownloadApp from "@/components/DownloadApp";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

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

interface PageProps {
  params: Promise<{ plaka: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { plaka } = await params;
  const decoded = decodeURIComponent(plaka).toUpperCase();
  return {
    title: `${decoded} Plaka Sorgu Sonucu | PlakaHub`,
    description: `${decoded} plakali aracin sahibini PlakaHub ile bulun.`,
  };
}

async function searchPlate(plateNumber: string): Promise<PlateSearchResult> {
  try {
    const res = await fetch(
      `${API_URL}/api/plates/search/${encodeURIComponent(plateNumber)}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return { found: false, plateNumber };
    }

    return res.json();
  } catch {
    return { found: false, plateNumber };
  }
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
  return (
    <div className="flex flex-col items-center gap-6">
      <PixelPlate plaka={plaka} />

      <p className="text-base font-bold text-[#FFC812] uppercase">
        &gt; KAYITLI ARAC BULUNDU
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
              Henuz profil eklenmemis.
            </p>
          )}
        </div>
      </div>

      <p className="text-sm font-bold text-[#006FDF]">
        &gt; Profilleri gormek icin uygulamayi indir_
      </p>

      <DownloadApp />
    </div>
  );
}

function NotFoundResult({ plaka }: { plaka: string }) {
  return (
    <div className="flex flex-col items-center gap-6">
      <PixelPlate plaka={plaka} />

      <p className="text-base font-bold text-[#006FDF]">
        &gt; BU PLAKA HENUZ SAHIPLENILMEMIS
      </p>

      <a
        href="#indir"
        className="inline-flex w-full max-w-sm items-center justify-center border-4 border-[#FFC812] px-6 py-4 text-base font-bold text-[#FFC812] uppercase hover:bg-[#FFC812] hover:text-[#0a1628] transition-colors"
      >
        &gt; BU ARAC SENIN MI? SAHIPLEN
      </a>

      <DownloadApp />
    </div>
  );
}

export default async function SorguPage({ params }: PageProps) {
  const { plaka } = await params;
  const decoded = decodeURIComponent(plaka).toUpperCase();
  const result = await searchPlate(decoded);

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
        &lt; YENI SORGU
      </Link>
    </div>
  );
}
