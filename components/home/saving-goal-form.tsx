import CustomBtn from "@/components/custom-btn";
import { SAVING_GOAL_COLORS, SAVING_GOAL_ICONS } from "@/constants/index";
import { useUserStore } from "@/store/user.store";
import { Ionicons } from "@expo/vector-icons";
import cn from "clsx";
import React, { useState } from "react";
import {
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CustomInput from "../custom-input";

interface SavingGoalFormProps {
  onClose: () => void;
}

export default function SavingGoalForm({ onClose }: SavingGoalFormProps) {
  const [title, setTitle] = useState("");
  const { user } = useUserStore();
  const [targetAmount, setTargetAmount] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<
    keyof typeof Ionicons.glyphMap
  >(SAVING_GOAL_ICONS[0]);
  const [selectedColor, setSelectedColor] = useState<string>(
    SAVING_GOAL_COLORS[0],
  );

  const handleSubmit = () => {
    onClose();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="px-6 flex-1">
        <View className="flex-row items-center justify-between mb-8">
          <Text className="text-primary font-GHKTachileik text-2xl font-semibold">
            Create Saving Goal
          </Text>
          <TouchableOpacity
            onPress={onClose}
            className="bg-primary/10 rounded-full p-1.5"
          >
            <Ionicons name="close" size={20} color="#8E8E93" />
          </TouchableOpacity>
        </View>
        {/* Amount Input */}
        <CustomInput
          type="number"
          label="Target Amount"
          value={targetAmount}
          onChangeText={setTargetAmount}
          icon="pencil"
          currency={user?.currency!}
          textColor="white"
        />
        {/* Title Input */}
        <CustomInput
          type="text"
          label="Goal Name"
          value={title}
          onChangeText={setTitle}
          icon="pencil"
          iconColor="white"
          placeholder="e.g. New Mac, Vacation..."
        />
        {/* Color Selection */}
        <View className="mb-6 h-[100px]">
          <Text className="text-primary/50 font-GHKTachileik text-sm ">
            Color
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row "
          >
            <View className="flex-row gap-3 items-center px-1">
              {SAVING_GOAL_COLORS.map((color) => {
                const isSelected = selectedColor === color;
                return (
                  <TouchableOpacity
                    key={color}
                    onPress={() => setSelectedColor(color)}
                    className={cn(
                      "size-12 rounded-full items-center justify-center",
                      isSelected ? "border-[3px] border-background" : "",
                    )}
                    style={{
                      backgroundColor: color,
                      ...(isSelected
                        ? {
                            outlineWidth: 2,
                            outlineColor: color,
                            outlineStyle: "solid",
                          }
                        : {}),
                    }}
                  >
                    {isSelected && (
                      <Ionicons name="checkmark" size={20} color="white" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>

        {/* Icon Selection */}
        <View className="mb-8">
          <Text className="text-primary/50 font-GHKTachileik text-sm mb-3">
            Icon
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {SAVING_GOAL_ICONS.map((icon) => {
              const isSelected = selectedIcon === icon;
              return (
                <TouchableOpacity
                  key={icon}
                  onPress={() => setSelectedIcon(icon)}
                  className={cn(
                    "w-[48px] h-[48px] rounded-2xl items-center justify-center",
                    isSelected ? "bg-primary/10" : "bg-foreground",
                  )}
                  style={
                    isSelected ? { backgroundColor: `${selectedColor}20` } : {}
                  }
                >
                  <Ionicons
                    name={icon}
                    size={24}
                    color={isSelected ? selectedColor : "#8E8E93"}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View className="pb-10">
          <CustomBtn
            title="Create Goal"
            bgVariant="light"
            textVariant="dark"
            onPress={handleSubmit}
            disabled={!title || !targetAmount}
            className={!title || !targetAmount ? "opacity-50" : ""}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
