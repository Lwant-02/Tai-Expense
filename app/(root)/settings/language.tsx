import Header from "@/components/header";
import { saveLanguage } from "@/utils/storage";
import { Ionicons } from "@expo/vector-icons";
import cn from "clsx";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LANGUAGES = [
  { code: "en", label: "english", flag: "🇬🇧" },
  { code: "shn", label: "shan", flag: "🇱🇹" },
];

export default function LanguagePage() {
  const { t, i18n } = useTranslation("settings");
  const router = useRouter();

  const handleSelect = async (code: string) => {
    await saveLanguage(code);
    i18n.changeLanguage(code);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header
        title={t("select_language")}
        showBack
        onBackPress={() => router.back()}
      />

      <View className="px-6 mt-4">
        {LANGUAGES.map((lang) => {
          const isSelected = i18n.language === lang.code;
          return (
            <TouchableOpacity
              key={lang.code}
              onPress={() => handleSelect(lang.code)}
              activeOpacity={0.7}
              className={cn(
                "flex-row items-center rounded-2xl p-4 mb-3 border",
                isSelected
                  ? "bg-blue/10 border-blue"
                  : "bg-foreground border-primary/5",
              )}
            >
              {/* Flag */}
              <View
                className={cn(
                  "size-12 rounded-xl items-center justify-center mr-4",
                  isSelected ? "bg-blue/20" : "bg-primary/5",
                )}
              >
                <Text className="text-2xl">{lang.flag}</Text>
              </View>

              {/* Label */}
              <View className="flex-1">
                <Text
                  className={cn(
                    "font-GHKTachileik text-base font-semibold",
                    isSelected ? "text-blue" : "text-primary",
                  )}
                >
                  {t(lang.label)}
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
