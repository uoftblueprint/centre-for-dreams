import type { ReactNode } from "react";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface IconProps {
  onPress: () => void;
  icon: ReactNode;
}

interface HeadingProps {
  leftIcon?: IconProps;
  rightIcon?: IconProps;
  children: React.ReactNode;
}

const Heading: React.FC<HeadingProps> = ({ leftIcon, rightIcon, children }) => {
  return (
    <View className="h-[111px] flex-row items-center justify-between bg-white px-4 pb-3.5 pt-[61px]">
      {leftIcon ? (
        <TouchableOpacity onPress={leftIcon.onPress}>
          {leftIcon.icon}
        </TouchableOpacity>
      ) : (
        <View className="h-6 w-6" />
      )}
      <Text className="font-headline-md text-black">{children}</Text>
      {rightIcon ? (
        <TouchableOpacity onPress={rightIcon.onPress}>
          {rightIcon.icon}
        </TouchableOpacity>
      ) : (
        <View className="h-6 w-6" />
      )}
    </View>
  );
};

export default Heading;
