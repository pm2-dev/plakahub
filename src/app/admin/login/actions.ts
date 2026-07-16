"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.plakahub.com";

interface LoginResult {
  success: boolean;
  message: string;
}

interface VerifyResult {
  success: boolean;
  message: string;
}

export async function adminVerifyCredentials(
  username: string,
  password: string
): Promise<VerifyResult> {
  if (!username || !password) {
    return { success: false, message: "Kullanıcı adı ve şifre zorunludur." };
  }

  try {
    const res = await fetch(`${API_URL}/api/auth/admin-verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      return { success: false, message: data.message || "Giriş başarısız." };
    }

    const cookieStore = await cookies();
    const credPayload = Buffer.from(
      JSON.stringify({ username, password })
    ).toString("base64");
    cookieStore.set("admin_cred_temp", credPayload, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/admin/login",
      maxAge: 300,
    });

    return { success: true, message: "" };
  } catch {
    return { success: false, message: "Sunucuya bağlanılamadı." };
  }
}

export async function adminLogin(
  _prevState: LoginResult,
  formData: FormData
): Promise<LoginResult> {
  const totpCode = formData.get("totpCode") as string;

  if (!totpCode) {
    return { success: false, message: "2FA kodu zorunludur." };
  }

  const cookieStore = await cookies();
  const credCookie = cookieStore.get("admin_cred_temp")?.value;

  if (!credCookie) {
    return { success: false, message: "Oturum süresi doldu. Tekrar giriş yapın." };
  }

  let username: string;
  let password: string;
  try {
    const parsed = JSON.parse(Buffer.from(credCookie, "base64").toString());
    username = parsed.username;
    password = parsed.password;
  } catch {
    return { success: false, message: "Geçersiz oturum. Tekrar giriş yapın." };
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

    cookieStore.delete("admin_cred_temp");
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
  cookieStore.delete("admin_cred_temp");
  redirect("/");
}
