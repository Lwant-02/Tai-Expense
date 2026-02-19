import EmptyState from "@/components/empty-state";
import Header from "@/components/header";
import { Ionicons } from "@expo/vector-icons";
import cn from "clsx";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type NotificationType = "alert" | "reminder" | "info" | "tip";

interface Notification {
  id: string;
  type: NotificationType;
  titleKey: string;
  bodyKey: string;
  time: string;
  read: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  bg: string;
}

const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "alert",
    titleKey: "budget_alert_title",
    bodyKey: "budget_alert_body",
    time: "just_now",
    read: false,
    icon: "warning",
    color: "#EF4444",
    bg: "bg-red-500/10",
  },
  {
    id: "2",
    type: "reminder",
    titleKey: "daily_reminder_title",
    bodyKey: "daily_reminder_body",
    time: "minutes_ago",
    read: false,
    icon: "alarm-outline",
    color: "#F59E0B",
    bg: "bg-[#F59E0B]/10",
  },
  {
    id: "3",
    type: "tip",
    titleKey: "savings_tip_title",
    bodyKey: "savings_tip_body",
    time: "hours_ago",
    read: true,
    icon: "bulb-outline",
    color: "#22C55E",
    bg: "bg-green/10",
  },
  {
    id: "4",
    type: "info",
    titleKey: "monthly_summary_title",
    bodyKey: "monthly_summary_body",
    time: "hours_ago",
    read: true,
    icon: "bar-chart-outline",
    color: "#2563EB",
    bg: "bg-blue/10",
  },
  {
    id: "5",
    type: "info",
    titleKey: "welcome_title",
    bodyKey: "welcome_body",
    time: "hours_ago",
    read: true,
    icon: "sparkles",
    color: "#A78BFA",
    bg: "bg-[#A78BFA]/10",
  },
];

const getTimeLabel = (
  time: string,
  t: (key: string, options?: Record<string, unknown>) => string,
) => {
  switch (time) {
    case "just_now":
      return t("just_now");
    case "minutes_ago":
      return t("minutes_ago", { count: 15 });
    case "hours_ago":
      return t("hours_ago", { count: 3 });
    default:
      return time;
  }
};

export default function NotificationPage() {
  const { t } = useTranslation("notification");
  const router = useRouter();

  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const todayNotifications = notifications.filter(
    (n) => n.time === "just_now" || n.time === "minutes_ago",
  );
  const earlierNotifications = notifications.filter(
    (n) => n.time !== "just_now" && n.time !== "minutes_ago",
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header
        title={t("title")}
        showBack
        onBackPress={() => router.back()}
        rightIcon={unreadCount > 0 ? "checkmark-done" : undefined}
        onRightPress={unreadCount > 0 ? markAllRead : undefined}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32"
      >
        {notifications.length === 0 ? (
          <View className="flex-1 items-center justify-center mt-20">
            <EmptyState
              icon="notifications-off-outline"
              title={t("no_notifications")}
              subtitle={t("no_notifications_subtitle")}
            />
          </View>
        ) : (
          <>
            {/* Unread badge */}
            {unreadCount > 0 && (
              <View className="mx-6 mb-4">
                <View className="bg-blue/10 border border-blue/20 rounded-2xl px-4 py-3 flex-row items-center">
                  <View className="size-8 rounded-full bg-blue items-center justify-center mr-3">
                    <Text className="text-white font-GHKTachileik text-base font-semibold">
                      {unreadCount}
                    </Text>
                  </View>
                  <Text className="text-primary/70 font-GHKTachileik text-base flex-1">
                    {t("new_notification", { count: unreadCount })}
                  </Text>
                  <TouchableOpacity onPress={markAllRead}>
                    <Text className="text-blue font-GHKTachileik text-xs font-semibold">
                      {t("mark_all_read")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Today section */}
            {todayNotifications.length > 0 && (
              <View className="mb-4">
                <Text className="text-primary/40 font-GHKTachileik text-xs uppercase tracking-widest mb-3 ml-7">
                  {t("today")}
                </Text>
                {todayNotifications.map((notif) => (
                  <NotificationCard
                    key={notif.id}
                    notification={notif}
                    t={t}
                    onPress={() => markAsRead(notif.id)}
                  />
                ))}
              </View>
            )}

            {/* Earlier section */}
            {earlierNotifications.length > 0 && (
              <View className="mb-4">
                <Text className="text-primary/40 font-GHKTachileik text-xs uppercase tracking-widest mb-3 ml-7">
                  {t("earlier")}
                </Text>
                {earlierNotifications.map((notif) => (
                  <NotificationCard
                    key={notif.id}
                    notification={notif}
                    t={t}
                    onPress={() => markAsRead(notif.id)}
                  />
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function NotificationCard({
  notification,
  t,
  onPress,
}: {
  notification: Notification;
  t: (key: string, options?: Record<string, unknown>) => string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={cn(
        "mx-6 mb-3 rounded-2xl p-4 border",
        notification.read
          ? "bg-foreground border-primary/5"
          : "bg-foreground border-blue/20",
      )}
    >
      <View className="flex-row">
        {/* Icon */}
        <View
          className={cn(
            "size-11 rounded-xl items-center justify-center mr-3",
            notification.bg,
          )}
        >
          <Ionicons
            name={notification.icon}
            size={20}
            color={notification.color}
          />
        </View>

        {/* Content */}
        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-1">
            <Text
              className={cn(
                "font-GHKTachileik text-base font-semibold flex-1",
                notification.read ? "text-primary/70" : "text-primary",
              )}
            >
              {t(notification.titleKey)}
            </Text>
            {!notification.read && (
              <View className="size-2.5 rounded-full bg-blue ml-2" />
            )}
          </View>
          <Text
            className="text-primary/40 font-GHKTachileik text-xs leading-5 mb-2"
            numberOfLines={2}
          >
            {t(notification.bodyKey)}
          </Text>
          <Text className="text-primary/25 font-GHKTachileik text-[10px]">
            {getTimeLabel(notification.time, t)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
