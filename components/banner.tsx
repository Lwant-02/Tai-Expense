import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface BannerProps {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  color?: string;
  bgColor?: string;
  onPress?: () => void;
}

export const Banner = ({
  title,
  description,
  icon,
  color = "#2563EB", // default blue
  bgColor = "bg-foreground", // default foreground
  onPress,
}: BannerProps) => {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      className={`${bgColor} rounded-3xl p-5 w-full h-28 border border-primary/10 shadow flex-row items-center gap-4`}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View className="bg-primary/10 rounded-full justify-center items-center w-12 h-12">
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <View className="flex-1">
        <Text className="text-primary font-GHKTachileik text-lg font-semibold mb-1">
          {title}
        </Text>
        <Text className="text-primary/60 py-1 font-GHKTachileik text-sm leading-tight">
          {description}
        </Text>
      </View>
    </Container>
  );
};
