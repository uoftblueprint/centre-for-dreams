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
    <div
      className="flex"
      style={{
        display: "flex",
        position: "absolute",
        width: "100%",
        top: "0px",
        bottom: "0px",
      }}
    >
      <div
        className="m-10 flex"
        style={{
          flexDirection: "column",
          background: "#EFF2FB",
          margin: "0",
          padding: "16px 40px",
          maxWidth: "40%",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
        }}
      >
        {isSignedIn ? "" : <SignInButton />}
        <UserButton afterSignOutUrl="/" showName />
        <nav style={{ display: "flex", flexDirection: "column" }}>
          <button
            style={{
              borderWidth: "1px",
              borderColor: "#2E4D90",
              borderRadius: "24px",
              padding: "8px",
              margin: "8px",
              backgroundColor: "#2E4D90",
              color: "#FFFFFF",
            }}
          >
            <a href="/posts/">Forum</a>
          </button>
          <button
            style={{
              borderWidth: "1px",
              borderColor: "#2E4D90",
              borderRadius: "24px",
              padding: "8px",
              margin: "8px",
            }}
          >
            <a href="/announcements/">Announcements</a>
          </button>
          <button
            style={{
              borderWidth: "1px",
              borderColor: "#2E4D90",
              borderRadius: "24px",
              padding: "8px",
              margin: "8px",
            }}
          >
            <a href="/absences/">Absentees</a>
          </button>
          <button
            style={{
              borderWidth: "1px",
              borderColor: "#2E4D90",
              borderRadius: "24px",
              padding: "8px",
              margin: "8px",
            }}
          >
            <a href="/activities/">Calendar</a>
          </button>
          <button
            style={{
              borderWidth: "1px",
              borderColor: "#2E4D90",
              borderRadius: "24px",
              padding: "8px",
              margin: "8px",
            }}
          >
            <a href="/activities/">Invite New User</a>
          </button>
        </nav>
        <button
          style={{
            borderWidth: "1px",
            borderColor: "#2E4D90",
            borderRadius: "24px",
            padding: "8px",
            margin: "8px",
          }}
        >
          <a href="/activities/">Create New</a>
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          width: "-webkit-fill-available",
          paddingTop: "24px",
        }}
      >
        <div
          style={{
            borderWidth: "1px",
            borderColor: "#2E4D90",
            borderRadius: "24px",
            margin: "8px",
            width: "max-content",
            alignSelf: "center",
          }}
        >
          {myPostToggle ? (
            <>
              <button
                style={{
                  borderRadius: "24px",
                  padding: "8px 40px 8px 40px",
                }}
                onClick={setAllPosts}
              >
                All Posts
              </button>
              <button
                style={{
                  borderRadius: "24px",
                  padding: "8px 40px 8px 40px",
                  backgroundColor: "#2E4D90",
                  color: "#FFFFFF",
                }}
                onClick={setMyPosts}
              >
                My Posts
              </button>
            </>
          ) : (
            <>
              <button
                style={{
                  borderRadius: "24px",
                  padding: "8px 40px 8px 40px",
                  backgroundColor: "#2E4D90",
                  color: "#FFFFFF",
                }}
                onClick={setAllPosts}
              >
                All Posts
              </button>
              <button
                style={{ borderRadius: "24px", padding: "8px 40px 8px 40px" }}
                onClick={setMyPosts}
              >
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
