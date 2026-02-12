import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomePage() {
  return (
    <SafeAreaView className="flex-1 h-full">
      <View className="flex-1 items-center justify-center">
        <Text className="font-NamTengWebPro text-2xl py-1">hello</Text>
      </View>
    </SafeAreaView>
  );
}
