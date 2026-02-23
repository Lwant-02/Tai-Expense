import { useUserStore } from "@/store/user.store";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import cn from "clsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import CustomBtn from "../custom-btn";
import CustomInput from "../custom-input";

interface AddBillFormProps {
  onClose: () => void;
  onSave?: (bill: any) => void;
}

export default function AddBillForm({ onClose, onSave }: AddBillFormProps) {
  const { t } = useTranslation("budget");
  const { user } = useUserStore();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    if (onSave) {
      onSave({ title, amount: parseFloat(amount), date });
    }
    onClose();
  };

  return (
    <View className="px-6">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-white font-GHKKengtung text-xl">
          {t("add_bill", "Add Bill")}
        </Text>
        <TouchableOpacity
          onPress={() => {
            onClose();
            setTitle("");
            setAmount("");
            setDate(new Date());
          }}
          className="bg-white/10 p-2 rounded-full"
        >
          <Ionicons name="close" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View className="gap-5">
        {/* Title Input */}
        <CustomInput
          type="text"
          label={t("bill_title")}
          value={title}
          onChangeText={setTitle}
          placeholder={t("bill_title")}
          icon="pencil"
          iconColor="white"
        />

        {/* Amount Input */}
        <CustomInput
          type="number"
          label={t("amount")}
          value={amount}
          onChangeText={setAmount}
          placeholder={t("amount")}
          currency={user?.currency!}
          textColor="white"
        />

        {/* Due Date */}
        <View>
          <Text className="text-white/60 font-GHKTachileik text-base mb-2">
            {t("due_date", "Due Date")}
          </Text>
          {Platform.OS === "android" ? (
            <>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                className="bg-white/5 rounded-xl border border-white/10 p-4"
              >
                <Text className="text-white font-GHKTachileik text-base">
                  {date.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      setDate(selectedDate);
                    }
                  }}
                />
              )}
            </>
          ) : (
            <View className="bg-white/5 rounded-xl border border-white/10 overflow-hidden items-start">
              <DateTimePicker
                value={date}
                mode="date"
                display="spinner"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || date;
                  setDate(currentDate);
                }}
                textColor="white"
                style={{ height: 120, width: "100%" }}
              />
            </View>
          )}
        </View>

        <CustomBtn
          disabled={!title || !amount || !date}
          onPress={handleSave}
          title={t("save_bill", "Save Bill")}
          bgVariant="light"
          textVariant="dark"
          className={cn("mt-3", (!title || !amount || !date) && "opacity-50")}
        />
      </View>
    </View>
  );
}
