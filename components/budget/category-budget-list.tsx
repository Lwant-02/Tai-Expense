import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import { CategoryBudget } from "@/type";
import EmptyState from "../empty-state";
import CategoryBudgetCard from "./category-budget-card";

interface CategoryBudgetListProps {
  budgets: CategoryBudget[];
}

export default function CategoryBudgetList({
  budgets,
}: CategoryBudgetListProps) {
  const { t } = useTranslation("budget");

  return (
    <View className="px-6 mb-8">
      <Text className="text-primary font-GHKTachileik text-lg font-semibold mb-4">
        {t("category_budgets")}
      </Text>

      {budgets.length === 0 ? (
        <EmptyState
          icon="wallet-outline"
          title={t("no_category_budget")}
          subtitle={t("no_category_budget_subtitle")}
        />
      ) : (
        budgets.map((item) => (
          <CategoryBudgetCard key={item.category} item={item} />
        ))
      )}
    </View>
  );
}
