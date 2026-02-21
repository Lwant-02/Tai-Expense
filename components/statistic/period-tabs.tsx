import cn from "clsx";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

import { Period } from "@/type";

const PERIODS: Period[] = ["week", "month", "year"];

interface PeriodTabsProps {
  activePeriod: Period;
  onPeriodChange: (period: Period) => void;
}

export default function PeriodTabs({
  activePeriod,
  onPeriodChange,
}: PeriodTabsProps) {
  const { t } = useTranslation("statistic");

  return (
    <View className="flex-row items-center mx-6 mt-2 bg-foreground rounded-2xl p-1.5">
      {PERIODS.map((period) => (
        <TouchableOpacity
          key={period}
          onPress={() => onPeriodChange(period)}
          className={cn(
            "flex-1 py-2.5 rounded-xl items-center",
            activePeriod === period && "bg-blue",
          )}
        >
          <Text
            className={cn(
              "font-GHKTachileik text-lg font-medium",
              activePeriod === period ? "text-primary" : "text-primary/50",
            )}
          >
            {t(`period.${period}`)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
