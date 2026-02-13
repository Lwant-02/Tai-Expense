import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import { loadOnboarding } from "@/utils/storage";

export default function Index() {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    const checkOnboarding = async () => {
      const completed = await loadOnboarding();
      setIsOnboardingCompleted(completed ?? false);
    };
    checkOnboarding();
  }, []);

  if (isOnboardingCompleted === null) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <ActivityIndicator size="large" className="text-blue" />
      </View>
    );
  }

  if (isOnboardingCompleted) {
    return <Redirect href="/(root)/(tabs)/home" />;
  }

  return <Redirect href="/(welcome)/welcome" />;
}
