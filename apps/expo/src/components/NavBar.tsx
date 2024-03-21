import type { ReactElement } from "react";
import React from "react";
import { Text, View } from "react-native";
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
  createpost: [<Account key="normal" />, <AccountFocused key="focused" />],
};

const pagesWOutTab: string[] = ["createpost"];

const labels: Record<string, string> = {
  "calendar/index": "Calendar",
  "notices/index": "Notices",
  forum: "Forum",
  account: "Account",
};

const NavBar = () => {
  return (
    <Tabs
      backBehavior="history"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          display: pagesWOutTab.includes(route.name) ? "none" : "flex",
          height: "11%",
          width: "100%",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: "#D5DBE9",
          position: "absolute",
        },
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => (
          <View className="h-full items-center justify-center">
            <View
              className={`mt-1.5 h-10 w-16 items-center justify-center pb-0 ${
                focused ? "bg-p-40 rounded-full" : ""
              }`}
            >
              <View className="h-9 w-9 items-center justify-center">
                {focused ? icons[route.name]![1] : icons[route.name]![0]}
              </View>
            </View>

            <Text className="text-p-40 font-label-lg mt-0.5 ">
              {labels[route.name]!}
            </Text>
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
        name="calendar/index"
        options={{
          href: "/calendar/",
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
        }}
      />
      <Tabs.Screen
        name="forum"
        options={{
          href: "/forum",
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          href: "/account",
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
      <Tabs.Screen
        name="calendar/[id]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="createpost"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
};

export default NavBar;
