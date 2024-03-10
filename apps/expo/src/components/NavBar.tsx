import type { ReactElement } from "react";
import React from "react";
import { View } from "react-native";
import { Tabs } from "expo-router";

import CalendarFocused from "../../assets/calendar-white.svg";
import Calendar from "../../assets/calendar.svg";
import ForumFocused from "../../assets/chatbubble-white.svg";
import Forum from "../../assets/chatbubble.svg";
import NoticesFocused from "../../assets/speakerphone-white.svg";
import Notices from "../../assets/speakerphone.svg";
import AccountFocused from "../../assets/user-white.svg";
import Account from "../../assets/user.svg";

const icons: Record<string, ReactElement[]> = {
  "calendar/index": [
    <Calendar key="normal" />,
    <CalendarFocused key="focused" />,
  ],
  "notices/index": [<Notices key="normal" />, <NoticesFocused key="focused" />],
  forum: [<Forum key="normal" />, <ForumFocused key="focused" />],
  account: [<Account key="normal" />, <AccountFocused key="focused" />],
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
              focused ? "bg-p-40 rounded-[22px]" : ""
            }`}
          >
            <View className="h-9 w-9 items-center justify-center">
              {focused ? icons[route.name]![1] : icons[route.name]![0]}
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
        name="notices/[id]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="notices/index"
        options={{
          href: "/notices/",
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
