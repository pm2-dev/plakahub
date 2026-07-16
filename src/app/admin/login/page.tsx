"use client";

import { useState, useActionState } from "react";
import { adminLogin, adminVerifyCredentials } from "./actions";

export default function AdminLoginPage() {
  const [step, setStep] = useState<"credentials" | "totp">("credentials");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [credError, setCredError] = useState("");
  const [verifying, setVerifying] = useState(false);

  const [state, formAction, isPending] = useActionState(adminLogin, {
    success: false,
    message: "",
  });

  const handleCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    setVerifying(true);
    setCredError("");

    try {
      const result = await adminVerifyCredentials(username, password);

      if (!result.success) {
        setCredError(result.message);
        return;
      }

      setPassword("");
      setStep("totp");
    } catch {
      setCredError("Sunucuya bağlanılamadı.");
    } finally {
      setVerifying(false);
    }
  };

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

        {step === "credentials" ? (
          <form
            onSubmit={handleCredentials}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            {credError && (
              <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                {credError}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-gray-700">
                  Kullanıcı Adı
                </label>
                <input
                  id="username"
                  type="text"
                  required
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-slate-900 outline-none transition-shadow placeholder:text-gray-400 focus:border-blue-900 focus:ring-2 focus:ring-blue-900"
                  placeholder="admin"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700">
                  Şifre
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-slate-900 outline-none transition-shadow placeholder:text-gray-400 focus:border-blue-900 focus:ring-2 focus:ring-blue-900"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={verifying}
              className="mt-6 flex h-11 w-full items-center justify-center rounded-lg bg-blue-950 text-sm font-semibold text-white transition-colors hover:bg-blue-900 disabled:opacity-50"
            >
              {verifying ? "Doğrulanıyor..." : "Devam Et"}
            </button>
          </form>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-5 text-center">
              <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-blue-600">
                2FA Doğrulama
              </div>
              <p className="text-sm text-gray-500">
                Authenticator uygulamanızdaki 6 haneli kodu girin
              </p>
            </div>

            {state.message && !state.success && (
              <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                {state.message}
              </div>
            )}

            <form action={formAction}>
              <div>
                <label htmlFor="totpCode" className="mb-1.5 block text-sm font-medium text-gray-700">
                  Authenticator Kodu
                </label>
                <input
                  id="totpCode"
                  name="totpCode"
                  type="text"
                  required
                  inputMode="numeric"
                  maxLength={6}
                  autoComplete="one-time-code"
                  autoFocus
                  className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-center text-lg font-mono font-bold tracking-[0.5em] text-slate-900 outline-none transition-shadow placeholder:text-gray-400 placeholder:tracking-normal placeholder:text-sm placeholder:font-normal focus:border-blue-900 focus:ring-2 focus:ring-blue-900"
                  placeholder="6 haneli kod"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="mt-4 flex h-11 w-full items-center justify-center rounded-lg bg-blue-950 text-sm font-semibold text-white transition-colors hover:bg-blue-900 disabled:opacity-50"
              >
                {isPending ? "Doğrulanıyor..." : "Giriş Yap"}
              </button>
            </form>

            <button
              onClick={() => setStep("credentials")}
              className="mt-3 w-full text-center text-xs text-gray-400 hover:text-gray-600"
            >
              ← Geri dön
            </button>
          </div>
        )}

        <p className="mt-6 text-center text-xs text-gray-400">
          Bu panel 2FA korumalıdır. Sadece yetkili yöneticilere açıktır.
        </p>
      </div>
    </div>
  );
}
