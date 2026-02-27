import { useUserStore } from "@/store/user.store";
import { formatCurrency } from "@/utils/common";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

interface BudgetStatsProps {
  totalSpent: number;
  remaining: number;
}

export default function BudgetStats({
  totalSpent,
  remaining,
}: BudgetStatsProps) {
  const { t } = useTranslation("budget");
  const { user } = useUserStore();

  // Calculate days left in the month
  const now = new Date();
  const daysInMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
  ).getDate();
  const daysLeft = daysInMonth - now.getDate();

  const stats = [
    {
      label: t("spent"),
      value: `${formatCurrency(totalSpent, user?.currency!)}`,
      color: "#ef4444",
      icon: "trending-up-outline" as const,
      iconColor: "#EF4444",
    },
    {
      label: t("remaining"),
      value: `${formatCurrency(remaining, user?.currency!)}`,
      color: "#22C55E",
      icon: "wallet-outline" as const,
      iconColor: "#22C55E",
    },
    {
      label: t("daily_left"),
      value: `${daysLeft}-${t("day")}`,
      color: "#2563EB",
      icon: "calendar-outline" as const,
      iconColor: "#2563EB",
    },
  ];

  return (
    <View className="flex-row gap-3 px-6 mb-5">
      {stats.map((stat) => (
        <View
          key={stat.label}
          className="flex-1 bg-foreground rounded-2xl p-3.5 border border-primary/5"
        >
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-primary/40 font-GHKTachileik text-sm">
              {stat.label}
            </Text>
            <Ionicons name={stat.icon} size={14} color={stat.iconColor} />
          </View>
          <Text
            className="font-GHKTachileik text-lg font-semibold"
            style={{ color: stat.color }}
          >
            {stat.value}
          </Text>
        </View>
      ))}
    </View>
  );
}
