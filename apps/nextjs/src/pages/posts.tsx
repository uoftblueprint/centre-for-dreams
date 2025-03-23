import React, { useEffect, useState } from "react";

import type { RouterOutputs } from "@cfd/api";

import NavBar from "~/components/navbar";
import { SkeletonCard } from "~/components/skeleton_card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { api } from "~/utils/api";
import Post from "../components/post";
import ToggleButton from "../components/ToggleButton";

type PaginatedDiscussions = RouterOutputs["discussion"]["getDiscussions"];
type DiscussionPost = PaginatedDiscussions["posts"][number];

function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState({
    userPages: 1,
    allPages: 1,
  });
  const [paginationButtons, setPaginationButtons] = useState<
    (number | string)[]
  >([]);

  const { data: allPosts, isLoading: isAllPostsLoading } =
    api.discussion.getDiscussions.useQuery<PaginatedDiscussions>({
      page: currentPage,
      pageSize: 10,
    });

  const { data: userPosts, isLoading: isUserPostsLoading } =
    api.discussion.getDiscussionsByUser.useQuery<PaginatedDiscussions>({
      page: currentPage,
      pageSize: 10,
    });

  const [myPostToggle, setMyPostToggle] = useState(false);

  useEffect(() => {
    setTotalPages({
      allPages: allPosts?.totalPages ?? 1,
      userPages: userPosts?.totalPages ?? 1,
    });
  }, [allPosts, userPosts]);

  useEffect(() => {
    const pageCount = myPostToggle ? totalPages.userPages : totalPages.allPages;

    const generatePaginationButtons = (): (number | string)[] => {
      if (pageCount <= 5) {
        return Array.from({ length: pageCount }, (_, i) => i + 1);
      }

      const buttons: (number | string)[] = [];
      if (currentPage > 3) buttons.push(1, "...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(pageCount - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        buttons.push(i);
      }

      if (currentPage < pageCount - 2) buttons.push("...", pageCount);

      return buttons;
    };

    setPaginationButtons(generatePaginationButtons());
  }, [totalPages, myPostToggle, currentPage]);

  const setMyPosts = () => {
    setMyPostToggle(true);
    setTotalPages((prev) => ({
      ...prev,
      userPages: userPosts?.totalPages ?? 1,
    }));
    setCurrentPage(1);
  };

  const setAllPosts = () => {
    setMyPostToggle(false);
    setTotalPages((prev) => ({
      ...prev,
      allPages: allPosts?.totalPages ?? 1,
    }));
    setCurrentPage(1);
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
        {!isAllPostsLoading &&
          !isUserPostsLoading &&
          (myPostToggle
            ? userPosts?.posts.map((p: DiscussionPost) => {
                return <Post key={p.id} {...p} isEditable={true} />;
              })
            : allPosts?.posts.map((p: DiscussionPost) => {
                return <Post key={p.id} {...p} isEditable={false} />;
              }))}
        <Pagination
          key={totalPages.allPages + totalPages.userPages}
          className="mb-4 mt-4"
        >
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                isActive={!(currentPage === 1)}
                className={
                  currentPage <= 1
                    ? "pointer-events-none opacity-50"
                    : undefined
                }
              />
            </PaginationItem>

            {paginationButtons.map((page, index) => (
              <PaginationItem key={index}>
                {page === "..." ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    href="#"
                    isActive={currentPage === page}
                    onClick={() => setCurrentPage(page as number)}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => setCurrentPage(currentPage + 1)}
                isActive={
                  !(
                    currentPage ===
                    (myPostToggle ? totalPages.userPages : totalPages.allPages)
                  )
                }
                className={
                  currentPage ===
                  (myPostToggle ? totalPages.userPages : totalPages.allPages)
                    ? "pointer-events-none opacity-50"
                    : undefined
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default Posts;
