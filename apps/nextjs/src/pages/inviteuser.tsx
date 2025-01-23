import React from "react";
import { SignInButton, useAuth, UserButton } from "@clerk/nextjs";

export default function InviteUser() {
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
            <a href="/inviteuser/">Invite New User</a>
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
      <div style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          width: "-webkit-fill-available",
          paddingTop: "24px",
        }}>
        <form style={{display: "flex", justifyContent: "center"}}>
          <div style={{display: "flex", flexDirection: "column", width: "50%", justifyContent: "center"}}>
          <label htmlFor="email" style={{color: "#000000", fontSize: "16px"}}>Email</label>
          <input type="text" id="email" name="email" style={{padding: "4px", backgroundColor: "#EFF2FB", borderRadius: "10px"}}/>
          </div>
        </form>
      </div>
    </div>
  );
}