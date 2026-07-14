"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface LoginResult {
  success: boolean;
  message: string;
}

export async function adminLogin(
  _prevState: LoginResult,
  formData: FormData
): Promise<LoginResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, message: "E-posta ve şifre zorunludur." };
  }

  try {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      return { success: false, message: data.message || "Giriş başarısız." };
    }

    if (data.user.role !== "ADMIN") {
      return { success: false, message: "Bu panel sadece yöneticilere açıktır." };
    }

    const cookieStore = await cookies();
    cookieStore.set("admin_token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  } catch {
    return { success: false, message: "Sunucuya bağlanılamadı." };
  }

  redirect("/admin");
}
