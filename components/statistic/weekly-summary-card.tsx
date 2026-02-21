import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

import { CATEGORY_CONFIG } from "@/constants";
import { FilterType, Transaction } from "@/type";

interface WeeklySummaryCardProps {
  transactions: Transaction[];
  activeFilter: FilterType;
  onSeeAll?: () => void;
}

export default function WeeklySummaryCard({
  transactions,
  activeFilter,
  onSeeAll,
}: WeeklySummaryCardProps) {
  const { t } = useTranslation("statistic");
  const { t: tHome } = useTranslation("home");

  const stats = useMemo(() => {
    const total = transactions.reduce((sum, t) => sum + t.amount, 0);
    const count = transactions.length;
    const dailyAvg = count > 0 ? total / 7 : 0; // Assuming 7 days in a week

    // Calculate top category
    const categoryMap = new Map<string, number>();
    transactions.forEach((t) => {
      const current = categoryMap.get(t.category) || 0;
      categoryMap.set(t.category, current + t.amount);
    });

    let topCategory = null;
    let topAmount = 0;

    categoryMap.forEach((amount, category) => {
      if (amount > topAmount) {
        topAmount = amount;
        topCategory = category;
      }
    });

    return {
      total,
      count,
      dailyAvg,
      topCategory,
      topCategoryAmount: topAmount,
    };
  }, [transactions]);

  const topCategoryConfig = stats.topCategory
    ? CATEGORY_CONFIG[stats.topCategory as keyof typeof CATEGORY_CONFIG]
    : null;

  return (
    <View className="mt-6">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 mb-3">
        <Text className="text-primary font-GHKTachileik text-lg font-semibold">
          {activeFilter === "expense"
            ? t("weekly_expense")
            : t("weekly_income")}
        </Text>
        {onSeeAll && (
          <TouchableOpacity onPress={onSeeAll}>
            <Text className="text-blue font-GHKTachileik text-base">
              {t("see_all")}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Card */}
      <View className="mx-6 p-5 bg-foreground rounded-3xl shadow-sm border border-black/5">
        {/* Main Stats */}
        <View className="mb-6">
          <Text className="text-primary/40 font-GHKTachileik text-xs mb-1">
            {t("total_amount")}
          </Text>
          <Text className="text-primary font-GHKTachileik text-3xl font-semibold py-1">
            ${stats.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </Text>
        </View>

        {/* Stats Grid */}
        <View className="flex-row gap-3">
          {/* Daily Average */}
          <View className="flex-1 bg-background p-3 rounded-2xl border border-primary/5">
            <Text className="text-primary/40 font-GHKTachileik text-[10px] mb-1 uppercase tracking-wide">
              {t("daily_average")}
            </Text>
            <Text className="text-primary font-GHKTachileik text-lg font-semibold">
              $
              {stats.dailyAvg.toLocaleString("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </Text>
          </View>

          {/* Top Category */}
          <View className="flex-1 bg-background p-3 rounded-2xl border border-primary/5">
            <Text className="text-primary/40 font-GHKTachileik text-[10px] mb-1 uppercase tracking-wide">
              {t("top_category")}
            </Text>
            {topCategoryConfig ? (
              <View className="flex-row items-center gap-1.5">
                <View
                  className="size-4 rounded-full items-center justify-center"
                  style={{ backgroundColor: topCategoryConfig.color }}
                >
                  <Ionicons
                    name={topCategoryConfig.icon as any}
                    size={8}
                    color="white"
                  />
                </View>
                <Text
                  numberOfLines={1}
                  className="flex-1 text-primary font-GHKTachileik text-xs font-medium"
                >
                  {tHome(`category.${stats.topCategory}`)}
                </Text>
              </View>
            ) : (
              <Text className="text-primary/30 font-GHKTachileik text-xs italic">
                -
              </Text>
            )}
          </View>

          {/* Transaction Count */}
          <View className="flex-1 bg-background p-3 rounded-2xl border border-primary/5">
            <Text className="text-primary/40 font-GHKTachileik text-[10px] mb-1 uppercase tracking-wide">
              {t("transactions")}
            </Text>
            <Text className="text-primary font-GHKTachileik text-lg font-semibold">
              {stats.count}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
