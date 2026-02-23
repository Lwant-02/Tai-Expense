import { Ionicons } from "@expo/vector-icons";
import cn from "clsx";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EmptyState from "@/components/empty-state";
import Header from "@/components/header";
import { MOCK_GOALS } from "@/components/home/sample-data";
import SavingGoalCard from "@/components/home/saving-goal-card";
import SavingGoalForm from "@/components/home/saving-goal-form";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const PAGE_SIZE = 5;

export default function AllSavingGoal() {
  const { t } = useTranslation("home");
  const router = useRouter();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = ["95%"];

  const data = MOCK_GOALS;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  const paginatedData = useMemo(
    () => data.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [data, currentPage],
  );

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
          title={t("saving_goal")}
          showBack
          onBackPress={() => router.back()}
          rightIcon="add"
          onRightPress={openForm}
        />

        <Text className="text-primary/40 font-GHKTachileik text-sm px-6 mb-2">
          {data.length} {t("saving_goal")}
        </Text>

        <FlatList
          data={paginatedData}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="px-6 pb-10"
          ItemSeparatorComponent={() => <View className="h-4" />}
          renderItem={({ item }) => (
            <SavingGoalCard
              item={item}
              containerClassName="w-full"
              onPress={() =>
                router.push({
                  pathname: "/(root)/saving-goal-detail",
                  params: { id: item.id },
                })
              }
            />
          )}
          ListFooterComponent={
            totalPages > 1 ? (
              <View className="flex-row items-center justify-center gap-2 pt-6 pb-4">
                {/* Previous */}
                <TouchableOpacity
                  onPress={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={cn(
                    "size-10 rounded-xl items-center justify-center",
                    currentPage === 1 ? "bg-foreground/30" : "bg-foreground",
                  )}
                >
                  <Ionicons
                    name="chevron-back"
                    size={18}
                    color={
                      currentPage === 1 ? "rgba(255,255,255,0.2)" : "white"
                    }
                  />
                </TouchableOpacity>

                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <TouchableOpacity
                      key={pageNum}
                      onPress={() => setCurrentPage(pageNum)}
                      className={cn(
                        "size-10 rounded-xl items-center justify-center",
                        currentPage === pageNum ? "bg-blue" : "bg-foreground",
                      )}
                    >
                      <Text
                        className={cn(
                          "font-GHKTachileik text-base font-semibold",
                          currentPage === pageNum
                            ? "text-primary"
                            : "text-primary/50",
                        )}
                      >
                        {pageNum}
                      </Text>
                    </TouchableOpacity>
                  ),
                )}

                {/* Next */}
                <TouchableOpacity
                  onPress={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={cn(
                    "size-10 rounded-xl items-center justify-center",
                    currentPage === totalPages
                      ? "bg-foreground/30"
                      : "bg-foreground",
                  )}
                >
                  <Ionicons
                    name="chevron-forward"
                    size={18}
                    color={
                      currentPage === totalPages
                        ? "rgba(255,255,255,0.2)"
                        : "white"
                    }
                  />
                </TouchableOpacity>
              </View>
            ) : null
          }
          ListEmptyComponent={
            <EmptyState
              icon="receipt-outline"
              title={t("no_transactions")}
              subtitle={t("start_tracking")}
            />
          }
        />
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
            contentContainerStyle={{ paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <SavingGoalForm onClose={closeForm} />
          </BottomSheetScrollView>
        </KeyboardAvoidingView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
