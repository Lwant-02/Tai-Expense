import BottomSheet from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { getBudgetData } from "@/actions/budget";
import BudgetAlert from "@/components/budget/budget-alert";
import BudgetRing from "@/components/budget/budget-ring";
import BudgetStats from "@/components/budget/budget-stats";
import CategoryBudgetList from "@/components/budget/category-budget-list";
import SetBudgetForm from "@/components/budget/set-budget-form";
import CustomBottomSheet from "@/components/custom-bottom-sheet";
import EmptyState from "@/components/empty-state";
import Header from "@/components/header";
import { useBudgetStore } from "@/store/budget.store";
import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";

export default function BudgetPage() {
  const { t } = useTranslation("budget");
  const router = useRouter();
  const db = useSQLiteContext();
  const { budgetData, setBudgetData } = useBudgetStore();

  const loadData = useCallback(async () => {
    try {
      const now = new Date();
      const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
      const year = now.getFullYear().toString();
      const data = await getBudgetData(db, month, year);
      setBudgetData(data);
    } catch (error) {
      console.error("Failed to load budget data:", error);
    }
  }, [db, setBudgetData]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData]),
  );

  const monthlyBudget = budgetData?.monthlyBudget || 0;
  const totalSpent = budgetData?.totalSpent || 0;
  const categoryBudgets = budgetData?.categoryBudgets || [];

  const remaining = monthlyBudget > 0 ? monthlyBudget - totalSpent : 0;
  const percentage = monthlyBudget > 0 ? (totalSpent / monthlyBudget) * 100 : 0;

  // Bottom sheet
  const bottomSheetRef = useRef<BottomSheet>(null);

  const openForm = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const closeForm = useCallback(() => {
    bottomSheetRef.current?.close();
    loadData(); // Reload after save
  }, [loadData]);

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView className="flex-1 bg-background">
        <Header
          title={t("title")}
          showBack
          onBackPress={() => router.back()}
          rightIcon="add"
          onRightPress={openForm}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-32 pt-6"
        >
          {monthlyBudget > 0 ? (
            <>
              <BudgetRing totalBudget={monthlyBudget} totalSpent={totalSpent} />

              {/* Month pill */}
              <View className="items-center mb-5">
                <View className="flex-row items-center bg-foreground px-4 py-2 rounded-full border border-primary/5">
                  <Text className="text-primary/60 font-GHKTachileik text-sm mx-3">
                    {new Date().toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </Text>
                </View>
              </View>

              {/* Stats */}
              <BudgetStats totalSpent={totalSpent} remaining={remaining} />

              {/* Alert */}
              <BudgetAlert percentage={percentage} />

              {/* Category budgets */}
              <CategoryBudgetList
                budgets={categoryBudgets}
                totalBudget={monthlyBudget}
              />
            </>
          ) : (
            <View className="px-6 py-10 items-center justify-center">
              <EmptyState
                title={t("no_spending_title")}
                subtitle={t("no_spending_subtitle")}
              />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>

      {/* Bottom sheet — must be outside SafeAreaView */}
      <CustomBottomSheet sheetRef={bottomSheetRef}>
        <SetBudgetForm currentBudget={monthlyBudget} onClose={closeForm} />
      </CustomBottomSheet>
    </GestureHandlerRootView>
  );
}
