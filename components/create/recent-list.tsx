import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

import EmptyState from "@/components/empty-state";
import TransactionCard from "@/components/home/transaction-card";
import { Transaction } from "@/type";

interface RecentListProps {
  transactions: Transaction[];
  onSeeAll: () => void;
  onTransactionPress?: (transaction: Transaction) => void;
}

export default function RecentList({
  transactions,
  onSeeAll,
  onTransactionPress,
}: RecentListProps) {
  const { t } = useTranslation("create");
  const recentItems = transactions.slice(0, 5);

  return (
    <View className="mb-4">
      <View className="flex-row justify-between items-center px-6 mb-2">
        <Text className="text-primary font-GHKTachileik text-base font-semibold">
          {t("recent_transactions")}
        </Text>
        <TouchableOpacity onPress={onSeeAll}>
          <Text className="text-blue font-GHKTachileik text-base">
            {t("see_all")}
          </Text>
        </TouchableOpacity>
      </View>

      {recentItems.length > 0 ? (
        <View>
          {recentItems.map((item, index) => (
            <View key={item.id}>
              <TransactionCard
                transaction={item}
                onPress={() => onTransactionPress?.(item)}
              />
              {index < recentItems.length - 1 && (
                <View className="h-[0.5px] bg-primary/5 mx-6" />
              )}
            </View>
          ))}
        </View>
      ) : (
        <EmptyState
          icon="receipt-outline"
          title={t("no_transactions")}
          subtitle={t("no_transactions_subtitle")}
        />
      )}
    </View>
  );
}
