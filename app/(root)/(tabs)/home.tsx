import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EmptyState from "@/components/empty-state";
import BalanceCard from "@/components/home/balance-card";
import BannerCarousel from "@/components/home/banner-carousel";
import GreetingHeader from "@/components/home/greeting-header";
import { SAMPLE_TRANSACTIONS } from "@/components/home/sample-data";
import TransactionCard from "@/components/home/transaction-card";

export default function Home() {
  const { t } = useTranslation("home");
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <FlatList
        data={SAMPLE_TRANSACTIONS.slice(0, 5)}
        keyExtractor={(item) => item.id}
        contentContainerClassName="pb-32"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <TouchableOpacity onPress={() => router.push("/(root)/test")}>
              <Text className="text-primary">Test</Text>
            </TouchableOpacity>
            <GreetingHeader />
            <BalanceCard />

            {/* Banner Carousel */}
            <View className="mt-6">
              <Text className="text-primary font-GHKTachileik text-lg font-semibold px-6">
                {t("banner.section_title")}
              </Text>
              <BannerCarousel />
            </View>

            {/* Transactions Header */}
            <View className="flex-row justify-between items-center px-6 mb-2">
              <Text className="text-primary font-GHKTachileik text-lg font-semibold">
                {t("transactions_history")}
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/(root)/all-transactions")}
              >
                <Text className="text-primary/50 font-GHKTachileik text-sm">
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
