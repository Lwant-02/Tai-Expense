import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

import { CATEGORY_CONFIG } from "@/constants";
import { useTransactionStore } from "@/store/transaction.store";
import { useUserStore } from "@/store/user.store";
import { FilterType } from "@/type";
import { formatCurrency } from "@/utils/common";
import { getCategoryBreakdown } from "@/utils/statistic-utils";
import FilterToggle from "./filter-toggle";

export default function CategoryPieChart() {
  const { t } = useTranslation("statistic");
  const { t: tHome } = useTranslation("home");
  const { transactions } = useTransactionStore();
  const { user } = useUserStore();
  const currency = user?.currency!;

  const [activeFilter, setActiveFilter] = useState<FilterType>("expense");

  const breakdown = useMemo(
    () => getCategoryBreakdown(transactions, activeFilter),
    [transactions, activeFilter],
  );

  const total = breakdown.reduce((sum, s) => sum + s.amount, 0);

  const pieData = breakdown.map((slice) => ({
    value: slice.amount,
    color: slice.color,
    text: `${slice.percentage}%`,
  }));

  const hasData = breakdown.length > 0 && total > 0;

  return (
    <View className="mx-6 mt-6">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-primary font-GHKTachileik text-lg font-semibold">
          {t("category_breakdown")}
        </Text>
        <FilterToggle
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </View>

      <View className="bg-foreground rounded-3xl p-5 border border-primary/10">
        {hasData ? (
          <>
            {/* Pie Chart */}
            <View className="items-center mb-4">
              <PieChart
                data={pieData}
                donut
                radius={90}
                innerRadius={55}
                innerCircleColor="#1a1a1a"
                centerLabelComponent={() => (
                  <View className="items-center">
                    <Text className="text-primary/50 font-GHKTachileik text-[10px]">
                      {t("total")}
                    </Text>
                    <Text className="text-primary font-GHKTachileik text-base font-semibold">
                      {formatCurrency(total, currency)}
                    </Text>
                  </View>
                )}
              />
            </View>

            {/* Legend */}
            <View className="gap-2.5">
              {breakdown.slice(0, 5).map((slice) => {
                const config =
                  CATEGORY_CONFIG[
                    slice.category as keyof typeof CATEGORY_CONFIG
                  ];
                return (
                  <View
                    key={slice.category}
                    className="flex-row items-center justify-between"
                  >
                    <View className="flex-row items-center gap-2 flex-1">
                      <View
                        className="size-3 rounded-full"
                        style={{ backgroundColor: slice.color }}
                      />
                      <Ionicons
                        name={config?.icon as any}
                        size={14}
                        color={slice.color}
                      />
                      <Text
                        className="text-primary/70 font-GHKTachileik text-sm flex-1"
                        numberOfLines={1}
                      >
                        {tHome(`category.${slice.category}`)}
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-3">
                      <Text className="text-primary font-GHKTachileik text-sm font-semibold">
                        {formatCurrency(slice.amount, currency)}
                      </Text>
                      <Text className="text-primary/40 font-GHKTachileik text-xs w-10 text-right">
                        {slice.percentage}%
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </>
        ) : (
          <View className="items-center py-8">
            <Ionicons
              name="pie-chart-outline"
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
