import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EmptyState from "@/components/empty-state";
import Header from "@/components/header";
import { TOP_EXPENSE, TOP_INCOME } from "@/components/statistic/chart-data";
import FilterToggle from "@/components/statistic/filter-toggle";
import WeeklySummaryCard from "@/components/statistic/weekly-summary-card";
import { FilterType } from "@/type";

export default function AllWeeklySpending() {
  const { t } = useTranslation("statistic");
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<FilterType>("expense");

  // In a real app, this data would come from a backend or grouped transactions
  // For now, we'll simulate 'past weeks' by duplicating the sample transactions
  // and giving them different ID/Totals to look unique clearly.
  const weeklyData = useMemo(() => {
    const baseTransactions =
      activeFilter === "expense" ? TOP_EXPENSE : TOP_INCOME;

    // Generate 4 weeks of fake data
    return Array.from({ length: 4 }).map((_, i) => ({
      id: `week-${i}`,
      weekLabel: `Week ${4 - i} of ${new Date().toLocaleString("default", { month: "long" })}`,
      transactions: baseTransactions.map((t) => ({
        ...t,
        id: `${t.id}-${i}`,
        amount: t.amount * (1 + i * 0.1), // Vary amount slightly
      })),
    }));
  }, [activeFilter]);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header
        title={t("weekly_spending", "Weekly Spending")}
        showBack
        onBackPress={() => router.back()}
      />

      <FlatList
        data={weeklyData}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-10"
        ListHeaderComponent={
          <View className="mb-4">
            <FilterToggle
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </View>
        }
        renderItem={({ item }) => (
          <View className="mb-6">
            <Text className="text-primary/60 font-GHKTachileik text-base font-semibold px-6 mb-[-10px]">
              {item.weekLabel}
            </Text>
            <WeeklySummaryCard
              transactions={item.transactions}
              activeFilter={activeFilter}
            />
          </View>
        )}
        ListEmptyComponent={
          <EmptyState
            icon="receipt-outline"
            title={t("no_transactions")}
            subtitle={t("start_tracking")}
          />
        }
        ItemSeparatorComponent={() => (
          <View className="h-[0.5px] bg-primary/5 mx-6" />
        )}
      />
    </SafeAreaView>
  );
}
