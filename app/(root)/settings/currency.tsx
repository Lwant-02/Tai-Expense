import { updateUserCurrency } from "@/actions";
import Header from "@/components/header";
import { CURRENCIES } from "@/constants";
import { useUserStore } from "@/store/user.store";
import { Ionicons } from "@expo/vector-icons";
import cn from "clsx";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import CountryFlag from "react-native-country-flag";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CurrencyPage() {
  const { t } = useTranslation("settings");
  const router = useRouter();
  const { user, setUser } = useUserStore();
  const db = useSQLiteContext();

  const [selected, setSelected] = useState(user?.currency!);

  const handleSelect = async (code: string) => {
    setSelected(code);
    await updateUserCurrency(db, user?.id!, code);
    setUser({ ...user!, currency: code });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header
        title={t("select_currency")}
        showBack
        onBackPress={() => router.back()}
      />

      <View className="px-6 mt-4">
        {CURRENCIES.map((curr) => {
          const isSelected = selected === curr.code;
          return (
            <TouchableOpacity
              key={curr.code}
              onPress={() => handleSelect(curr.code)}
              activeOpacity={0.7}
              className={cn(
                "flex-row items-center rounded-2xl p-4 mb-3 border",
                isSelected
                  ? "bg-blue/10 border-blue"
                  : "bg-foreground border-primary/5",
              )}
            >
              {/* Symbol */}
              <View
                className={cn(
                  "size-12 rounded-xl items-center justify-center mr-4",
                  isSelected ? "bg-blue/20" : "bg-primary/5",
                )}
              >
                <CountryFlag isoCode={curr.flagCode} size={13} />
              </View>

              {/* Label */}
              <View className="flex-1">
                <Text
                  className={cn(
                    "font-GHKTachileik text-lg font-semibold",
                    isSelected ? "text-blue" : "text-primary",
                  )}
                >
                  {t(curr.name)}
                </Text>
                <Text className="text-primary/40 font-GHKTachileik text-base mt-0.5">
                  {curr.code}
                </Text>
              </View>

              {/* Checkmark */}
              {isSelected && (
                <View className="size-8 rounded-full bg-blue items-center justify-center">
                  <Ionicons name="checkmark" size={18} color="white" />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
