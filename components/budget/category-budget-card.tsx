import { CATEGORY_CONFIG } from "@/constants";
import { CategoryBudget } from "@/type";
import { Ionicons } from "@expo/vector-icons";
import cn from "clsx";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

interface CategoryBudgetCardProps {
  item: CategoryBudget;
}

export default function CategoryBudgetCard({ item }: CategoryBudgetCardProps) {
  const { t: tHome } = useTranslation("home");

  const config = CATEGORY_CONFIG[item.category];
  const percentage = item.budgeted > 0 ? (item.spent / item.budgeted) * 100 : 0;
  const clampedPercent = Math.min(percentage, 100);

  const getBarColor = () => {
    if (percentage >= 80) return "#EF4444";
    if (percentage >= 50) return "#F59E0B";
    return "#22C55E";
  };

  const barColor = getBarColor();

  return (
    <View className="bg-foreground rounded-2xl p-4 mb-3 border border-primary/5">
      <View className="flex-row items-center mb-3">
        {/* Icon */}
        <View
          className={cn(
            "size-10 rounded-xl items-center justify-center mr-3",
            config.bg,
          )}
        >
          <Ionicons name={config.icon} size={18} color={config.color} />
        </View>

        {/* Name + spent */}
        <View className="flex-1">
          <Text className="text-primary font-GHKTachileik text-sm font-semibold capitalize">
            {tHome(`category.${item.category}`)}
          </Text>
          <Text className="text-primary/40 font-GHKTachileik text-xs mt-0.5">
            ${item.spent.toLocaleString()} / ${item.budgeted.toLocaleString()}
          </Text>
        </View>

        {/* Percentage */}
        <Text
          className="font-GHKTachileik text-base font-semibold"
          style={{ color: barColor }}
        >
          {Math.round(percentage)}%
        </Text>
      </View>

      {/* Progress bar */}
      <View className="h-2 bg-primary/5 rounded-full overflow-hidden">
        <View
          className="h-full rounded-full"
          style={{
            width: `${clampedPercent}%`,
            backgroundColor: barColor,
          }}
        />
      </View>
    </View>
  );
}
