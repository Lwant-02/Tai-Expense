import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import BillCard from "@/components/budget/bill-card";
import { SAMPLE_BILLS } from "@/components/budget/budget-data";
import EmptyState from "@/components/empty-state";
import { Bill } from "@/type";

export default function UpcomingBills() {
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
