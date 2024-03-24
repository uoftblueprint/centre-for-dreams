import type { ReactElement } from "react";
import React from "react";
import { View } from "react-native";

import Tab from "./Tab";

interface TabNavProps {
  children: ReactElement<typeof Tab>[];
  currentTab: number;
}

const TabNav: React.FC<TabNavProps> & { Tab: typeof Tab } = ({
  children,
  currentTab,
}) => {
  return (
    <View className="bg-p-99 h-10 w-full flex-row rounded-full">
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child as React.ReactElement, {
          isActive: index === currentTab - 1,
        }),
      )}
    </View>
  );
};

TabNav.Tab = Tab;

export default TabNav;
