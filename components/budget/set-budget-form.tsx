import { useUserStore } from "@/store/user.store";
import { Ionicons } from "@expo/vector-icons";
import cn from "clsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import CustomBtn from "../custom-btn";
import CustomInput from "../custom-input";

interface SetBudgetFormProps {
  currentBudget: number;
  onSave: (amount: number) => void;
  onClose: () => void;
}

export default function SetBudgetForm({
  currentBudget,
  onSave,
  onClose,
}: SetBudgetFormProps) {
  const { t } = useTranslation("budget");
  const { user } = useUserStore();
  const [amount, setAmount] = useState(
    currentBudget > 0 ? currentBudget.toString() : "",
  );

  const handleSave = () => {
    const parsed = parseFloat(amount);
    if (!isNaN(parsed) && parsed > 0) {
      Keyboard.dismiss();
      onSave(parsed);
      onClose();
    }
  };

  return (
    <View className="px-6 pt-2 pb-10">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-primary font-GHKTachileik text-xl font-semibold">
          {currentBudget > 0 ? t("edit_budget") : t("set_budget")}
        </Text>
        <TouchableOpacity
          onPress={onClose}
          className="bg-primary/10 rounded-full p-1.5"
        >
          <Ionicons name="close" size={18} color="white" />
        </TouchableOpacity>
      </View>

      {/* Amount input */}
      <CustomInput
        type="number"
        value={amount}
        onChangeText={setAmount}
        placeholder={t("budget_amount")}
        autoFocus
        currency={user?.currency!}
        textColor="white"
      />

      {/* Save */}
      <CustomBtn
        onPress={handleSave}
        title={t("save")}
        disabled={!amount}
        bgVariant="light"
        className={cn(!amount && "opacity-50", "mt-4")}
        textVariant="dark"
      />
    </View>
  );
}
