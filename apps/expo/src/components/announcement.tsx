import React from 'react'
import { Text, View, Image } from "react-native";

interface Props {
    title: string;
    author: string;
    date: string;
    summary: string;
  }
  

export default function Announcement({ title, author, date, summary }: Props) {
    return (
        <View className='bg-grey-800 p-4 rounded-lg h-25 mx-auto w-11/12'>
            <Text className='font-bold text-xl'>{title}</Text>
            <View className='flex-row items-center mt-2'>
              <Image 
                  source={{ uri: 'https://static.wikia.nocookie.net/acc-official-database/images/9/91/El_gato.jpg/revision/latest?cb=20220709001857' }}
                  className='w-8 h-8 rounded-full'
                  resizeMode="cover"
              />
              <Text className='ml-2 text-lg'>{author}</Text>
              <Text className='ml-4 text-lg'>{date}</Text>
            </View>
            <View className='mt-2'>
            <Image 
                  source={{ uri: 'https://static.wikia.nocookie.net/acc-official-database/images/9/91/El_gato.jpg/revision/latest?cb=20220709001857' }}
                  className='w-fit h-60'
              />
            </View>
            <View>
              <Text className='mt-2 text-lg'>{summary}</Text>
            </View>
            <View className='flex-row justify-end items-center'>
                <Text className='mr-2'>Reply</Text>
                <Text>Read</Text>
            </View>
        </View>
      );
}