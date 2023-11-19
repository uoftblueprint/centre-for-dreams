import React from "react";

import type { RouterOutputs } from "@cfd/api";

import { api } from "~/utils/api";
import Post from "../components/post";

type GetDiscussionOutput =
  RouterOutputs["discussion"]["getDiscussions"][number];

function Posts() {
  const posts = api.discussion.getDiscussions.useQuery();
  return (
    <>
      {posts.data?.map((p: GetDiscussionOutput) => <Post key={p.id} {...p} />)}
    </>
  );
}

export default Posts;
