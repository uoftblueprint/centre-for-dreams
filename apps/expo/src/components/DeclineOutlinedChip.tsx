import React from "react";
import { Text, TouchableOpacity } from "react-native";

import GreyXCircle from "../../assets/grey-x-circle.svg";
import RedXCircle from "../../assets/red-x-circle.svg";

interface DeclineOutlinedChipProps {
  onPress: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const DeclineOutlinedChip: React.FC<DeclineOutlinedChipProps> = ({
  onPress,
  disabled = false,
  children,
}) => {
  const textColor = disabled ? "text-n-40" : "text-x-0";
  const borderColor = disabled ? "border-n-40" : "border-x-0";
  const Icon = disabled ? GreyXCircle : RedXCircle;

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${borderColor} h-[30px] flex-row justify-center rounded-full border py-1 pl-4 pr-6`}
    >
      <Icon height={20} width={20}></Icon>
      <Text className={`${textColor} font-title-sm pl-2`}>{children}</Text>
    </TouchableOpacity>
  );
};

export default DeclineOutlinedChip;
