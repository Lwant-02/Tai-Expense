import { getCurrencySymbol } from "@/utils/common";
import { Ionicons } from "@expo/vector-icons";
import cn from "clsx";
import React from "react";
import { Text, TextInput, View } from "react-native";

interface CustomInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  textColor?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  currency?: string;
  type: "text" | "number";
  autoFocus?: boolean;
  conatinerClassName?: string;
}

const TextInputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  iconColor,
  autoFocus,
  conatinerClassName,
}: CustomInputProps) => {
  return (
    <View className={cn("mb-4", conatinerClassName)}>
      {label && (
        <Text className="text-primary/80 text-base font-GHKTachileik mb-2 ml-1">
          {label}
        </Text>
      )}
      <View className="flex-row items-center bg-foreground rounded-2xl px-4 py-1 border border-primary/10">
        <Ionicons
          name={icon as keyof typeof Ionicons.glyphMap}
          size={20}
          color={iconColor}
        />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType="default"
          placeholderTextColor="rgba(255,255,255,0.25)"
          className="flex-1 text-primary font-GHKTachileik text-base ml-3 py-3.5"
          autoFocus={autoFocus}
        />
      </View>
    </View>
  );
};

const NumberInputField = ({
  label,
  value,
  onChangeText,
  currency,
  textColor,
  autoFocus,
  conatinerClassName,
}: CustomInputProps) => {
  return (
    <View className={cn("mb-4", conatinerClassName)}>
      {label && (
        <Text className="text-primary/80 text-base font-GHKTachileik mb-2 ml-1">
          {label}
        </Text>
      )}
      <View className="flex-row items-center bg-foreground rounded-2xl px-4 py-1 border border-primary/10">
        <View className="p-1.5 flex justify-center items-center">
          <Text
            className="font-GHKTachileik text-lg font-semibold text-center"
            style={{ color: textColor }}
          >
            {getCurrencySymbol(currency!)}
          </Text>
        </View>
        <TextInput
          value={value}
          onChangeText={(text) => {
            const cleaned = text.replace(/[^0-9.]/g, "");
            const parts = cleaned.split(".");
            const formatted =
              parts.length > 2
                ? parts[0] + "." + parts.slice(1).join("")
                : cleaned;
            onChangeText(formatted);
          }}
          placeholder="0.00"
          autoFocus={autoFocus}
          placeholderTextColor="rgba(255,255,255,0.25)"
          keyboardType="decimal-pad"
          className="flex-1 text-primary font-GHKTachileik text-base ml-2 py-3.5"
        />
      </View>
    </View>
  );
};

export default function CustomInput({
  type,
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  iconColor,
  currency,
  textColor,
}: CustomInputProps) {
  switch (type) {
    case "text":
      return (
        <TextInputField
          label={label}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          icon={icon}
          iconColor={iconColor}
          type={type}
        />
      );
    case "number":
      return (
        <NumberInputField
          label={label}
          value={value}
          onChangeText={onChangeText}
          currency={currency}
          textColor={textColor}
          type={type}
        />
      );
    default:
      return null;
  }
}
