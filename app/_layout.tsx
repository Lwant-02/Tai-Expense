import { initDatabase } from "@/db";
import {
  applyNotificationSchedules,
  loadNotificationSettings,
} from "@/notification";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../i18n";
import "./global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    GHKKengtung: require("../assets/fonts/GHKKengtung.ttf"),
    GHKTachileik: require("../assets/fonts/GHKTachileik.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      // Initialize notifications
      loadNotificationSettings().then((settings) => {
        applyNotificationSchedules(settings);
      });
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="default" />
      <SQLiteProvider databaseName="expense.db" onInit={initDatabase}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(root)" options={{ headerShown: false }} />
          <Stack.Screen name="(welcome)" options={{ headerShown: false }} />
        </Stack>
      </SQLiteProvider>
    </GestureHandlerRootView>
  );
}
