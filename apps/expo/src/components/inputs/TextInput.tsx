import React from 'react';
import { TextInput as UnstyledTextInput, View } from 'react-native';
import type { TextInputProps, ViewProps } from 'react-native';

type CustomTextInputProps = TextInputProps

export const TextInput: React.FC<CustomTextInputProps> & { RightElement: typeof RightElement } = ({ children, ...props }) => {
    return (
        <View className="position-relative">
            <UnstyledTextInput
                className="border border-p-40 rounded-[8px] p-[12px] font-body-lg leading-[0px] text-p-0"
                placeholderTextColor={"#79767D"}
                {...props}
            />
            {children}
        </View>
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
}

TextInput.RightElement = RightElement;