import { Category } from "./expense";

export interface BudgetSettings {
  overall: number;
  categories: Record<Category, number>;
}

export interface BudgetAlert {
  category: string;
  spent: number;
  limit: number;
  percentage: number;
  level: "warning" | "critical";
}

export const DEFAULT_BUDGET_SETTINGS: BudgetSettings = {
  overall: 1000,
  categories: {
    Food: 300,
    Transportation: 200,
    Shopping: 200,
    Bills: 200,
    Other: 100,
  },
};
