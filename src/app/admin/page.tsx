import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

async function getStats(token: string) {
  try {
    const res = await fetch(`${API_URL}/api/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    redirect("/");
  }

  const data = await getStats(token);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <Link href="/admin" className="text-xl font-bold text-blue-950">
            PlakaHub Admin
          </Link>
          <form action="/api/admin/logout" method="POST">
            <span className="text-sm text-gray-500">Yönetim Paneli</span>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="mb-6 text-lg font-semibold text-gray-900">
          Sistem İstatistikleri
        </h2>

        {data?.success ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Toplam Kullanıcı"
              value={data.stats.totalUsers}
              color="blue"
            />
            <StatCard
              label="Toplam Plaka"
              value={data.stats.totalPlates}
              color="emerald"
            />
            <StatCard
              label="Doğrulanmış"
              value={data.stats.verifiedPlates}
              color="green"
            />
            <StatCard
              label="Doğrulanmamış"
              value={data.stats.unverifiedPlates}
              color="amber"
            />
          </div>
        ) : (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700">
            İstatistikler yüklenemedi. Backend bağlantısını kontrol edin.
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    blue: "border-blue-200 bg-blue-50 text-blue-950",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-900",
    green: "border-green-200 bg-green-50 text-green-900",
    amber: "border-amber-200 bg-amber-50 text-amber-900",
  };

  return (
    <div
      className={`rounded-xl border p-6 ${colorMap[color] || colorMap.blue}`}
    >
      <p className="text-sm font-medium opacity-70">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}
