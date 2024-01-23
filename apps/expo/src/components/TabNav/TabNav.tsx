import type { ReactElement } from "react";
import React, { useState } from "react";
import { View } from "react-native";

import Tab from "./Tab";

interface TabNavProps {
  children: ReactElement<typeof Tab>[];
}

const TabNav: React.FC<TabNavProps> & { Tab: typeof Tab } = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <View className="bg-p-99 w-full flex-row rounded-full">
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child as React.ReactElement, {
          isActive: index === activeTab,
          onChange: () => setActiveTab(index),
        }),
      )}
    </View>
  );
};

TabNav.Tab = Tab;

export default TabNav;
