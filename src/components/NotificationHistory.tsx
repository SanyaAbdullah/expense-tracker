"use client";

import { useState } from "react";
import { NotificationRecord } from "@/types/notification";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function NotificationHistory() {
  const [history, setHistory] = useLocalStorage<NotificationRecord[]>(
    "notification-history",
    []
  );
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const typeColors: Record<NotificationRecord["type"], string> = {
    digest: "bg-blue-100 text-blue-800",
    alert: "bg-red-100 text-red-800",
    threshold: "bg-yellow-100 text-yellow-800",
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Notification History
        </h2>
        <button
          onClick={() => setHistory([])}
          className="text-sm text-red-600 hover:text-red-700"
        >
          Clear All
        </button>
      </div>
      <ul className="divide-y divide-gray-200">
        {history.map((record) => (
          <li key={record.id} className="px-6 py-3">
            <button
              onClick={() =>
                setExpandedId(expandedId === record.id ? null : record.id)
              }
              className="flex w-full items-center justify-between text-left"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${typeColors[record.type]}`}
                >
                  {record.type}
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {record.subject}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(record.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </button>
            {expandedId === record.id && (
              <p className="mt-2 whitespace-pre-wrap text-sm text-gray-600">
                {record.body}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
