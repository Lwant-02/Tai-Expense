import CustomBtn from "@/components/custom-btn";
import LanguageToggle from "@/components/language-toggle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingPage() {
  const handleDeleteKey = async () => {
    await AsyncStorage.clear();
  };
  return (
    <SafeAreaView className="flex-1 justify-center items-center px-6">
      <View className="fix-1 justify-center items-center w-full">
        <CustomBtn
          bgVariant="dark"
          title="Delete All Data"
          textVariant="light"
          onPress={handleDeleteKey}
        />
        <LanguageToggle />
      </View>
    </SafeAreaView>
  );
}
