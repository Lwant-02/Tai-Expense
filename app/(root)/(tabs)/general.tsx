import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import BudgetAlert from "@/components/budget/budget-alert";
import { SAMPLE_BUDGET } from "@/components/budget/budget-data";
import BudgetRing from "@/components/budget/budget-ring";
import BudgetStats from "@/components/budget/budget-stats";
import CategoryBudgetList from "@/components/budget/category-budget-list";
import SetBudgetForm from "@/components/budget/set-budget-form";
import CustomBottomSheet from "@/components/custom-bottom-sheet";
import Header from "@/components/header";
import { CategoryBudget } from "@/type";

export default function GeneralPage() {
  const { t } = useTranslation("budget");
  const router = useRouter();

  // Budget state (using sample data for now)
  const [monthlyBudget, setMonthlyBudget] = useState(
    SAMPLE_BUDGET.monthlyBudget,
  );
  const [totalSpent] = useState(SAMPLE_BUDGET.totalSpent);
  const [categoryBudgets, setCategoryBudgets] = useState<CategoryBudget[]>(
    SAMPLE_BUDGET.categoryBudgets,
  );

  const remaining = monthlyBudget - totalSpent;
  const percentage = monthlyBudget > 0 ? (totalSpent / monthlyBudget) * 100 : 0;

  // Bottom sheet
  const bottomSheetRef = useRef<BottomSheet>(null);

  const openForm = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const closeForm = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const handleSetBudget = useCallback((amount: number) => {
    setMonthlyBudget(amount);
  }, []);

  const hasBudget = monthlyBudget > 10000;

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView className="flex-1 bg-background">
        <Header title={t("title")} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-32"
        >
          {/* Arc Ring + Edit Button */}
          <View className="relative">
            <BudgetRing totalBudget={monthlyBudget} totalSpent={totalSpent} />
            <TouchableOpacity
              onPress={() => openForm()}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              className="absolute right-24 top-28 bg-primary/5 p-2.5 rounded-full border border-primary/10"
            >
              <Ionicons name="pencil" size={18} color="#2563EB" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/(root)/due-bill")}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              className="absolute right-6 top-0 w-24 flex-row items-center bg-primary/5 py-2 gap-1 justify-center rounded-full border border-primary/10"
            >
              <Text className="text-primary/60 font-GHKTachileik text-center text-sm">
                {t("set_bill")}
              </Text>
              <Ionicons
                name="arrow-forward-outline"
                size={18}
                color="#2563EB"
              />
            </TouchableOpacity>
          </View>

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
        </ScrollView>
      </SafeAreaView>

      {/* Bottom sheet — must be outside SafeAreaView */}
      <CustomBottomSheet sheetRef={bottomSheetRef}>
        <SetBudgetForm
          currentBudget={monthlyBudget}
          onSave={handleSetBudget}
          onClose={closeForm}
        />
      </CustomBottomSheet>
    </GestureHandlerRootView>
  );
}
