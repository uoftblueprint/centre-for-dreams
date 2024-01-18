import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface TabProps {
    label: string;
    isActive?: boolean;
    onPress?: () => void;
}

const Tab: React.FC<TabProps> = ({ label, isActive, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`flex-1 px-4 py-2 rounded-full ${isActive ? 'bg-p-80' : 'bg-p-99'}`}
        >
            <Text className={`text-sm text-p-0 font-title-md text-center`}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

export default Tab;