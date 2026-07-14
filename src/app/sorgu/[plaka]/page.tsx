import type { Metadata } from "next";
import Link from "next/link";
import DownloadApp from "@/components/DownloadApp";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface SocialProfile {
  platform: "INSTAGRAM" | "TWITTER" | "TIKTOK";
  username: string;
}

interface PlateSearchResult {
  found: boolean;
  plateNumber: string;
  isVerified?: boolean;
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
    description: `${decoded} plakalı aracın sahibini PlakaHub ile bulun. Sosyal medya profillerini görüntüleyin.`,
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

const PLATFORM_CONFIG: Record<
  string,
  { label: string; icon: React.ReactNode; style: string }
> = {
  INSTAGRAM: {
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    style:
      "bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 text-white",
  },
  TWITTER: {
    label: "X (Twitter)",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    style: "bg-black text-white",
  },
  TIKTOK: {
    label: "TikTok",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.57 6.33 6.33 0 0 0 9.37 22a6.33 6.33 0 0 0 6.38-6.22V9.4a8.16 8.16 0 0 0 3.84.96V7c0-.1-.01-.21-.01-.31z" />
      </svg>
    ),
    style: "bg-gray-900 text-white",
  },
};

function LicensePlate({ plaka }: { plaka: string }) {
  return (
    <div className="inline-flex items-stretch overflow-hidden rounded-md border-2 border-gray-700 shadow-md">
      <div className="flex w-10 flex-col items-center justify-end bg-blue-700 px-1 pb-1.5 pt-2">
        <div className="mb-auto flex h-5 w-5 items-center justify-center">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-yellow-400" fill="currentColor">
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="6" r="1.2" />
            <circle cx="12" cy="18" r="1.2" />
            <circle cx="6" cy="12" r="1.2" />
            <circle cx="18" cy="12" r="1.2" />
            <circle cx="8" cy="7.5" r="1" />
            <circle cx="16" cy="7.5" r="1" />
            <circle cx="8" cy="16.5" r="1" />
            <circle cx="16" cy="16.5" r="1" />
            <circle cx="6.5" cy="9.5" r="0.8" />
            <circle cx="17.5" cy="9.5" r="0.8" />
            <circle cx="6.5" cy="14.5" r="0.8" />
            <circle cx="17.5" cy="14.5" r="0.8" />
          </svg>
        </div>
        <span className="text-[10px] font-bold leading-none text-white">TR</span>
      </div>

      <div className="flex items-center bg-white px-5 py-3">
        <span className="text-2xl font-black tracking-widest text-gray-900 sm:text-3xl">
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
      <LicensePlate plaka={plaka} />

      <p className="text-lg font-semibold text-blue-950">
        Bu araç PlakaHub&apos;da kayıtlı!
      </p>

      <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4">
          {profiles.map((profile, i) => {
            const config = PLATFORM_CONFIG[profile.platform];
            if (!config) return null;

            return (
              <div key={profile.platform}>
                {i > 0 && <hr className="mb-4 border-gray-100" />}
                <div
                  className="flex items-center gap-4 blur-sm select-none"
                  aria-hidden="true"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${config.style}`}
                  >
                    {config.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      @{profile.username}
                    </p>
                    <p className="text-xs text-gray-500">{config.label}</p>
                  </div>
                </div>
              </div>
            );
          })}

          {profiles.length === 0 && (
            <p className="text-center text-sm text-gray-400">
              Henüz profil eklenmemiş.
            </p>
          )}
        </div>
      </div>

      <p className="text-sm font-medium text-gray-500">
        Profilleri görmek için uygulamayı indir
      </p>

      <DownloadApp />
    </div>
  );
}

function NotFoundResult({ plaka }: { plaka: string }) {
  return (
    <div className="flex flex-col items-center gap-6">
      <LicensePlate plaka={plaka} />

      <p className="text-lg font-medium text-gray-500">
        Bu plaka henüz PlakaHub&apos;da sahiplenilmemiş.
      </p>

      <a
        href="#indir"
        className="inline-flex w-full max-w-sm items-center justify-center rounded-lg border-2 border-blue-950 px-6 py-4 text-base font-semibold text-blue-950 transition-colors hover:bg-blue-950 hover:text-white"
      >
        Bu araç senin mi? Hemen sahiplen.
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-16">
      {result.found && result.socialProfiles ? (
        <FoundResult plaka={result.plateNumber} profiles={result.socialProfiles} />
      ) : (
        <NotFoundResult plaka={result.plateNumber} />
      )}

      <Link
        href="/"
        className="mt-10 text-sm font-medium text-blue-950/60 transition-colors hover:text-blue-950"
      >
        ← Yeni bir plaka sorgula
      </Link>
    </div>
  );
}
