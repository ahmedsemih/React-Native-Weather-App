import { Tabs } from "expo-router";
import { Bookmark, CloudSun, History, ReceiptText } from "lucide-react-native";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0066b2",
        tabBarStyle: {
          paddingTop: 12,
          paddingBottom: 12,
          height: 72,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Inter-SemiBold",
        },
      }}
    >
      <Tabs.Screen
        name="forecast"
        options={{
          title: "Forecast",
          headerShown: false,
          tabBarIcon: ({ color }) => <CloudSun color={color} />,
        }}
      />
      <Tabs.Screen
        name="details"
        options={{
          title: "Details",
          headerShown: false,
          tabBarIcon: ({ color }) => <ReceiptText color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          headerShown: false,
          tabBarIcon: ({ color }) => <History color={color} />,
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          title: "Bookmarks",
          headerShown: false,
          tabBarIcon: ({ color }) => <Bookmark color={color} />,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
