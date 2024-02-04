import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

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
  if (disabled) {
    return (
      <TouchableOpacity onPress={onClick} disabled={disabled}>
        <View className="h-12 items-start gap-2">
          <View className="bg-n-10/10 rounded-full px-6 py-2.5">
            <Text className="font-title-md text-n-10/40">{children}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity onPress={onClick} disabled={disabled}>
        <View className="h-12 items-start gap-2">
          <View className="bg-p-40 rounded-full px-6 py-2.5">
            <Text className="font-title-md text-e-100">{children}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
};

export default FilledButton;