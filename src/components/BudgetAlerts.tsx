"use client";

import { Expense, CATEGORIES } from "@/types/expense";
import { BudgetSettings, BudgetAlert } from "@/types/budget";

interface BudgetAlertsProps {
  expenses: Expense[];
  budgetSettings: BudgetSettings;
}

function computeAlerts(
  expenses: Expense[],
  settings: BudgetSettings
): BudgetAlert[] {
  const alerts: BudgetAlert[] = [];

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  if (settings.overall > 0) {
    const pct = (totalSpent / settings.overall) * 100;
    if (pct >= 80) {
      alerts.push({
        category: "Overall",
        spent: totalSpent,
        limit: settings.overall,
        percentage: pct,
        level: pct >= 100 ? "critical" : "warning",
      });
    }
  }

  for (const cat of CATEGORIES) {
    const limit = settings.categories[cat];
    if (limit <= 0) continue;
    const spent = expenses
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0);
    const pct = (spent / limit) * 100;
    if (pct >= 80) {
      alerts.push({
        category: cat,
        spent,
        limit,
        percentage: pct,
        level: pct >= 100 ? "critical" : "warning",
      });
    }
  }

  return alerts;
}

export default function BudgetAlerts({
  expenses,
  budgetSettings,
}: BudgetAlertsProps) {
  const alerts = computeAlerts(expenses, budgetSettings);

  if (alerts.length === 0) return null;

  return (
    <div className="space-y-2">
      {alerts.map((alert) => (
        <div
          key={alert.category}
          className={`rounded-lg border px-4 py-3 ${
            alert.level === "critical"
              ? "border-red-300 bg-red-50 text-red-800"
              : "border-yellow-300 bg-yellow-50 text-yellow-800"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">
              {alert.level === "critical" ? "\u26A0\uFE0F" : "\u26A0"}
            </span>
            <div>
              <p className="text-sm font-semibold">
                {alert.category} Budget{" "}
                {alert.level === "critical" ? "Exceeded" : "Warning"}
              </p>
              <p className="text-xs">
                ${alert.spent.toFixed(2)} of ${alert.limit.toFixed(2)} (
                {Math.round(alert.percentage)}%)
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
