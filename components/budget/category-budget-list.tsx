import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

import { CategoryBudget } from "@/type";
import { useRouter } from "expo-router";
import EmptyState from "../empty-state";
import CategoryBudgetCard from "./category-budget-card";

interface CategoryBudgetListProps {
  budgets: CategoryBudget[];
  totalBudget: number;
}

export default function CategoryBudgetList({
  budgets,
  totalBudget,
}: CategoryBudgetListProps) {
  const { t } = useTranslation("budget");
  const router = useRouter();

  return (
    <View className="px-6 mb-8">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-primary font-GHKTachileik text-lg font-semibold">
          {t("spending_breakdown")}
        </Text>
        <TouchableOpacity onPress={() => router.push("/(root)/all-budget")}>
          <Text className="text-primary/50 font-GHKTachileik text-base">
            See all
          </Text>
        </TouchableOpacity>
      </View>

      {budgets.length === 0 ? (
        <EmptyState
          icon="wallet-outline"
          title={t("no_spending")}
          subtitle={t("no_spending_subtitle")}
        />
      ) : (
        budgets.map((item) => (
          <CategoryBudgetCard
            key={item.category}
            item={item}
            totalBudget={totalBudget}
          />
        ))
      )}
    </View>
  );
}
