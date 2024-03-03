import type { ReactElement } from "react";
import React from "react";
import { View } from "react-native";
import { Tabs } from "expo-router";

import Calendar from "../../assets/calendar.svg";
import Forum from "../../assets/chatbubble.svg";
import Notices from "../../assets/speakerphone.svg";
import Account from "../../assets/user.svg";

const icons: Record<string, ReactElement> = {
  calendar: <Calendar />,
  notices: <Notices />,
  forum: <Forum />,
  account: <Account />,
};

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
        tabBarLabelStyle: {
          fontFamily: "Poppins_500Medium",
          fontSize: 14,
          color: "#2E4D90",
          top: 10,
        },
        tabBarIcon: ({ focused }) => (
          <View
            className={`top-2 h-9 w-[68px] flex-1 items-center justify-center ${
              focused ? "rounded-[22px] bg-white" : ""
            }`}
          >
            <View className="h-9 w-9 items-center justify-center">
              {icons[route.name]}
            </View>
          </View>
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
        name="calendar"
        options={{
          href: "/calendar",
          tabBarLabel: "Calendar",
        }}
      />
      <Tabs.Screen
        name="notices"
        options={{
          href: "/notices",
          tabBarLabel: "Notices",
        }}
      />
      <Tabs.Screen
        name="forum"
        options={{
          href: "/forum",
          tabBarLabel: "Forum",
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          href: "/account",
          tabBarLabel: "Account",
        }}
      />
      <Tabs.Screen
        name="signin"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="signincode"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
};

export default NavBar;
