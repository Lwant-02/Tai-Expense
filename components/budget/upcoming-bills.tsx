import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

import BillCard from "@/components/budget/bill-card";
import { SAMPLE_BILLS } from "@/components/budget/budget-data";
import EmptyState from "@/components/empty-state";
import { Bill } from "@/type";
import CustomBtn from "../custom-btn";

interface UpcomingBillsProps {
  onAddBill?: () => void;
}

export default function UpcomingBills({ onAddBill }: UpcomingBillsProps) {
  const { t } = useTranslation("budget");
  const router = useRouter();

  // Local state for UI toggles only
  const [bills, setBills] = useState<Bill[]>(
    SAMPLE_BILLS.sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    ),
  );

  const toggleReminder = (id: string, value: boolean) => {
    setBills((prev) =>
      prev.map((b) => (b.id === id ? { ...b, remindMe: value } : b)),
    );
  };

  return (
    <View className="mt-4 px-6">
      {/* Header - now just the Add button, title is in the tab */}

      <CustomBtn
        title={t("add_bill", "Add Bill")}
        onPress={onAddBill}
        IconLeft={<Ionicons name="add-circle" size={20} color="white" />}
        bgVariant="blue"
        className="mb-6 gap-2"
        textVariant="light"
      />

      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-primary font-GHKTachileik text-lg font-semibold">
          Upcoming Bills
        </Text>
        <TouchableOpacity onPress={() => router.push("/(root)/all-due-bill")}>
          <Text className="text-blue font-GHKTachileik text-base">See all</Text>
        </TouchableOpacity>
      </View>

      {/* Bill List */}
      {bills.length > 0 ? (
        <View>
          {bills.map((bill) => (
            <BillCard
              key={bill.id}
              bill={bill}
              onToggleReminder={toggleReminder}
            />
          ))}
        </View>
      ) : (
        <EmptyState
          icon="receipt-outline"
          title={t("no_bills", "No upcoming bills")}
          subtitle={t("add_bill_subtitle", "Add your bills to track due dates")}
        />
      )}
    </View>
  );
}
