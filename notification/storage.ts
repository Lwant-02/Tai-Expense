import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  DEFAULT_NOTIFICATION_SETTINGS,
  type NotificationSettings,
} from "./types";

const NOTIFICATION_SETTINGS_KEY = "notification-settings";

export const saveNotificationSettings = async (
  settings: NotificationSettings,
): Promise<void> => {
  await AsyncStorage.setItem(
    NOTIFICATION_SETTINGS_KEY,
    JSON.stringify(settings),
  );
};

export const loadNotificationSettings =
  async (): Promise<NotificationSettings> => {
    const raw = await AsyncStorage.getItem(NOTIFICATION_SETTINGS_KEY);
    if (!raw) return DEFAULT_NOTIFICATION_SETTINGS;
    try {
      return { ...DEFAULT_NOTIFICATION_SETTINGS, ...JSON.parse(raw) };
    } catch {
      return DEFAULT_NOTIFICATION_SETTINGS;
    }
  };
