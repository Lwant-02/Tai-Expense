import { CATEGORY_CONFIG } from "@/constants";
import { useUserStore } from "@/store/user.store";
import { Transaction } from "@/type";
import { formatCurrency, formatDate } from "@/utils/common";
import { Ionicons } from "@expo/vector-icons";
import cn from "clsx";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

export default function TransactionCard({
  transaction,
  onPress,
}: {
  transaction: Transaction;
  onPress?: () => void;
}) {
  const { t } = useTranslation("home");
  const { user } = useUserStore();
  const config = CATEGORY_CONFIG[transaction.category];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center px-6 py-3"
    >
      {/* Category Icon */}
      <View
        className={cn(
          "size-14 rounded-xl items-center justify-center ",
          config.bg,
        )}
      >
        <Ionicons name={config.icon} size={22} color={config.color} />
      </View>

      {/* Title & Category */}
      <View className="flex-1 ml-4">
        <Text
          className="text-primary font-GHKTachileik text-lg font-medium"
          numberOfLines={1}
        >
          {transaction.title}
        </Text>
        <Text className="text-primary/40 font-GHKTachileik text-sm mt-0.5 capitalize">
          {t(`category.${transaction.category}`)}
        </Text>
      </View>

      {/* Amount & Date */}
      <View className="items-end">
        <Text
          className={cn(
            "font-GHKTachileik text-lg font-semibold",
            transaction.type === "income" ? "text-green" : "text-danger",
          )}
        >
          {formatCurrency(transaction.amount, user?.currency!)}
        </Text>
        <Text className="text-primary/30 font-GHKTachileik text-sm mt-0.5">
          {formatDate(transaction.transactionDate, t)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
