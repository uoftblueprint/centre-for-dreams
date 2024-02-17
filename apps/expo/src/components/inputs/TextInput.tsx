import React from "react";
import { TextInput as UnstyledTextInput, View } from "react-native";
import type { TextInputProps, ViewProps } from "react-native";

type CustomTextInputProps = TextInputProps;

export const TextInput: React.FC<CustomTextInputProps> & {
  RightElement: typeof RightElement;
} = ({ children, ...props }) => {
  return (
    <>
      <UnstyledTextInput
        className={`border-p-40 font-body-lg text-p-0 rounded-[8px] border p-[12px] leading-[0px] ${props.className}`}
        placeholderTextColor={"#79767D"}
        {...props}
      />
      {children}
    </>
  );
};

interface RightElementProps extends ViewProps {
  children: React.ReactNode;
}

const RightElement: React.FC<RightElementProps> = ({ children, ...props }) => {
  return (
    <View className="absolute right-[12px] top-[8px]" {...props}>
      {children}
    </View>
  );
};

TextInput.RightElement = RightElement;
