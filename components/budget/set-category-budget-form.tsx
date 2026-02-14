import { CATEGORIES, CATEGORY_CONFIG } from "@/constants";
import { TransactionCategory } from "@/type";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import cn from "clsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface SetCategoryBudgetFormProps {
  existingCategories: TransactionCategory[];
  onSave: (category: TransactionCategory, amount: number) => void;
  onClose: () => void;
}

export default function SetCategoryBudgetForm({
  existingCategories,
  onSave,
  onClose,
}: SetCategoryBudgetFormProps) {
  const { t } = useTranslation("budget");
  const { t: tHome } = useTranslation("home");

  const [selectedCategory, setSelectedCategory] =
    useState<TransactionCategory | null>(null);
  const [amount, setAmount] = useState("");

  const availableCategories = CATEGORIES.filter(
    (cat) => !existingCategories.includes(cat),
  );

  const handleSave = () => {
    const parsed = parseFloat(amount);
    if (selectedCategory && !isNaN(parsed) && parsed > 0) {
      Keyboard.dismiss();
      onSave(selectedCategory, parsed);
      onClose();
    }
  };

  return (
    <View className="px-6 pt-2 pb-10">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-primary font-GHKTachileik text-xl font-semibold">
          {t("add_category_budget")}
        </Text>
        <TouchableOpacity
          onPress={onClose}
          className="bg-primary/10 rounded-full p-1.5"
        >
          <Ionicons name="close" size={18} color="white" />
        </TouchableOpacity>
      </View>

      {/* Category picker */}
      <Text className="text-primary/50 font-GHKTachileik text-sm mb-3">
        {t("select_category")}
      </Text>
      <BottomSheetScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-6"
        contentContainerClassName="gap-2"
      >
        {availableCategories.map((cat) => {
          const config = CATEGORY_CONFIG[cat];
          const isSelected = selectedCategory === cat;
          return (
            <TouchableOpacity
              key={cat}
              onPress={() => setSelectedCategory(cat)}
              activeOpacity={0.7}
              className={cn(
                "flex-row items-center gap-1.5 px-3 py-2.5 rounded-full border",
                isSelected
                  ? "border-blue bg-blue/10"
                  : "bg-foreground border-primary/10",
              )}
            >
              <Ionicons
                name={config.icon}
                size={14}
                color={isSelected ? "#2563EB" : config.color}
              />
              <Text
                className={cn(
                  "font-GHKTachileik text-xs capitalize",
                  isSelected ? "text-blue font-semibold" : "text-primary/60",
                )}
              >
                {tHome(`category.${cat}`)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </BottomSheetScrollView>

      {/* Amount input */}
      <View className="flex-row items-center bg-foreground rounded-2xl border border-primary/10 px-4 py-3.5 mb-6">
        <View className="size-10 rounded-xl bg-blue/10 items-center justify-center mr-3">
          <Ionicons name="cash-outline" size={20} color="#2563EB" />
        </View>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          placeholder={t("category_amount")}
          placeholderTextColor="rgba(255,255,255,0.3)"
          keyboardType="numeric"
          className="flex-1 text-primary font-GHKTachileik text-lg"
        />
      </View>

      {/* Save */}
      <TouchableOpacity
        onPress={handleSave}
        activeOpacity={0.8}
        className={cn(
          "rounded-2xl py-4 items-center",
          selectedCategory && amount ? "bg-blue" : "bg-blue/30",
        )}
        disabled={!selectedCategory || !amount}
      >
        <Text className="text-primary font-GHKTachileik text-base font-semibold">
          {t("save")}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
