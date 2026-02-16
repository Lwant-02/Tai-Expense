import { Ionicons } from "@expo/vector-icons";
import cn from "clsx";
import { differenceInDays, format, parseISO } from "date-fns";
import { useTranslation } from "react-i18next";
import { Switch, Text, View } from "react-native";

import { Bill } from "@/type";

interface BillCardProps {
  bill: Bill;
  onToggleReminder: (id: string, value: boolean) => void;
}

export default function BillCard({ bill, onToggleReminder }: BillCardProps) {
  const { t } = useTranslation("budget");

  const daysLeft = differenceInDays(parseISO(bill.dueDate), new Date());
  const isOverdue = daysLeft < 0;
  const isDueSoon = daysLeft >= 0 && daysLeft <= 3;

  return (
    <View className="bg-foreground p-4 rounded-3xl border border-primary/5 shadow-sm mb-3">
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-row items-center gap-3">
          <View className="size-10 rounded-xl bg-orange-500/10 items-center justify-center">
            <Ionicons name="receipt-outline" size={20} color="#F97316" />
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
            color={isDueSoon || isOverdue ? "#EF4444" : "gray"}
          />
          <Text
            className={cn(
              "font-GHKTachileik text-xs font-medium",
              isDueSoon || isOverdue ? "text-red-500" : "text-primary/40",
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
            onValueChange={(val) => onToggleReminder(bill.id, val)}
            trackColor={{ false: "rgba(0,0,0,0.1)", true: "#2563EB" }}
            thumbColor="#FFFFFF"
            ios_backgroundColor="rgba(0,0,0,0.1)"
            style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
          />
        </View>
      </View>
    </View>
  );
}
