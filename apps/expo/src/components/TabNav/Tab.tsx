import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface TabProps {
  label: string;
  onChange?: () => void;
  isActive?: boolean;
  onPress?: () => void;
}

const Tab: React.FC<TabProps> = ({ label, onChange, isActive, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (onChange) onChange();
        if (onPress) onPress();
      }}
      className={`flex-1 rounded-full px-4 py-2 ${
        isActive ? "bg-p-80" : "bg-p-99"
      }`}
    >
      <Text className={`text-p-0 font-title-md text-center text-sm`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Tab;
