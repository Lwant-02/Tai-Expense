import { getSavings, updateSavingCurrentAmount } from "@/actions/saving";
import CustomBtn from "@/components/custom-btn";
import { useSavingStore } from "@/store/saving.store";
import { useUserStore } from "@/store/user.store";
import { Ionicons } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CustomInput from "../custom-input";

interface UpdateSavingAmountFormProps {
  onClose: () => void;
  goalId: string;
}

export default function UpdateSavingAmountForm({
  onClose,
  goalId,
}: UpdateSavingAmountFormProps) {
  const { t: tHome } = useTranslation("home");
  const [amountToAdd, setAmountToAdd] = useState("");
  const { user } = useUserStore();
  const { setSavings } = useSavingStore();
  const db = useSQLiteContext();

  const handleSubmit = async () => {
    await updateSavingCurrentAmount(db, goalId, Number(amountToAdd));
    const updatedSavings = await getSavings(db);
    setSavings(updatedSavings);
    onClose();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="px-6 flex-1">
        <View className="flex-row items-center justify-between mb-8">
          <Text className="text-primary font-GHKTachileik text-2xl font-semibold">
            {tHome("add_funds")}
          </Text>
          <TouchableOpacity
            onPress={onClose}
            className="bg-primary/10 rounded-full p-1.5"
          >
            <Ionicons name="close" size={20} color="#8E8E93" />
          </TouchableOpacity>
        </View>

        <CustomInput
          type="number"
          label={tHome("amount_to_add")}
          value={amountToAdd}
          onChangeText={setAmountToAdd}
          icon="add"
          currency={user?.currency!}
          textColor="white"
          autoFocus={true}
        />

        <View className="pb-10 mt-4">
          <CustomBtn
            title={tHome("add_funds")}
            bgVariant="light"
            textVariant="dark"
            onPress={handleSubmit}
            disabled={!amountToAdd || Number(amountToAdd) <= 0}
            className={
              !amountToAdd || Number(amountToAdd) <= 0 ? "opacity-50" : ""
            }
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
