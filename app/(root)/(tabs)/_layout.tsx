import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="reminder" />
      <Tabs.Screen name="create" />
      <Tabs.Screen name="statistic" />
      <Tabs.Screen name="setting" />r
    </Tabs>
  );
}
