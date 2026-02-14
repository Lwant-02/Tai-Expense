import { BANNERS } from "@/constants";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Banner } from "../banner";

const { width } = Dimensions.get("window");
const HEIGHT = 115;

export default function BannerCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useTranslation("home");

  return (
    <View className="mb-6">
      <Carousel
        loop
        width={width}
        height={HEIGHT}
        autoPlay={true}
        data={BANNERS}
        scrollAnimationDuration={3000}
        onSnapToItem={(index) => setActiveIndex(index)}
        renderItem={({ item }) => (
          <View className="px-6 h-full flex justify-center items-center">
            <Banner
              title={t(item.title)}
              description={t(item.description)}
              icon={item.icon as any}
              color={item.color}
              onPress={() => console.log(`Banner ${item.id} pressed`)}
            />
          </View>
        )}
      />

      {/* Pagination Dots */}
      <View className="flex-row justify-center gap-2">
        {BANNERS.map((_, index) => (
          <View
            key={index}
            className={`h-2 rounded-full ${
              activeIndex === index ? "w-6 bg-primary" : "w-2 bg-primary/20"
            }`}
          />
        ))}
      </View>
    </View>
  );
}
