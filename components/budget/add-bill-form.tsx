import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CustomBtn from "../custom-btn";

interface AddBillFormProps {
  onClose: () => void;
  onSave?: (bill: any) => void;
}

export default function AddBillForm({ onClose, onSave }: AddBillFormProps) {
  const { t } = useTranslation("budget");
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
          onPress={onClose}
          className="bg-white/10 p-2 rounded-full"
        >
          <Ionicons name="close" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View className="gap-5">
        {/* Title Input */}
        <View>
          <Text className="text-white/60 font-GHKTachileik text-base mb-2">
            {t("bill_title", "Bill Title")}
          </Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="e.g. Electricity, Rent"
            placeholderTextColor="rgba(255,255,255,0.2)"
            className="bg-white/5 text-white font-GHKTachileik text-base px-4 py-3.5 rounded-xl border border-white/10"
          />
        </View>

        {/* Amount Input */}
        <View>
          <Text className="text-white/60 font-GHKTachileik text-base mb-2">
            {t("amount", "Amount")}
          </Text>
          <View className="relative">
            <Text className="absolute left-4 top-3.5 text-white/40 font-GHKTachileik text-base">
              $
            </Text>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="0.00"
              placeholderTextColor="rgba(255,255,255,0.2)"
              className="bg-white/5 text-white font-GHKTachileik text-base pl-8 pr-4 py-3.5 rounded-xl border border-white/10"
            />
          </View>
        </View>

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
          bgVariant="dark"
          textVariant="light"
        />
      </View>
    </View>
  );
}
