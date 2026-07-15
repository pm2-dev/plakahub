"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.plakahub.com";

interface LoginResult {
  success: boolean;
  message: string;
  step?: "credentials" | "totp";
}

export async function adminLogin(
  _prevState: LoginResult,
  formData: FormData
): Promise<LoginResult> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const totpCode = formData.get("totpCode") as string;

  if (!username || !password) {
    return { success: false, message: "Kullanıcı adı ve şifre zorunludur." };
  }

  if (!totpCode) {
    return { success: false, message: "2FA kodu zorunludur." };
  }

  try {
    const res = await fetch(`${API_URL}/api/auth/admin-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, totpCode }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      return { success: false, message: data.message || "Giriş başarısız." };
    }

    const cookieStore = await cookies();
    cookieStore.set("admin_token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
  } catch {
    return { success: false, message: "Sunucuya bağlanılamadı." };
  }

  redirect("/admin");
}

export async function adminLogout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  redirect("/");
}
