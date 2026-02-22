import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, View } from "react-native";
import Swiper from "react-native-swiper";

import CustomBtn from "@/components/custom-btn";
import LanguageToggle from "@/components/language-toggle";
import { ONBOARDING_SCREEN } from "@/constants";
import { saveOnboarding } from "@/utils/storage";

export default function WelcomePage() {
  const swiperRef = useRef<Swiper>(null);
  const [index, setIndex] = useState<number>(0);
  const isLastScreen = index === 2;
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View className="flex-1 relative h-full items-center justify-center">
      <View className="absolute top-20 right-6 z-10 flex-row items-center gap-2">
        <LanguageToggle />
      </View>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className="w-[32px] h-[4px] mx-1 bg-primary rounded-full" />}
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-background rounded-full" />
        }
        onIndexChanged={(index) => setIndex(index)}
        paginationStyle={{ bottom: "34%" }}
      >
        {ONBOARDING_SCREEN.map((item) => (
          <View key={item.id} className="flex-1">
            <Image
              source={item.image}
              className="absolute w-full h-full"
              resizeMode="contain"
            />
          </View>
        ))}
      </Swiper>

      {/* Bottom Sheet Overlay */}
      <View className="absolute bottom-0 w-full bg-background rounded-t-[50px] p-8 pb-5 items-center justify-end h-[33%]">
        <Text className="text-primary text-3xl text-center py-3 font-GHKKengtung">
          {t(ONBOARDING_SCREEN[index].title)}
        </Text>

        <Text className="text-primary/80 text-center text-base mb-5 py-2 leading-6 font-GHKKengtung">
          {t(ONBOARDING_SCREEN[index].description)}
        </Text>

        <View className="w-full gap-4">
          <CustomBtn
            title={isLastScreen ? t("get_started") : t("next")}
            bgVariant="light"
            textVariant="dark"
            onPress={async () => {
              if (isLastScreen) {
                await saveOnboarding(true);
                router.replace("/(welcome)/get-started");
              } else {
                swiperRef.current?.scrollBy(1);
              }
            }}
            className="w-full"
          />
          <CustomBtn
            title={t("skip")}
            bgVariant="outline"
            textVariant="light"
            onPress={async () => {
              await saveOnboarding(true);
              router.replace("/(welcome)/get-started");
            }}
            className="w-full"
          />
        </View>
      </View>
    </View>
  );
}
