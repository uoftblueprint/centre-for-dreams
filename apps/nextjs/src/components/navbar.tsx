import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SignInButton, useAuth, UserButton } from "@clerk/nextjs";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";

import CreatePost from "./createpost";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";

export default function NavBar() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const navItems = [
    { href: "/posts", label: "Forum" },
    { href: "/announcements", label: "Announcements" },
    { href: "/absences", label: "Absentees" },
    { href: "/activities", label: "Calendar" },
    { href: "/inviteuser", label: "Invite New User" },
  ];

  return (
    <aside className="sticky top-0 flex h-screen w-[280px] flex-col justify-between bg-[#EFF2FB] p-6 shadow-md">
      <div className="h-[40px]">
        {!isSignedIn && <SignInButton />}
        {isSignedIn && <UserButton afterSignOutUrl="/posts" showName />}
      </div>

      <NavigationMenu>
        <NavigationMenuList className="mt-4 flex flex-col gap-2">
          {navItems.map((payload, i) => (
            <NavigationMenuItem key={i}>
              <Link href={payload.href} passHref>
                <Button
                  className={`w-full rounded-lg p-3 text-left shadow-md transition-colors ${
                    router.pathname === payload.href
                      ? "bg-p-20 text-white"
                      : "bg-p-40 hover:bg-p-30"
                  }`}
                >
                  {payload.label}
                </Button>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      {router.pathname === "/posts" ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create New</Button>
          </DialogTrigger>
          <CreatePost></CreatePost>
        </Dialog>
      ) : (
        <Button variant="ghost"></Button>
      )}
    </aside>
  );
}
