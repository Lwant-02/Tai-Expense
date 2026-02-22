import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

import { useTransactionStore } from "@/store/transaction.store";
import { useUserStore } from "@/store/user.store";
import { FilterType } from "@/type";
import { formatCurrency } from "@/utils/common";
import {
  getMonthlyDailyTrend,
  getMonthlySummary,
} from "@/utils/statistic-utils";
import FilterToggle from "./filter-toggle";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function MonthlySummary() {
  const { t } = useTranslation("statistic");
  const { transactions } = useTransactionStore();
  const { user } = useUserStore();
  const currency = user?.currency!;

  const [chartFilter, setChartFilter] = useState<FilterType>("expense");

  const summary = useMemo(
    () => getMonthlySummary(transactions),
    [transactions],
  );
  const dailyTrend = useMemo(
    () => getMonthlyDailyTrend(transactions, chartFilter),
    [transactions, chartFilter],
  );

  const stats = [
    {
      label: t("income"),
      value: summary.totalIncome,
      color: "#22C55E",
      icon: "arrow-down" as const,
    },
    {
      label: t("expense"),
      value: summary.totalExpense,
      color: "#2563EB",
      icon: "arrow-up" as const,
    },
    {
      label:
        summary.net >= 0 ? t("net_balance_income") : t("net_balance_expense"),
      value: summary.net,
      color: summary.net >= 0 ? "#22C55E" : "#EF4444",
      icon:
        summary.net >= 0
          ? ("trending-up" as const)
          : ("trending-down" as const),
    },
  ];

  const chartColor = chartFilter === "expense" ? "#2563EB" : "#22C55E";
  const chartFillStart =
    chartFilter === "expense"
      ? "rgba(37, 99, 235, 0.25)"
      : "rgba(34, 197, 94, 0.25)";
  const chartFillEnd =
    chartFilter === "expense"
      ? "rgba(37, 99, 235, 0.01)"
      : "rgba(34, 197, 94, 0.01)";

  const chartWidth = SCREEN_WIDTH - 100;
  const hasChartData = dailyTrend.some((d) => d.value > 0);
  const spacing =
    dailyTrend.length > 1
      ? Math.floor((chartWidth - 20) / Math.max(dailyTrend.length - 1, 1))
      : 20;

  // Calculate chart total for label
  const chartTotal = dailyTrend.reduce((sum, d) => sum + d.value, 0);

  return (
    <View className="mx-6 mt-4">
      <Text className="text-primary font-GHKTachileik text-lg font-semibold mb-3">
        {t("monthly_summary")}
      </Text>

      <View className="bg-foreground rounded-3xl p-5 border border-primary/10">
        {/* Stats Row */}
        <View className="flex-row gap-3">
          {stats.map((stat) => (
            <View
              key={stat.label}
              className="flex-1 bg-background p-3 rounded-2xl border border-primary/5"
            >
              <View className="flex-row items-center gap-1 mb-2">
                <View
                  className="size-5 rounded-full items-center justify-center"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <Ionicons name={stat.icon} size={10} color={stat.color} />
                </View>
                <Text className="text-primary/50 font-GHKTachileik text-[10px] uppercase">
                  {stat.label}
                </Text>
              </View>
              <Text
                className="font-GHKTachileik text-base font-semibold"
                style={{ color: stat.color }}
                numberOfLines={1}
              >
                {formatCurrency(stat.value, currency)}
              </Text>
            </View>
          ))}
        </View>

        {/* Chart Section */}
        <View className="mt-4 pt-4 border-t border-primary/5">
          <View className="flex-row justify-between items-center mb-3">
            <View>
              <Text className="text-primary/40 font-GHKTachileik text-[10px] uppercase">
                {t("monthly_chart")}
              </Text>
              <Text
                className="font-GHKTachileik text-lg font-semibold"
                style={{ color: chartColor }}
              >
                {formatCurrency(chartTotal, currency)}
              </Text>
            </View>
            <FilterToggle
              activeFilter={chartFilter}
              onFilterChange={setChartFilter}
            />
          </View>

          {hasChartData ? (
            <LineChart
              data={dailyTrend}
              width={chartWidth}
              height={120}
              spacing={spacing}
              initialSpacing={10}
              endSpacing={20}
              thickness={2}
              color={chartColor}
              hideRules
              hideYAxisText
              yAxisColor="transparent"
              xAxisColor="transparent"
              labelsExtraHeight={20}
              xAxisLabelTextStyle={{
                color: "rgba(255,255,255,0.4)",
                fontSize: 11,
                fontFamily: "GHKTachileik",
                width: 50,
                textAlign: "center",
              }}
              curved
              areaChart
              startFillColor={chartFillStart}
              endFillColor={chartFillEnd}
              startOpacity={0.5}
              endOpacity={0.0}
              isAnimated
              animationDuration={800}
              dataPointsColor={chartColor}
              dataPointsRadius={0}
            />
          ) : (
            <View className="items-center py-6">
              <Ionicons
                name="analytics-outline"
                size={36}
                color="rgba(255,255,255,0.15)"
              />
              <Text className="text-primary/30 font-GHKTachileik text-xs mt-1">
                {t("no_data")}
              </Text>
            </View>
          )}
        </View>

        {/* Transaction Count */}
        <View className="flex-row items-center justify-between mt-4 pt-4 border-t border-primary/5">
          <Text className="text-primary/50 font-GHKTachileik text-sm">
            {t("total_transactions")}
          </Text>
          <Text className="text-primary font-GHKTachileik text-sm font-semibold">
            {summary.count}
          </Text>
        </View>
      </View>
    </View>
  );
}
