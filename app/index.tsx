import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import { loadOnboarding, loadSetup } from "@/utils/storage";

export default function Index() {
  const [status, setStatus] = useState<
    "loading" | "welcome" | "get-started" | "home"
  >("loading");

  useEffect(() => {
    const checkStatus = async () => {
      const onboarded = await loadOnboarding();
      if (!onboarded) {
        setStatus("welcome");
        return;
      }

      const setupDone = await loadSetup();
      if (!setupDone) {
        setStatus("get-started");
        return;
      }

      setStatus("home");
    };
    checkStatus();
  }, []);

  if (status === "loading") {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <ActivityIndicator size="large" className="text-blue" />
      </View>
    );
  }

  if (status === "home") {
    return <Redirect href="/(root)/(tabs)/home" />;
  }

  if (status === "get-started") {
    return <Redirect href="/(welcome)/get-started" />;
  }

  return <Redirect href="/(welcome)/welcome" />;
}
