"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.plakahub.com";

async function getToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("admin_token")?.value ?? null;
}

async function adminFetch(path: string, options?: RequestInit) {
  const token = await getToken();
  if (!token) return { success: false, message: "Oturum bulunamadı." };

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options?.headers,
    },
  });

  return res.json();
}

export async function deleteUser(id: string) {
  const result = await adminFetch(`/api/admin/users/${id}`, { method: "DELETE" });
  revalidatePath("/admin/users");
  revalidatePath("/admin");
  return result;
}

export async function deletePlate(id: string) {
  const result = await adminFetch(`/api/admin/plates/${id}`, { method: "DELETE" });
  revalidatePath("/admin/plates");
  revalidatePath("/admin");
  return result;
}

export async function togglePlateVerify(id: string) {
  const result = await adminFetch(`/api/admin/plates/${id}/verify`, { method: "PATCH" });
  revalidatePath("/admin/plates");
  revalidatePath("/admin");
  return result;
}

export async function updateReportStatus(id: string, status: string, adminNote?: string) {
  const result = await adminFetch(`/api/admin/reports/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status, adminNote }),
  });
  revalidatePath("/admin/reports");
  revalidatePath("/admin");
  return result;
}

export async function approveVerification(id: string) {
  const result = await adminFetch(`/api/admin/verifications/${id}/approve`, { method: "PATCH" });
  revalidatePath("/admin/verifications");
  revalidatePath("/admin/plates");
  revalidatePath("/admin");
  return result;
}

export async function rejectVerification(id: string, note?: string) {
  const result = await adminFetch(`/api/admin/verifications/${id}/reject`, {
    method: "PATCH",
    body: JSON.stringify({ note }),
  });
  revalidatePath("/admin/verifications");
  revalidatePath("/admin/plates");
  revalidatePath("/admin");
  return result;
}
