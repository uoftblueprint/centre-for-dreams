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
          <a href="/">Create New</a>
        </button>
      </div>
      <div style={{
          display: "flex",
          flexDirection: "column",
          width: "-webkit-fill-available",
          justifyContent: "center",
        }}>
        <div style={{fontSize: "32px", textAlign: "center", paddingBottom: "36px"}}>Invite new user</div>
        <form onSubmit={(e) => e.preventDefault()} style={{display: "flex", flexDirection: "column", justifyContent: "center", paddingBottom: "16px"}}>
          <div style={{display: "flex", flexDirection: "column", width: "50%", justifyContent: "center", margin: "0 auto", paddingBottom: "24px"}}>
            <label htmlFor="email" style={{color: "#000000", fontSize: "16px"}}>Email</label>
            <input type="text" id="email" style={{padding: "8px", backgroundColor: "#EFF2FB", borderRadius: "10px"}}/>
          </div>
          <div style={{display: "flex", flexDirection: "column", width: "50%", justifyContent: "center", margin: "0 auto", paddingBottom: "36px"}}>
            <label htmlFor="password" style={{color: "#000000", fontSize: "16px"}}>Temporary Password</label>
            <input type="password" id="password" style={{padding: "8px", backgroundColor: "#EFF2FB", borderRadius: "10px"}}/>
          </div>
          <button 
            style={{
              width: "50%", 
              backgroundColor: "#2E4D90",
              borderRadius: "24px",
              padding: "8px",
              margin: "0 auto",
              color: "#FFFFFF"
            }}
          >Invite</button>
        </form>
      </div>
    </div>
  );
}