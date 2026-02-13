import { Ionicons } from "@expo/vector-icons";
import cn from "clsx";
import { Tabs } from "expo-router";
import { View } from "react-native";

const TabIcon = ({
  focused,
  icon,
}: {
  focused: boolean;
  icon: React.ReactNode;
}) => (
  <View
    className={cn("flex flex-row justify-center items-center rounded-full")}
  >
    <View
      className={cn(
        "rounded-full size-12 items-center justify-center",
        focused && "bg-blue",
      )}
    >
      {icon}
    </View>
  </View>
);

export default function Layout() {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIconStyle: {
          marginTop: 20,
          marginBottom: 0,
        },
        tabBarStyle: {
          borderColor: "#2a2a2a",
          borderWidth: 1,
          borderRadius: 50,
          marginHorizontal: 20,
          height: 78,
          position: "absolute",
          bottom: 40,
          backgroundColor: "#000000",
          shadowColor: "#2a2a2a",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 5,
        },
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#8E8E93",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              focused={focused}
              icon={<Ionicons name="home" size={24} color={color} />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="statistic"
        options={{
          title: "Statistic",
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              focused={focused}
              icon={<Ionicons name="bar-chart" size={24} color={color} />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              focused={focused}
              icon={<Ionicons name="add-circle" size={24} color={color} />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="budget"
        options={{
          title: "Budget",
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              focused={focused}
              icon={<Ionicons name="wallet-outline" size={24} color={color} />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "Setting",
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              focused={focused}
              icon={<Ionicons name="settings" size={24} color={color} />}
            />
          ),
        }}
      />
    </Tabs>
  );
}
