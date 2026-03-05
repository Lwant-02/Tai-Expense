import { useUserStore } from "@/store/user.store";
import { getCurrencySymbol } from "@/utils/common";
import { Ionicons } from "@expo/vector-icons";
import cn from "clsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import CustomBtn from "../custom-btn";
import CustomInput from "../custom-input";

interface BalanceAdjustFormProps {
  currentBalance: number;
  onSave: (amount: number) => void;
  onClose: () => void;
}

export default function BalanceAdjustForm({
  currentBalance,
  onSave,
  onClose,
}: BalanceAdjustFormProps) {
  const { t } = useTranslation("settings");
  const { user } = useUserStore();
  const [amount, setAmount] = useState(currentBalance?.toString() || "0");

  const handleSave = () => {
    const parsed = parseFloat(amount);
    if (!isNaN(parsed) && parsed >= 0) {
      Keyboard.dismiss();
      onSave(parsed);
      onClose();
    }
  };

  return (
    <View className="px-6 pt-2 pb-10">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-primary font-GHKTachileik text-xl font-semibold">
          {t("balance_adjustment")}
        </Text>
        <TouchableOpacity
          onPress={onClose}
          className="bg-primary/10 rounded-full p-1.5"
        >
          <Ionicons name="close" size={18} color="white" />
        </TouchableOpacity>
      </View>

      {/* Current balance display */}
      <View className="bg-primary/5 rounded-2xl p-4 mb-6 border border-primary/10">
        <Text className="text-primary/40 font-GHKTachileik text-sm mb-1">
          {t("current_balance")}
        </Text>
        <Text className="text-primary font-GHKTachileik text-lg font-semibold">
          {getCurrencySymbol(user?.currency!)}{" "}
          {(currentBalance || 0).toLocaleString()}
        </Text>
      </View>

      {/* Amount input */}
      <CustomInput
        type="number"
        label={t("amount")}
        value={amount}
        onChangeText={setAmount}
        currency={user?.currency!}
        textColor="white"
        autoFocus={true}
      />

      {/* Save */}
      <CustomBtn
        onPress={handleSave}
        activeOpacity={0.8}
        bgVariant="light"
        textVariant="dark"
        className={cn(!amount && "opacity-50", "mt-4")}
        title={t("save")}
      />
    </View>
  );
}
