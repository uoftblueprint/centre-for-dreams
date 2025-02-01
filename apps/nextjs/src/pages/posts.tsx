import React, { useState } from "react";
import { SignInButton, useAuth, UserButton } from "@clerk/nextjs";

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
