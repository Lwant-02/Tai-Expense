import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

interface SettingItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  iconBg?: string;
  title: string;
  subtitle?: string;
  value?: string;
  onPress?: () => void;
  isDestructive?: boolean;
  showArrow?: boolean;
}

export default function SettingItem({
  icon,
  iconColor = "#2563EB",
  iconBg = "bg-blue/10",
  title,
  subtitle,
  value,
  onPress,
  isDestructive = false,
  showArrow = true,
}: SettingItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center bg-foreground rounded-2xl p-4 mb-3 border border-primary/5"
    >
      {/* Icon */}
      <View
        className={`size-10 rounded-xl items-center justify-center mr-3 ${iconBg}`}
      >
        <Ionicons
          name={icon}
          size={18}
          color={isDestructive ? "#EF4444" : iconColor}
        />
      </View>

      {/* Title + Subtitle */}
      <View className="flex-1">
        <Text
          className={`font-GHKTachileik text-base font-semibold ${
            isDestructive ? "text-red-500" : "text-primary"
          }`}
        >
          {title}
        </Text>
        {subtitle && (
          <Text className="text-primary/40 font-GHKTachileik text-xs mt-0.5">
            {subtitle}
          </Text>
        )}
      </View>

      {/* Value + Arrow */}
      <View className="flex-row items-center gap-1">
        {value && (
          <Text className="text-primary/50 font-GHKTachileik text-base mr-1">
            {value}
          </Text>
        )}
        {showArrow && (
          <Ionicons
            name="chevron-forward"
            size={16}
            color="rgba(255,255,255,0.2)"
          />
        )}
      </View>
    </TouchableOpacity>
  );
}
