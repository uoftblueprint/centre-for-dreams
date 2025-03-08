import React, { useEffect, useState } from "react";
import type { PostType } from "@prisma/client";

import NavBar from "~/components/navbar";
import { SkeletonCard } from "~/components/skeleton_card";
import { useCurrentUserInfo } from "~/hooks/user";
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
  const { data: allPosts, isLoading: isAllPostsLoading } =
    api.discussion.getDiscussions.useQuery<PostData[]>();
  const { data: userPosts, isLoading: isUserPostsLoading } =
    api.discussion.getDiscussionsByUser.useQuery<PostData[]>();

  const userData = useCurrentUserInfo();

  const [myPostToggle, setMyPostToggle] = useState(false);
  const [displayedPosts, setDisplayedPosts] = useState<PostData[]>([]);

  useEffect(() => {
    if (allPosts) {
      setDisplayedPosts(allPosts);
    }
  }, [allPosts]);

  const setMyPosts = () => {
    const userId = userData.data?.userId;
    if (userId && userPosts) {
      const filteredPosts = userPosts.filter((post) => post.userId === userId);
      setDisplayedPosts(filteredPosts);
    }
    setMyPostToggle(true);
  };

  const setAllPosts = () => {
    if (allPosts) {
      setDisplayedPosts(allPosts);
    }
    setMyPostToggle(false);
  };

  return (
    <div className="relative flex">
      <NavBar />
      <div className="flex w-full flex-col items-center pt-6">
        <ToggleButton
          word="Posts"
          isToggled={myPostToggle}
          setAll={setAllPosts}
          setMy={setMyPosts}
        />

        {(isAllPostsLoading || isUserPostsLoading) && (
          <>
            {Array.from({ length: 5 }, (_, index) => (
              <div key={index} className="mt-4 w-5/6">
                <SkeletonCard />
              </div>
            ))}
          </>
        )}

        {!isAllPostsLoading && !isUserPostsLoading && displayedPosts.length > 0
          ? displayedPosts.map((post, i) => <Post key={i} {...post} />)
          : !isAllPostsLoading &&
            !isUserPostsLoading && (
              <p className="text-gray-500">No posts available.</p>
            )}
      </div>
    </div>
  );
}

export default Posts;
