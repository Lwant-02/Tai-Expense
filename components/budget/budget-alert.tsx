import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

interface BudgetAlertProps {
  percentage: number;
}

export default function BudgetAlert({ percentage }: BudgetAlertProps) {
  const { t } = useTranslation("budget");

  if (percentage < 50) return null;

  const isDanger = percentage >= 80;
  const color = isDanger ? "#EF4444" : "#F59E0B";
  const bgColor = isDanger ? "rgba(239,68,68,0.08)" : "rgba(245,158,11,0.08)";
  const borderColor = isDanger ? "rgba(239,68,68,0.2)" : "rgba(245,158,11,0.2)";
  const message = isDanger
    ? t("alert_danger")
    : t("alert_warning", { percent: Math.round(percentage) });

  return (
    <View
      className="mx-6 mb-5 px-4 py-3.5 rounded-2xl flex-row items-center gap-3"
      style={{ backgroundColor: bgColor, borderWidth: 1, borderColor }}
    >
      <Ionicons
        name={isDanger ? "warning" : "alert-circle"}
        size={20}
        color={color}
      />
      <Text
        className="flex-1 font-GHKTachileik text-sm font-medium"
        style={{ color }}
      >
        {message}
      </Text>
    </View>
  );
}
