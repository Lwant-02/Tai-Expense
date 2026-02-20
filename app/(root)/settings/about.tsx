import Header from "@/components/header";
import { APP_ICON } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  Image,
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
    value: "lwant.dev@gmail.com",
    onPress: () => Linking.openURL("mailto:lwant.dev@gmail.com"),
  },
  {
    key: "contact_facebook",
    icon: "logo-facebook" as const,
    color: "#1877F2",
    bg: "bg-[#1877F2]/10",
    value: "Lwant",
    onPress: () => Linking.openURL("https://facebook.com/lwant"),
  },
  {
    key: "contact_telegram",
    icon: "paper-plane-outline" as const,
    color: "#26A5E4",
    bg: "bg-[#26A5E4]/10",
    value: "@lwant",
    onPress: () => Linking.openURL("https://t.me/lwant"),
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
        {/* App Icon + Name */}
        <View className="items-center mb-8 mt-4">
          <View className="size-24 rounded-3xl overflow-hidden items-center justify-center mb-4 border border-primary/30">
            <Image source={APP_ICON} className="size-full" />
          </View>
          <Text className="text-primary font-GHKTachileik text-2xl font-semibold">
            TAI Expense
          </Text>
          <Text className="text-primary/40 font-GHKTachileik text-base mt-1">
            v1.0.0
          </Text>
        </View>

        {/* App Description */}
        <View className="bg-foreground rounded-2xl p-5 border border-primary/5 mb-4">
          <Text className="text-primary/60 font-GHKTachileik text-base leading-6">
            {t("about_description")}
          </Text>
        </View>

        {/* Mission */}
        <View className="bg-foreground rounded-2xl p-5 border border-primary/5 mb-6">
          <View className="flex-row items-center mb-3">
            <View className="size-9 rounded-xl bg-green/10 items-center justify-center mr-3">
              <Ionicons name="heart" size={18} color="#22C55E" />
            </View>
            <Text className="text-primary font-GHKTachileik text-base font-semibold">
              {t("our_mission")}
            </Text>
          </View>
          <Text className="text-primary/50 font-GHKTachileik text-base leading-6">
            {t("mission_description")}
          </Text>
        </View>

        {/* Developer */}
        <Text className="text-primary/40 font-GHKTachileik text-xs uppercase tracking-widest mb-3 ml-1">
          {t("developer")}
        </Text>
        <View className="bg-foreground rounded-2xl p-5 border border-primary/5 mb-6">
          <View className="flex-row items-center">
            <View className="size-14 rounded-2xl bg-[#A78BFA]/10 items-center justify-center mr-4">
              <Text className="text-2xl">👨‍💻</Text>
            </View>
            <View className="flex-1">
              <Text className="text-primary font-GHKTachileik text-lg font-semibold">
                {t("developer_name")}
              </Text>
              <Text className="text-primary/40 font-GHKTachileik text-xs mt-0.5">
                {t("developer_role")}
              </Text>
            </View>
          </View>
        </View>

        {/* Support & Contact */}
        <Text className="text-primary/40 font-GHKTachileik text-xs uppercase tracking-widest mb-3 ml-1">
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
                <Text className="text-primary/40 font-GHKTachileik text-xs">
                  {t(contact.key)}
                </Text>
                <Text className="text-primary font-GHKTachileik text-base font-semibold">
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
