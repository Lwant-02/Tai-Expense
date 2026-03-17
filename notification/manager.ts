import {
  cancelNotification,
  scheduleDailyReminder,
  scheduleWeeklySummary,
  scheduleMonthlyReminder,
  setupNotificationHandler,
} from "./scheduler";
import type { NotificationSettingsType } from "./types";

/**
 * Apply all schedules based on the provided settings.
 * This should be called on app launch and whenever settings change.
 */
export async function applyNotificationSchedules(
  settings: NotificationSettingsType,
) {
  // Ensure handler is set up
  setupNotificationHandler();

  // Daily reminder
  if (settings.dailyReminder.enabled) {
    await scheduleDailyReminder(
      settings.dailyReminder.hour,
      settings.dailyReminder.minute,
    );
  } else {
    await cancelNotification("daily-reminder");
  }

  // Weekly summary
  if (settings.weeklySummary.enabled) {
    await scheduleWeeklySummary(
      settings.weeklySummary.dayOfWeek,
      settings.weeklySummary.hour,
      settings.weeklySummary.minute,
    );
  } else {
    await cancelNotification("weekly-summary");
  }

  // Monthly reminder
  if (settings.monthlyReminder.enabled) {
    await scheduleMonthlyReminder(
      settings.monthlyReminder.dayOfMonth,
      settings.monthlyReminder.hour,
      settings.monthlyReminder.minute,
    );
  } else {
    await cancelNotification("monthly-reminder");
  }

  // Note: Bill due reminders are scheduled dynamically when bills are created/updated
  // Note: Budget warnings are sent immediately based on spending
}
