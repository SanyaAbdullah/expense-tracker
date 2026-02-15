"use client";

import { useState } from "react";
import { CATEGORIES, Category } from "@/types/expense";
import { BudgetSettings as BudgetSettingsType, DEFAULT_BUDGET_SETTINGS } from "@/types/budget";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function BudgetSettingsPanel() {
  const [settings, setSettings] = useLocalStorage<BudgetSettingsType>(
    "budget-settings",
    DEFAULT_BUDGET_SETTINGS
  );
  const [isOpen, setIsOpen] = useState(false);

  const updateOverall = (value: number) => {
    setSettings({ ...settings, overall: value });
  };

  const updateCategory = (cat: Category, value: number) => {
    setSettings({
      ...settings,
      categories: { ...settings.categories, [cat]: value },
    });
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-6 py-4"
      >
        <h2 className="text-lg font-semibold text-gray-900">Budget Settings</h2>
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
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Overall Monthly Budget ($)
            </label>
            <input
              type="number"
              value={settings.overall}
              onChange={(e) => updateOverall(parseFloat(e.target.value) || 0)}
              min="0"
              step="50"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-gray-700">
              Per-Category Budgets ($)
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {CATEGORIES.map((cat) => (
                <div key={cat}>
                  <label className="mb-1 block text-xs text-gray-500">
                    {cat}
                  </label>
                  <input
                    type="number"
                    value={settings.categories[cat]}
                    onChange={(e) =>
                      updateCategory(cat, parseFloat(e.target.value) || 0)
                    }
                    min="0"
                    step="25"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
