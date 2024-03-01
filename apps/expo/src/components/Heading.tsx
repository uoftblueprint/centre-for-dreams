import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Bookmark from "../../assets/bookmark.svg";
import LeftArrow from "../../assets/left-arrow.svg";

interface HeadingProps {
  leftArrow?: {
    onPress: () => void;
  };
  bookmark?: {
    onPress: () => void;
  };
  children: React.ReactNode;
}

const Heading: React.FC<HeadingProps> = ({ leftArrow, bookmark, children }) => {
  return (
    <View className="h-[111px] flex-row items-center justify-between bg-white px-4 pb-3.5 pt-[61px]">
      {leftArrow ? (
        <TouchableOpacity onPress={leftArrow.onPress} className="items-start">
          <LeftArrow height={16.8} width={19.2}></LeftArrow>
        </TouchableOpacity>
      ) : (
        <View className="h-[16.8px] w-[19.2px]" />
      )}
      <Text className="font-headline-md text-black">{children}</Text>
      {bookmark ? (
        <TouchableOpacity onPress={bookmark.onPress}>
          <Bookmark height={16} width={16}></Bookmark>
        </TouchableOpacity>
      ) : (
        <View className="h-4 w-4" />
      )}
    </View>
  );
};

export default Heading;
