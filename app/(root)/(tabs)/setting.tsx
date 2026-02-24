import {
  deleteAllTransactions,
  deleteUser,
  updateUserBalance,
  updateUserName,
} from "@/actions";
import CustomBottomSheet from "@/components/custom-bottom-sheet";
import Header from "@/components/header";
import BalanceAdjustForm from "@/components/settings/balance-adjust-form";
import ProfileCard from "@/components/settings/profile-card";
import SettingItem from "@/components/settings/setting-item";
import UpdateNameForm from "@/components/settings/update-name-form";
import { CURRENCIES } from "@/constants";
import { useTransactionStore } from "@/store/transaction.store";
import { useUserStore as useActualUserStore } from "@/store/user.store";
import { formatCurrency } from "@/utils/common";
import BottomSheet from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Keyboard, ScrollView, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const convertCurrencyLabels = (currency: string) => {
  const symbol = CURRENCIES.find((c) => c.code === currency)?.symbol;
  return `${symbol} (${currency})`;
};

export default function SettingPage() {
  const { t, i18n } = useTranslation("settings");
  const router = useRouter();
  const { user, setUserBalance, setUserName } = useActualUserStore();
  const { setTransactions, setSummary } = useTransactionStore();
  const [balance, setBalance] = useState(user?.startingBalance!);
  const db = useSQLiteContext();

  const currentLang = i18n.language === "en" ? "English" : "Shan (တႆး)";

  const handleClearData = useCallback(() => {
    Alert.alert(t("clear_data"), t("clear_data_confirm"), [
      { text: t("clear_data_cancel"), style: "cancel" },
      {
        text: t("clear_data_yes"),
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.clear();
          await deleteUser(db);
        },
      },
    ]);
  }, [t]);

  const handleDeleteAllTransactions = useCallback(() => {
    Alert.alert(t("delete_transactions"), t("delete_transactions_confirm"), [
      { text: t("clear_data_cancel"), style: "cancel" },
      {
        text: t("clear_data_yes"),
        style: "destructive",
        onPress: async () => {
          try {
            await deleteAllTransactions(db);
            setTransactions([]);
            setSummary({
              totalIncome: 0,
              totalExpense: 0,
              pastIncome: 0,
              pastExpense: 0,
            });
          } catch (e) {
            console.error("Failed to delete transactions:", e);
          }
        },
      },
    ]);
  }, [t, db]);

  // Bottom sheet — balance
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Bottom sheet — edit name
  const nameSheetRef = useRef<BottomSheet>(null);
  const [nameInput, setNameInput] = useState(user?.name || "");

  const handleSaveName = async () => {
    const trimmed = nameInput.trim();
    if (!trimmed || !user?.id) return;
    try {
      await updateUserName(db, user.id, trimmed);
      setUserName(trimmed);
      closeNameSheet();
    } catch (e) {
      console.error("Failed to update name:", e);
    }
  };

  const openNameSheet = useCallback(() => {
    nameSheetRef.current?.snapToIndex(0);
  }, []);

  const closeNameSheet = useCallback(() => {
    Keyboard.dismiss();
    nameSheetRef.current?.close();
  }, []);

  const openBalanceSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const closeSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const handleSaveBalance = async (newBalance: number) => {
    try {
      if (user?.id) {
        await updateUserBalance(db, user.id, newBalance);
        setUserBalance(newBalance);
        setBalance(newBalance);
      }
    } catch (error) {
      console.error("Failed to adjust balance:", error);
    }
  };

  //State for balance
  useEffect(() => {
    setBalance(user?.startingBalance!);
    setNameInput(user?.name || "");
  }, [user?.startingBalance, user?.name]);

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView className="flex-1 bg-background">
        <Header
          title={t("title")}
          rightIcon="pencil"
          onRightPress={openNameSheet}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-32 px-6"
        >
          {/* Profile Card */}
          <ProfileCard user={user} />

          {/* General Section */}
          <Text className="text-primary/40 font-GHKTachileik text-sm uppercase tracking-widest mb-3 ml-1">
            {t("general")}
          </Text>

          <SettingItem
            icon="cash-outline"
            iconColor="#22C55E"
            iconBg="bg-green/10"
            title={t("currency")}
            subtitle={t("currency_subtitle")}
            value={convertCurrencyLabels(user?.currency!)}
            onPress={() => router.push("/settings/currency")}
          />

          <SettingItem
            icon="language-outline"
            iconColor="#A78BFA"
            iconBg="bg-[#A78BFA]/10"
            title={t("language")}
            subtitle={t("language_subtitle")}
            value={currentLang}
            onPress={() => router.push("/settings/language")}
          />

          <SettingItem
            icon="notifications-outline"
            iconColor="#F59E0B"
            iconBg="bg-[#F59E0B]/10"
            title={t("notifications")}
            subtitle={t("notifications_subtitle")}
            onPress={() => router.push("/settings/notification")}
          />

          <SettingItem
            icon="wallet-outline"
            iconColor="#F59E0B"
            iconBg="bg-[#F59E0B]/10"
            title={t("balance_adjustment")}
            subtitle={t("balance_subtitle")}
            showArrow={true}
            value={`${formatCurrency(balance, user?.currency!)}`}
            onPress={openBalanceSheet}
          />

          <View className="mb-5" />

          {/* Data Section */}
          <Text className="text-primary/40 font-GHKTachileik text-sm uppercase tracking-widest mb-3 ml-1">
            {t("data")}
          </Text>

          <SettingItem
            icon="trash-outline"
            iconColor="#EF4444"
            iconBg="bg-red-500/10"
            title={t("clear_data")}
            subtitle={t("clear_data_subtitle")}
            isDestructive
            showArrow={false}
            onPress={handleClearData}
          />

          <SettingItem
            icon="close-circle-outline"
            iconColor="#F97316"
            iconBg="bg-[#F97316]/10"
            title={t("delete_transactions")}
            subtitle={t("delete_transactions_subtitle")}
            isDestructive
            showArrow={false}
            onPress={handleDeleteAllTransactions}
          />

          <View className="mb-5" />

          {/* App Info Section */}
          <Text className="text-primary/40 font-GHKTachileik text-sm uppercase tracking-widest mb-3 ml-1">
            {t("app_info")}
          </Text>

          <SettingItem
            icon="information-circle-outline"
            iconColor="#60A5FA"
            iconBg="bg-blue/10"
            title={t("about")}
            subtitle={t("about_subtitle")}
            onPress={() => router.push("/settings/about")}
          />

          <SettingItem
            icon="code-slash-outline"
            iconColor="#8E8E93"
            iconBg="bg-primary/5"
            title={t("version")}
            value="v1.0.0"
            showArrow={false}
          />
        </ScrollView>
      </SafeAreaView>

      {/* Bottom Sheets*/}
      <CustomBottomSheet sheetRef={bottomSheetRef}>
        <BalanceAdjustForm
          currentBalance={balance}
          onSave={handleSaveBalance}
          onClose={closeSheet}
        />
      </CustomBottomSheet>

      <CustomBottomSheet sheetRef={nameSheetRef}>
        <UpdateNameForm
          onClose={closeNameSheet}
          nameInput={nameInput}
          setNameInput={setNameInput}
          handleSaveName={handleSaveName}
        />
      </CustomBottomSheet>
    </GestureHandlerRootView>
  );
}
