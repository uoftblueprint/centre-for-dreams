import { Image, Text, View } from "react-native";
import type { ImageSourcePropType } from "react-native";

import type { RouterOutputs } from "~/utils/api";

type GetAnnouncementOutput =
  RouterOutputs["announcement"]["getAnnouncements"][number];

interface AnnouncementCardProps {
  announcement: GetAnnouncementOutput;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  announcement: { title, createdAt },
}) => {
  const createdBy = "Michelle C.";
  const userImageSrc: ImageSourcePropType = {
    uri: "https://csncollision.com/wp-content/uploads/2019/10/placeholder-circle.png",
  };
  const titleImageSrc: ImageSourcePropType = {
    uri: "https://s3-alpha-sig.figma.com/img/f246/82fa/befee9f4978b6cc8b351a2f3b81d456d?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fPv06M5fmTfRNUsxZoeLLUUsdCK2ISw6gt6qir1vkJp-xIWN6mKFegXWCWTKTfFvQYHMPPCxKRT7-vLH0NkKPm~Nj2s~AFwHgXunypaS0nhLeecpbEBMBSysfkwFRjN5vK-dUSiGArjau-DQ6v262W6bCg-4L85Ykj5-4Ii0Bu0scVsNjSSRkM1r00OzJChy-hpgsHGuT-V3DwT0Pta~Hs2KT44TM3p1IK3tIgIZuvc6hoQJXmPCctSm1EV1Oxhs~hARLqbkUtVDGxFbUAoew0xjRC1B1Xc7qZEB-v0HFYEC0gTv9SQx9GdswPtJYFvb1BgVl1alkaWpV7ZGTJujWA__",
  };

  const createdAtFormatted = new Intl.DateTimeFormat("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  }).format(createdAt);

  return (
    <View className="border-nv-80 flex flex-row items-center justify-start rounded-xl border py-[10px]">
      <View className="flex-[0.3] items-center">
        <Image
          source={titleImageSrc}
          accessibilityLabel={`Announcement title image`}
          className="h-14 w-14"
          resizeMode="cover"
        />
      </View>
      <View className="flex-[0.7] gap-4 p-4 pl-0">
        <Text
          numberOfLines={1}
          className="text-base font-medium tracking-[0.15px]"
        >
          {title}
        </Text>
        <View className="flex-row justify-between">
          <View className="flex-row items-center gap-[5px]">
            <Image
              source={userImageSrc}
              accessibilityLabel={`${createdBy}'s picture`}
              resizeMode="cover"
              className="outline-3 h-5 w-5 outline-black"
            />
            <Text className="text-sm">{createdBy}</Text>
          </View>
          <Text className="text-sm">{createdAtFormatted}</Text>
        </View>
      </View>
      <View className="w-1 flex-[0.05]"></View>
    </View>
  );
};

export default AnnouncementCard;
