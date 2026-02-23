import { Ionicons } from "@expo/vector-icons";
import cn from "clsx";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

import { MOCK_GOALS } from "./sample-data";
import SavingGoalCard from "./saving-goal-card";

export default function SavingGoalList() {
  const { t } = useTranslation("home");
  const router = useRouter();

  const data = MOCK_GOALS;

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName={
        data.length === 0 ? "px-6 flex-1 w-full" : "px-6 "
      }
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View className="w-4" />}
      renderItem={({ item }) => (
        <SavingGoalCard
          item={item}
          onPress={() =>
            router.push({
              pathname: "/(root)/saving-goal-detail",
              params: { id: item.id },
            })
          }
        />
      )}
      ListEmptyComponent={
        <View className="flex-1 items-center justify-center">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push("/(root)/all-saving-goal")}
            className={cn(
              "w-full bg-background-secondary rounded-2xl p-6 items-center justify-center border-2 border-primary/20 border-dashed",
            )}
          >
            <View className="bg-primary/5 rounded-full size-14 items-center justify-center mb-3">
              <Ionicons name="add" size={28} color="#8E8E93" />
            </View>
            <Text className="text-primary/70 font-GHKTachileik text-lg font-semibold mb-1 text-center">
              {t("no_saving_goal_yet")}
            </Text>
            <Text className="text-primary/40 font-GHKTachileik text-sm text-center">
              {t("create_new_goal")}
            </Text>
          </TouchableOpacity>
        </View>
      }
    />
  );
}
