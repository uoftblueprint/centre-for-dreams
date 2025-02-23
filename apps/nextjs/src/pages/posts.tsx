import React, { useState } from "react";

import NavBar from "~/components/navbar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { api } from "~/utils/api";
import Post from "../components/post";

function Posts() {
  const posts = api.discussion.getDiscussions.useQuery();
  const userPosts = api.discussion.getDiscussionsByUser.useQuery();

  const [myPostToggle, setMyPostToggle] = useState(true);

  const setMyPosts = () => {
    setMyPostToggle(true);
  };

  const setAllPosts = () => {
    setMyPostToggle(false);
  };

  return (
    <div className="absolute bottom-0 top-0 flex w-full">
      <NavBar />
      <div className="flex w-full flex-col items-center pt-6">
        <div className="m-2 w-max self-center rounded-3xl border border-[#2E4D90]">
          {myPostToggle ? (
            <>
              <button className="rounded-3xl px-10 py-2" onClick={setAllPosts}>
                All Posts
              </button>
              <button
                className="rounded-3xl bg-[#2E4D90] px-10 py-2 text-white"
                onClick={setMyPosts}
              >
                My Posts
              </button>
            </>
          ) : (
            <>
              <button
                className="rounded-3xl bg-[#2E4D90] px-10 py-2 text-white"
                onClick={setAllPosts}
              >
                All Posts
              </button>
              <button className="rounded-3xl px-10 py-2" onClick={setMyPosts}>
                My Posts
              </button>
            </>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-3xl bg-[#2E4D90] px-4 py-2 text-white">
              Create New
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" className="min-w-[160px]">
            <DropdownMenuItem>Forum Post</DropdownMenuItem>
            <DropdownMenuItem>Announcement</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {myPostToggle
          ? userPosts.data?.map((p) => {
              // get user name from id and pass it in
              return <Post key={p.id} {...p} />;
            })
          : posts.data?.map((p) => {
              // get user name from id and pass it in
              return <Post key={p.id} {...p} />;
            })}
      </div>
    </div>
  );
}

export default Posts;
