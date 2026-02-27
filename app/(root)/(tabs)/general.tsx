import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getBills } from "@/actions/bill";
import { getBudgetData } from "@/actions/budget";
import Header from "@/components/header";
import { useBillStore } from "@/store/bill.store";
import { useBudgetStore } from "@/store/budget.store";
import { useSavingStore } from "@/store/saving.store";
import { useUserStore } from "@/store/user.store";
import { formatCurrency } from "@/utils/common";
import { differenceInDays, parseISO } from "date-fns";

export default function GeneralPage() {
  const { t } = useTranslation("home");
  const { t: tCommon } = useTranslation("common");
  const { t: tGeneral } = useTranslation("general");
  const router = useRouter();
  const db = useSQLiteContext();
  const { user } = useUserStore();
  const { savings } = useSavingStore();
  const { budgetData, setBudgetData } = useBudgetStore();
  const { bills, setBills } = useBillStore();

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        try {
          const now = new Date();
          const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
          const year = now.getFullYear().toString();

          const [bData, bList] = await Promise.all([
            getBudgetData(db, month, year),
            getBills(db),
          ]);

          setBudgetData(bData);
          setBills(bList);
        } catch (error) {
          console.error("Failed to load dashboard data:", error);
        }
      };
      loadData();
    }, [db, setBudgetData, setBills]),
  );

  // Metrics calculation
  const totalSaved = savings.reduce((acc, curr) => acc + curr.currentAmount, 0);
  const totalTarget = savings.reduce((acc, curr) => acc + curr.targetAmount, 0);
  const savingProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

  const budgetSpent = budgetData?.totalSpent || 0;
  const budgetTotal = budgetData?.monthlyBudget || 0;
  const budgetProgress =
    budgetTotal > 0 ? (budgetSpent / budgetTotal) * 100 : 0;

  const billsDueThisWeek = bills.filter((bill) => {
    const daysLeft = differenceInDays(parseISO(bill.dueDate), new Date());
    return daysLeft >= 0 && daysLeft <= 7;
  }).length;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header title={tCommon("navigation.general")} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-6 pb-32 pt-6 gap-3"
      >
        {/* Saving Goals Card */}
        <View className="gap-3">
          <Text className="text-primary font-GHKTachileik text-lg font-semibold">
            {tGeneral("saving_goals")}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push("/(root)/all-saving-goal")}
            className="bg-foreground rounded-[24px] p-5 border border-primary/10 mb-5 relative overflow-hidden"
          >
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center gap-3">
                <View className="size-12 rounded-full bg-blue/10 items-center justify-center">
                  <Ionicons name="wallet" size={24} color="#2563EB" />
                </View>
                <View>
                  <Text className="text-primary font-GHKTachileik text-lg font-semibold">
                    {t("saving_goal")}
                  </Text>
                  <Text className="text-primary/50 font-GHKTachileik text-xs mt-0.5">
                    {tGeneral("active_goals", { count: savings.length })}
                  </Text>
                </View>
              </View>
              <View className="bg-primary/5 size-8 rounded-full items-center justify-center">
                <Ionicons name="chevron-forward" size={18} color="#8E8E93" />
              </View>
            </View>

            <View className="flex-row items-end justify-between mb-2 mt-2">
              <Text className="text-primary font-GHKTachileik text-2xl font-semibold">
                {formatCurrency(totalSaved, user?.currency ?? "USD")}
              </Text>
              <Text className="text-primary/50 font-GHKTachileik text-sm mb-1">
                {tGeneral("of")}{" "}
                {formatCurrency(totalTarget, user?.currency ?? "USD")}
              </Text>
            </View>

            <View className="w-full h-2 bg-primary/5 rounded-full overflow-hidden">
              <View
                className="h-full bg-blue rounded-full"
                style={{ width: `${Math.min(savingProgress, 100)}%` }}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Budget Card */}
        <View className="gap-3">
          <Text className="text-primary font-GHKTachileik text-lg font-semibold">
            {tGeneral("budget")}
          </Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push("/(root)/budget")}
            className="bg-foreground rounded-[24px] p-5 border border-primary/10 mb-5 relative overflow-hidden"
          >
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center gap-3">
                <View className="size-12 rounded-full bg-green/10 items-center justify-center">
                  <Ionicons name="pie-chart" size={24} color="#22C55E" />
                </View>
                <View>
                  <Text className="text-primary font-GHKTachileik text-lg font-semibold">
                    {tGeneral("monthly_budget")}
                  </Text>
                  <Text className="text-primary/50 font-GHKTachileik text-xs mt-0.5">
                    {tGeneral("track_spending")}
                  </Text>
                </View>
              </View>
              <View className="bg-primary/5 size-8 rounded-full items-center justify-center">
                <Ionicons name="chevron-forward" size={18} color="#8E8E93" />
              </View>
            </View>

            <View className="flex-row items-end justify-between mb-2 mt-2">
              <Text className="text-primary font-GHKTachileik text-2xl font-semibold">
                {formatCurrency(
                  budgetTotal > 0 ? budgetTotal - budgetSpent : 0,
                  user?.currency ?? "USD",
                )}
              </Text>
              <Text className="text-primary/50 font-GHKTachileik text-sm mb-1">
                {tGeneral("remaining")}
              </Text>
            </View>

            <View className="w-full h-2 bg-primary/5 rounded-full overflow-hidden flex-row">
              <View
                className="h-full bg-green rounded-full"
                style={{ width: `${Math.min(budgetProgress, 100)}%` }}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Upcoming Bills Card */}
        <View className="gap-3">
          <Text className="text-primary font-GHKTachileik text-lg font-semibold">
            {tGeneral("upcoming_bills")}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push("/(root)/due-bill")}
            className="bg-foreground rounded-[24px] p-5 border border-primary/10 relative overflow-hidden"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="size-12 rounded-full bg-danger/10 items-center justify-center">
                  <Ionicons name="calendar" size={24} color="#EF4444" />
                </View>
                <View>
                  <Text className="text-primary font-GHKTachileik text-lg font-semibold">
                    {tGeneral("upcoming_bills")}
                  </Text>
                  <Text className="text-danger font-GHKTachileik text-xs mt-0.5">
                    {tGeneral("due_this_week").replace(
                      "2",
                      billsDueThisWeek.toString(),
                    )}
                  </Text>
                </View>
              </View>
              <View className="bg-primary/5 size-8 rounded-full items-center justify-center">
                <Ionicons name="chevron-forward" size={18} color="#8E8E93" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
