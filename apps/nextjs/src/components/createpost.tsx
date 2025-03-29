/* My idea:
createpost (ticket 199) and updatepost (ticket 200) should both be children of postediting.
*/
import { PostType } from "types/types";

import PostEditing from "./postediting";

export default function CreatePost() {
  // Since this ticket only cares about static frontend display, I'll not implement
  // functions here.

  return (
    <PostEditing
      // title=""
      // content=""
      // images={[]}
      postType={PostType.Discussion}
      finalButtonName="Create Post"
      // finalFunc={onSubmit}
    />
  );
}
