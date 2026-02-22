import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import CustomBtn from "../custom-btn";

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
      <TextInput
        value={nameInput}
        onChangeText={setNameInput}
        placeholder={t("edit_name_placeholder")}
        placeholderTextColor="rgba(255,255,255,0.3)"
        className="bg-background rounded-2xl px-4 py-4 text-primary font-GHKTachileik text-lg border border-primary/10 mb-4"
        autoFocus
        returnKeyType="done"
        onSubmitEditing={handleSaveName}
      />
      <CustomBtn
        title={t("edit_name_save")}
        onPress={handleSaveName}
        disabled={!nameInput.trim()}
      />
    </View>
  );
}
