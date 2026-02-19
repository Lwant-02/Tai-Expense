import { Ionicons } from "@expo/vector-icons";
import cn from "clsx";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

import { FilterType } from "@/type";

const FILTERS: FilterType[] = ["expense", "income"];

interface FilterToggleProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export default function FilterToggle({
  activeFilter,
  onFilterChange,
}: FilterToggleProps) {
  const { t } = useTranslation("statistic");

  return (
    <View className="flex-row justify-end mx-6 mt-4">
      <View className="flex-row bg-foreground rounded-xl overflow-hidden">
        {FILTERS.map((filter) => (
          <TouchableOpacity
            key={filter}
            onPress={() => onFilterChange(filter)}
            className={cn(
              "px-4 py-2 flex-row items-center gap-1.5",
              activeFilter === filter && "bg-foreground",
              activeFilter !== filter && "bg-transparent",
            )}
          >
            <Text
              className={cn(
                "font-GHKTachileik text-base",
                activeFilter === filter
                  ? "text-primary font-semibold"
                  : "text-primary/40",
              )}
            >
              {t(`filter.${filter}`)}
            </Text>
            {activeFilter === filter && (
              <Ionicons name="chevron-down" size={14} color="white" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
