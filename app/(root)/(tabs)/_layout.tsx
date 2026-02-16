import { Ionicons } from "@expo/vector-icons";
import cn from "clsx";
import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: React.ReactNode;
  title: string;
}) => (
  <View
    className={cn(
      "flex items-center justify-center py-2 gap-0.5",
      focused && "bg-blue w-20 rounded-full",
    )}
  >
    {icon}
    <Text
      className={cn(
        "text-[10px] font-GHKTachileik font-medium",
        focused ? "text-white" : "text-[#8E8E93]",
      )}
    >
      {title}
    </Text>
  </View>
);

export default function Layout() {
  const { t } = useTranslation("common");

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIconStyle: {
          marginTop: 2,
          height: 49,
          width: 49,
        },
        tabBarStyle: {
          borderColor: "#2a2a2a",
          paddingHorizontal: 6,
          borderWidth: 1,
          borderRadius: 50,
          marginHorizontal: 20,
          height: 64,
          position: "absolute",
          bottom: 30,
          backgroundColor: "#000000",
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 5,
        },
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#8E8E93",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: t("navigation.home"),
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              focused={focused}
              icon={<Ionicons name="home" size={25} color={color} />}
              title={t("navigation.home")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="statistic"
        options={{
          title: t("navigation.statistic"),
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              focused={focused}
              icon={<Ionicons name="bar-chart" size={25} color={color} />}
              title={t("navigation.statistic")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: t("navigation.create"),
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              focused={focused}
              icon={<Ionicons name="add-circle" size={25} color={color} />}
              title={t("navigation.create")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="budget"
        options={{
          title: t("navigation.budget"),
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              focused={focused}
              icon={<Ionicons name="wallet-outline" size={25} color={color} />}
              title={t("navigation.budget")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: t("navigation.setting"),
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              focused={focused}
              icon={<Ionicons name="settings" size={25} color={color} />}
              title={t("navigation.setting")}
            />
          ),
        }}
      />
    </Tabs>
  );
}
