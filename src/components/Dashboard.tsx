"use client";

import { Expense } from "@/types/expense";
import {
  NotificationPreferences,
  NotificationRecord,
  DEFAULT_PREFERENCES,
} from "@/types/notification";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import NotificationSettings from "./NotificationSettings";
import NotificationHistory from "./NotificationHistory";

export default function Dashboard() {
  const [expenses, setExpenses, isLoaded] = useLocalStorage<Expense[]>(
    "expenses",
    []
  );
  const [prefs] = useLocalStorage<NotificationPreferences>(
    "notification-preferences",
    DEFAULT_PREFERENCES
  );
  const [history, setHistory] = useLocalStorage<NotificationRecord[]>(
    "notification-history",
    []
  );

  const addExpense = (expense: Expense) => {
    setExpenses([expense, ...expenses]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const sendDigest = () => {
    const tracked =
      prefs.trackedCategories.length > 0
        ? expenses.filter((e) => prefs.trackedCategories.includes(e.category))
        : expenses;
    const trackedTotal = tracked.reduce((sum, e) => sum + e.amount, 0);

    const isThreshold = trackedTotal >= prefs.threshold;
    const type: NotificationRecord["type"] = isThreshold
      ? "threshold"
      : "digest";

    const record: NotificationRecord = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      subject: isThreshold
        ? `Spending Alert: $${trackedTotal.toFixed(2)} exceeds $${prefs.threshold.toFixed(2)} threshold`
        : `${prefs.frequency.charAt(0).toUpperCase() + prefs.frequency.slice(1)} Expense Digest`,
      body: [
        `Total spending: $${trackedTotal.toFixed(2)}`,
        `Number of expenses: ${tracked.length}`,
        prefs.trackedCategories.length > 0
          ? `Tracked categories: ${prefs.trackedCategories.join(", ")}`
          : "All categories tracked",
        isThreshold
          ? `\nYour spending has exceeded the $${prefs.threshold.toFixed(2)} threshold.`
          : "",
      ]
        .filter(Boolean)
        .join("\n"),
      type,
    };

    setHistory([record, ...history]);
  };

  if (!isLoaded) {
    return (
      <div className="flex justify-center py-12">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Expenses</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">
              ${total.toFixed(2)}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {expenses.length} expense{expenses.length !== 1 ? "s" : ""}
            </p>
          </div>
          {prefs.enabled && prefs.email && (
            <button
              onClick={sendDigest}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Send Digest
            </button>
          )}
        </div>
      </div>

      <ExpenseForm onAdd={addExpense} />
      <ExpenseList expenses={expenses} onDelete={deleteExpense} />
      <NotificationSettings />
      <NotificationHistory />
    </div>
  );
}
