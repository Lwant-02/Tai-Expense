import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { SAMPLE_BUDGET } from "@/components/budget/budget-data";
import Header from "@/components/header";
import { useSavingStore } from "@/store/saving.store";
import { useUserStore } from "@/store/user.store";
import { formatCurrency } from "@/utils/common";

export default function GeneralPage() {
  const { t } = useTranslation("home");
  const { t: tCommon } = useTranslation("common");
  const router = useRouter();
  const { user } = useUserStore();
  const { savings } = useSavingStore();

  // Metrics calculation
  const totalSaved = savings.reduce((acc, curr) => acc + curr.currentAmount, 0);
  const totalTarget = savings.reduce((acc, curr) => acc + curr.targetAmount, 0);
  const savingProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

  const budgetSpent = SAMPLE_BUDGET.totalSpent;
  const budgetTotal = SAMPLE_BUDGET.monthlyBudget;
  const budgetProgress =
    budgetTotal > 0 ? (budgetSpent / budgetTotal) * 100 : 0;

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
            Saving Goals
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
                    {savings.length} Active Goals
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
                of {formatCurrency(totalTarget, user?.currency ?? "USD")}
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
            Budget
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
                    Monthly Budget
                  </Text>
                  <Text className="text-primary/50 font-GHKTachileik text-xs mt-0.5">
                    Track your spending
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
                  budgetTotal - budgetSpent,
                  user?.currency ?? "USD",
                )}
              </Text>
              <Text className="text-primary/50 font-GHKTachileik text-sm mb-1">
                Remaining
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
            Upcoming Bills
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
                    Upcoming Bills
                  </Text>
                  <Text className="text-danger font-GHKTachileik text-xs mt-0.5">
                    2 due this week
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
