import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/components/header";
import { MOCK_GOALS } from "@/components/home/sample-data";
import { useUserStore } from "@/store/user.store";
import { formatCurrency, formatDate } from "@/utils/common";

export default function SavingGoalDetail() {
  const { t: tHome } = useTranslation("home");
  const router = useRouter();
  const params = useLocalSearchParams();
  const { user } = useUserStore();

  const id = params.id as string;
  const goal = MOCK_GOALS.find((g) => g.id === id);

  if (!goal) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <Header
          title={tHome("saving_goal")}
          showBack
          onBackPress={() => router.back()}
        />
        <View className="flex-1 items-center justify-center p-6">
          <Text className="text-primary font-GHKTachileik text-lg text-center">
            Goal not found
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="mt-6 bg-primary/10 px-6 py-3 rounded-xl"
          >
            <Text className="text-primary font-GHKTachileik text-base">
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const progress = goal.currentAmount / goal.targetAmount;
  const remainingAmount = goal.targetAmount - goal.currentAmount;
  const isCompleted = progress >= 1;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header title={goal.title} showBack onBackPress={() => router.back()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-6 pb-10"
      >
        {/* Hero Section */}
        <View className="items-center pt-6 pb-8">
          <View
            className="size-20 rounded-3xl items-center justify-center mb-6 border border-black/5 dark:border-white/5"
            style={{ backgroundColor: `${goal.color}20` }}
          >
            <Ionicons name={goal.icon as any} size={40} color={goal.color} />
          </View>

          <Text className="text-primary/50 font-GHKTachileik text-lg mb-1">
            Current Saved Amount
          </Text>
          <Text className="text-primary font-GHKTachileik text-3xl py-2 font-semibold">
            {formatCurrency(goal.currentAmount, user?.currency ?? "USD")}
          </Text>
          <Text className="text-primary/40 font-GHKTachileik text-xs mt-1">
            Created: {formatDate(goal.createdAt, tHome)}
          </Text>
        </View>

        {/* Progress Card */}
        <View className="bg-foreground rounded-3xl p-6 border border-primary/5 mb-6">
          <View className="flex-row items-end justify-between mb-3">
            <Text className="text-primary font-GHKTachileik text-lg font-medium">
              Progress
            </Text>
            <Text
              className="text-primary font-GHKTachileik text-lg font-semibold"
              style={{ color: goal.color }}
            >
              {Math.min(Math.round(progress * 100), 100)}%
            </Text>
          </View>

          <View className="w-full h-3 bg-primary/5 rounded-full overflow-hidden mb-6">
            <View
              className="h-full rounded-full"
              style={{
                width: `${Math.min(progress * 100, 100)}%`,
                backgroundColor: goal.color,
              }}
            />
          </View>

          <View className="flex-row justify-between">
            <View>
              <Text className="text-primary/50 font-GHKTachileik text-sm mb-1">
                Target
              </Text>
              <Text className="text-primary font-GHKTachileik text-base font-semibold">
                {formatCurrency(goal.targetAmount, user?.currency ?? "USD")}
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-primary/50 font-GHKTachileik text-sm mb-1">
                Remaining
              </Text>
              <Text className="text-primary font-GHKTachileik text-base font-semibold">
                {isCompleted
                  ? "0.00"
                  : formatCurrency(remainingAmount, user?.currency ?? "USD")}
              </Text>
            </View>
          </View>
        </View>

        {/* Actions Card */}
        <View className="bg-foreground rounded-[24px] p-2 border border-primary/5">
          <TouchableOpacity
            className="flex-row items-center justify-between p-4 mb-2"
            activeOpacity={0.7}
          >
            <View className="flex-row items-center gap-3">
              <View className="size-10 rounded-full bg-green/10 items-center justify-center">
                <Ionicons name="add" size={20} color="#22C55E" />
              </View>
              <Text className="text-primary font-GHKTachileik text-lg font-medium">
                Add Funds
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center justify-between p-4 mb-2"
            activeOpacity={0.7}
          >
            <View className="flex-row items-center gap-3">
              <View className="size-10 rounded-full bg-blue/10 items-center justify-center">
                <Ionicons name="pencil" size={18} color="#2563EB" />
              </View>
              <Text className="text-primary font-GHKTachileik text-lg font-medium">
                Edit Goal
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center justify-between p-4 "
            activeOpacity={0.7}
          >
            <View className="flex-row items-center gap-3">
              <View className="size-10 rounded-full bg-danger/10 items-center justify-center">
                <Ionicons name="trash-outline" size={18} color="#EF4444" />
              </View>
              <Text className="text-danger font-GHKTachileik text-lg font-medium">
                Delete Goal
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
