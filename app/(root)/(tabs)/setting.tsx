import Header from "@/components/header";
import BalanceAdjustForm from "@/components/settings/balance-adjust-form";
import SettingItem from "@/components/settings/setting-item";
import { loadCurrency, loadUsername } from "@/utils/storage";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const CURRENCY_LABELS: Record<string, string> = {
  THB: "฿ (THB)",
  MMK: "Ks (MMK)",
  USD: "$ (USD)",
};

export default function SettingPage() {
  const { t, i18n } = useTranslation("settings");
  const router = useRouter();

  const [currency, setCurrency] = useState("THB");
  const [username, setUsername] = useState("User");
  const [balance, setBalance] = useState(0);

  // Bottom sheet
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["90%"], []);
  const [showSheet, setShowSheet] = useState(false);

  const openBalanceSheet = useCallback(() => {
    setShowSheet(true);
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const closeSheet = useCallback(() => {
    setShowSheet(false);
    bottomSheetRef.current?.close();
  }, []);

  // Load persisted settings
  useEffect(() => {
    (async () => {
      const savedCurrency = await loadCurrency();
      if (savedCurrency) setCurrency(savedCurrency);
      const savedName = await loadUsername();
      if (savedName) setUsername(savedName);
    })();
  }, []);

  const currentLang = i18n.language === "en" ? "English" : "Shan (တႆး)";

  const handleClearData = useCallback(() => {
    Alert.alert(t("clear_data"), t("clear_data_confirm"), [
      { text: t("clear_data_cancel"), style: "cancel" },
      {
        text: t("clear_data_yes"),
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.clear();
        },
      },
    ]);
  }, [t]);

  const handleBalanceSave = useCallback((amount: number) => {
    setBalance(amount);
    // TODO: persist balance to AsyncStorage
  }, []);

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView className="flex-1 bg-background">
        <Header title={t("title")} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-32 px-6"
        >
          {/* Profile Card */}
          <View className="bg-foreground rounded-3xl p-5 mb-8 border border-primary/5">
            <View className="flex-row items-center">
              <View className="size-14 rounded-2xl bg-blue/10 items-center justify-center mr-4">
                <Text className="text-2xl">👤</Text>
              </View>
              <View className="flex-1">
                <Text className="text-primary/40  font-GHKTachileik text-xs">
                  {t("greeting")} 👋
                </Text>
                <Text className="text-primary font-GHKTachileik text-lg font-semibold mt-0.5">
                  {username}
                </Text>
              </View>
            </View>
          </View>

          {/* General Section */}
          <Text className="text-primary/40 font-GHKTachileik text-xs uppercase tracking-widest mb-3 ml-1">
            {t("general")}
          </Text>

          <SettingItem
            icon="cash-outline"
            iconColor="#22C55E"
            iconBg="bg-green/10"
            title={t("currency")}
            subtitle={t("currency_subtitle")}
            value={CURRENCY_LABELS[currency] || currency}
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
            icon="wallet-outline"
            iconColor="#F59E0B"
            iconBg="bg-[#F59E0B]/10"
            title={t("balance_adjustment")}
            subtitle={t("balance_subtitle")}
            value={`$${balance.toLocaleString()}`}
            onPress={openBalanceSheet}
          />

          <View className="mb-5" />

          {/* Data Section */}
          <Text className="text-primary/40 font-GHKTachileik text-xs uppercase tracking-widest mb-3 ml-1">
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

          <View className="mb-5" />

          {/* App Info Section */}
          <Text className="text-primary/40 font-GHKTachileik text-xs uppercase tracking-widest mb-3 ml-1">
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

      {/* Bottom Sheet for Balance Adjustment */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        enablePanDownToClose
        onClose={() => setShowSheet(false)}
        backgroundStyle={{ backgroundColor: "#1A1A1F" }}
        handleIndicatorStyle={{ backgroundColor: "rgba(255,255,255,0.2)" }}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <BottomSheetScrollView
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {showSheet && (
              <BalanceAdjustForm
                currentBalance={balance}
                onSave={handleBalanceSave}
                onClose={closeSheet}
              />
            )}
          </BottomSheetScrollView>
        </KeyboardAvoidingView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
