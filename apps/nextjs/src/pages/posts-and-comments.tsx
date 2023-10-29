import React from "react";

import { api } from "~/utils/api";
import Post from "../components/post";

function PostsAndComments() {
  const posts = api.post.getPosts.useQuery().data!;
  const allComments = api.comment.getComments.useQuery().data!;

  console.log(posts);

  return (
    <>
      {posts?.map((data) => (
        <Post
          key={data.id}
          data={data}
          comments={allComments.filter((c) => c.postId === data.id)}
        ></Post>
      ))}
    </>
  );
}

export default PostsAndComments;
