import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

interface ActionButtonsProps {
  onCreateExpense: () => void;
  onCreateIncome: () => void;
}

export default function ActionButtons({
  onCreateExpense,
  onCreateIncome,
}: ActionButtonsProps) {
  const { t } = useTranslation("create");

  return (
    <View className="flex-row gap-3 px-6 mb-6">
      <TouchableOpacity
        onPress={onCreateExpense}
        activeOpacity={0.8}
        className="flex-1 bg-blue rounded-2xl p-4 flex-row items-center justify-center gap-2"
      >
        <View className="bg-white/20 rounded-full p-1.5">
          <Ionicons name="arrow-up" size={16} color="white" />
        </View>
        <Text className="text-primary font-GHKTachileik text-sm font-semibold">
          {t("create_expense")}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onCreateIncome}
        activeOpacity={0.8}
        className="flex-1 bg-green rounded-2xl p-4 flex-row items-center justify-center gap-2"
      >
        <View className="bg-white/20 rounded-full p-1.5">
          <Ionicons name="arrow-down" size={16} color="white" />
        </View>
        <Text className="text-primary font-GHKTachileik text-sm font-semibold">
          {t("create_income")}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
