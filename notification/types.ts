export type NotificationId =
  | "daily-reminder"
  | "bill-due-reminder"
  | "weekly-summary"
  | "budget-warning"
  | "monthly-reminder";

export interface NotificationSettingsType {
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
  monthlyReminder: {
    enabled: boolean;
    dayOfMonth: number;
    hour: number;
    minute: number;
  };
  budgetWarning: {
    enabled: boolean;
    /** Threshold percentage (e.g. 75 means 75%) */
    threshold: number;
  };
}

export const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettingsType = {
  dailyReminder: {
    enabled: true,
    hour: 9, // 9 AM
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
  monthlyReminder: {
    enabled: true,
    dayOfMonth: 1, // 1st of the month
    hour: 9,
    minute: 0,
  },
  budgetWarning: {
    enabled: true,
    threshold: 75,
  },
};
