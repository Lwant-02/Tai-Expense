import { endOfWeek, format, startOfWeek } from "date-fns";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EmptyState from "@/components/empty-state";
import Header from "@/components/header";
import FilterToggle from "@/components/statistic/filter-toggle";
import WeeklySummaryCard from "@/components/statistic/weekly-summary-card";
import { useTransactionStore } from "@/store/transaction.store";
import { FilterType, Transaction } from "@/type";

export default function AllWeeklySpending() {
  const { t } = useTranslation("statistic");
  const { t: tHome } = useTranslation("home");
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<FilterType>("expense");
  const { transactions } = useTransactionStore();

  const weeklyData = useMemo(() => {
    const filtered = transactions.filter((t) => t.type === activeFilter);
    const groups = new Map<string, Transaction[]>();

    filtered.forEach((t) => {
      const date = new Date(t.transactionDate);
      const start = startOfWeek(date, { weekStartsOn: 1 });
      const end = endOfWeek(date, { weekStartsOn: 1 });
      const label = `${format(start, "MMM d")} - ${format(end, "MMM d, yyyy")}`;

      if (!groups.has(label)) {
        groups.set(label, []);
      }
      groups.get(label)!.push(t);
    });

    return Array.from(groups.entries()).map(([label, trans], index) => ({
      id: `week-${index}`,
      weekLabel: label,
      transactions: trans,
    }));
  }, [activeFilter, transactions]);

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
            title={tHome("no_transactions")}
            subtitle={tHome("start_tracking")}
          />
        }
        ItemSeparatorComponent={() => (
          <View className="h-[0.5px] bg-primary/5 mx-6" />
        )}
      />
    </SafeAreaView>
  );
}
