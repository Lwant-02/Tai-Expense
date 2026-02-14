import { Ionicons } from "@expo/vector-icons";
import cn from "clsx";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/components/header";
import { CATEGORIES, CATEGORY_CONFIG } from "@/constants";

export default function AllCategories() {
  const { t } = useTranslation("create");
  const { t: tHome } = useTranslation("home");
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header
        title={t("categories")}
        showBack
        onBackPress={() => router.back()}
      />

      <Text className="text-primary/40 font-GHKTachileik text-xs px-6 mb-2">
        {CATEGORIES.length} {t("categories")}
      </Text>

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-6 pb-10"
        renderItem={({ item: category }) => {
          const config = CATEGORY_CONFIG[category];
          return (
            <View className="flex-row items-center py-3.5 border-b border-primary/5">
              <View
                className={cn(
                  "size-12 rounded-2xl items-center justify-center",
                  config.bg,
                )}
              >
                <Ionicons name={config.icon} size={22} color={config.color} />
              </View>
              <Text className="flex-1 ml-4 text-primary font-GHKTachileik text-base capitalize">
                {tHome(`category.${category}`)}
              </Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
