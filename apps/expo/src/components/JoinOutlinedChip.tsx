import React from "react";
import { Text, TouchableOpacity } from "react-native";

import GreenCheckCircle from "../../assets/green-check-circle.svg";
import GreyCheckCircle from "../../assets/grey-check-circle.svg";

interface JoinOutlinedChipProps {
  onPress: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const JoinOutlinedChip: React.FC<JoinOutlinedChipProps> = ({
  onPress,
  disabled = false,
  children,
}) => {
  const textColor = disabled ? "text-n-40" : "text-g-0";
  const borderColor = disabled ? "border-n-40" : "border-g-0";
  const Icon = disabled ? GreyCheckCircle : GreenCheckCircle;

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

export default JoinOutlinedChip;
