import React from "react";
import { Text, TouchableOpacity } from "react-native";

import GreenCheckCircle from "../../assets/green-check-circle.svg";
import GreyCheckCircle from "../../assets/grey-check-circle.svg";
import GreyQuestionMark from "../../assets/grey-question-mark.svg";
import GreyXCircle from "../../assets/grey-x-circle.svg";
import RedXCircle from "../../assets/red-x-circle.svg";
import YellowQuestionMark from "../../assets/yellow-question-mark.svg";

interface OutlinedChipProps {
  onPress: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const OutlinedChip: React.FC<OutlinedChipProps> = ({
  onPress,
  disabled = false,
  children,
}) => {
  let textColor, borderColor, Icon;
  if (disabled) {
    textColor = "text-n-40";
    borderColor = "border-n-40";
    if (children === "Join") {
      Icon = GreyCheckCircle;
    } else if (children === "Decline") {
      Icon = GreyXCircle;
    } else {
      Icon = GreyQuestionMark;
    }
  } else {
    if (children === "Join") {
      textColor = "text-g-0";
      borderColor = "border-g-0";
      Icon = GreenCheckCircle;
    } else if (children === "Decline") {
      textColor = "text-x-0";
      borderColor = "border-x-0";
      Icon = RedXCircle;
    } else {
      textColor = "text-s-40";
      borderColor = "border-s-40";
      Icon = YellowQuestionMark;
    }
  }
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

export default OutlinedChip;
