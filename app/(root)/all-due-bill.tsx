import { Ionicons } from "@expo/vector-icons";
import cn from "clsx";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BillCard from "@/components/budget/bill-card";
import { SAMPLE_BILLS } from "@/components/budget/budget-data";
import EmptyState from "@/components/empty-state";
import Header from "@/components/header";
import { Bill } from "@/type";

const PAGE_SIZE = 10;

export default function AllDueBill() {
  const { t } = useTranslation("budget");
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [bills, setBills] = useState<Bill[]>(
    SAMPLE_BILLS.sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    ),
  );

  const toggleReminder = (id: string, value: boolean) => {
    setBills((prev) =>
      prev.map((b) => (b.id === id ? { ...b, remindMe: value } : b)),
    );
  };

  const totalPages = Math.ceil(bills.length / PAGE_SIZE);

  const paginatedData = useMemo(
    () => bills.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [bills, currentPage],
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header
        title={t("upcoming_bills", "Upcoming Bills")}
        showBack
        onBackPress={() => router.back()}
      />

      <View className="flex-1">
        <Text className="text-primary/40 font-GHKTachileik text-sm px-6 mb-2">
          {bills.length} {t("upcoming_bills", "Upcoming Bills")}
        </Text>

        <FlatList
          data={paginatedData}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="px-6 pb-10"
          renderItem={({ item }) => (
            <BillCard bill={item} onToggleReminder={toggleReminder} />
          )}
          ListEmptyComponent={
            <EmptyState
              icon="receipt-outline"
              title={t("no_bills", "No upcoming bills")}
              subtitle={t(
                "add_bill_subtitle",
                "Add your bills to track due dates",
              )}
            />
          }
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
        />
      </View>
    </SafeAreaView>
  );
}
