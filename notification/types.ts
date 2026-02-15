export type NotificationId =
  | "daily-reminder"
  | "bill-due-reminder"
  | "weekly-summary"
  | "budget-warning";

export interface NotificationSettings {
  dailyReminder: {
    enabled: boolean;
    hour: number; // 0-23
    minute: number; // 0-59
  };
  billDueReminder: {
    enabled: boolean;
  };
  weeklySummary: {
    enabled: boolean;
    /** 1 = Sunday, 2 = Monday, ... 7 = Saturday */
    dayOfWeek: number;
    hour: number;
    minute: number;
  };
  budgetWarning: {
    enabled: boolean;
    /** Threshold percentage (e.g. 80 means 80%) */
    threshold: number;
  };
}

export const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  dailyReminder: {
    enabled: true,
    hour: 20, // 8 PM
    minute: 0,
  },
  billDueReminder: {
    enabled: true,
  },
  weeklySummary: {
    enabled: true,
    dayOfWeek: 1, // Sunday
    hour: 10,
    minute: 0,
  },
  budgetWarning: {
    enabled: true,
    threshold: 80,
  },
};
