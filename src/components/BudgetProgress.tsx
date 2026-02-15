"use client";

import { Expense, CATEGORIES } from "@/types/expense";
import { BudgetSettings } from "@/types/budget";

interface BudgetProgressProps {
  expenses: Expense[];
  budgetSettings: BudgetSettings;
}

function ProgressBar({
  label,
  spent,
  limit,
}: {
  label: string;
  spent: number;
  limit: number;
}) {
  const percentage = limit > 0 ? (spent / limit) * 100 : 0;
  const barColor =
    percentage >= 100
      ? "bg-red-500"
      : percentage >= 80
        ? "bg-yellow-500"
        : "bg-green-500";

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="text-gray-500">
          ${spent.toFixed(2)} / ${limit.toFixed(2)}
        </span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-gray-200">
        <div
          className={`h-2.5 rounded-full transition-all ${barColor}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      {percentage >= 100 && (
        <p className="mt-0.5 text-xs text-red-600">
          Over budget by ${(spent - limit).toFixed(2)}
        </p>
      )}
    </div>
  );
}

export default function BudgetProgress({
  expenses,
  budgetSettings,
}: BudgetProgressProps) {
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Budget Progress
      </h2>
      <div className="space-y-4">
        <ProgressBar
          label="Overall"
          spent={totalSpent}
          limit={budgetSettings.overall}
        />
        {CATEGORIES.map((cat) => {
          const catSpent = expenses
            .filter((e) => e.category === cat)
            .reduce((sum, e) => sum + e.amount, 0);
          return (
            <ProgressBar
              key={cat}
              label={cat}
              spent={catSpent}
              limit={budgetSettings.categories[cat]}
            />
          );
        })}
      </div>
    </div>
  );
}
