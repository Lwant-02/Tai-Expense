import { Ionicons } from "@expo/vector-icons";
import cn from "clsx";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import CustomBtn from "../custom-btn";
import CustomInput from "../custom-input";

interface UpdateNameFormProps {
  nameInput: string;
  setNameInput: (value: string) => void;
  handleSaveName: () => void;
  onClose: () => void;
}

export default function UpdateNameForm({
  nameInput,
  setNameInput,
  handleSaveName,
  onClose,
}: UpdateNameFormProps) {
  const { t } = useTranslation("settings");
  return (
    <View className="px-6 pt-4">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-primary font-GHKTachileik text-xl font-semibold">
          {t("edit_name")}
        </Text>
        <TouchableOpacity
          onPress={onClose}
          className="bg-primary/10 rounded-full p-1.5"
        >
          <Ionicons name="close" size={18} color="white" />
        </TouchableOpacity>
      </View>

      <CustomInput
        type="text"
        value={nameInput}
        onChangeText={setNameInput}
        placeholder={t("edit_name_placeholder")}
        icon="person-outline"
        iconColor="rgba(255,255,255,0.4)"
        autoFocus={true}
      />
      <CustomBtn
        title={t("edit_name_save")}
        onPress={handleSaveName}
        disabled={!nameInput.trim()}
        className={cn("mt-4", !nameInput.trim() && "opacity-50")}
      />
    </View>
  );
}
