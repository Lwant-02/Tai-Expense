import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <Stack initialRouteName="(tabs)">
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="all-transactions" options={{ headerShown: false }} />
      <Stack.Screen name="all-categories" options={{ headerShown: false }} />
      <Stack.Screen
        name="transaction-detail"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="settings/currency" options={{ headerShown: false }} />
      <Stack.Screen name="settings/language" options={{ headerShown: false }} />
      <Stack.Screen name="settings/about" options={{ headerShown: false }} />
      <Stack.Screen
        name="settings/notification"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="notification" options={{ headerShown: false }} />
      <Stack.Screen name="due-bill" options={{ headerShown: false }} />
      <Stack.Screen name="all-budget" options={{ headerShown: false }} />
      <Stack.Screen name="all-due-bill" options={{ headerShown: false }} />
      <Stack.Screen
        name="all-weekly-spending"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="test" options={{ headerShown: false }} />
    </Stack>
  );
}
