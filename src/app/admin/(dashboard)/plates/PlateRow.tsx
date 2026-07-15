"use client";

import { useState, useTransition } from "react";
import { deletePlate, togglePlateVerify } from "../actions";

interface Plate {
  id: string;
  plateNumber: string;
  isVerified: boolean;
  verificationPhotoUrl: string | null;
  verificationStatus: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  user: { email: string };
}

export default function PlateRow({ plate }: { plate: Plate }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleVerify() {
    startTransition(async () => {
      await togglePlateVerify(plate.id);
    });
  }

  function handleDelete() {
    startTransition(async () => {
      await deletePlate(plate.id);
      setShowConfirm(false);
    });
  }

  const date = new Date(plate.createdAt).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <>
    <tr className="transition-colors hover:bg-gray-50">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {plate.verificationPhotoUrl ? (
            <button
              onClick={() => setShowPhoto(true)}
              className="relative h-10 w-14 flex-shrink-0 overflow-hidden rounded border border-gray-200 transition-shadow hover:shadow-md"
            >
              <img
                src={plate.verificationPhotoUrl}
                alt="Doğrulama"
                className="h-full w-full object-cover"
              />
            </button>
          ) : (
            <div className="flex h-10 w-14 flex-shrink-0 items-center justify-center rounded border border-dashed border-gray-300 bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-gray-300">
                <path fillRule="evenodd" d="M1 8a2 2 0 0 1 2-2h.93a2 2 0 0 0 1.664-.89l.812-1.22A2 2 0 0 1 8.07 3h3.86a2 2 0 0 1 1.664.89l.812 1.22A2 2 0 0 0 16.07 6H17a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8Zm13.5 3a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM10 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
              </svg>
            </div>
          )}
          <span className="rounded bg-gray-100 px-2.5 py-1 font-mono text-sm font-bold text-gray-900">
            {plate.plateNumber}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 text-gray-500">{plate.user.email}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              plate.isVerified
                ? "bg-green-100 text-green-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            {plate.isVerified ? "Doğrulandı" : "Bekliyor"}
          </span>
          {plate.verificationPhotoUrl && (
            <span
              className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                plate.verificationStatus === "PENDING"
                  ? "bg-purple-100 text-purple-700"
                  : plate.verificationStatus === "REJECTED"
                    ? "bg-red-100 text-red-700"
                    : ""
              }`}
            >
              {plate.verificationStatus === "PENDING" && "Fotoğraf bekliyor"}
              {plate.verificationStatus === "REJECTED" && "Fotoğraf reddedildi"}
            </span>
          )}
        </div>
      </td>
      <td className="px-6 py-4 text-gray-500">{date}</td>
      <td className="px-6 py-4 text-right">
        {!showConfirm ? (
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={handleVerify}
              disabled={isPending}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors disabled:opacity-50 ${
                plate.isVerified
                  ? "text-amber-600 hover:bg-amber-50"
                  : "text-green-600 hover:bg-green-50"
              }`}
            >
              {plate.isVerified ? "İptal Et" : "Onayla"}
            </button>
            <button
              onClick={() => setShowConfirm(true)}
              className="rounded-lg px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
            >
              Sil
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setShowConfirm(false)}
              className="rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-500 transition-colors hover:bg-gray-100"
            >
              Vazgeç
            </button>
            <button
              onClick={handleDelete}
              disabled={isPending}
              className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
            >
              {isPending ? "Siliniyor..." : "Eminim, Sil"}
            </button>
          </div>
        )}
      </td>
    </tr>

    {showPhoto && plate.verificationPhotoUrl && (
      <tr>
        <td colSpan={5} className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <div className="flex items-start gap-4">
            <img
              src={plate.verificationPhotoUrl}
              alt={`${plate.plateNumber} doğrulama fotoğrafı`}
              className="max-h-64 rounded-lg border border-gray-200 object-contain shadow-sm"
            />
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-gray-700">Doğrulama Fotoğrafı</p>
              <p className="text-xs text-gray-500">{plate.plateNumber} — {plate.user.email}</p>
              <span
                className={`inline-flex w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  plate.verificationStatus === "PENDING"
                    ? "bg-amber-100 text-amber-800"
                    : plate.verificationStatus === "APPROVED"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {plate.verificationStatus === "PENDING" && "Bekliyor"}
                {plate.verificationStatus === "APPROVED" && "Onaylandı"}
                {plate.verificationStatus === "REJECTED" && "Reddedildi"}
              </span>
              <button
                onClick={() => setShowPhoto(false)}
                className="mt-1 text-xs font-medium text-gray-400 hover:text-gray-600"
              >
                Kapat
              </button>
            </div>
          </div>
        </td>
      </tr>
    )}
    </>
  );
}
