import { Ionicons } from "@expo/vector-icons";
import cn from "clsx";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EmptyState from "@/components/empty-state";
import Header from "@/components/header";
import TransactionCard from "@/components/home/transaction-card";
import { CATEGORIES, CATEGORY_CONFIG } from "@/constants";
import { useTransactionStore } from "@/store/transaction.store";
import { TransactionCategory } from "@/type";

const PAGE_SIZE = 10;

export default function AllTransactions() {
  const { t: tHome } = useTranslation("home");
  const router = useRouter();
  const { transactions } = useTransactionStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<
    TransactionCategory | "all"
  >("all");

  const filteredData = useMemo(() => {
    let result = transactions;
    if (selectedCategory !== "all") {
      result = result.filter((t) => t.category === selectedCategory);
    }
    return result;
  }, [transactions, selectedCategory]);

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);

  const paginatedData = useMemo(
    () =>
      filteredData.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE,
      ),
    [filteredData, currentPage],
  );

  const handleCategorySelect = (category: TransactionCategory | "all") => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header
        title={tHome("transactions_history")}
        showBack
        onBackPress={() => router.back()}
      />

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="px-6 gap-2 pb-4"
        >
          {/* All Filter */}
          <TouchableOpacity
            onPress={() => handleCategorySelect("all")}
            activeOpacity={0.7}
            className={cn(
              "px-4 py-2 rounded-full border",
              selectedCategory === "all"
                ? "bg-blue border-blue"
                : "bg-foreground border-primary/10",
            )}
          >
            <Text
              className={cn(
                "font-GHKTachileik text-xs font-semibold",
                selectedCategory === "all" ? "text-primary" : "text-primary/60",
              )}
            >
              All
            </Text>
          </TouchableOpacity>

          {/* Categories */}
          {CATEGORIES.map((cat) => {
            const config = CATEGORY_CONFIG[cat];
            const isSelected = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                onPress={() => handleCategorySelect(cat)}
                activeOpacity={0.7}
                className={cn(
                  "flex-row items-center gap-1.5 px-3 py-2 rounded-full border",
                  isSelected
                    ? "bg-blue border-blue"
                    : "bg-foreground border-primary/10",
                )}
                style={
                  isSelected
                    ? {
                        backgroundColor: config.color,
                        borderColor: config.color,
                      }
                    : {}
                }
              >
                <Ionicons
                  name={config.icon}
                  size={14}
                  color={isSelected ? "white" : config.color}
                />
                <Text
                  className={cn(
                    "font-GHKTachileik text-xs capitalize",
                    isSelected
                      ? "text-primary font-semibold"
                      : "text-primary/60",
                  )}
                >
                  {tHome(`category.${cat}`)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <Text className="text-primary/40 font-GHKTachileik text-xs px-6 mb-2">
        {filteredData.length} {tHome("transactions_history")}
      </Text>

      <FlatList
        data={paginatedData}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-10"
        renderItem={({ item, index }) => (
          <View>
            <TransactionCard
              transaction={item}
              onPress={() =>
                router.push({
                  pathname: "/(root)/transaction-detail",
                  params: { ...item },
                })
              }
            />
            {index < paginatedData.length - 1 && (
              <View className="h-[0.5px] bg-primary/5 mx-6" />
            )}
          </View>
        )}
        ListEmptyComponent={
          <EmptyState
            icon="receipt-outline"
            title={tHome("no_transactions")}
            subtitle={tHome("start_tracking")}
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
                  color={currentPage === 1 ? "rgba(255,255,255,0.2)" : "white"}
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
    </SafeAreaView>
  );
}
