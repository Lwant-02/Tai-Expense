import { CATEGORY_CONFIG } from "@/constants";
import { useUserStore } from "@/store/user.store";
import { CategoryBudget } from "@/type";
import { formatCurrency } from "@/utils/common";
import { Ionicons } from "@expo/vector-icons";
import cn from "clsx";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

interface CategoryBudgetCardProps {
  item: CategoryBudget;
  totalBudget: number;
}

export default function CategoryBudgetCard({
  item,
  totalBudget,
}: CategoryBudgetCardProps) {
  const { t: tHome } = useTranslation("home");
  const { user } = useUserStore();

  const config = CATEGORY_CONFIG[item.category];
  const percentage = totalBudget > 0 ? (item.spent / totalBudget) * 100 : 0;
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
            "size-14 rounded-xl items-center justify-center mr-3",
            config.bg,
          )}
        >
          <Ionicons name={config.icon} size={18} color={config.color} />
        </View>

        {/* Name + spent */}
        <View className="flex-1">
          <Text className="text-primary font-GHKTachileik text-lg font-semibold capitalize">
            {tHome(`category.${item.category}`)}
          </Text>
          <Text className="text-primary/40 font-GHKTachileik text-base mt-0.5">
            {formatCurrency(item.spent, user?.currency!)}
          </Text>
        </View>

        {/* Percentage */}
        <Text
          className="font-GHKTachileik text-lg font-semibold"
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
