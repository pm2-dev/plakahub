import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ReportRow from "./ReportRow";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://165.245.210.97:3001";

interface ReportUser {
  id: string;
  email: string;
  plates: { plateNumber: string }[];
}

interface ReportMessage {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
}

interface Report {
  id: string;
  reporterId: string;
  reportedUserId: string;
  reason: string;
  status: "PENDING" | "REVIEWED" | "DISMISSED";
  adminNote: string | null;
  createdAt: string;
  reporter: ReportUser;
  reportedUser: ReportUser;
  conversation: {
    id: string;
    messages: ReportMessage[];
  } | null;
}

async function getReports(token: string): Promise<Report[]> {
  try {
    const res = await fetch(`${API_URL}/api/admin/reports`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data.reports ?? [];
  } catch {
    return [];
  }
}

export default async function ReportsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) redirect("/");

  const reports = await getReports(token);

  const pending = reports.filter((r) => r.status === "PENDING").length;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Raporlar</h2>
        <div className="flex items-center gap-3">
          {pending > 0 && (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
              {pending} bekleyen
            </span>
          )}
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
            {reports.length} toplam
          </span>
        </div>
      </div>

      {reports.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-400">
          Henüz rapor yok.
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <ReportRow key={report.id} report={report} />
          ))}
        </div>
      )}
    </div>
  );
}
