export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: Category;
  date: string;
}

export type Category =
  | "Food"
  | "Transportation"
  | "Shopping"
  | "Bills"
  | "Other";

export const CATEGORIES: Category[] = [
  "Food",
  "Transportation",
  "Shopping",
  "Bills",
  "Other",
];
