import { createSaving, getSavings, updateSaving } from "@/actions/saving";
import CustomBtn from "@/components/custom-btn";
import { SAVING_GOAL_COLORS, SAVING_GOAL_ICONS } from "@/constants/index";
import { useSavingStore } from "@/store/saving.store";
import { useUserStore } from "@/store/user.store";
import { SavingGoal } from "@/type";
import { Ionicons } from "@expo/vector-icons";
import cn from "clsx";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
  initialData?: SavingGoal;
}

export default function SavingGoalForm({
  onClose,
  initialData,
}: SavingGoalFormProps) {
  const { t: tHome } = useTranslation("home");
  const [title, setTitle] = useState("");
  const { user } = useUserStore();
  const { setSavings } = useSavingStore();
  const db = useSQLiteContext();
  const [targetAmount, setTargetAmount] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<
    keyof typeof Ionicons.glyphMap
  >(SAVING_GOAL_ICONS[0]);
  const [selectedColor, setSelectedColor] = useState<string>(
    SAVING_GOAL_COLORS[0],
  );

  const handleSubmit = async () => {
    if (initialData) {
      await updateSaving(db, initialData.id, {
        title,
        targetAmount: Number(targetAmount),
        color: selectedColor,
        icon: selectedIcon,
      });
    } else {
      await createSaving(db, {
        title,
        targetAmount: Number(targetAmount),
        color: selectedColor,
        icon: selectedIcon,
      });
    }
    const updatedSavings = await getSavings(db);
    setSavings(updatedSavings);

    // reset form fields could also go here
    onClose();
    setTitle("");
    setTargetAmount("");
    setSelectedIcon(SAVING_GOAL_ICONS[0]);
    setSelectedColor(SAVING_GOAL_COLORS[0]);
  };

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setTargetAmount(initialData.targetAmount.toString());
      setSelectedIcon(initialData.icon);
      setSelectedColor(initialData.color);
    }
  }, [initialData]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="px-6 flex-1">
        <View className="flex-row items-center justify-between mb-8">
          <Text className="text-primary font-GHKTachileik text-2xl font-semibold py-1">
            {initialData
              ? tHome("edit_saving_goal")
              : tHome("create_saving_goal")}
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
          label={tHome("target_amount")}
          value={targetAmount}
          onChangeText={setTargetAmount}
          icon="pencil"
          currency={user?.currency!}
          textColor="white"
        />
        {/* Title Input */}
        <CustomInput
          type="text"
          label={tHome("goal_name")}
          value={title}
          onChangeText={setTitle}
          icon="pencil"
          iconColor="white"
          placeholder={tHome("goal_name_placeholder")}
        />
        {/* Color Selection */}
        <View className="mb-6 h-[100px]">
          <Text className="text-primary/50 font-GHKTachileik text-sm ">
            {tHome("color")}
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
            {tHome("icon")}
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
            title={initialData ? tHome("update_goal") : tHome("create_goal")}
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
