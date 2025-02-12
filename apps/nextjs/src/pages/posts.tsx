import React, { useState } from "react";

import NavBar from "~/components/navbar";
import { api } from "~/utils/api";
import Post from "../components/post";

function Posts() {
  const { data: posts } = api.discussion.getDiscussions.useQuery({
    page: 1,
    pageSize: 10,
  });
  const { data: userPosts } = api.discussion.getDiscussionsByUser.useQuery({
    page: 1,
    pageSize: 10,
  });

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
        {myPostToggle
          ? userPosts?.posts?.map((p) => {
              // get user name from id and pass it in
              return <Post key={p.id} {...p} />;
            })
          : posts?.posts?.map((p) => {
              // get user name from id and pass it in
              return <Post key={p.id} {...p} />;
            })}
      </div>
    </div>
  );
}

export default Posts;
