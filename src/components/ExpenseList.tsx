"use client";

import { Expense } from "@/types/expense";

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

const categoryColors: Record<string, string> = {
  Food: "bg-green-100 text-green-800",
  Transportation: "bg-blue-100 text-blue-800",
  Shopping: "bg-purple-100 text-purple-800",
  Bills: "bg-red-100 text-red-800",
  Other: "bg-gray-100 text-gray-800",
};

export default function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
        <p className="text-gray-500">
          No expenses yet. Add one above to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">Expenses</h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {expenses.map((expense) => (
          <li
            key={expense.id}
            className="flex items-center justify-between px-6 py-4"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3">
                <p className="truncate text-sm font-medium text-gray-900">
                  {expense.description}
                </p>
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${categoryColors[expense.category]}`}
                >
                  {expense.category}
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                {new Date(expense.date + "T00:00:00").toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                )}
              </p>
            </div>
            <div className="ml-4 flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-900">
                ${expense.amount.toFixed(2)}
              </span>
              <button
                onClick={() => onDelete(expense.id)}
                className="rounded p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                aria-label={`Delete ${expense.description}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
