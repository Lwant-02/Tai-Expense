import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import AddBillForm from "@/components/budget/add-bill-form";
import UpcomingBills from "@/components/budget/upcoming-bills";
import Header from "@/components/header";

export default function DueBillPage() {
  const { t } = useTranslation("budget");
  const router = useRouter();

  // Bottom sheet
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["95%"], []);

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
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-32"
        >
          <UpcomingBills onAddBill={openForm} />
        </ScrollView>
      </SafeAreaView>

      {/* Bottom sheet — must be outside SafeAreaView */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        enablePanDownToClose
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
            <AddBillForm onClose={closeForm} />
          </BottomSheetScrollView>
        </KeyboardAvoidingView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
