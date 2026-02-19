import { EmptyStateProps } from "@/type";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function EmptyState({
  icon = "document-text-outline",
  title = "No data yet",
  subtitle = "Your records will appear here once you start adding them.",
}: EmptyStateProps) {
  return (
    <View className="items-center justify-center py-16 px-8">
      <View className="bg-foreground/50 rounded-full size-20 items-center justify-center mb-5">
        <Ionicons name={icon} size={36} color="#8E8E93" />
      </View>
      <Text className="text-primary/70 font-GHKTachileik text-lg font-semibold text-center mb-2">
        {title}
      </Text>
      <Text className="text-primary/30 font-GHKTachileik text-base text-center leading-5">
        {subtitle}
      </Text>
    </View>
  );
}
