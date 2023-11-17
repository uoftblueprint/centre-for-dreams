import React from "react";

import { api } from "~/utils/api";
import Post from "../components/post";

function Posts() {
  const posts = api.post.getPosts.useQuery();
  return <>{posts.data?.map((p) => <Post key={p.id} {...p} />)}</>;
}

export default Posts;
