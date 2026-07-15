import type { Metadata } from "next";
import SorguClient from "./SorguClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://165.245.210.97";

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

export default async function SorguPage({ params }: PageProps) {
  const { plaka } = await params;
  const decoded = decodeURIComponent(plaka).toUpperCase();
  const result = await searchPlate(decoded);

  return <SorguClient result={result} />;
}
