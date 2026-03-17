import {
  cancelAllNotifications,
  getScheduledNotifications,
  requestPermissions,
  scheduleBillDueReminder,
  scheduleDailyReminder,
  scheduleTestNotification,
  scheduleWeeklySummary,
  sendBudgetWarning,
  setupNotificationHandler,
} from "@/notification";
import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Setup foreground handler
setupNotificationHandler();

interface ScheduledItem {
  identifier: string;
  content: { title?: string | null; body?: string | null };
}

export default function NotificationTest() {
  const [permGranted, setPermGranted] = useState<boolean | null>(null);
  const [scheduled, setScheduled] = useState<ScheduledItem[]>([]);
  const [lastNotif, setLastNotif] = useState<Notifications.Notification | null>(
    null,
  );

  // Request permissions on mount
  useEffect(() => {
    requestPermissions().then(setPermGranted);

    const sub = Notifications.addNotificationReceivedListener((notif) => {
      setLastNotif(notif);
    });

    return () => sub.remove();
  }, []);

  const refreshScheduled = async () => {
    const list = await getScheduledNotifications();
    setScheduled(list);
  };

  useEffect(() => {
    refreshScheduled();
  }, []);

  const tests = [
    {
      icon: "alarm-outline" as const,
      color: "#F59E0B",
      bg: "bg-[#F59E0B]/10",
      title: "Daily Reminder",
      subtitle: "Schedules 5s from now for testing",
      onPress: async () => {
        await scheduleTestNotification(
          "💰 Daily Expense Reminder",
          "Don't forget to log today's expenses!",
          5,
        );
        Alert.alert("✅ Scheduled", "Daily reminder will fire in 5 seconds");
        refreshScheduled();
      },
    },
    {
      icon: "calendar-outline" as const,
      color: "#EF4444",
      bg: "bg-red-500/10",
      title: "Bill Due Reminder",
      subtitle: "Schedules for a bill due tomorrow",
      onPress: async () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        await scheduleBillDueReminder("test-bill-id", "Electricity Bill", tomorrow, false);
        Alert.alert(
          "✅ Scheduled",
          "Bill due reminder scheduled for 9 AM today (1 day before tomorrow)",
        );
        refreshScheduled();
      },
    },
    {
      icon: "bar-chart-outline" as const,
      color: "#2563EB",
      bg: "bg-blue/10",
      title: "Weekly Summary",
      subtitle: "Schedules repeating weekly (Sunday 10 AM)",
      onPress: async () => {
        await scheduleWeeklySummary(1, 10, 0);
        Alert.alert(
          "✅ Scheduled",
          "Weekly summary will fire every Sunday at 10:00 AM",
        );
        refreshScheduled();
      },
    },
    {
      icon: "warning" as const,
      color: "#EF4444",
      bg: "bg-red-500/10",
      title: "Budget Warning",
      subtitle: "Sends immediately (85% spent)",
      onPress: async () => {
        await sendBudgetWarning(85);
        refreshScheduled();
      },
    },
    {
      icon: "time-outline" as const,
      color: "#22C55E",
      bg: "bg-green/10",
      title: "Schedule Real Daily Reminder",
      subtitle: "Repeating daily at 8:00 PM",
      onPress: async () => {
        await scheduleDailyReminder(20, 0);
        Alert.alert(
          "✅ Scheduled",
          "Daily reminder will fire every day at 8:00 PM",
        );
        refreshScheduled();
      },
    },
    {
      icon: "close-circle-outline" as const,
      color: "#8E8E93",
      bg: "bg-primary/5",
      title: "Cancel All Notifications",
      subtitle: "Remove all scheduled notifications",
      onPress: async () => {
        await cancelAllNotifications();
        Alert.alert("🗑️ Cleared", "All scheduled notifications cancelled");
        refreshScheduled();
      },
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 pt-4 pb-3">
        <Text className="text-primary font-GHKTachileik text-xl font-bold">
          🔔 Notification Test
        </Text>
        <Text className="text-primary/40 font-GHKTachileik text-xs mt-1">
          Permission:{" "}
          {permGranted === null
            ? "Checking..."
            : permGranted
              ? "✅ Granted"
              : "❌ Denied"}
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-6"
      >
        {/* Test Buttons */}
        <Text className="text-primary/40 font-GHKTachileik text-xs uppercase tracking-widest mb-3 ml-1">
          Test Actions
        </Text>

        {tests.map((test) => (
          <TouchableOpacity
            key={test.title}
            onPress={test.onPress}
            activeOpacity={0.7}
            className="flex-row items-center bg-foreground rounded-2xl p-4 mb-3 border border-primary/5"
          >
            <View
              className={`size-10 rounded-xl items-center justify-center mr-3 ${test.bg}`}
            >
              <Ionicons name={test.icon} size={18} color={test.color} />
            </View>
            <View className="flex-1">
              <Text className="text-primary font-GHKTachileik text-base font-semibold">
                {test.title}
              </Text>
              <Text className="text-primary/40 font-GHKTachileik text-xs mt-0.5">
                {test.subtitle}
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={16}
              color="rgba(255,255,255,0.2)"
            />
          </TouchableOpacity>
        ))}

        {/* Scheduled List */}
        <View className="mt-4">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-primary/40 font-GHKTachileik text-xs uppercase tracking-widest ml-1">
              Scheduled ({scheduled.length})
            </Text>
            <TouchableOpacity onPress={refreshScheduled}>
              <Text className="text-blue font-GHKTachileik text-xs">
                Refresh
              </Text>
            </TouchableOpacity>
          </View>

          {scheduled.length === 0 ? (
            <View className="bg-foreground rounded-2xl p-5 items-center border border-primary/5">
              <Ionicons
                name="notifications-off-outline"
                size={32}
                color="rgba(255,255,255,0.15)"
              />
              <Text className="text-primary/30 font-GHKTachileik text-xs mt-2">
                No scheduled notifications
              </Text>
            </View>
          ) : (
            scheduled.map((item, i) => (
              <View
                key={`${item.identifier}-${i}`}
                className="bg-foreground rounded-2xl p-4 mb-2 border border-primary/5"
              >
                <Text className="text-primary font-GHKTachileik text-xs font-semibold">
                  {item.content.title || "Untitled"}
                </Text>
                <Text className="text-primary/40 font-GHKTachileik text-[10px] mt-1">
                  ID: {item.identifier}
                </Text>
              </View>
            ))
          )}
        </View>

        {/* Last Received */}
        {lastNotif && (
          <View className="mt-4">
            <Text className="text-primary/40 font-GHKTachileik text-xs uppercase tracking-widest mb-3 ml-1">
              Last Received
            </Text>
            <View className="bg-green/10 rounded-2xl p-4 border border-green/20">
              <Text className="text-primary font-GHKTachileik text-base font-semibold">
                {lastNotif.request.content.title}
              </Text>
              <Text className="text-primary/60 font-GHKTachileik text-xs mt-1">
                {lastNotif.request.content.body}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
