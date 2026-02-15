"use client";

import { Expense } from "@/types/expense";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

export default function Dashboard() {
  const [expenses, setExpenses, isLoaded] = useLocalStorage<Expense[]>(
    "expenses",
    []
  );

  const addExpense = (expense: Expense) => {
    setExpenses([expense, ...expenses]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

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
        <p className="text-sm font-medium text-gray-500">Total Expenses</p>
        <p className="mt-1 text-3xl font-bold text-gray-900">
          ${total.toFixed(2)}
        </p>
        <p className="mt-1 text-sm text-gray-500">
          {expenses.length} expense{expenses.length !== 1 ? "s" : ""}
        </p>
      </div>

      <ExpenseForm onAdd={addExpense} />
      <ExpenseList expenses={expenses} onDelete={deleteExpense} />
    </div>
  );
}
