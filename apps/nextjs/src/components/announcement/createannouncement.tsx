"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { cn } from "~/lib/utils";
import { api } from "~/utils/api";
import type { RouterInputs } from "~/utils/api";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";

export function CreateAnnouncement() {
  const username = "shadcn"; // Replace with the actual username (and replace avatar with the actual avatar)

  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p>
                <strong>{username}</strong>
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="notify-people" />
              <Label htmlFor="notify-people">Notify People?</Label>
            </div>
          </div>
        </DialogHeader>
        <Textarea placeholder="Let everyone know! Write your announcement..." />
        <DialogFooter>
          <Button type="submit">Post Announcement</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
