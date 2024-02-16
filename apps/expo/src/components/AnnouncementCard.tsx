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
  // TODO: replace with actual information when endpoint is updated
  const createdBy = "Michelle C.";
  const userImageSrc: ImageSourcePropType = {
    uri: "https://csncollision.com/wp-content/uploads/2019/10/placeholder-circle.png",
  };
  const titleImageSrc: ImageSourcePropType = {
    uri: "https://i.ibb.co/dQCWCSQ/media.png",
  };

  const createdAtFormatted = new Intl.DateTimeFormat("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  }).format(createdAt);

  return (
    <View className="border-nv-80 bg-p-95 flex flex-row items-center justify-start rounded-xl border py-[10px]">
      <View className="flex-[0.3] items-center">
        <Image
          source={titleImageSrc}
          accessibilityLabel={`Announcement title image`}
          className="h-14 w-14"
          resizeMode="cover"
        />
      </View>
      <View className="flex-[0.7] gap-4 p-4 pl-0">
        <Text numberOfLines={1} className="font-title-medium">
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
            <Text className="font-body-m">{createdBy}</Text>
          </View>
          <Text className="font-body-m">{createdAtFormatted}</Text>
        </View>
      </View>
      <View className="w-1 flex-[0.05]" />
    </View>
  );
};

export default AnnouncementCard;
