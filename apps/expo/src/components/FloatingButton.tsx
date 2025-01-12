import React from "react";
import { TouchableOpacity } from "react-native";

import FloatingButtonIcon from "../../assets/floating-button-icon.svg";

interface FloatingButtonProps {
  onPress: () => void;
  fill?: boolean;
  icon?: boolean;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  onPress,
  fill = true,
  icon = false,
}) => {
  const bgColor = fill ? "bg-p-40" : "bg-white";
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${bgColor} border-p-40 h-12 w-12 flex-row items-center justify-center rounded-full border px-4 py-2.5`}
    >
      {icon && <FloatingButtonIcon />}
    </TouchableOpacity>
  );
};

export default FloatingButton;
