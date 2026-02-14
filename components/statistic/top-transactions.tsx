import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import EmptyState from "@/components/empty-state";
import TransactionCard from "@/components/home/transaction-card";
import { FilterType, Transaction } from "@/type";

interface TopTransactionsProps {
  transactions: Transaction[];
  activeFilter: FilterType;
  onTransactionPress?: (transaction: Transaction) => void;
}

export default function TopTransactions({
  transactions,
  activeFilter,
  onTransactionPress,
}: TopTransactionsProps) {
  const { t } = useTranslation("statistic");

  return (
    <View className="mt-5">
      <View className="flex-row justify-between items-center px-6 mb-3">
        <Text className="text-primary font-GHKTachileik text-lg font-semibold">
          {activeFilter === "expense" ? t("top_spending") : t("top_income")}
        </Text>
      </View>

      {transactions.length > 0 ? (
        <View>
          {transactions.map((item, index) => (
            <View key={item.id}>
              <TransactionCard
                transaction={item}
                onPress={() => onTransactionPress?.(item)}
              />
              {index < transactions.length - 1 && (
                <View className="h-[0.5px] bg-primary/5 mx-6" />
              )}
            </View>
          ))}
        </View>
      ) : (
        <EmptyState
          icon="receipt-outline"
          title={t("no_data")}
          subtitle={t("no_data_subtitle")}
        />
      )}
    </View>
  );
}
