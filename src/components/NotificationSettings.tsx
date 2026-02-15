"use client";

import { useState } from "react";
import { CATEGORIES, Category } from "@/types/expense";
import {
  NotificationPreferences,
  DEFAULT_PREFERENCES,
} from "@/types/notification";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function NotificationSettings() {
  const [prefs, setPrefs] = useLocalStorage<NotificationPreferences>(
    "notification-preferences",
    DEFAULT_PREFERENCES
  );
  const [isOpen, setIsOpen] = useState(false);

  const updatePref = <K extends keyof NotificationPreferences>(
    key: K,
    value: NotificationPreferences[K]
  ) => {
    setPrefs({ ...prefs, [key]: value });
  };

  const toggleCategory = (cat: Category) => {
    const cats = prefs.trackedCategories.includes(cat)
      ? prefs.trackedCategories.filter((c) => c !== cat)
      : [...prefs.trackedCategories, cat];
    updatePref("trackedCategories", cats);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-6 py-4"
      >
        <h2 className="text-lg font-semibold text-gray-900">
          Notification Settings
        </h2>
        <svg
          className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="border-t border-gray-200 px-6 py-4 space-y-4">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">
              Enable Notifications
            </label>
            <button
              onClick={() => updatePref("enabled", !prefs.enabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${prefs.enabled ? "bg-blue-600" : "bg-gray-300"}`}
            >
              <span
                className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${prefs.enabled ? "translate-x-6" : "translate-x-1"}`}
              />
            </button>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={prefs.email}
              onChange={(e) => updatePref("email", e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Frequency
            </label>
            <select
              value={prefs.frequency}
              onChange={(e) =>
                updatePref(
                  "frequency",
                  e.target.value as NotificationPreferences["frequency"]
                )
              }
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="daily">Daily Digest</option>
              <option value="weekly">Weekly Digest</option>
              <option value="monthly">Monthly Digest</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Spending Threshold ($)
            </label>
            <input
              type="number"
              value={prefs.threshold}
              onChange={(e) =>
                updatePref("threshold", parseFloat(e.target.value) || 0)
              }
              min="0"
              step="50"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Track Categories
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    prefs.trackedCategories.includes(cat)
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
