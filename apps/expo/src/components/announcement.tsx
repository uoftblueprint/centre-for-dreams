import React from 'react'
import { Text, View } from "react-native";

type Props = {
    title: string;
    author: string;
    date: string;
    summary: string;
  };
  

export default function Announcement({ title, author, date, summary }: Props) {
    return (
        <View className='bg-white p-4 rounded-lg m-4 shadow'>
            <Text>title</Text>
        </View>
      );
}
