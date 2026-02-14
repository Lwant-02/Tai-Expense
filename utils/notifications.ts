// TODO: Enable when using a development build instead of Expo Go
// expo-notifications was removed from Expo Go in SDK 53+
//
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export async function registerForPushNotificationsAsync() {
  if (Device.isDevice) {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      console.warn("Notification permission not granted");
    }
  }
}
