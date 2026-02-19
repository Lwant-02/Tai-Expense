import { Ionicons } from "@expo/vector-icons";
import cn from "clsx";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { SAMPLE_BUDGET } from "@/components/budget/budget-data";
import CategoryBudgetCard from "@/components/budget/category-budget-card";
import EmptyState from "@/components/empty-state";
import Header from "@/components/header";

const PAGE_SIZE = 10;

export default function AllBudget() {
  const { t } = useTranslation("budget");
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);

  const budgets = SAMPLE_BUDGET.categoryBudgets;
  const totalPages = Math.ceil(budgets.length / PAGE_SIZE);

  const paginatedData = useMemo(
    () => budgets.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [budgets, currentPage],
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header
        title={t("spending_breakdown")}
        showBack
        onBackPress={() => router.back()}
      />

      <View className="flex-1">
        <Text className="text-primary/40 font-GHKTachileik text-xs px-6 mb-2">
          {budgets.length} {t("spending_breakdown")}
        </Text>

        <FlatList
          data={paginatedData}
          keyExtractor={(item) => item.category}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="px-6 pb-10"
          renderItem={({ item }) => (
            <CategoryBudgetCard
              item={item}
              totalBudget={SAMPLE_BUDGET.monthlyBudget}
            />
          )}
          ListEmptyComponent={
            <EmptyState
              icon="wallet-outline"
              title={t("no_spending")}
              subtitle={t("no_spending_subtitle")}
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
