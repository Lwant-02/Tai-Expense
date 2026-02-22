import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/components/header";
import CategoryPieChart from "@/components/statistic/category-pie-chart";
import MonthlySummary from "@/components/statistic/monthly-summary";
import WeeklyTrendChart from "@/components/statistic/weekly-trend-chart";

export default function StatisticPage() {
  const { t } = useTranslation("statistic");

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header title={t("title")} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-36"
      >
        <MonthlySummary />
        <CategoryPieChart />
        <WeeklyTrendChart />
      </ScrollView>
    </SafeAreaView>
  );
}
