import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface FilledButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const FilledButton: React.FC<FilledButtonProps> = ({
  onClick,
  disabled = false,
  children,
}) => {
  const bgColor = disabled ? "bg-n-10/10" : "bg-p-40";
  const textColor = disabled ? "text-n-10/40" : "text-e-100";
  return (
    <TouchableOpacity
      onPress={onClick}
      disabled={disabled}
      className={`${bgColor} h-10 justify-center rounded-full px-6 py-2.5`}
    >
      <Text className={`font-title-md ${textColor} text-center`}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default FilledButton;
