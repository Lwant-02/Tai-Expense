import { Ionicons } from "@expo/vector-icons";
import cn from "clsx";
import { differenceInDays, format, parseISO } from "date-fns";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch, Text, TouchableOpacity, View } from "react-native";

import EmptyState from "@/components/empty-state";
import { Bill } from "@/type";

// UI-only sample data
const SAMPLE_BILLS: Bill[] = [
  {
    id: "1",
    title: "Apartment Rent",
    amount: 1200,
    dueDate: new Date(new Date().setDate(25)).toISOString(), // Due on 25th
    remindMe: true,
    frequency: "monthly",
  },
  {
    id: "2",
    title: "Internet",
    amount: 55,
    dueDate: new Date(new Date().setDate(15)).toISOString(), // Due on 15th
    remindMe: true,
    frequency: "monthly",
  },
  {
    id: "3",
    title: "Netflix",
    amount: 15.99,
    dueDate: new Date(new Date().setDate(5)).toISOString(), // Due on 5th
    remindMe: false,
    frequency: "monthly",
  },
  {
    id: "4",
    title: "Car Insurance",
    amount: 145,
    dueDate: new Date(
      new Date().setDate(new Date().getDate() + 2),
    ).toISOString(), // Due in 2 days
    remindMe: true,
    frequency: "monthly",
  },
];

interface UpcomingBillsProps {
  onAddBill?: () => void;
}

export default function UpcomingBills({ onAddBill }: UpcomingBillsProps) {
  const { t } = useTranslation("budget");

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
      <TouchableOpacity
        onPress={onAddBill}
        className="flex-row items-center justify-center gap-2 bg-blue py-3 rounded-2xl mb-6"
      >
        <Ionicons name="add-circle" size={20} color="white" />
        <Text className="text-white font-GHKTachileik text-base font-semibold">
          {t("add_bill", "Add Bill")}
        </Text>
      </TouchableOpacity>

      {/* Bill List */}
      {bills.length > 0 ? (
        <View className="gap-3">
          {bills.map((bill) => {
            const daysLeft = differenceInDays(
              parseISO(bill.dueDate),
              new Date(),
            );
            const isOverdue = daysLeft < 0;
            const isDueSoon = daysLeft >= 0 && daysLeft <= 3;

            return (
              <View
                key={bill.id}
                className="bg-foreground p-4 rounded-3xl border border-primary/5 shadow-sm"
              >
                <View className="flex-row justify-between items-start mb-3">
                  <View className="flex-row items-center gap-3">
                    <View className="size-10 rounded-xl bg-orange-500/10 items-center justify-center">
                      <Ionicons
                        name="receipt-outline"
                        size={20}
                        color="#F97316"
                      />
                    </View>
                    <View>
                      <Text className="text-primary font-GHKTachileik text-sm font-bold">
                        {bill.title}
                      </Text>
                      <Text className="text-primary/50 font-GHKTachileik text-xs">
                        {isOverdue
                          ? `Overdue by ${Math.abs(daysLeft)} days`
                          : daysLeft === 0
                            ? "Due today"
                            : `Due in ${daysLeft} days`}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-primary font-GHKTachileik text-base font-semibold">
                    ${bill.amount.toFixed(2)}
                  </Text>
                </View>

                {/* Footer: Date & Toggle */}
                <View className="flex-row justify-between items-center pt-3 border-t border-primary/5">
                  <View className="flex-row items-center gap-1.5">
                    <Ionicons
                      name="calendar-outline"
                      size={12}
                      color={isDueSoon ? "#EF4444" : "rgba(0,0,0,0.4)"}
                    />
                    <Text
                      className={cn(
                        "font-GHKTachileik text-xs font-medium",
                        isDueSoon || isOverdue
                          ? "text-red-500"
                          : "text-primary/40",
                      )}
                    >
                      {format(parseISO(bill.dueDate), "MMM dd, yyyy")}
                    </Text>
                  </View>

                  <View className="flex-row items-center gap-2">
                    <Text className="text-primary/40 font-GHKTachileik text-[10px]">
                      {t("remind_me", "Remind me")}
                    </Text>
                    <Switch
                      value={bill.remindMe}
                      onValueChange={(val) => toggleReminder(bill.id, val)}
                      trackColor={{ false: "rgba(0,0,0,0.1)", true: "#2563EB" }}
                      thumbColor="#FFFFFF"
                      ios_backgroundColor="rgba(0,0,0,0.1)"
                      style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
                    />
                  </View>
                </View>
              </View>
            );
          })}
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
