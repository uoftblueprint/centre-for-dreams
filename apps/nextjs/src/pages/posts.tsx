import React from "react";

import type { RouterOutputs } from "@cfd/api";

import { api } from "~/utils/api";
import Post from "../components/post";

type GetPostOutput = RouterOutputs["post"]["getPosts"][number];

function Posts() {
  const posts = api.post.getPosts.useQuery();
  return (
    <>{posts.data?.map((p: GetPostOutput) => <Post key={p.id} {...p} />)}</>
  );
}

export default Posts;
