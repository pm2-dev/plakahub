import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UserRow from "./UserRow";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.plakahub.com";

interface User {
  id: string;
  email: string;
  role: string;
  createdAt: string;
  _count: { plates: number };
}

async function getUsers(token: string): Promise<User[]> {
  try {
    const res = await fetch(`${API_URL}/api/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data.users ?? [];
  } catch {
    return [];
  }
}

export default async function UsersPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) redirect("/");

  const users = await getUsers(token);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Kullanıcılar</h2>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
          {users.length} kullanıcı
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3.5 font-semibold text-gray-600">Email</th>
              <th className="px-6 py-3.5 font-semibold text-gray-600">Rol</th>
              <th className="px-6 py-3.5 font-semibold text-gray-600">Plaka</th>
              <th className="px-6 py-3.5 font-semibold text-gray-600">Kayıt Tarihi</th>
              <th className="px-6 py-3.5 text-right font-semibold text-gray-600">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-gray-400">
                  Henüz kayıtlı kullanıcı yok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
