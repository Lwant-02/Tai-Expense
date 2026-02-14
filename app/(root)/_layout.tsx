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
    </Stack>
  );
}
