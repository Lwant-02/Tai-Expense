import { Ionicons } from "@expo/vector-icons";
import cn from "clsx";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

import { CATEGORIES, CATEGORY_CONFIG } from "@/constants";

interface CategoryListProps {
  onSeeAll: () => void;
}

export default function CategoryList({ onSeeAll }: CategoryListProps) {
  const { t } = useTranslation("create");
  const { t: tHome } = useTranslation("home");
  const displayCategories = CATEGORIES.slice(0, 8);

  return (
    <View className="mb-6">
      <View className="flex-row justify-between items-center px-6 mb-3">
        <Text className="text-primary font-GHKTachileik text-base font-semibold">
          {t("categories")}
        </Text>
        <TouchableOpacity onPress={onSeeAll}>
          <Text className="text-blue font-GHKTachileik text-sm">
            {t("see_all")}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row flex-wrap px-6 gap-3">
        {displayCategories.map((category) => {
          const config = CATEGORY_CONFIG[category];
          return (
            <TouchableOpacity
              key={category}
              activeOpacity={0.7}
              className="items-center"
              style={{ width: "22%" }}
            >
              <View
                className={cn(
                  "size-14 rounded-2xl items-center justify-center mb-1.5",
                  config.bg,
                )}
              >
                <Ionicons name={config.icon} size={24} color={config.color} />
              </View>
              <Text
                className="text-primary/70 font-GHKTachileik text-[10px] text-center"
                numberOfLines={1}
              >
                {tHome(`category.${category}`)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
