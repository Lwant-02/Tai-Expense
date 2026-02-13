import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EmptyState from "@/components/empty-state";
import TransactionCard from "@/components/home/transaction-card";
import { Transaction } from "@/type";
import { getGreetingTime } from "@/utils/common";

const SAMPLE_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    title: "Monthly Salary",
    category: "salary",
    amount: 5000.0,
    type: "income",
    date: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Freelance Project",
    category: "freelance",
    amount: 1200.0,
    type: "income",
    date: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "3",
    title: "Birthday Gift",
    category: "gift",
    amount: 100.0,
    type: "income",
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "4",
    title: "Stock Dividend",
    category: "investment",
    amount: 50.0,
    type: "income",
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: "5",
    title: "Grocery Shopping",
    category: "food",
    amount: 150.75,
    type: "expense",
    date: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Uber Ride",
    category: "transport",
    amount: 25.5,
    type: "expense",
    date: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "7",
    title: "New Sneakers",
    category: "shopping",
    amount: 120.0,
    type: "expense",
    date: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "8",
    title: "Cinema Date",
    category: "entertainment",
    amount: 45.0,
    type: "expense",
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "9",
    title: "Electricity Bill",
    category: "bills",
    amount: 85.2,
    type: "expense",
    date: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: "10",
    title: "Pharmacy",
    category: "health",
    amount: 30.0,
    type: "expense",
    date: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: "11",
    title: "Online Course",
    category: "education",
    amount: 19.99,
    type: "expense",
    date: new Date(Date.now() - 86400000 * 6).toISOString(),
  },
  {
    id: "12",
    title: "Miscellaneous",
    category: "other",
    amount: 10.0,
    type: "expense",
    date: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
];

// const SAMPLE_TRANSACTIONS: Transaction[] = [];

export default function Home() {
  const { t } = useTranslation("home");
  const greeting = `greeting_${getGreetingTime()}`;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <FlatList
        data={SAMPLE_TRANSACTIONS}
        keyExtractor={(item) => item.id}
        contentContainerClassName="pb-32"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Header */}
            <View className="flex-row justify-between items-center px-6 py-4">
              <View>
                <Text className="text-primary/80 font-GHKTachileik text-sm mb-1 font-semibold">
                  {t(greeting)}
                </Text>
                <Text className="text-primary font-GHKTachileik text-xl font-semibold">
                  ၸၢႆးၼေႃႇမိူင်း
                </Text>
              </View>
              <TouchableOpacity className="bg-foreground/50 p-2 rounded-xl">
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </View>

            {/* Balance Card */}
            <View className="mx-6 bg-foreground rounded-3xl p-6 mt-4 border border-primary/10 shadow">
              <View className="flex-row justify-between items-start mb-4">
                <View>
                  <View className="flex-row items-center gap-1 mb-1">
                    <Text className="text-primary font-GHKTachileik font-medium">
                      {t("current_balance")}
                    </Text>
                    <Ionicons name="chevron-up" size={16} color="white" />
                  </View>
                  <Text className="text-primary font-GHKTachileik text-4xl font-semibold py-2">
                    $ 2,548.00
                  </Text>
                </View>
                <TouchableOpacity>
                  <Ionicons name="arrow-forward" size={20} color="white" />
                </TouchableOpacity>
              </View>

              <View className="flex-row justify-between mt-4">
                {/* Income */}
                <View>
                  <View className="flex-row items-center gap-1 mb-2">
                    <View className="bg-primary/20 rounded-full p-1 items-center justify-center size-6">
                      <Ionicons name="arrow-down" size={12} color="white" />
                    </View>
                    <Text className="text-primary/70 font-GHKTachileik text-sm">
                      {t("income")}
                    </Text>
                  </View>
                  <Text className="text-green font-GHKTachileik text-xl font-semibold">
                    $ 1,840.00
                  </Text>
                </View>

                {/* Expenses */}
                <View className="items-end">
                  <View className="flex-row items-center gap-1 mb-2">
                    <View className="bg-primary/20 rounded-full p-1 items-center justify-center size-6">
                      <Ionicons name="arrow-up" size={12} color="white" />
                    </View>
                    <Text className="text-primary/70 font-GHKTachileik text-sm">
                      {t("expenses")}
                    </Text>
                  </View>
                  <Text className="text-danger font-GHKTachileik text-xl font-semibold">
                    $ 284.00
                  </Text>
                </View>
              </View>
            </View>

            {/* Transactions Header */}
            <View className="flex-row justify-between items-center px-6 mt-8 mb-2">
              <Text className="text-primary font-GHKTachileik text-lg font-semibold">
                {t("transactions_history")}
              </Text>
              <TouchableOpacity>
                <Text className="text-primary/50 font-GHKTachileik text-sm">
                  {t("see_all")}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        }
        renderItem={({ item }) => <TransactionCard transaction={item} />}
        ListEmptyComponent={
          <EmptyState
            icon="receipt-outline"
            title={t("no_transactions")}
            subtitle={t("start_tracking")}
          />
        }
        ItemSeparatorComponent={() => (
          <View className="h-[0.5px] bg-primary/5 mx-6" />
        )}
      />
    </SafeAreaView>
  );
}
