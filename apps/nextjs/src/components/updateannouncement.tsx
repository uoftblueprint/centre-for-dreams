"use client";

import React, { useState } from "react";

// import { format } from "date-fns";
// import { CalendarIcon } from "lucide-react";
// import { useForm } from "react-hook-form";

// import { cn } from "~/lib/utils";
// import { api } from "~/utils/api";
// import type { RouterInputs } from "~/utils/api";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";

interface User {
  username: string;
  avatarUrl?: string; // Optional avatar URL
}

interface UpdateAnnouncementProps {
  user: User;
}

export default function UpdateAnnouncement({ user }: UpdateAnnouncementProps) {
  const [open, setOpen] = useState(false);

  const handleUpdateAnnouncement = () => {
    // Announcement logic here
    console.log(`Announcement posted by ${user.username}!`);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Open</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage
                  src={user.avatarUrl ?? "https://via.placeholder.com/40"} // Fallback avatar
                  alt={`@${user.username}`}
                />
                <AvatarFallback>
                  {user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <p>
                <strong>{user.username}</strong>
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="notify-people" />
              <Label htmlFor="notify-people">Notify People?</Label>
            </div>
          </div>
        </DialogHeader>

        <Textarea placeholder="Let everyone know! Update your announcement..." />

        <DialogFooter>
          <Button type="submit" onClick={handleUpdateAnnouncement}>
            Update Announcement
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
