import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

import { useTransactionStore } from "@/store/transaction.store";
import { useUserStore } from "@/store/user.store";
import { convertWord, formatCurrency } from "@/utils/common";
import { useRouter } from "expo-router";

export default function BalanceCard() {
  const { t, i18n } = useTranslation("home");
  const { user } = useUserStore();
  const { summary } = useTransactionStore();
  const router = useRouter();

  const currentBalance =
    (user?.startingBalance || 0) + summary.totalIncome - summary.totalExpense;

  // Helper to calculate percentage change
  const getPercentChange = (current: number, past: number) => {
    if (past === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - past) / past) * 100);
  };

  const incomeChange = getPercentChange(
    summary.totalIncome,
    summary.pastIncome,
  );
  const expenseChange = getPercentChange(
    summary.totalExpense,
    summary.pastExpense,
  );

  return (
    <View className="mx-6 bg-foreground rounded-3xl p-6 mt-4 border border-primary/10 shadow">
      <View className="flex-row justify-between items-start mb-4">
        <View>
          <View className="flex-row items-center gap-1 mb-1">
            <Text className="text-primary font-GHKTachileik font-medium text-lg">
              {t("current_balance")}
            </Text>
          </View>
          <Text className="text-primary font-GHKTachileik text-4xl font-semibold pt-2">
            {formatCurrency(currentBalance, user?.currency!)}
          </Text>
          <Text className="text-primary/60 capitalize font-GHKTachileik text-base font-semibold">
            {convertWord(currentBalance, i18n.language)}
          </Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/(root)/(tabs)/setting")}>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-between mt-4">
        {/* Income */}
        <View>
          <View className="flex-row items-center gap-1 mb-2">
            <View className="bg-primary/20 rounded-full p-1 items-center justify-center size-6">
              <Ionicons name="arrow-down" size={12} color="white" />
            </View>
            <Text className="text-primary/70 font-GHKTachileik text-base">
              {t("this_month_income")}
            </Text>
          </View>
          <Text className="text-green font-GHKTachileik text-xl font-semibold">
            {formatCurrency(summary.totalIncome, user?.currency!).replace(
              user?.currency!,
              "",
            )}
          </Text>
          {summary.pastIncome > 0 || incomeChange > 0 ? (
            <View className="flex-row items-center gap-1 mt-1">
              <Ionicons
                name={incomeChange >= 0 ? "arrow-up" : "arrow-down"}
                size={12}
                color={incomeChange >= 0 ? "#10B981" : "#EF4444"}
              />
              <Text
                className={`font-GHKTachileik text-xs ${
                  incomeChange >= 0 ? "text-green" : "text-danger"
                }`}
              >
                {Math.abs(incomeChange)}% vs {t("last_month")}
              </Text>
            </View>
          ) : null}
        </View>

        {/* Expenses */}
        <View className="items-end">
          <View className="flex-row items-center gap-1 mb-2">
            <View className="bg-primary/20 rounded-full p-1 items-center justify-center size-6">
              <Ionicons name="arrow-up" size={12} color="white" />
            </View>
            <Text className="text-primary/70 font-GHKTachileik text-base">
              {t("this_month_expenses")}
            </Text>
          </View>
          <Text className="text-danger font-GHKTachileik text-xl font-semibold">
            {formatCurrency(summary.totalExpense, user?.currency!).replace(
              user?.currency!,
              "",
            )}
          </Text>
          {summary.pastExpense > 0 || expenseChange > 0 ? (
            <View className="flex-row items-center gap-1 mt-1">
              <Ionicons
                name={expenseChange <= 0 ? "arrow-down" : "arrow-up"}
                size={12}
                color={expenseChange <= 0 ? "#10B981" : "#EF4444"}
              />
              <Text
                className={`font-GHKTachileik text-xs ${
                  expenseChange <= 0 ? "text-green" : "text-danger"
                }`}
              >
                {Math.abs(expenseChange)}% vs {t("last_month")}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}
