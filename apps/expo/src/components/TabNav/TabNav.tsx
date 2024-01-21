import type { ReactElement } from 'react';
import React, { useState } from 'react';
import { View } from 'react-native';
import { styled } from 'nativewind';
import Tab from './Tab';

const StyledView = styled(View)

interface TabNavProps {
    children: ReactElement<typeof Tab>[]
}

const TabNav: React.FC<TabNavProps> & { Tab: typeof Tab } = ({ children }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <StyledView className="flex-row w-full bg-p-99">
            {
                React.Children.map(children, (child, index) =>
                    React.cloneElement(child as React.ReactElement, {
                        isActive: index === activeTab,
                        onChange: () => setActiveTab(index),
                    }),
                )
            }
        </StyledView>
    );
};

TabNav.Tab = Tab

export default TabNav;