import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface OutlinedButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  fill: boolean;
  // icon to be added
}

const OutlinedButton: React.FC<OutlinedButtonProps> = ({
  onPress,
  children,
  fill,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="h-12 flex-auto items-start gap-2">
        <View
          className={`border-p-40 rounded-full border bg-white px-6 py-2 ${
            fill ? "bg-p-80" : "bg-white"
          }`}
        >
          <Text className="font-title-md text-p-40">{children}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OutlinedButton;
