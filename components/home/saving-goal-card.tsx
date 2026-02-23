import { useUserStore } from "@/store/user.store";
import { SavingGoal } from "@/type";
import { formatCurrency, formatDate } from "@/utils/common";
import { Ionicons } from "@expo/vector-icons";
import cn from "clsx";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

interface SavingGoalCardProps {
  item: SavingGoal;
  onPress?: () => void;
  containerClassName?: string;
}

export default function SavingGoalCard({
  item,
  onPress,
  containerClassName = "w-64",
}: SavingGoalCardProps) {
  const { user } = useUserStore();
  const { t } = useTranslation("home");
  const progress = item.currentAmount / item.targetAmount;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className={cn(
        "bg-foreground rounded-[20px] p-5 border border-primary/10",
        containerClassName,
      )}
    >
      <View className="flex-row items-center gap-3 mb-4">
        <View
          className="size-10 rounded-full items-center justify-center"
          style={{ backgroundColor: `${item.color}20` }}
        >
          <Ionicons name={item.icon as any} size={20} color={item.color} />
        </View>
        <Text
          className="text-primary font-GHKTachileik text-lg font-medium flex-1 line-clamp-1"
          numberOfLines={1}
        >
          {item.title}
        </Text>
        <Text className="text-primary/40 font-GHKTachileik text-xs ml-auto">
          {formatDate(item.createdAt, t)}
        </Text>
      </View>

      <View className="mb-1">
        <View className="flex-row items-end justify-between mb-2">
          <Text className="text-primary font-GHKTachileik text-xl font-semibold">
            {formatCurrency(item.currentAmount, user?.currency ?? "USD")}
          </Text>
          <Text className="text-primary/40 font-GHKTachileik text-sm mb-0.5">
            {formatCurrency(item.targetAmount, user?.currency ?? "USD")}
          </Text>
        </View>

        <View className="w-full h-1.5 bg-primary/5 rounded-full overflow-hidden">
          <View
            className="h-full rounded-full"
            style={{
              width: `${Math.min(progress * 100, 100)}%`,
              backgroundColor: item.color,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
