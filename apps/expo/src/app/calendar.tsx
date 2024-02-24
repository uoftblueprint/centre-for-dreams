import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import TabNav from "../components/TabNav/TabNav";
import EventTab from "~/components/EventTab";



const Calendar = () => {
  return (
    <SafeAreaView className="flex-1 px-4">
      <Stack.Screen options={{ title: "Calendar", headerShown: false }} />

      {/* logo */}
      

      <View className="w-full mt-20">
        <Text className="text-p-0 font-headline-sm">Hello Kelly!</Text>
      </View>
      <View className="w-full h-auto mx-auto mt-5">
        <TabNav>
          <TabNav.Tab><Text className="text-p-0 font-title-md">Week</Text></TabNav.Tab>
          <TabNav.Tab><Text className="font-title-md">Day</Text></TabNav.Tab>
        </TabNav>
      </View>

      <View className="w-full mt-5">
        <Text className="text-p-0 font-title-md">November 1</Text>
      </View>

      
      <View className="mt-5 justify-end w-4/5">  
        <EventTab
          activity={{ name: 'Day Program' }}
          attending={true}
        />
      </View>

      <View className="mt-2">
        <EventTab
          activity={{ name: 'Movie Night' }}
          attending={undefined}
        />
      </View>

      <View className="w-full mt-5">
        <Text className="text-p-0 font-title-md">November 2</Text>
      </View>

      <View className="mt-5">
        <EventTab
          activity={{ name: 'Day Program' }}
          attending={true}
        />
      </View>

      <View className="mt-2">
        <EventTab
          activity={{ name: 'Dinner Night' }}
          attending={false}
        />
      </View>
      

    </SafeAreaView>
  );
};

export default Calendar;
