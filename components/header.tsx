import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  title: string;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightPress?: () => void;
  showBack?: boolean;
  onBackPress?: () => void;
}

export default function Header({
  title,
  rightIcon,
  onRightPress,
  showBack,
  onBackPress,
}: HeaderProps) {
  return (
    <View className="flex-row items-center justify-between px-6 py-4">
      {/* Left — back button or spacer */}
      {showBack ? (
        <TouchableOpacity
          onPress={onBackPress}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-foreground/50"
        >
          <Ionicons name="chevron-back" size={20} color="white" />
        </TouchableOpacity>
      ) : (
        <View className="w-10" />
      )}

      {/* Title */}
      <Text className="text-primary text-xl font-GHKKengtung font-semibold">
        {title}
      </Text>

      {/* Right Action */}
      {rightIcon ? (
        <TouchableOpacity
          onPress={onRightPress}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-foreground/50"
        >
          <Ionicons name={rightIcon} size={20} color="white" />
        </TouchableOpacity>
      ) : (
        <View className="w-10" />
      )}
    </View>
  );
}
