import React, { useState } from "react";
import { SignInButton, useAuth, UserButton } from "@clerk/nextjs";
import type { PostType } from "@prisma/client";

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

  const { isSignedIn } = useAuth();

  return (
    <div className="absolute bottom-0 top-0 flex w-full">
      <div className="sticky top-0 flex max-w-[40%] flex-col justify-between bg-[#EFF2FB] p-4">
        {isSignedIn ? "" : <SignInButton />}
        <UserButton afterSignOutUrl="/" showName />
        <nav className="flex flex-col">
          <button className="m-2 rounded-3xl border border-[#2E4D90] bg-[#2E4D90] p-2 text-white">
            <a href="/posts/">Forum</a>
          </button>
          <button className="m-2 rounded-3xl border border-[#2E4D90] p-2">
            <a href="/announcements/">Announcements</a>
          </button>
          <button className="m-2 rounded-3xl border border-[#2E4D90] p-2">
            <a href="/absences/">Absentees</a>
          </button>
          <button className="m-2 rounded-3xl border border-[#2E4D90] p-2">
            <a href="/activities/">Calendar</a>
          </button>
          <button className="m-2 rounded-3xl border border-[#2E4D90] p-2">
            <a href="/activities/">Invite New User</a>
          </button>
        </nav>
        <button className="m-2 rounded-3xl border border-[#2E4D90] p-2">
          <a href="/activities/">Create New</a>
        </button>
      </div>
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
