import { Image, Text, View } from "react-native";
import type { ImageSourcePropType } from "react-native";

import type { RouterOutputs } from "~/utils/api";

type GetAnnouncementOutput =
  RouterOutputs["announcement"]["getAnnouncements"][number];

interface AnnouncementTileProps {
  announcement: GetAnnouncementOutput;
}

const AnnouncementTile: React.FC<AnnouncementTileProps> = ({
  announcement: { title, createdAt },
}) => {
  const createdBy = "Placeholder User";
  const userImageSrc: ImageSourcePropType = {
    uri: "https://csncollision.com/wp-content/uploads/2019/10/placeholder-circle.png",
  };
  const titleImageSrc: ImageSourcePropType = {
    uri: "https://dummyimage.com/640x360/fff/aaa",
  };

  const createdAtFormatted = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(createdAt);

  return (
    <View className="flex flex-row items-center justify-evenly rounded-xl bg-gray-200 bg-opacity-40 py-4">
      <View className="flex-[0.3] items-center">
        <Image
          source={titleImageSrc}
          accessibilityLabel={`Announcement title image`}
          className="h-20 w-20"
          resizeMode="stretch"
        />
      </View>
      <View className="bg-pink flex-[0.7] justify-evenly gap-3">
        <Text className="flex-wrap font-serif text-base font-semibold">
          {title}
        </Text>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-0.5">
            <Image
              source={userImageSrc}
              accessibilityLabel={`${createdBy}'s picture`}
              resizeMode="cover"
              className="outline-3 h-4 w-4 outline-black"
            />
            <Text className="text-base">{createdBy}</Text>
          </View>
          <Text className="flex-[0.8] text-base">{createdAtFormatted}</Text>
        </View>
      </View>
    </View>
  );
};

export default AnnouncementTile;
