import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EmptyState from "@/components/empty-state";
import BalanceCard from "@/components/home/balance-card";
import BannerCarousel from "@/components/home/banner-carousel";
import GreetingHeader from "@/components/home/greeting-header";
import SavingGoalList from "@/components/home/saving-goal-list";
import TransactionCard from "@/components/home/transaction-card";
import { useTransactionStore } from "@/store/transaction.store";

export default function Home() {
  const { t } = useTranslation("home");
  const router = useRouter();
  const { transactions } = useTransactionStore();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <FlatList
        data={transactions.slice(0, 5)}
        keyExtractor={(item) => item.id}
        contentContainerClassName="pb-32"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <GreetingHeader />
            <BalanceCard />

            {/* Banner Carousel */}
            <View className="mt-6">
              <Text className="text-primary font-GHKTachileik text-lg font-semibold px-6">
                {t("banner.section_title")}
              </Text>
              <BannerCarousel />
            </View>

            {/* Saving Goal */}
            <View className="my-6">
              <View className="flex-row justify-between items-center px-6 mb-4">
                <Text className="text-primary font-GHKTachileik text-lg font-semibold">
                  {t("saving_goal")}
                </Text>
                <TouchableOpacity
                  onPress={() => router.push("/(root)/all-saving-goal")}
                >
                  <Text className="font-GHKTachileik text-base text-blue">
                    {t("see_all")}
                  </Text>
                </TouchableOpacity>
              </View>
              <SavingGoalList />
            </View>

            {/* Transactions Header */}
            <View className="flex-row justify-between items-center px-6 mb-2">
              <Text className="text-primary font-GHKTachileik text-lg font-semibold">
                {t("transactions_history")}
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/(root)/all-transactions")}
              >
                <Text className="font-GHKTachileik text-base text-blue">
                  {t("see_all")}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <TransactionCard
            transaction={item}
            onPress={() =>
              router.push({
                pathname: "/(root)/transaction-detail",
                params: { ...item },
              })
            }
          />
        )}
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
