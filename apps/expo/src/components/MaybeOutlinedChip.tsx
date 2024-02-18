import React from "react";
import { Text, TouchableOpacity } from "react-native";

import GreyQuestionMark from "../../assets/grey-question-mark.svg";
import YellowQuestionMark from "../../assets/yellow-question-mark.svg";

interface MaybeOutlinedChipProps {
  onPress: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const MaybeOutlinedChip: React.FC<MaybeOutlinedChipProps> = ({
  onPress,
  disabled = false,
  children,
}) => {
  const textColor = disabled ? "text-n-40" : "text-s-40";
  const borderColor = disabled ? "border-n-40" : "border-s-40";
  const Icon = disabled ? GreyQuestionMark : YellowQuestionMark;

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

export default MaybeOutlinedChip;
