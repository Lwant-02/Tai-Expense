import { Ionicons } from "@expo/vector-icons";
import cn from "clsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const ICON_OPTIONS: (keyof typeof Ionicons.glyphMap)[] = [
  "restaurant-outline",
  "car-outline",
  "bag-outline",
  "game-controller-outline",
  "receipt-outline",
  "heart-outline",
  "book-outline",
  "briefcase",
  "laptop-outline",
  "gift-outline",
  "trending-up",
  "cash-outline",
  "home-outline",
  "airplane-outline",
  "fitness-outline",
  "musical-notes-outline",
];

const COLOR_OPTIONS = [
  "#2563EB",
  "#22C55E",
  "#F59E0B",
  "#F56565",
  "#EC4899",
  "#8B5CF6",
  "#A78BFA",
  "#14B8A6",
];

interface CategoryFormProps {
  onClose: () => void;
}

export default function CategoryForm({ onClose }: CategoryFormProps) {
  const { t } = useTranslation("create");

  const [name, setName] = useState("");
  const [selectedIcon, setSelectedIcon] =
    useState<keyof typeof Ionicons.glyphMap>("restaurant-outline");
  const [selectedColor, setSelectedColor] = useState("#2563EB");

  const isValid = name.trim().length > 0;

  const handleSubmit = () => {
    // TODO: Save category
    onClose();
  };

  return (
    <View className="px-6 pt-2 pb-8">
      {/* Sheet Header */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-primary font-GHKTachileik text-xl font-semibold">
          {t("create_category")}
        </Text>
        <TouchableOpacity
          onPress={onClose}
          className="bg-primary/10 rounded-full p-1.5"
        >
          <Ionicons name="close" size={18} color="white" />
        </TouchableOpacity>
      </View>

      {/* Preview */}
      <View className="items-center mb-6">
        <View
          className="size-20 rounded-3xl items-center justify-center mb-2"
          style={{ backgroundColor: selectedColor + "1A" }}
        >
          <Ionicons name={selectedIcon} size={36} color={selectedColor} />
        </View>
        <Text className="text-primary/50 font-GHKTachileik text-xs">
          {name || t("category_preview")}
        </Text>
      </View>

      {/* Name */}
      <View className="mb-4">
        <Text className="text-primary/50 font-GHKTachileik text-xs mb-2 uppercase">
          {t("category_name")}
        </Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder={t("category_name_placeholder")}
          placeholderTextColor="rgba(255,255,255,0.2)"
          className="bg-foreground rounded-2xl px-4 py-3.5 text-primary font-GHKTachileik text-base border border-primary/10"
        />
      </View>

      {/* Icon Picker */}
      <View className="mb-4">
        <Text className="text-primary/50 font-GHKTachileik text-xs mb-2 uppercase">
          {t("category_icon")}
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {ICON_OPTIONS.map((icon) => (
            <TouchableOpacity
              key={icon}
              onPress={() => setSelectedIcon(icon)}
              className={cn(
                "size-12 rounded-xl items-center justify-center border",
                selectedIcon === icon
                  ? "border-blue bg-blue/10"
                  : "border-primary/10 bg-foreground",
              )}
            >
              <Ionicons
                name={icon}
                size={20}
                color={selectedIcon === icon ? selectedColor : "#8E8E93"}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Color Picker */}
      <View className="mb-6">
        <Text className="text-primary/50 font-GHKTachileik text-xs mb-2 uppercase">
          {t("category_color")}
        </Text>
        <View className="flex-row flex-wrap gap-3">
          {COLOR_OPTIONS.map((color) => (
            <TouchableOpacity
              key={color}
              onPress={() => setSelectedColor(color)}
              className={cn(
                "size-10 rounded-full items-center justify-center border-2",
                selectedColor === color ? "border-white" : "border-transparent",
              )}
              style={{ backgroundColor: color }}
            >
              {selectedColor === color && (
                <Ionicons name="checkmark" size={18} color="white" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Submit */}
      <TouchableOpacity
        onPress={handleSubmit}
        disabled={!isValid}
        activeOpacity={0.8}
        className={cn(
          "rounded-2xl py-4 items-center bg-blue",
          !isValid && "opacity-40",
        )}
      >
        <Text className="text-primary font-GHKTachileik text-base font-semibold">
          {t("create_category")}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
