import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

import { useTransactionStore } from "@/store/transaction.store";
import { FilterType } from "@/type";
import { getWeeklyTrend } from "@/utils/statistic-utils";
import FilterToggle from "./filter-toggle";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function WeeklyTrendChart() {
  const { t } = useTranslation("statistic");
  const { transactions } = useTransactionStore();

  const [activeFilter, setActiveFilter] = useState<FilterType>("expense");

  const weeklyData = useMemo(
    () => getWeeklyTrend(transactions, activeFilter),
    [transactions, activeFilter],
  );

  const barColor = activeFilter === "expense" ? "#2563EB" : "#22C55E";
  const gradientColor = activeFilter === "expense" ? "#1D4ED8" : "#16A34A";

  const maxValue = Math.max(...weeklyData.map((d) => d.value));
  const hasData = maxValue > 0;

  const barData = weeklyData.map((d) => ({
    value: d.value,
    label: d.label,
    frontColor: barColor,
    gradientColor: gradientColor,
    topLabelComponent: () =>
      d.value > 0 ? (
        <Text
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: 10,
            fontFamily: "GHKTachileik",
            marginBottom: 2,
            textAlign: "center",
          }}
        >
          {d.value >= 1000
            ? `${(d.value / 1000).toFixed(1)}k`
            : d.value.toFixed(0)}
        </Text>
      ) : null,
  }));

  const chartWidth = SCREEN_WIDTH - 100;
  const barWidth = 24;
  const spacing = Math.floor((chartWidth - barWidth * 7) / Math.max(6, 1));

  return (
    <View className="mx-6 mt-6">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-primary font-GHKTachileik text-lg font-semibold">
          {t("weekly_trend")}
        </Text>
        <FilterToggle
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </View>

      <View className="bg-foreground rounded-3xl p-5 border border-primary/10">
        {hasData ? (
          <View className="items-center">
            <BarChart
              data={barData}
              width={chartWidth}
              height={180}
              overflowTop={40}
              barWidth={barWidth}
              spacing={spacing}
              initialSpacing={10}
              barBorderRadius={6}
              noOfSections={4}
              hideRules
              hideYAxisText
              yAxisColor="transparent"
              xAxisColor="transparent"
              xAxisLabelTextStyle={{
                color: "rgba(255,255,255,0.4)",
                fontSize: 11,
                fontFamily: "GHKTachileik",
              }}
              isAnimated
              animationDuration={600}
            />
          </View>
        ) : (
          <View className="items-center py-8">
            <Ionicons
              name="bar-chart-outline"
              size={48}
              color="rgba(255,255,255,0.15)"
            />
            <Text className="text-primary/30 font-GHKTachileik text-sm mt-2">
              {t("no_data")}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
