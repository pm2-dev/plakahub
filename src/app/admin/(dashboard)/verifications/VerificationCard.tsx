"use client";

import { useState, useTransition } from "react";
import { approveVerification, rejectVerification } from "../actions";

interface Verification {
  id: string;
  plateNumber: string;
  isVerified: boolean;
  verificationPhotoUrl: string | null;
  verificationStatus: "PENDING" | "APPROVED" | "REJECTED";
  verificationNote: string | null;
  createdAt: string;
  user: {
    email: string;
    carBrand: string | null;
    carModel: string | null;
    carYear: string | null;
  };
}

interface StatusInfo {
  text: string;
  className: string;
}

export default function VerificationCard({
  verification: v,
  statusInfo,
}: {
  verification: Verification;
  statusInfo: StatusInfo;
}) {
  const [isPending, startTransition] = useTransition();
  const [rejectNote, setRejectNote] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);

  const date = new Date(v.createdAt).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const vehicle = [v.user.carBrand, v.user.carModel, v.user.carYear]
    .filter(Boolean)
    .join(" ");

  function handleApprove() {
    startTransition(async () => {
      await approveVerification(v.id);
    });
  }

  function handleReject() {
    startTransition(async () => {
      await rejectVerification(v.id, rejectNote || undefined);
      setShowRejectForm(false);
      setRejectNote("");
    });
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {v.verificationPhotoUrl && (
        <div className="relative aspect-video w-full bg-gray-100">
          <img
            src={v.verificationPhotoUrl}
            alt={`${v.plateNumber} doğrulama fotoğrafı`}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="rounded bg-gray-100 px-2.5 py-1 font-mono text-sm font-bold text-gray-900">
              {v.plateNumber}
            </span>
            <span
              className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusInfo.className}`}
            >
              {statusInfo.text}
            </span>
          </div>
          <span className="text-xs text-gray-400">{date}</span>
        </div>

        <div className="mt-2 space-y-1">
          <p className="text-sm text-gray-500">{v.user.email}</p>
          {vehicle && (
            <p className="text-sm font-medium text-gray-700">{vehicle}</p>
          )}
        </div>

        {v.verificationNote && v.verificationStatus === "REJECTED" && (
          <div className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
            <span className="font-semibold">Red sebebi:</span> {v.verificationNote}
          </div>
        )}

        {v.verificationStatus === "PENDING" && (
          <div className="mt-4">
            {!showRejectForm ? (
              <div className="flex gap-2">
                <button
                  onClick={handleApprove}
                  disabled={isPending}
                  className="flex-1 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700 disabled:opacity-50"
                >
                  {isPending ? "İşleniyor..." : "Onayla"}
                </button>
                <button
                  onClick={() => setShowRejectForm(true)}
                  disabled={isPending}
                  className="flex-1 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                >
                  Reddet
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <textarea
                  value={rejectNote}
                  onChange={(e) => setRejectNote(e.target.value)}
                  placeholder="Red sebebi (opsiyonel)..."
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-400 focus:ring-1 focus:ring-red-400 focus:outline-none"
                  rows={2}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleReject}
                    disabled={isPending}
                    className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
                  >
                    {isPending ? "İşleniyor..." : "Reddet"}
                  </button>
                  <button
                    onClick={() => {
                      setShowRejectForm(false);
                      setRejectNote("");
                    }}
                    className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-500 transition-colors hover:bg-gray-100"
                  >
                    Vazgeç
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
