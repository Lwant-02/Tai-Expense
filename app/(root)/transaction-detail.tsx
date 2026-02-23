import { Ionicons } from "@expo/vector-icons";
import cn from "clsx";
import { useLocalSearchParams, useRouter } from "expo-router";
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

import TransactionForm from "@/components/create/transaction-form";
import Header from "@/components/header";
import { CATEGORY_CONFIG } from "@/constants";
import { useTransactionStore } from "@/store/transaction.store";
import { useUserStore } from "@/store/user.store";
import { Transaction, TransactionCategory } from "@/type";
import {
  formatCurrency,
  formatDate,
  formatHeaderDate,
  getCurrencySymbol,
} from "@/utils/common";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";

export default function TransactionDetail() {
  const { t: tHome } = useTranslation("home");
  const { t } = useTranslation("create");
  const router = useRouter();
  const params = useLocalSearchParams();
  const { user } = useUserStore();
  const { transactions } = useTransactionStore();
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["95%"], []);

  const initialTransaction: Transaction = {
    id: params.id as string,
    title: params.title as string,
    category: params.category as TransactionCategory,
    amount: Number(params.amount),
    type: params.type as "income" | "expense",
    transactionDate: params.transactionDate as string,
    note: params.note as string | undefined,
  };

  const transaction: Transaction =
    transactions.find(
      (t) => t.id.toString() === initialTransaction.id.toString(),
    ) || initialTransaction;

  const config = CATEGORY_CONFIG[transaction.category];
  const isIncome = transaction.type === "income";
  const accentColor = isIncome ? "#22C55E" : "#2563EB";
  const formType = transaction.type;

  const openTransactionForm = useCallback(() => {
    sheetRef.current?.snapToIndex(0);
  }, []);

  const closeSheet = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  return (
    <GestureHandlerRootView className="flex-1">
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
              {isIncome ? "+" : "-"}
              {formatCurrency(transaction.amount, user?.currency!)}
            </Text>

            <Text className="text-primary font-GHKTachileik text-lg font-medium">
              {transaction.title}
            </Text>
          </View>

          {/* Detail Card */}
          <View className="bg-foreground rounded-3xl p-5 border border-primary/5">
            {/* Category */}
            <View className="flex-row items-center justify-between py-3.5 border-b border-primary/5">
              <Text className="text-primary/50 font-GHKTachileik text-lg">
                {t("category_label")}
              </Text>
              <View className="flex-row items-center gap-2">
                <View
                  className={cn(
                    "size-10 rounded-lg items-center justify-center",
                    config.bg,
                  )}
                >
                  <Ionicons name={config.icon} size={14} color={config.color} />
                </View>
                <Text className="text-primary font-GHKTachileik text-lg font-medium capitalize">
                  {tHome(`category.${transaction.category}`)}
                </Text>
              </View>
            </View>

            {/* Type */}
            <View className="flex-row items-center justify-between py-3.5 border-b border-primary/5">
              <Text className="text-primary/50 font-GHKTachileik text-lg">
                {t("detail_type")}
              </Text>
              <View className="flex-row items-center gap-2">
                <View
                  className="size-10 rounded-lg items-center justify-center"
                  style={{ backgroundColor: `${accentColor}20` }}
                >
                  <Ionicons
                    name={isIncome ? "arrow-down" : "arrow-up"}
                    size={14}
                    color={accentColor}
                  />
                </View>
                <Text
                  className="font-GHKTachileik text-lg font-medium capitalize"
                  style={{ color: accentColor }}
                >
                  {isIncome ? tHome("income") : tHome("expenses")}
                </Text>
              </View>
            </View>

            {/* Date */}
            <View className="flex-row items-center justify-between py-3.5 border-b border-primary/5">
              <Text className="text-primary/50 font-GHKTachileik text-lg">
                {t("detail_date")}
              </Text>
              <Text className="text-primary font-GHKTachileik text-lg font-medium">
                {formatHeaderDate(new Date(transaction.transactionDate), tHome)}
              </Text>
            </View>

            {/* Time */}
            <View className="flex-row items-center justify-between py-3.5 border-b border-primary/5">
              <Text className="text-primary/50 font-GHKTachileik text-lg">
                {t("detail_time")}
              </Text>
              <Text className="text-primary font-GHKTachileik text-lg font-medium">
                {formatDate(transaction.transactionDate, tHome)}
              </Text>
            </View>

            {/* Amount */}
            <View
              className={cn(
                "flex-row items-center justify-between py-3.5",
                transaction.note ? "border-b border-primary/5" : "",
              )}
            >
              <Text className="text-primary/50 font-GHKTachileik text-lg">
                {t("amount")}
              </Text>
              <Text
                className="font-GHKTachileik text-lg font-semibold"
                style={{ color: isIncome ? "#22C55E" : "#EF4444" }}
              >
                {isIncome ? "+" : "-"}
                {getCurrencySymbol(user?.currency!)}{" "}
                {transaction.amount.toFixed(2)}
              </Text>
            </View>

            {/* Note (if available) */}
            {transaction.note && (
              <View className="py-3.5 border-b border-primary/5">
                <Text className="text-primary/50 font-GHKTachileik text-lg mb-2">
                  {t("note_label")}
                </Text>
                <Text className="text-primary/80 py-1 font-GHKTachileik text-lg leading-5">
                  {transaction.note}
                </Text>
              </View>
            )}
            <TouchableOpacity
              className="flex-row items-center justify-between py-3.5"
              activeOpacity={0.7}
              onPress={() => openTransactionForm()}
            >
              <View className="flex-row items-center justify-between">
                <Text className="text-primary font-GHKTachileik text-lg font-medium">
                  Edit Transaction
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Bottom sheet — must be outside SafeAreaView */}
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        index={-1}
        enablePanDownToClose
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        backgroundStyle={{ backgroundColor: "#1a1a1a" }}
        handleIndicatorStyle={{ backgroundColor: "rgba(255,255,255,0.3)" }}
      >
        {Platform.OS === "ios" ? (
          <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <BottomSheetScrollView
              contentContainerStyle={{
                paddingBottom: Platform.OS === "ios" ? 70 : 0,
              }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <TransactionForm
                type={formType}
                onClose={closeSheet}
                initialData={transaction}
              />
            </BottomSheetScrollView>
          </KeyboardAvoidingView>
        ) : (
          <BottomSheetScrollView
            contentContainerStyle={{ paddingBottom: 200 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <TransactionForm
              type={formType}
              onClose={closeSheet}
              initialData={transaction}
            />
          </BottomSheetScrollView>
        )}
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
