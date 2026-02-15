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
 * Schedule a **bill due reminder** — fires once, 1 day before the due date.
 * @param billName - Name of the bill
 * @param dueDate  - The bill's due date
 */
export async function scheduleBillDueReminder(billName: string, dueDate: Date) {
  const reminderDate = new Date(dueDate);
  reminderDate.setDate(reminderDate.getDate() - 1);
  reminderDate.setHours(9, 0, 0, 0); // Remind at 9 AM the day before

  // Don't schedule if the reminder date is in the past
  if (reminderDate.getTime() <= Date.now()) return;

  const secondsUntil = Math.floor((reminderDate.getTime() - Date.now()) / 1000);

  await Notifications.scheduleNotificationAsync({
    identifier: `bill-due-reminder-${billName}`,
    content: {
      title: "📋 Bill Due Tomorrow",
      body: `Your bill "${billName}" is due tomorrow. Don't forget to pay!`,
      sound: "default",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: secondsUntil,
      repeats: false,
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
