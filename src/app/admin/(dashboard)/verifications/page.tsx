import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import VerificationCard from "./VerificationCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.plakahub.com";

interface Verification {
  id: string;
  plateNumber: string;
  isVerified: boolean;
  verificationPhotoUrl: string | null;
  verificationStatus: "PENDING" | "APPROVED" | "REJECTED";
  verificationNote: string | null;
  createdAt: string;
  user: {
    email: string;
    carBrand: string | null;
    carModel: string | null;
    carYear: string | null;
  };
}

async function getVerifications(token: string): Promise<Verification[]> {
  try {
    const res = await fetch(`${API_URL}/api/admin/verifications`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data.verifications ?? [];
  } catch {
    return [];
  }
}

const STATUS_LABELS: Record<string, { text: string; className: string }> = {
  PENDING: { text: "Bekliyor", className: "bg-amber-100 text-amber-800" },
  APPROVED: { text: "Onaylandı", className: "bg-green-100 text-green-800" },
  REJECTED: { text: "Reddedildi", className: "bg-red-100 text-red-800" },
};

export default async function VerificationsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) redirect("/");

  const verifications = await getVerifications(token);

  const pending = verifications.filter((v) => v.verificationStatus === "PENDING");
  const reviewed = verifications.filter((v) => v.verificationStatus !== "PENDING");

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Plaka Doğrulamaları</h2>
        <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
          {pending.length} bekleyen
        </span>
      </div>

      {pending.length > 0 && (
        <div className="mb-8">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-amber-600">
            Bekleyen Doğrulamalar
          </h3>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {pending.map((v) => (
              <VerificationCard key={v.id} verification={v} statusInfo={STATUS_LABELS[v.verificationStatus]} />
            ))}
          </div>
        </div>
      )}

      {pending.length === 0 && (
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-400">
          Bekleyen doğrulama isteği yok.
        </div>
      )}

      {reviewed.length > 0 && (
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
            İşlem Görmüş Doğrulamalar
          </h3>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {reviewed.map((v) => (
              <VerificationCard key={v.id} verification={v} statusInfo={STATUS_LABELS[v.verificationStatus]} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
