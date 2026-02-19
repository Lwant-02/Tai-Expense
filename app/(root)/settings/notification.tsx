import Header from "@/components/header";
import type { NotificationSettings } from "@/notification";
import {
  applyNotificationSchedules,
  loadNotificationSettings,
  saveNotificationSettings,
} from "@/notification";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function NotificationSettings() {
  const { t } = useTranslation("notification");
  const router = useRouter();
  const [settings, setSettings] = useState<NotificationSettings | null>(null);

  useEffect(() => {
    loadNotificationSettings().then(setSettings);
  }, []);

  const save = async (updated: NotificationSettings) => {
    setSettings(updated);
    await saveNotificationSettings(updated);
    await applyNotificationSchedules(updated);
  };

  if (!settings) return null;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header
        title={t("notification_settings_title")}
        showBack
        onBackPress={() => router.back()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-6"
      >
        {/* Daily Reminder */}
        <Text className="text-primary/40 font-GHKTachileik text-xs uppercase tracking-widest mb-3 ml-1">
          {t("reminders")}
        </Text>

        <SettingToggle
          icon="alarm-outline"
          iconColor="#F59E0B"
          iconBg="bg-[#F59E0B]/10"
          title={t("daily_reminder_title")}
          subtitle={t("daily_setting_subtitle", {
            time: `${String(settings.dailyReminder.hour).padStart(2, "0")}:${String(settings.dailyReminder.minute).padStart(2, "0")}`,
          })}
          value={settings.dailyReminder.enabled}
          onToggle={(val) =>
            save({
              ...settings,
              dailyReminder: { ...settings.dailyReminder, enabled: val },
            })
          }
        />

        <SettingToggle
          icon="receipt-outline"
          iconColor="#EF4444"
          iconBg="bg-red-500/10"
          title={t("bill_due_title")}
          subtitle={t("bill_due_subtitle")}
          value={settings.billDueReminder.enabled}
          onToggle={(val) =>
            save({
              ...settings,
              billDueReminder: { ...settings.billDueReminder, enabled: val },
            })
          }
        />

        <View className="mb-5" />

        {/* Summary & Alerts */}
        <Text className="text-primary/40 font-GHKTachileik text-xs uppercase tracking-widest mb-3 ml-1">
          {t("summary_alerts")}
        </Text>

        <SettingToggle
          icon="bar-chart-outline"
          iconColor="#2563EB"
          iconBg="bg-blue/10"
          title={t("weekly_summary_title")}
          subtitle={t("weekly_setting_subtitle", {
            day: WEEKDAY_LABELS[(settings.weeklySummary.dayOfWeek - 1) % 7],
            time: `${String(settings.weeklySummary.hour).padStart(2, "0")}:${String(settings.weeklySummary.minute).padStart(2, "0")}`,
          })}
          value={settings.weeklySummary.enabled}
          onToggle={(val) =>
            save({
              ...settings,
              weeklySummary: { ...settings.weeklySummary, enabled: val },
            })
          }
        />

        <SettingToggle
          icon="warning"
          iconColor="#EF4444"
          iconBg="bg-red-500/10"
          title={t("budget_warning_title")}
          subtitle={t("budget_warning_subtitle", {
            threshold: settings.budgetWarning.threshold,
          })}
          value={settings.budgetWarning.enabled}
          onToggle={(val) =>
            save({
              ...settings,
              budgetWarning: { ...settings.budgetWarning, enabled: val },
            })
          }
        />

        {/* Info */}
        <View className="mt-6 bg-blue/5 rounded-2xl p-4 border border-blue/10">
          <View className="flex-row items-center mb-2">
            <Ionicons name="information-circle" size={16} color="#2563EB" />
            <Text className="text-blue font-GHKTachileik text-base font-semibold ml-2">
              {t("notification_info_title")}
            </Text>
          </View>
          <Text className="text-primary/40 font-GHKTachileik text-sm leading-5">
            {t("notification_info_body")}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingToggle({
  icon,
  iconColor,
  iconBg,
  title,
  subtitle,
  value,
  onToggle,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBg: string;
  title: string;
  subtitle: string;
  value: boolean;
  onToggle: (val: boolean) => void;
}) {
  return (
    <View className="flex-row items-center bg-foreground rounded-2xl p-4 mb-3 border border-primary/5">
      <View
        className={`size-10 rounded-xl items-center justify-center mr-3 ${iconBg}`}
      >
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <View className="flex-1 mr-3">
        <Text className="text-primary font-GHKTachileik text-base font-semibold">
          {title}
        </Text>
        <Text className="text-primary/40 font-GHKTachileik text-xs mt-0.5">
          {subtitle}
        </Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: "rgba(255,255,255,0.1)", true: "#2563EB" }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}
