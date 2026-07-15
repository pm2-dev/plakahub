"use client";

import { useActionState } from "react";
import { adminLogin } from "./actions";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(adminLogin, {
    success: false,
    message: "",
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-blue-950">
            PlakaHub Admin
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Yönetim paneline giriş yapın
          </p>
        </div>

        <form
          action={formAction}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          {state.message && !state.success && (
            <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {state.message}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Kullanıcı Adı
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-slate-900 outline-none transition-shadow placeholder:text-gray-400 focus:border-blue-900 focus:ring-2 focus:ring-blue-900"
                placeholder="admin"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Şifre
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-slate-900 outline-none transition-shadow placeholder:text-gray-400 focus:border-blue-900 focus:ring-2 focus:ring-blue-900"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label
                htmlFor="totpCode"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                2FA Kodu
              </label>
              <input
                id="totpCode"
                name="totpCode"
                type="text"
                required
                inputMode="numeric"
                maxLength={6}
                autoComplete="one-time-code"
                className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-center text-lg font-mono font-bold tracking-[0.5em] text-slate-900 outline-none transition-shadow placeholder:text-gray-400 placeholder:tracking-normal placeholder:text-sm placeholder:font-normal focus:border-blue-900 focus:ring-2 focus:ring-blue-900"
                placeholder="6 haneli kod"
              />
              <p className="mt-1.5 text-xs text-gray-400">
                Authenticator uygulamanızdaki kodu girin
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="mt-6 flex h-11 w-full items-center justify-center rounded-lg bg-blue-950 text-sm font-semibold text-white transition-colors hover:bg-blue-900 disabled:opacity-50"
          >
            {isPending ? "Doğrulanıyor..." : "Giriş Yap"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-400">
          Bu panel 2FA korumalıdır. Sadece yetkili yöneticilere açıktır.
        </p>
      </div>
    </div>
  );
}
