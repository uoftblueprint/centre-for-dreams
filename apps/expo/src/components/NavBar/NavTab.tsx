import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface NavProps {
  pageName?: string;
  isActive?: boolean;
  onChange?: () => void;
  onPress?: () => void;
}

const NavTab: React.FC<NavProps> = ({
  isActive,
  pageName,
  onPress,
  onChange,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (onChange) onChange();
        if (onPress) onPress();
      }}
      className="h-[60px] flex-col items-center justify-center"
    >
      <View
        className={`h-9 w-[68px] flex-1 items-center justify-center ${
          isActive ? "rounded-[22px] bg-white" : ""
        }`}
      >
        <View className="h-9 w-9 items-center justify-center">
          {/* Add icon here for tab */}
          <Text className={`font-poppins500 text-sm font-medium text-blue-900`}>
            {" "}
            ?{" "}
          </Text>
        </View>
      </View>
      <Text className={`font-poppins500 text-sm font-medium text-blue-900 `}>
        {pageName}
      </Text>
    </TouchableOpacity>
  );
};

export default NavTab;
