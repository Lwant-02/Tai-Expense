import { APP_ICON } from "@/constants";
import { User } from "@/type";
import { formatJoinDate } from "@/utils/common";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, View } from "react-native";

interface ProfileCardProps {
  user: User | null;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  const { t } = useTranslation("settings");
  const { t: tHome } = useTranslation("home");
  return (
    <View className="bg-foreground rounded-3xl p-5 mb-8 border border-primary/5">
      <View className="flex-row items-center">
        <View className="size-20 rounded-full overflow-hidden bg-blue/10 items-center justify-center mr-4">
          <Image source={APP_ICON} className="size-full" resizeMode="contain" />
        </View>
        <View className="flex-1 gap-1">
          <Text className="text-primary/40  font-GHKTachileik text-sm">
            {t("greeting")}
          </Text>
          <Text className="text-primary font-GHKTachileik text-xl font-semibold mt-0.5">
            {user?.name}
          </Text>
          <Text className="text-primary/40 font-GHKTachileik text-base">
            {t("joined_date")} :{" "}
            {formatJoinDate(new Date(user?.createdAt!), tHome)}
          </Text>
        </View>
      </View>
    </View>
  );
}
