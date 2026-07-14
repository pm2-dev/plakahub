"use client";

import { useState, useTransition } from "react";
import { updateReportStatus } from "../actions";

interface ReportUser {
  id: string;
  email: string;
  plates: { plateNumber: string }[];
}

interface ReportMessage {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
}

interface Report {
  id: string;
  reporterId: string;
  reportedUserId: string;
  reason: string;
  status: "PENDING" | "REVIEWED" | "DISMISSED";
  adminNote: string | null;
  createdAt: string;
  reporter: ReportUser;
  reportedUser: ReportUser;
  conversation: {
    id: string;
    messages: ReportMessage[];
  } | null;
}

const STATUS_BADGE: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  REVIEWED: "bg-green-100 text-green-800",
  DISMISSED: "bg-gray-100 text-gray-600",
};

const STATUS_LABEL: Record<string, string> = {
  PENDING: "Bekliyor",
  REVIEWED: "İncelendi",
  DISMISSED: "Reddedildi",
};

export default function ReportRow({ report }: { report: Report }) {
  const [expanded, setExpanded] = useState(false);
  const [adminNote, setAdminNote] = useState(report.adminNote ?? "");
  const [isPending, startTransition] = useTransition();

  const reporterPlate = report.reporter.plates[0]?.plateNumber ?? report.reporter.email;
  const reportedPlate = report.reportedUser.plates[0]?.plateNumber ?? report.reportedUser.email;

  const date = new Date(report.createdAt).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  function handleAction(status: "REVIEWED" | "DISMISSED") {
    startTransition(async () => {
      await updateReportStatus(report.id, status, adminNote || undefined);
    });
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div
        className="flex cursor-pointer items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_BADGE[report.status]}`}>
            {STATUS_LABEL[report.status]}
          </span>
          <div>
            <p className="text-sm font-medium text-gray-900">
              <span className="text-gray-500">Bildiren:</span> {reporterPlate}
              <span className="mx-2 text-gray-300">→</span>
              <span className="text-gray-500">Bildirilen:</span> {reportedPlate}
            </p>
            <p className="mt-0.5 text-xs text-gray-400">{date}</p>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`h-5 w-5 text-gray-400 transition-transform ${expanded ? "rotate-180" : ""}`}
        >
          <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
        </svg>
      </div>

      {expanded && (
        <div className="border-t border-gray-100 px-6 py-5">
          <div className="mb-4">
            <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">Şikayet Sebebi</h4>
            <p className="rounded-lg bg-amber-50 p-3 text-sm text-gray-800">{report.reason}</p>
          </div>

          {report.conversation && report.conversation.messages.length > 0 && (
            <div className="mb-4">
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Son Mesajlar</h4>
              <div className="max-h-60 space-y-2 overflow-y-auto rounded-lg bg-gray-50 p-3">
                {report.conversation.messages.map((msg) => {
                  const isReported = msg.senderId === report.reportedUserId;
                  const time = new Date(msg.createdAt).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
                  return (
                    <div key={msg.id} className={`flex ${isReported ? "justify-start" : "justify-end"}`}>
                      <div className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${isReported ? "bg-red-100 text-red-900" : "bg-blue-100 text-blue-900"}`}>
                        <p>{msg.content}</p>
                        <p className="mt-0.5 text-right text-[10px] opacity-60">{time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {report.status === "PENDING" && (
            <div className="border-t border-gray-100 pt-4">
              <textarea
                className="mb-3 w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-blue-300 focus:outline-none"
                rows={2}
                placeholder="Admin notu (opsiyonel)..."
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleAction("DISMISSED")}
                  disabled={isPending}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-50"
                >
                  {isPending ? "İşleniyor..." : "Reddet"}
                </button>
                <button
                  onClick={() => handleAction("REVIEWED")}
                  disabled={isPending}
                  className="rounded-lg bg-green-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-green-700 disabled:opacity-50"
                >
                  {isPending ? "İşleniyor..." : "İncelendi Olarak İşaretle"}
                </button>
              </div>
            </div>
          )}

          {report.adminNote && report.status !== "PENDING" && (
            <div className="border-t border-gray-100 pt-4">
              <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">Admin Notu</h4>
              <p className="rounded-lg bg-blue-50 p-3 text-sm text-gray-800">{report.adminNote}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
