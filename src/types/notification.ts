import { Category } from "./expense";

export interface NotificationPreferences {
  email: string;
  enabled: boolean;
  frequency: "daily" | "weekly" | "monthly";
  trackedCategories: Category[];
  threshold: number;
}

export interface NotificationRecord {
  id: string;
  date: string;
  subject: string;
  body: string;
  type: "digest" | "alert" | "threshold";
}

export const DEFAULT_PREFERENCES: NotificationPreferences = {
  email: "",
  enabled: false,
  frequency: "weekly",
  trackedCategories: [],
  threshold: 500,
};
