import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import CustomBtn from "../custom-btn";

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
      <CustomBtn
        title={t("create_expense")}
        onPress={onCreateExpense}
        IconLeft={<Ionicons name="arrow-up" size={20} color="white" />}
        bgVariant="blue"
        className="flex-1 gap-2"
        textVariant="light"
      />

      <CustomBtn
        title={t("create_income")}
        onPress={onCreateIncome}
        IconLeft={<Ionicons name="arrow-down" size={20} color="white" />}
        bgVariant="green"
        className="flex-1 gap-2"
        textVariant="light"
      />
    </View>
  );
}
