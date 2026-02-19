import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ActionButtons from "@/components/create/action-buttons";
import CategoryForm from "@/components/create/category-form";
import CategoryList from "@/components/create/category-list";
import RecentList from "@/components/create/recent-list";
import TransactionForm from "@/components/create/transaction-form";
import Header from "@/components/header";
import { SAMPLE_TRANSACTIONS } from "@/components/home/sample-data";
import { TransactionType } from "@/type";

export default function CreatePage() {
  const { t } = useTranslation("create");
  const router = useRouter();
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["95%"], []);
  const [formType, setFormType] = useState<TransactionType>("expense");
  const [sheetContent, setSheetContent] = useState<String>("transaction");

  const openTransactionForm = useCallback((type: TransactionType) => {
    setFormType(type);
    setSheetContent("transaction");
    sheetRef.current?.snapToIndex(0);
  }, []);

  const closeSheet = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  return (
    <View className="flex-1">
      <SafeAreaView className="flex-1 bg-background">
        <Header title={t("title")} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-36 pt-2"
        >
          <ActionButtons
            onCreateExpense={() => openTransactionForm("expense")}
            onCreateIncome={() => openTransactionForm("income")}
          />

          <RecentList
            transactions={SAMPLE_TRANSACTIONS}
            onSeeAll={() => router.push("/(root)/all-transactions")}
            onTransactionPress={(item) =>
              router.push({
                pathname: "/(root)/transaction-detail",
                params: { ...item },
              })
            }
          />

          <CategoryList
            onSeeAll={() => router.push("/(root)/all-categories")}
          />
        </ScrollView>
      </SafeAreaView>

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
              {sheetContent === "transaction" ? (
                <TransactionForm type={formType} onClose={closeSheet} />
              ) : (
                <CategoryForm onClose={closeSheet} />
              )}
            </BottomSheetScrollView>
          </KeyboardAvoidingView>
        ) : (
          <BottomSheetScrollView
            contentContainerStyle={{ paddingBottom: 200 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {sheetContent === "transaction" ? (
              <TransactionForm type={formType} onClose={closeSheet} />
            ) : (
              <CategoryForm onClose={closeSheet} />
            )}
          </BottomSheetScrollView>
        )}
      </BottomSheet>
    </View>
  );
}
