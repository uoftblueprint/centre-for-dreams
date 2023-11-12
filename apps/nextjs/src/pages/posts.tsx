import React from "react";

import { api } from "~/utils/api";
import Post from "../components/post";

function Posts() {
  const posts = api.post.getPosts.useQuery();
  const allComments = api.comment.getComments.useQuery();

  return (
    <>
      {posts.data?.map((data) => (
        <Post
          key={data.id}
          data={data}
          comments={allComments.data!.filter((c) => c.postId === data.id)}
        ></Post>
      ))}
    </>
  );
}

export default Posts;
