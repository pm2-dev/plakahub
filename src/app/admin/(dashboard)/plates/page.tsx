import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PlateRow from "./PlateRow";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.plakahub.com";

interface Plate {
  id: string;
  plateNumber: string;
  isVerified: boolean;
  createdAt: string;
  user: { email: string };
}

async function getPlates(token: string): Promise<Plate[]> {
  try {
    const res = await fetch(`${API_URL}/api/admin/plates`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data.plates ?? [];
  } catch {
    return [];
  }
}

export default async function PlatesPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) redirect("/");

  const plates = await getPlates(token);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Plakalar</h2>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
          {plates.length} plaka
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3.5 font-semibold text-gray-600">Plaka</th>
              <th className="px-6 py-3.5 font-semibold text-gray-600">Sahibi (Email)</th>
              <th className="px-6 py-3.5 font-semibold text-gray-600">Durum</th>
              <th className="px-6 py-3.5 font-semibold text-gray-600">Kayıt Tarihi</th>
              <th className="px-6 py-3.5 text-right font-semibold text-gray-600">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {plates.map((plate) => (
              <PlateRow key={plate.id} plate={plate} />
            ))}
            {plates.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-gray-400">
                  Henüz kayıtlı plaka yok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
