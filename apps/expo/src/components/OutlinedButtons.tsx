import React from "react";
import { Text, TouchableOpacity } from "react-native";

import Plus from "../../assets/plus.svg";

interface OutlinedButtonProps {
  onPress?: () => void;
  children: React.ReactNode;
  fill?: boolean;
  icon?: boolean;
}

const OutlinedButton: React.FC<OutlinedButtonProps> = ({
  onPress,
  children,
  fill = false,
  icon = false,
}) => {
  const bgColor = fill ? "bg-p-80" : "bg-white";
  const textShift = icon ? "pl-2" : "text-center";
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${bgColor} border-p-40 h-10 flex-row justify-center rounded-full border px-6 py-2`}
    >
      {icon && <Plus width={15} height={15} style={{ top: 2.5 }}></Plus>}
      <Text className={`font-title-md text-p-40 ${textShift}`}>{children}</Text>
    </TouchableOpacity>
  );
};

export default OutlinedButton;
