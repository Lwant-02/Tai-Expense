import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomBtn from "@/components/custom-btn";
import LanguageToggle from "@/components/language-toggle";
import { CURRENCIES } from "@/constants";
import { saveSetup } from "@/utils/storage";

export default function GetStarted() {
  const router = useRouter();
  const { t } = useTranslation("getstarted");
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState(CURRENCIES[5]);
  const [modalVisible, setModalVisible] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; balance?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: { name?: string; balance?: string } = {};

    if (!name.trim()) {
      newErrors.name = t("error_name");
    }

    if (!balance.trim() || isNaN(Number(balance))) {
      newErrors.balance = t("error_balance");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsLoading(true);
    try {
      await saveSetup(true);
      router.replace("/(root)/(tabs)/home");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow px-6 pb-10"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 justify-between">
              {/* Language Toggle */}
              <View className="flex-row justify-end pt-8">
                <LanguageToggle />
              </View>

              {/* Content */}
              <View className="flex-1 justify-center">
                {/* Icon Header */}
                <View className="items-center mb-8">
                  <View className="bg-blue/10 rounded-full p-6 mb-6">
                    <View className="bg-blue/20 rounded-full p-5">
                      <Ionicons name="wallet" size={48} color="#2563EB" />
                    </View>
                  </View>

                  <Text className="text-primary text-3xl py-2 font-GHKKengtung text-center mb-3">
                    {t("title")}
                  </Text>
                  <Text className="text-primary/60 text-base font-GHKKengtung text-center leading-6 px-4">
                    {t("subtitle")}
                  </Text>
                </View>

                {/* Form */}
                <View className="gap-5">
                  {/* Name Input */}
                  <View>
                    <Text className="text-primary/80 text-base font-GHKTachileik mb-2 ml-1">
                      {t("name_label")}
                    </Text>
                    <View
                      className={`flex-row items-center bg-foreground rounded-2xl px-4 py-1 border ${
                        errors.name ? "border-danger" : "border-primary/10"
                      }`}
                    >
                      <Ionicons
                        name="person-outline"
                        size={20}
                        color="rgba(255,255,255,0.4)"
                      />
                      <TextInput
                        className="flex-1 text-primary font-GHKTachileik text-base ml-3 py-3.5"
                        placeholder={t("name_placeholder")}
                        placeholderTextColor="rgba(255,255,255,0.25)"
                        value={name}
                        onChangeText={(text) => {
                          setName(text);
                          if (errors.name)
                            setErrors((e) => ({ ...e, name: undefined }));
                        }}
                        autoCapitalize="words"
                      />
                    </View>
                    {errors.name && (
                      <Text className="text-danger text-xs font-GHKTachileik mt-1.5 ml-1">
                        {errors.name}
                      </Text>
                    )}
                  </View>

                  {/* Currency Selection */}
                  <View>
                    <Text className="text-primary/80 text-base font-GHKTachileik mb-2 ml-1">
                      {t("currency_label", "Currency")}
                    </Text>
                    <TouchableOpacity
                      onPress={() => setModalVisible(true)}
                      className="flex-row items-center bg-foreground rounded-2xl px-4 py-3.5 border border-primary/10 justify-between"
                    >
                      <View className="flex-row items-center gap-3">
                        <View className="size-8 rounded-full bg-background items-center justify-center">
                          <Text className="text-lg">{currency.flag}</Text>
                        </View>
                        <Text className="text-primary font-GHKTachileik text-base">
                          {currency.name} ({currency.code})
                        </Text>
                      </View>
                      <Ionicons
                        name="chevron-down"
                        size={20}
                        color="rgba(255,255,255,0.4)"
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Balance Input */}
                  <View>
                    <Text className="text-primary/80 text-base font-GHKTachileik mb-2 ml-1">
                      {t("balance_label")}
                    </Text>
                    <View
                      className={`flex-row items-center bg-foreground rounded-2xl px-4 py-1 border ${
                        errors.balance ? "border-danger" : "border-primary/10"
                      }`}
                    >
                      <View className="p-1.5 flex justify-center items-center">
                        <Text className="text-blue font-GHKTachileik text-lg font-semibold text-center">
                          {currency.symbol}
                        </Text>
                      </View>
                      <TextInput
                        className="flex-1 text-primary font-GHKTachileik text-base ml-3 py-3.5"
                        placeholder={t("balance_placeholder")}
                        placeholderTextColor="rgba(255,255,255,0.25)"
                        value={balance}
                        onChangeText={(text) => {
                          // Allow only numbers and decimal point
                          const cleaned = text.replace(/[^0-9.]/g, "");
                          // Prevent multiple decimal points
                          const parts = cleaned.split(".");
                          const formatted =
                            parts.length > 2
                              ? parts[0] + "." + parts.slice(1).join("")
                              : cleaned;
                          setBalance(formatted);
                          if (errors.balance)
                            setErrors((e) => ({ ...e, balance: undefined }));
                        }}
                        keyboardType="decimal-pad"
                      />
                    </View>
                    {errors.balance && (
                      <Text className="text-danger text-xs font-GHKTachileik mt-1.5 ml-1">
                        {errors.balance}
                      </Text>
                    )}
                  </View>
                  <CustomBtn
                    title={t("button")}
                    bgVariant="light"
                    textVariant="dark"
                    onPress={handleSubmit}
                    isLoading={isLoading}
                    className="w-full mt-5"
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Currency Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-background h-[70%] border-t border-primary/10">
            <View className="flex-row justify-between items-center p-6 border-b border-primary/5">
              <Text className="text-primary text-xl font-GHKTachileik font-bold">
                {t("select_currency", "Select Currency")}
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="bg-foreground p-2 rounded-full"
              >
                <Ionicons name="close" size={24} color="#EF4444" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={CURRENCIES}
              keyExtractor={(item) => item.code}
              contentContainerClassName="p-4 gap-3"
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setCurrency(item);
                    setModalVisible(false);
                  }}
                  className={`flex-row items-center p-4 rounded-2xl border ${
                    currency.code === item.code
                      ? "bg-blue/10 border-blue"
                      : "bg-foreground border-primary/5"
                  }`}
                >
                  <View className="size-10 rounded-full bg-background items-center justify-center mr-4">
                    <Text className="text-xl">{item.flag}</Text>
                  </View>
                  <View>
                    <Text className="text-primary font-GHKTachileik text-base font-semibold">
                      {item.name}
                    </Text>
                    <Text className="text-primary/60 font-GHKTachileik text-sm">
                      {item.code}
                    </Text>
                  </View>
                  {currency.code === item.code && (
                    <View className="flex-1 items-end">
                      <Ionicons
                        name="checkmark-circle"
                        size={24}
                        color="#2563EB"
                      />
                    </View>
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
