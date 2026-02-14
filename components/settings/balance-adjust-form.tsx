import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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
  const [amount, setAmount] = useState(
    currentBalance > 0 ? currentBalance.toString() : "",
  );

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
        <Text className="text-primary/40 font-GHKTachileik text-xs mb-1">
          {t("current_balance")}
        </Text>
        <Text className="text-primary font-GHKTachileik text-lg font-semibold">
          $ {currentBalance.toLocaleString()}
        </Text>
      </View>

      {/* Amount input */}
      <View className="flex-row items-center bg-foreground rounded-2xl border border-primary/10 px-4 py-3.5 mb-6">
        <View className="size-10 rounded-xl bg-blue/10 items-center justify-center mr-3">
          <Ionicons name="wallet-outline" size={20} color="#2563EB" />
        </View>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          placeholder={t("new_balance")}
          placeholderTextColor="rgba(255,255,255,0.3)"
          keyboardType="numeric"
          className="flex-1 text-primary font-GHKTachileik text-lg"
          autoFocus
        />
      </View>

      {/* Save */}
      <TouchableOpacity
        onPress={handleSave}
        activeOpacity={0.8}
        className="bg-blue rounded-2xl py-4 items-center"
      >
        <Text className="text-primary font-GHKTachileik text-base font-semibold">
          {t("save")}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
