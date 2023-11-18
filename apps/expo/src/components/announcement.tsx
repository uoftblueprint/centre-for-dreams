import React from 'react'
import { Text, View, Image } from "react-native";
import type { ImageSourcePropType } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

interface Props {
    title: string;
    author: string;
    date: string;
    summary: string;
    profile_picture: ImageSourcePropType;
    post_media: ImageSourcePropType;
  }

export default function Announcement({ title, author, date, summary, profile_picture, post_media }: Props) {
    return (
        <View className='bg-white p-4 rounded-lg h-25 mx-auto w-11/12'>
            <Text className='font-bold text-xl'>{title}</Text>
            <View className='flex-row items-center mt-2'>
              <Image 
                  source={profile_picture}
                  className='w-8 h-8 rounded-full'
                  resizeMode="cover"
              />
              <Text className='ml-2 text-lg'>{author}</Text>
              <Text className='ml-4 text-lg'>{date}</Text>
            </View>
            <View className='mt-2'>
            <Image 
                  source={post_media}
                  className='w-fit h-60'
              />
            </View>
            <View>
              <Text className='mt-2 text-lg'>{summary}</Text>
            </View>
            <View className='flex-row items-center justify-end'>
                <Entypo name="reply" size={24} color="black"/>
                <Text className='mr-2 text-lg ml-2'>Reply</Text>
                <MaterialCommunityIcons name="read" size={24} color="black" />
                <Text className='ml-2 text-lg'>Read</Text>
            </View>
        </View>
      );
}