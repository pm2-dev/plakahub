"use client";

import { useState, useTransition } from "react";
import { deletePlate, togglePlateVerify } from "../actions";

interface Plate {
  id: string;
  plateNumber: string;
  isVerified: boolean;
  createdAt: string;
  user: { email: string };
}

export default function PlateRow({ plate }: { plate: Plate }) {
  const [showConfirm, setShowConfirm] = useState(false);
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
    <tr className="transition-colors hover:bg-gray-50">
      <td className="px-6 py-4">
        <span className="rounded bg-gray-100 px-2.5 py-1 font-mono text-sm font-bold text-gray-900">
          {plate.plateNumber}
        </span>
      </td>
      <td className="px-6 py-4 text-gray-500">{plate.user.email}</td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            plate.isVerified
              ? "bg-green-100 text-green-800"
              : "bg-amber-100 text-amber-800"
          }`}
        >
          {plate.isVerified ? "Doğrulandı" : "Bekliyor"}
        </span>
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
  );
}
