import React from "react";
import { Text, TouchableOpacity } from "react-native";

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
  const bgColor = fill ? "bg-p-80" : "bg-white";
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${bgColor} border-p-40 h-10 justify-center rounded-full border px-6 py-2`}
    >
      <Text className="font-title-md text-p-40 text-center">{children}</Text>
    </TouchableOpacity>
  );
};

export default OutlinedButton;
