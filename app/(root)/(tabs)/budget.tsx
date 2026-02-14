import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import BudgetAlert from "@/components/budget/budget-alert";
import { SAMPLE_BUDGET } from "@/components/budget/budget-data";
import BudgetRing from "@/components/budget/budget-ring";
import BudgetStats from "@/components/budget/budget-stats";
import CategoryBudgetList from "@/components/budget/category-budget-list";
import SetBudgetForm from "@/components/budget/set-budget-form";
import EmptyState from "@/components/empty-state";
import Header from "@/components/header";
import { CategoryBudget } from "@/type";

type FormType = "budget" | null;

export default function BudgetPage() {
  const { t } = useTranslation("budget");

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
  const [activeForm, setActiveForm] = useState<FormType>(null);
  const snapPoints = useMemo(() => ["70%"], []);

  const openForm = useCallback((type: FormType) => {
    bottomSheetRef.current?.snapToIndex(0);
    setActiveForm(type);
  }, []);

  const closeForm = useCallback(() => {
    setActiveForm(null);
    bottomSheetRef.current?.close();
  }, []);

  const handleSetBudget = useCallback((amount: number) => {
    setMonthlyBudget(amount);
  }, []);

  const hasBudget = monthlyBudget > 0;

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView className="flex-1 bg-background">
        <Header title={t("title")} />

        {hasBudget ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerClassName="pb-32"
          >
            {/* Arc Ring + Edit Button */}
            <View className="relative">
              <BudgetRing totalBudget={monthlyBudget} totalSpent={totalSpent} />
              <TouchableOpacity
                onPress={() => openForm("budget")}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                className="absolute right-6 top-0 bg-primary/5 p-2.5 rounded-full border border-primary/10"
              >
                <Ionicons name="pencil" size={18} color="#2563EB" />
              </TouchableOpacity>
            </View>

            {/* Month pill */}
            <View className="items-center mb-5">
              <View className="flex-row items-center bg-foreground px-4 py-2 rounded-full border border-primary/5">
                <Text className="text-primary/60 font-GHKTachileik text-xs mx-3">
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
        ) : (
          <View className="flex-1 items-center justify-center">
            <EmptyState
              icon="wallet-outline"
              title={t("no_budget")}
              subtitle={t("no_budget_subtitle")}
            />
            <TouchableOpacity
              onPress={() => openForm("budget")}
              activeOpacity={0.8}
              className="bg-blue rounded-2xl px-8 py-4  flex-row items-center gap-2"
            >
              <Ionicons name="add-circle" size={20} color="white" />
              <Text className="text-primary font-GHKTachileik text-base font-semibold">
                {t("set_budget")}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>

      {/* Bottom sheet — must be outside SafeAreaView */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        enablePanDownToClose
        onClose={() => setActiveForm(null)}
        backgroundStyle={{ backgroundColor: "#1A1A1F" }}
        handleIndicatorStyle={{ backgroundColor: "rgba(255,255,255,0.2)" }}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <BottomSheetScrollView
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {activeForm === "budget" && (
              <SetBudgetForm
                currentBudget={monthlyBudget}
                onSave={handleSetBudget}
                onClose={closeForm}
              />
            )}
          </BottomSheetScrollView>
        </KeyboardAvoidingView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
