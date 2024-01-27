import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface OutlinedButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  focused?: boolean;
  // icon to be added
}

const OutlinedButton: React.FC<OutlinedButtonProps> = ({
  onClick,
  children,
  focused = true,
}) => {
  return (
    <TouchableOpacity onPress={onClick} disabled={!focused}>
      <View className="h-12 items-start gap-2">
        <View
          className={`border-p-40 rounded-full border bg-white px-6 py-2.5 ${
            focused ? "bg-white" : "bg-p-80"
          }`}
        >
          <Text className="font-title-md text-p-40">{children}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OutlinedButton;
