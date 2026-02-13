import { saveLanguage } from "@/utils/storage";
import cn from "clsx";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const toggleLanguage = async () => {
    const newLang = currentLang === "en" ? "shn" : "en";
    await saveLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <TouchableOpacity
      onPress={toggleLanguage}
      className="bg-background/20 rounded-full px-3 py-1 flex-row items-center border border-background/20"
    >
      <Text
        className={cn(
          "text-sm font-medium ml-1",
          currentLang === "shn" ? "text-primary font-bold" : "text-primary/50",
        )}
      >
        SHN
      </Text>
      <View className="h-3 w-[1px] bg-background/20 mx-1" />
      <Text
        className={cn(
          "text-sm font-medium mr-1",
          currentLang === "en" ? "text-primary font-bold" : "text-primary/50",
        )}
      >
        ENG
      </Text>
    </TouchableOpacity>
  );
}
