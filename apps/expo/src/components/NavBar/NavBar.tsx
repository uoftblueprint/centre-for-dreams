import React, { useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";

import NavTab from "./NavTab";

const NavBar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    {
      pageName: "Calendar",
      onPress: () => {
        router.push("/pages/calendar");
      },
    },
    {
      pageName: "Notices",
      onPress: () => {
        router.push("/pages/notices");
      },
    },
    {
      pageName: "Forum",
      onPress: () => {
        router.push("/pages/forum");
      },
    },
    {
      pageName: "Account",
      onPress: () => {
        router.push("/pages/account");
      },
    },
  ];
  return (
    <View>
      <View className="bottom-0 h-20 w-fit flex-row items-center justify-evenly rounded-t-2xl bg-slate-300">
        {tabs.map((item, index) => (
          <NavTab
            key={index}
            pageName={item.pageName}
            isActive={index === activeTab}
            onChange={() => setActiveTab(index)}
            onPress={item.onPress}
          />
        ))}
      </View>
    </View>
  );
};

export default NavBar;
