import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

import { useUserStore } from "@/store/user.store";
import { formatHeaderDate, getGreetingTime } from "@/utils/common";

export default function GreetingHeader() {
  const { t } = useTranslation("home");
  const router = useRouter();
  const greeting = `greeting_${getGreetingTime()}`;

  const { user } = useUserStore();

  return (
    <View className="flex-row justify-between items-center px-6 py-4 mt-2">
      <View>
        <Text className="text-primary/80 font-GHKTachileik text-base mb-1 font-semibold">
          {t(greeting)} - {formatHeaderDate(new Date(), t)}
        </Text>
        <Text className="text-primary font-GHKTachileik text-xl font-semibold">
          {user?.name}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => router.push("/(root)/notification")}
        className="bg-foreground/90 p-2 rounded-xl"
      >
        <Ionicons name="notifications-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
