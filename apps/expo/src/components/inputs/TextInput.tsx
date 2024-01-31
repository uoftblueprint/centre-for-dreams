import React from 'react';
import { TextInput as UnstyledTextInput } from 'react-native';
import type { TextInputProps } from 'react-native';

type CustomTextInputProps = TextInputProps

const TextInput: React.FC<CustomTextInputProps> = (props) => {
    return (
        <UnstyledTextInput
            className="border border-p-40 rounded-[8px] p-[12px] font-body-lg leading-[0px] text-p-0"
            placeholderTextColor={"#79767D"}
            {...props}
        />
    );
};

export default TextInput;