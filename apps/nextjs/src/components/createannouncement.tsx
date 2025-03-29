import { PostType } from "types/types";

import PostEditing from "./postediting";

export default function CreateAnnouncement() {
  return (
    <PostEditing
      postType={PostType.Announcement}
      finalButtonName="Create Announcement"
    />
  );
}
