import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Alert, View } from "react-native";

import {
  autoRolloverRecurringBills,
  deleteBill,
  getBills,
  updateBillRecurring,
  updateBillReminder,
} from "@/actions/bill";
import BillCard from "@/components/budget/bill-card";
import EmptyState from "@/components/empty-state";
import { useBillStore } from "@/store/bill.store";

export default function UpcomingBills() {
  const { t } = useTranslation("budget");
  const db = useSQLiteContext();
  const { bills, setBills } = useBillStore();

  const loadBills = useCallback(async () => {
    try {
      // First, automatically bump any overdue recurring bills to the next month
      await autoRolloverRecurringBills(db);

      const data = await getBills(db);
      setBills(data);
    } catch (error) {
      console.error("Failed to load bills:", error);
    }
  }, [db, setBills]);

  // Load bills when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadBills();
    }, [loadBills]),
  );

  const handleToggleReminder = async (id: string, value: boolean) => {
    await updateBillReminder(db, id, value);
    loadBills();
  };

  const handleToggleRecurring = async (id: string, value: boolean) => {
    await updateBillRecurring(db, id, value);
    loadBills();
  };

  const handleDelete = async (id: string) => {
    Alert.alert(
      t("delete_bill", "Delete Bill"),
      t("are_you_sure", "Are you sure you want to delete this bill?"),
      [
        {
          text: t("cancel", "Cancel"),
          style: "cancel",
        },
        {
          text: t("delete", "Delete"),
          style: "destructive",
          onPress: async () => {
            await deleteBill(db, id);
            loadBills();
          },
        },
      ],
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
              onToggleReminder={handleToggleReminder}
              onToggleRecurring={handleToggleRecurring}
              onDelete={handleDelete}
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
