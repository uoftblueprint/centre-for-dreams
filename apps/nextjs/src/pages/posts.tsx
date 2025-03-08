import React, { useState } from "react";
import type { PostType } from "@prisma/client";

import NavBar from "~/components/navbar";
import { api } from "~/utils/api";
import Post from "../components/post";
import ToggleButton from "../components/ToggleButton";

interface PostData {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  userId: number;
  images: string[];
  postType: PostType;
  comments: {
    id: number;
    userId: number;
    createdAt: Date;
    postId: number;
    text: string;
  }[];
  contents: string | null;
}

function Posts() {
  const posts = api.discussion.getDiscussions.useQuery<PostData[]>();
  const userPosts = api.discussion.getDiscussionsByUser.useQuery<PostData[]>();

  const [myPostToggle, setMyPostToggle] = useState(true);

  const setMyPosts = () => {
    setMyPostToggle(true);
  };

  const setAllPosts = () => {
    setMyPostToggle(false);
  };

  return (
    <div className="relative flex">
      <NavBar></NavBar>
      <div className="flex w-full flex-col items-center pt-6">
        <ToggleButton
          word="Posts"
          isToggled={myPostToggle}
          setAll={setAllPosts}
          setMy={setMyPosts}
        />
        {myPostToggle
          ? userPosts.data?.map((p: PostData) => {
              return <Post key={p.id} {...p} />;
            })
          : posts.data?.map((p: PostData) => {
              return <Post key={p.id} {...p} />;
            })}
      </div>
    </div>
  );
}

export default Posts;
