import { Ionicons } from "@expo/vector-icons";
import cn from "clsx";
import { differenceInDays, format, parseISO } from "date-fns";
import { useTranslation } from "react-i18next";
import { Switch, Text, TouchableOpacity, View } from "react-native";

import { useUserStore } from "@/store/user.store";
import { Bill } from "@/type";
import { formatCurrency } from "@/utils/common";

interface BillCardProps {
  bill: Bill;
  onToggleReminder: (id: string, value: boolean) => void;
  onToggleRecurring?: (id: string, value: boolean) => void;
  onDelete?: (id: string) => void;
}

export default function BillCard({
  bill,
  onToggleReminder,
  onToggleRecurring,
  onDelete,
}: BillCardProps) {
  const { t } = useTranslation("budget");
  const { user } = useUserStore();

  const daysLeft = differenceInDays(parseISO(bill.dueDate), new Date());
  const isOverdue = daysLeft < 0;
  const isDueSoon = daysLeft >= 0 && daysLeft <= 3;

  return (
    <View className="bg-foreground p-4 rounded-3xl border border-primary/5 shadow-sm mb-3">
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-row items-center gap-3">
          <View className="size-14 rounded-xl bg-orange-500/10 items-center justify-center">
            <Ionicons name="receipt-outline" size={20} color="#F97316" />
          </View>
          <View>
            <Text className="text-primary font-GHKTachileik text-lg font-semibold">
              {bill.title}
            </Text>
            <Text
              className={cn(
                "font-GHKTachileik text-base font-medium",
                isOverdue ? "text-green" : "text-orange-500",
              )}
            >
              {isOverdue
                ? "Status : Done"
                : `Status : Pending (${daysLeft === 0 ? "Today" : daysLeft + " days"})`}
            </Text>
          </View>
        </View>
        <Text className="text-primary font-GHKTachileik text-lg font-semibold">
          {formatCurrency(bill.amount, user?.currency!)}
        </Text>
      </View>

      {/* Action Footer */}
      <View className="mt-3 pt-4 border-t border-primary/5 flex-col gap-4">
        {/* Due Date */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <View className="size-8 rounded-full bg-primary/5 items-center justify-center">
              <Ionicons name="calendar-outline" size={16} color="#8E8E93" />
            </View>
            <Text className="text-primary/60 font-GHKTachileik text-base">
              Due Date
            </Text>
          </View>
          <Text
            className={cn(
              "font-GHKTachileik text-base font-semibold",
              isDueSoon ? "text-red-500" : "text-primary/80",
            )}
          >
            {format(parseISO(bill.dueDate), "MMM dd, yyyy")}
            {bill.isRecurring && (
              <Text className="text-green text-xs">{"  "}(Every Month)</Text>
            )}
          </Text>
        </View>

        {/* Remind Me */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <View className="size-8 rounded-full bg-blue/10 items-center justify-center">
              <Ionicons
                name="notifications-outline"
                size={16}
                color="#3B82F6"
              />
            </View>
            <Text className="text-primary/60 font-GHKTachileik text-base">
              {t("remind_me", "Remind me")}
            </Text>
          </View>
          <View className="-mr-[6px]">
            <Switch
              value={bill.remindMe}
              onValueChange={(val) => onToggleReminder(bill.id, val)}
              trackColor={{ false: "rgba(0,0,0,0.1)", true: "#3B82F6" }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="rgba(0,0,0,0.1)"
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            />
          </View>
        </View>

        {/* Repeat Every Month */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <View className="size-8 rounded-full bg-green/10 items-center justify-center">
              <Ionicons name="repeat-outline" size={16} color="#22C55E" />
            </View>
            <Text className="text-primary/60 font-GHKTachileik text-base">
              {t("repeat_monthly", "Repeat every month")}
            </Text>
          </View>
          <View className="-mr-[6px]">
            <Switch
              value={bill.isRecurring || false}
              onValueChange={(val) =>
                onToggleRecurring && onToggleRecurring(bill.id, val)
              }
              trackColor={{ false: "rgba(0,0,0,0.1)", true: "#22C55E" }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="rgba(0,0,0,0.1)"
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            />
          </View>
        </View>

        {/* Delete Action */}
        <TouchableOpacity
          className="flex-row items-center justify-between pt-1"
          activeOpacity={0.7}
          onPress={() => onDelete && onDelete(bill.id)}
        >
          <View className="flex-row items-center gap-3">
            <View className="size-8 rounded-full bg-red-500/10 items-center justify-center">
              <Ionicons name="trash-outline" size={16} color="#EF4444" />
            </View>
            <Text className="text-danger font-GHKTachileik text-base">
              {t("delete_bill", "Delete Bill")}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
