import Header from "@/components/header";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CONTACTS = [
  {
    key: "contact_email",
    icon: "mail-outline" as const,
    color: "#2563EB",
    bg: "bg-blue/10",
    value: "jaimain671@gmail.com",
    onPress: () => Linking.openURL("mailto:jaimain671@gmail.com"),
  },
  {
    key: "contact_facebook",
    icon: "logo-facebook" as const,
    color: "#1877F2",
    bg: "bg-[#1877F2]/10",
    value: "Naw Main",
    onPress: () => Linking.openURL("https://www.facebook.com/nawmong02"),
  },
  {
    key: "contact_telegram",
    icon: "paper-plane-outline" as const,
    color: "#26A5E4",
    bg: "bg-[#26A5E4]/10",
    value: "Lwant",
    onPress: () => Linking.openURL("https://t.me/Nawmong"),
  },
];

export default function AboutPage() {
  const { t } = useTranslation("settings");
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header title={t("about")} showBack onBackPress={() => router.back()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-6"
      >
        {/* Developer */}
        <Text className="text-primary/40 font-GHKTachileik text-sm uppercase tracking-widest mb-3 ml-1">
          {t("developer")}
        </Text>
        <View className="bg-foreground rounded-2xl p-5 border border-primary/5 mb-6">
          <View className="flex-row items-center">
            <View className="flex-1 justify-center items-center">
              <Text className="text-primary font-GHKTachileik text-lg font-semibold">
                {t("developer_name")}
              </Text>
              <Text className="text-primary/40 font-GHKTachileik text-base mt-0.5">
                {t("developer_role")}
              </Text>
            </View>
          </View>
        </View>

        {/* Support & Contact */}
        <Text className="text-primary/40 font-GHKTachileik text-sm uppercase tracking-widest mb-3 ml-1">
          {t("support_title")}
        </Text>
        <View className="bg-foreground rounded-2xl p-5 border border-primary/5 mb-4">
          <Text className="text-primary/50 font-GHKTachileik text-base leading-6 mb-4">
            {t("support_description")}
          </Text>

          {/* Contact Links */}
          {CONTACTS.map((contact) => (
            <TouchableOpacity
              key={contact.key}
              onPress={contact.onPress}
              activeOpacity={0.7}
              className="flex-row items-center py-3 border-t border-primary/5"
            >
              <View
                className={`size-10 rounded-xl items-center justify-center mr-3 ${contact.bg}`}
              >
                <Ionicons name={contact.icon} size={18} color={contact.color} />
              </View>
              <View className="flex-1">
                <Text className="text-primary/40 font-GHKTachileik text-sm">
                  {t(contact.key)}
                </Text>
                <Text className="text-primary font-GHKTachileik text-lg font-semibold">
                  {contact.value}
                </Text>
              </View>
              <Ionicons
                name="open-outline"
                size={16}
                color="rgba(255,255,255,0.2)"
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
