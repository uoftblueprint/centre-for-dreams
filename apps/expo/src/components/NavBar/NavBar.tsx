import React from "react";
import { Text, View } from "react-native";
import { Tabs } from "expo-router";

import { TAB_ROUTES } from "./TabRoutes";

const NavBar = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: "10%",
          width: "100%",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: "#D5DBE9",
          position: "absolute",
        },
        tabBarIcon: ({ focused }) => (
          <View
            className={`top-2 h-9 w-[68px] flex-1 items-center justify-center ${
              focused ? "rounded-[22px] bg-white" : ""
            }`}
          >
            <View className="h-9 w-9 items-center justify-center">
              {/* Add icon here for tab */}
              <Text
                className={`font-poppins500 text-sm font-medium text-blue-900`}
              >
                {" "}
                ?{" "}
              </Text>
            </View>
          </View>
        ),
        tabBarLabel: () => (
          <Text
            className={`font-poppins500 top-3 text-sm font-medium text-blue-900`}
          >
            {route.name}
          </Text>
        ),
      })}
    >
      <Tabs.Screen
        // Name of the route to hide.
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name={TAB_ROUTES.CALENDAR}
        options={{
          href: TAB_ROUTES.CALENDAR,
        }}
      />
      <Tabs.Screen
        name={TAB_ROUTES.NOTICES}
        options={{
          href: TAB_ROUTES.NOTICES,
        }}
      />
      <Tabs.Screen
        name={TAB_ROUTES.FORUM}
        options={{
          href: TAB_ROUTES.FORUM,
        }}
      />
      <Tabs.Screen
        name={TAB_ROUTES.ACCOUNT}
        options={{
          href: TAB_ROUTES.ACCOUNT,
        }}
      />
    </Tabs>
  );
};

export default NavBar;
