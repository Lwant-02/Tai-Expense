import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

import type { NotificationId } from "./types";

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

/** Configure how notifications appear when the app is in the foreground. */
export function setupNotificationHandler() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
}

/** Request notification permissions + create Android channel. */
export async function requestPermissions(): Promise<boolean> {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
      sound: "default",
    });
  }

  if (!Device.isDevice) {
    console.warn("Must use physical device for notifications");
    return false;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  if (existingStatus === "granted") return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
}

// ---------------------------------------------------------------------------
// Cancel helpers
// ---------------------------------------------------------------------------

/** Cancel a specific scheduled notification by its identifier. */
export async function cancelNotification(id: NotificationId) {
  await Notifications.cancelScheduledNotificationAsync(id);
}

/** Cancel all scheduled notifications. */
export async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

/** List all currently scheduled notifications (useful for debugging). */
export async function getScheduledNotifications() {
  return Notifications.getAllScheduledNotificationsAsync();
}

// ---------------------------------------------------------------------------
// Scheduling
// ---------------------------------------------------------------------------

/**
 * Schedule a **daily expense reminder** at the given hour/minute.
 * This repeats every day.
 */
export async function scheduleDailyReminder(hour: number, minute: number) {
  // Cancel any existing daily reminder first
  await cancelNotification("daily-reminder");

  await Notifications.scheduleNotificationAsync({
    identifier: "daily-reminder",
    content: {
      title: "💰 Daily Expense Reminder",
      body: "Don't forget to log today's expenses! Keeping track helps you stay on budget.",
      sound: "default",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
    },
  });
}

/**
 * Schedule a **bill due reminder**.
 * If `isRecurring` is true, it repeats monthly on the reminder date.
 * If false, it fires once, 1 day before the due date.
 * @param billId - ID of the bill, to cancel easily if needed
 * @param billName - Name of the bill
 * @param dueDate - The bill's due date
 * @param isRecurring - Whether it repeats monthly
 */
export async function scheduleBillDueReminder(
  billId: string,
  billName: string,
  dueDate: Date,
  isRecurring: boolean = false
) {
  const reminderDate = new Date(dueDate);
  reminderDate.setDate(reminderDate.getDate() - 1);
  reminderDate.setHours(9, 0, 0, 0); // Remind at 9 AM the day before

  const identifier = `bill-due-reminder-${billId}`;
  await cancelNotification(identifier as NotificationId);

  // For a one-time bill, if the reminder date is in the past, don't schedule
  if (!isRecurring && reminderDate.getTime() <= Date.now()) return;

  const trigger = isRecurring
    ? Platform.OS === "ios"
      ? {
          type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
          day: reminderDate.getDate(),
          hour: reminderDate.getHours(),
          minute: reminderDate.getMinutes(),
          repeats: true,
        }
      : {
          type: Notifications.SchedulableTriggerInputTypes.MONTHLY,
          day: reminderDate.getDate(),
          hour: reminderDate.getHours(),
          minute: reminderDate.getMinutes(),
        }
    : {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: reminderDate,
      };

  await Notifications.scheduleNotificationAsync({
    identifier,
    content: {
      title: "📋 Bill Due Tomorrow",
      body: `Your bill "${billName}" is due tomorrow. Don't forget to pay!`,
      sound: "default",
    },
    trigger: trigger as Notifications.NotificationTriggerInput,
  });
}

/**
 * Schedule a **monthly reminder** at the given date/hour/minute.
 * This repeats every month.
 */
export async function scheduleMonthlyReminder(
  day: number,
  hour: number,
  minute: number,
) {
  await cancelNotification("monthly-reminder");

  await Notifications.scheduleNotificationAsync({
    identifier: "monthly-reminder",
    content: {
      title: "📅 Monthly Review",
      body: "It's a new month! Review your expenses and set up a new budget if needed.",
      sound: "default",
    },
    trigger: Platform.OS === "ios" 
      ? {
          type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
          day,
          hour,
          minute,
          repeats: true,
        }
      : {
          type: Notifications.SchedulableTriggerInputTypes.MONTHLY,
          day,
          hour,
          minute,
        },
  });
}

/**
 * Schedule a **weekly summary** notification.
 * @param dayOfWeek - 1 = Sunday, 2 = Monday, ..., 7 = Saturday
 */
export async function scheduleWeeklySummary(
  dayOfWeek: number,
  hour: number,
  minute: number,
) {
  await cancelNotification("weekly-summary");

  await Notifications.scheduleNotificationAsync({
    identifier: "weekly-summary",
    content: {
      title: "📊 Weekly Summary",
      body: "Your weekly spending summary is ready! Check your statistics to see the breakdown.",
      sound: "default",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
      weekday: dayOfWeek,
      hour,
      minute,
    },
  });
}

/**
 * Send an **immediate** budget warning notification.
 * Call this when the user exceeds their budget threshold.
 */
export async function sendBudgetWarning(percentage: number) {
  await Notifications.scheduleNotificationAsync({
    identifier: "budget-warning",
    content: {
      title: "⚠️ Budget Warning",
      body: `You've spent ${percentage}% of your monthly budget. Consider slowing down your spending.`,
      sound: "default",
    },
    trigger: null, // Immediate
  });
}

// ---------------------------------------------------------------------------
// Test helpers (schedule notifications with short delays for testing)
// ---------------------------------------------------------------------------

/** Schedule a test notification after a few seconds. */
export async function scheduleTestNotification(
  title: string,
  body: string,
  seconds: number = 5,
) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: "default",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds,
      repeats: false,
    },
  });
}
