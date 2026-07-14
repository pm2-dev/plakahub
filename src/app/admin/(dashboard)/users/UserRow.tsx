"use client";

import { useState, useTransition } from "react";
import { deleteUser } from "../actions";

interface User {
  id: string;
  email: string;
  role: string;
  createdAt: string;
  _count: { plates: number };
}

export default function UserRow({ user }: { user: User }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await deleteUser(user.id);
      setShowConfirm(false);
    });
  }

  const date = new Date(user.createdAt).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <tr className="transition-colors hover:bg-gray-50">
      <td className="px-6 py-4 font-medium text-gray-900">{user.email}</td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            user.role === "ADMIN"
              ? "bg-purple-100 text-purple-800"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {user.role}
        </span>
      </td>
      <td className="px-6 py-4 text-gray-500">{user._count.plates}</td>
      <td className="px-6 py-4 text-gray-500">{date}</td>
      <td className="px-6 py-4 text-right">
        {!showConfirm ? (
          <button
            onClick={() => setShowConfirm(true)}
            disabled={user.role === "ADMIN"}
            className="rounded-lg px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-30"
          >
            Sil
          </button>
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
