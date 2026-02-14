import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

import { formatHeaderDate } from "@/utils/common";

export default function BalanceCard() {
  const { t } = useTranslation("home");
  const router = useRouter();

  return (
    <View className="mx-6 bg-foreground rounded-3xl p-6 mt-4 border border-primary/10 shadow">
      <View className="flex-row justify-between items-start mb-4">
        <View>
          <Text className="text-primary/60 font-GHKTachileik text-xs font-medium uppercase mb-1">
            {formatHeaderDate(new Date(), t)}
          </Text>
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
        <TouchableOpacity onPress={() => router.push("/(root)/(tabs)/setting")}>
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
  );
}
