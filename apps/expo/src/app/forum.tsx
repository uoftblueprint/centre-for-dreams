import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { Stack } from "expo-router";

import Discussion from "~/components/Discussion";
import TabNav from "~/components/TabNav";
import { api } from "~/utils/api";

const xml = `
<svg width="15" height="15" viewBox="0 -4 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.1276 14.4947C17.6073 13.5985 16.8339 11.0626 16.8339 7.75037C16.8339 5.76124 16.0437 3.85359 14.6372 2.44707C13.2307 1.04054 11.323 0.250366 9.33387 0.250366C7.34475 0.250366 5.4371 1.04054 4.03057 2.44707C2.62405 3.85359 1.83387 5.76124 1.83387 7.75037C1.83387 11.0635 1.0595 13.5985 0.539187 14.4947C0.406315 14.7226 0.335875 14.9815 0.33497 15.2452C0.334064 15.509 0.402726 15.7683 0.534029 15.9971C0.665333 16.2258 0.854636 16.4159 1.08285 16.5482C1.31106 16.6804 1.57011 16.7502 1.83387 16.7504H5.65981C5.83285 17.5971 6.29302 18.358 6.9625 18.9045C7.63198 19.451 8.46966 19.7495 9.33387 19.7495C10.1981 19.7495 11.0358 19.451 11.7052 18.9045C12.3747 18.358 12.8349 17.5971 13.0079 16.7504H16.8339C17.0976 16.75 17.3565 16.6802 17.5846 16.5478C17.8127 16.4155 18.0018 16.2254 18.133 15.9967C18.2642 15.7679 18.3328 15.5087 18.3318 15.245C18.3309 14.9813 18.2605 14.7225 18.1276 14.4947ZM9.33387 18.2504C8.8687 18.2502 8.41501 18.1059 8.03525 17.8373C7.65548 17.5687 7.3683 17.1889 7.21325 16.7504H11.4545C11.2994 17.1889 11.0123 17.5687 10.6325 17.8373C10.2527 18.1059 9.79904 18.2502 9.33387 18.2504ZM1.83387 15.2504C2.55575 14.0091 3.33387 11.1329 3.33387 7.75037C3.33387 6.15907 3.96601 4.63294 5.09123 3.50773C6.21645 2.38251 7.74257 1.75037 9.33387 1.75037C10.9252 1.75037 12.4513 2.38251 13.5765 3.50773C14.7017 4.63294 15.3339 6.15907 15.3339 7.75037C15.3339 11.1301 16.1101 14.0063 16.8339 15.2504H1.83387Z" fill="black"/>
</svg>
`;

const redCircleXml = `<svg width="20" height="20" viewBox="-8 0 28 24" height="15" xmlns="http://www.w3.org/2000/svg">
<circle cx="10" cy="10" r="10" fill="red" />
</svg>`;

const Forum = () => {
  const forumPosts = api.discussion.getDiscussions.useQuery().data;
  return (
    <SafeAreaView className="">
      <ScrollView>
        <Stack.Screen options={{ title: "Forum", headerShown: false }} />

        <View className="mt-10 flex-1 items-center justify-center">
          <Text className=" font-display-sm">Forum</Text>
        </View>
        <View className="ml-4 mr-4 mt-4 flex-1 items-center justify-center">
          <TabNav>
            <TabNav.Tab onPress={() => console.log("Tab 1 pressed")}>
              Feed
            </TabNav.Tab>
            <TabNav.Tab onPress={() => console.log("Tab 2 pressed")}>
              My Posts
            </TabNav.Tab>
            <TabNav.Tab onPress={() => console.log("Tab 3 pressed")}>
              <View className="relative">
                <SvgXml xml={xml} width={20} height={20} />
                <View className="absolute left-3.5 top-0 ">
                  <SvgXml xml={redCircleXml} width={10} height={10} />
                </View>
              </View>
            </TabNav.Tab>
          </TabNav>
        </View>
        <View className="mb-16">
          {forumPosts?.map((data) => (
            <View key={data.id} className="mt-2">
              <Discussion discussion={data} canEdit={false} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Forum;
