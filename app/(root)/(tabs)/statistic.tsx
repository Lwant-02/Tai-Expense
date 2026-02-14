import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/components/header";
import {
  CHART_DATA,
  TOP_EXPENSE,
  TOP_INCOME,
} from "@/components/statistic/chart-data";
import ExpenseChart from "@/components/statistic/expense-chart";
import FilterToggle from "@/components/statistic/filter-toggle";
import PeriodTabs from "@/components/statistic/period-tabs";
import TopTransactions from "@/components/statistic/top-transactions";
import { FilterType, Period } from "@/type";

export default function StatisticPage() {
  const { t } = useTranslation("statistic");
  const router = useRouter();
  const [activePeriod, setActivePeriod] = useState<Period>("month");
  const [activeFilter, setActiveFilter] = useState<FilterType>("expense");

  const chartData = CHART_DATA[activeFilter][activePeriod];
  const topTransactions = activeFilter === "expense" ? TOP_EXPENSE : TOP_INCOME;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header title={t("title")} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-36"
      >
        <PeriodTabs
          activePeriod={activePeriod}
          onPeriodChange={setActivePeriod}
        />

        <FilterToggle
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <ExpenseChart chartData={chartData} activeFilter={activeFilter} />

        <TopTransactions
          transactions={topTransactions}
          activeFilter={activeFilter}
          onTransactionPress={(item) =>
            router.push({
              pathname: "/(root)/transaction-detail",
              params: { ...item },
            })
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}
