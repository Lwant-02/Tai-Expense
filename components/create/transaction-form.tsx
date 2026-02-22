import { Ionicons } from "@expo/vector-icons";
import cn from "clsx";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  createTransaction,
  getTransactions,
  getTransactionSummary,
  updateTransaction,
} from "@/actions";
import { CATEGORIES, CATEGORY_CONFIG } from "@/constants";
import { useTransactionStore } from "@/store/transaction.store";
import { useUserStore } from "@/store/user.store";
import { Transaction, TransactionCategory, TransactionType } from "@/type";
import { getCurrencySymbol, toLocalISOString } from "@/utils/common";
import CustomBtn from "../custom-btn";

interface TransactionFormProps {
  type: TransactionType;
  onClose: () => void;
  initialData?: Transaction;
}

export default function TransactionForm({
  type,
  onClose,
  initialData,
}: TransactionFormProps) {
  const { t } = useTranslation("create");
  const { t: tHome } = useTranslation("home");

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<TransactionCategory | null>(null);
  const [note, setNote] = useState("");

  const isExpense = type === "expense";
  const accentColor = isExpense ? "#2563EB" : "#22C55E";

  const db = useSQLiteContext();
  const { setTransactions, setSummary } = useTransactionStore();
  const { user } = useUserStore();

  // `initialData` defaults to undefined. Make sure isUpdate strictly checks if it exists and has an id.
  const isUpdate = !!initialData?.id;

  const handleSubmit = async () => {
    Keyboard.dismiss();

    try {
      if (!isValid) return;

      if (isUpdate) {
        await updateTransaction(db, initialData?.id!, {
          title: title.trim(),
          type,
          amount: parseFloat(amount),
          category: selectedCategory as string,
          transactionDate: toLocalISOString(),
          note: note.trim(),
        });
      } else {
        await createTransaction(db, {
          title: title.trim(),
          type,
          amount: parseFloat(amount),
          category: selectedCategory as string,
          transactionDate: toLocalISOString(),
          note: note.trim(),
        });
      }

      // Instantly refresh global stores so all screens reflect new balance/transactions automatically
      const [updatedTransactions, updatedSummary] = await Promise.all([
        getTransactions(db),
        getTransactionSummary(db),
      ]);

      setTransactions(updatedTransactions);
      setSummary(updatedSummary);

      onClose();
      setAmount("");
      setTitle("");
      setSelectedCategory(null);
      setNote("");
    } catch (error) {
      console.error("Failed to save transaction", error);
    }
  };

  const isValid = title.trim() && amount.trim() && selectedCategory;

  // If initialData is provided, prefill the form
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setAmount(initialData.amount.toString());
      setSelectedCategory(initialData.category as TransactionCategory);
      setNote(initialData.note || "");
    }
  }, [initialData]);

  return (
    <View className="px-6 pt-2 pb-8">
      {/* Sheet Header */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-primary font-GHKTachileik text-xl font-semibold">
          {isUpdate
            ? isExpense
              ? t("update_expense")
              : t("update_income")
            : isExpense
              ? t("create_expense")
              : t("create_income")}
        </Text>
        <TouchableOpacity
          onPress={onClose}
          className="bg-primary/10 rounded-full p-1.5"
        >
          <Ionicons name="close" size={18} color="white" />
        </TouchableOpacity>
      </View>

      {/* Amount */}
      <View className="mb-4">
        <Text className="text-primary/80 text-base font-GHKTachileik mb-2 ml-1">
          {t("amount")}
        </Text>
        <View className="flex-row items-center bg-foreground rounded-2xl px-4 py-1 border border-primary/10">
          <View className="p-1.5 flex justify-center items-center">
            <Text
              className="font-GHKTachileik text-lg font-semibold text-center"
              style={{ color: accentColor }}
            >
              {getCurrencySymbol(user?.currency!)}
            </Text>
          </View>
          <TextInput
            value={amount}
            onChangeText={(text) => {
              const cleaned = text.replace(/[^0-9.]/g, "");
              const parts = cleaned.split(".");
              const formatted =
                parts.length > 2
                  ? parts[0] + "." + parts.slice(1).join("")
                  : cleaned;
              setAmount(formatted);
            }}
            placeholder="0.00"
            placeholderTextColor="rgba(255,255,255,0.25)"
            keyboardType="decimal-pad"
            className="flex-1 text-primary font-GHKTachileik text-base ml-3 py-3.5"
          />
        </View>
      </View>

      {/* Title */}
      <View className="mb-4">
        <Text className="text-primary/80 text-base font-GHKTachileik mb-2 ml-1">
          {t("title_label")}
        </Text>
        <View className="flex-row items-center bg-foreground rounded-2xl px-4 py-1 border border-primary/10">
          <Ionicons
            name="create-outline"
            size={20}
            color="rgba(255,255,255,0.4)"
          />
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder={t("title_placeholder")}
            placeholderTextColor="rgba(255,255,255,0.25)"
            className="flex-1 text-primary font-GHKTachileik text-base ml-3 py-3.5"
          />
        </View>
      </View>

      {/* Category */}
      <View className="mb-4">
        <Text className="text-primary/80 text-base font-GHKTachileik mb-2 ml-1">
          {t("category_label")}
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const config = CATEGORY_CONFIG[cat];
            const isSelected = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                onPress={() => setSelectedCategory(cat)}
                activeOpacity={0.7}
                className={cn(
                  "flex-row items-center gap-1.5 px-3 py-2 rounded-xl border",
                  isSelected
                    ? "border-blue bg-blue/10"
                    : "border-primary/10 bg-foreground",
                )}
              >
                <Ionicons
                  name={config.icon}
                  size={14}
                  color={isSelected ? accentColor : config.color}
                />
                <Text
                  className={cn(
                    "font-GHKTachileik text-xs",
                    isSelected
                      ? "text-primary font-semibold"
                      : "text-primary/60",
                  )}
                >
                  {tHome(`category.${cat}`)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Note */}
      <View className="mb-6">
        <Text className="text-primary/80 text-base font-GHKTachileik mb-2 ml-1">
          {t("note_label")}
        </Text>
        <View className="flex-row bg-foreground rounded-2xl px-4 py-1 border border-primary/10">
          <Ionicons
            name="document-text-outline"
            size={20}
            color="rgba(255,255,255,0.4)"
            style={{ marginTop: 14 }}
          />
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder={t("note_placeholder")}
            placeholderTextColor="rgba(255,255,255,0.25)"
            multiline
            numberOfLines={3}
            className="flex-1 text-primary font-GHKTachileik text-base ml-3 py-3.5 min-h-[80px]"
            textAlignVertical="top"
          />
        </View>
      </View>

      {/* Submit */}
      <CustomBtn
        onPress={handleSubmit}
        activeOpacity={0.8}
        disabled={!isValid}
        bgVariant="light"
        textVariant="dark"
        title={
          isUpdate
            ? isExpense
              ? t("update_expense")
              : t("update_income")
            : isExpense
              ? t("create_expense")
              : t("create_income")
        }
      />
    </View>
  );
}
