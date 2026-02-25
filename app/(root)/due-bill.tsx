import BottomSheet from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import AddBillForm from "@/components/budget/add-bill-form";
import UpcomingBills from "@/components/budget/upcoming-bills";
import CustomBottomSheet from "@/components/custom-bottom-sheet";
import Header from "@/components/header";

export default function DueBillPage() {
  const { t } = useTranslation("budget");
  const router = useRouter();

  // Bottom sheet
  const bottomSheetRef = useRef<BottomSheet>(null);

  const openForm = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const closeForm = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView className="flex-1 bg-background">
        <Header
          title={t("upcoming_bills", "Upcoming Bills")}
          showBack
          onBackPress={() => router.back()}
          rightIcon="add"
          onRightPress={openForm}
        />
        <Text className="text-primary/40 font-GHKTachileik text-sm px-6 mb-2">
          {t("upcoming_bills", "Upcoming Bills")} (10)
        </Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-32"
        >
          <UpcomingBills />
        </ScrollView>
      </SafeAreaView>

      {/* Bottom sheet — must be outside SafeAreaView */}
      <CustomBottomSheet sheetRef={bottomSheetRef}>
        <AddBillForm onClose={closeForm} />
      </CustomBottomSheet>
    </GestureHandlerRootView>
  );
}
