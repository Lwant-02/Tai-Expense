import { Ionicons } from "@expo/vector-icons";
import cn from "clsx";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/components/header";
import { CATEGORY_CONFIG } from "@/constants";
import { Transaction, TransactionCategory } from "@/type";
import { formatAmount } from "@/utils/common";

export default function TransactionDetail() {
  const { t: tHome } = useTranslation("home");
  const { t } = useTranslation("create");
  const router = useRouter();
  const params = useLocalSearchParams();

  const transaction: Transaction = {
    id: params.id as string,
    title: params.title as string,
    category: params.category as TransactionCategory,
    amount: Number(params.amount),
    type: params.type as "income" | "expense",
    date: params.date as string,
    note: params.note as string | undefined,
  };

  const config = CATEGORY_CONFIG[transaction.category];
  const isIncome = transaction.type === "income";
  const accentColor = isIncome ? "#22C55E" : "#2563EB";

  const fullDate = new Date(transaction.date);
  const formattedFullDate = fullDate.toLocaleDateString([], {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = fullDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header
        title={t("detail_title")}
        showBack
        onBackPress={() => router.back()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-6 pb-10"
      >
        {/* Amount Hero */}
        <View className="items-center pt-6 pb-8">
          <View
            className={cn(
              "size-20 rounded-3xl items-center justify-center mb-5",
              config.bg,
            )}
          >
            <Ionicons name={config.icon} size={36} color={config.color} />
          </View>

          <Text
            className="font-GHKTachileik text-4xl font-semibold py-2 mb-2"
            style={{ color: isIncome ? "#22C55E" : "#EF4444" }}
          >
            {formatAmount(transaction.amount, transaction.type)}
          </Text>

          <Text className="text-primary font-GHKTachileik text-lg font-medium">
            {transaction.title}
          </Text>
        </View>

        {/* Detail Card */}
        <View className="bg-foreground rounded-3xl p-5 border border-primary/5">
          {/* Category */}
          <View className="flex-row items-center justify-between py-3.5 border-b border-primary/5">
            <Text className="text-primary/50 font-GHKTachileik text-base">
              {t("category_label")}
            </Text>
            <View className="flex-row items-center gap-2">
              <View
                className={cn(
                  "size-7 rounded-lg items-center justify-center",
                  config.bg,
                )}
              >
                <Ionicons name={config.icon} size={14} color={config.color} />
              </View>
              <Text className="text-primary font-GHKTachileik text-base font-medium capitalize">
                {tHome(`category.${transaction.category}`)}
              </Text>
            </View>
          </View>

          {/* Type */}
          <View className="flex-row items-center justify-between py-3.5 border-b border-primary/5">
            <Text className="text-primary/50 font-GHKTachileik text-base">
              {t("detail_type")}
            </Text>
            <View className="flex-row items-center gap-2">
              <View
                className="size-7 rounded-lg items-center justify-center"
                style={{ backgroundColor: `${accentColor}20` }}
              >
                <Ionicons
                  name={isIncome ? "arrow-down" : "arrow-up"}
                  size={14}
                  color={accentColor}
                />
              </View>
              <Text
                className="font-GHKTachileik text-base font-medium capitalize"
                style={{ color: accentColor }}
              >
                {isIncome ? tHome("income") : tHome("expenses")}
              </Text>
            </View>
          </View>

          {/* Date */}
          <View className="flex-row items-center justify-between py-3.5 border-b border-primary/5">
            <Text className="text-primary/50 font-GHKTachileik text-base">
              {t("detail_date")}
            </Text>
            <Text className="text-primary font-GHKTachileik text-base font-medium">
              {formattedFullDate}
            </Text>
          </View>

          {/* Time */}
          <View className="flex-row items-center justify-between py-3.5 border-b border-primary/5">
            <Text className="text-primary/50 font-GHKTachileik text-base">
              {t("detail_time")}
            </Text>
            <Text className="text-primary font-GHKTachileik text-base font-medium">
              {formattedTime}
            </Text>
          </View>

          {/* Amount */}
          <View
            className={cn(
              "flex-row items-center justify-between py-3.5",
              transaction.note ? "border-b border-primary/5" : "",
            )}
          >
            <Text className="text-primary/50 font-GHKTachileik text-base">
              {t("amount")}
            </Text>
            <Text
              className="font-GHKTachileik text-base font-semibold"
              style={{ color: isIncome ? "#22C55E" : "#EF4444" }}
            >
              $ {transaction.amount.toFixed(2)}
            </Text>
          </View>

          {/* Note (if available) */}
          {transaction.note && (
            <View className="py-3.5">
              <Text className="text-primary/50 font-GHKTachileik text-base mb-2">
                {t("note_label")}
              </Text>
              <Text className="text-primary/80 font-GHKTachileik text-base leading-5">
                {transaction.note}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
