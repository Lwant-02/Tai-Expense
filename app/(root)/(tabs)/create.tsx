import BottomSheet from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ActionButtons from "@/components/create/action-buttons";
import CategoryList from "@/components/create/category-list";
import RecentList from "@/components/create/recent-list";
import TransactionForm from "@/components/create/transaction-form";
import CustomBottomSheet from "@/components/custom-bottom-sheet";
import Header from "@/components/header";
import { useTransactionStore } from "@/store/transaction.store";
import { TransactionType } from "@/type";

export default function CreatePage() {
  const { t } = useTranslation("create");
  const router = useRouter();
  const sheetRef = useRef<BottomSheet>(null);
  const [formType, setFormType] = useState<TransactionType>("expense");
  const { transactions } = useTransactionStore();

  const openTransactionForm = useCallback((type: TransactionType) => {
    setFormType(type);
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
            transactions={transactions.slice(0, 5)}
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

      <CustomBottomSheet sheetRef={sheetRef}>
        <TransactionForm type={formType} onClose={closeSheet} />
      </CustomBottomSheet>
    </View>
  );
}
