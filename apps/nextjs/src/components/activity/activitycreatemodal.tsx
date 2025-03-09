"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { cn } from "~/lib/utils";
import { api } from "~/utils/api";
import type { RouterInputs } from "~/utils/api";
import PlusIcon from "../icons/plusicon";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export type CreateAnnouncement = RouterInputs["activity"]["createActivity"];

interface CreateActivity {
  name: string;
  location: string;
  day: Date;
  startTime: Date;
  durationMinutes: number;
  leader: string;
}

export default function ActivityCreateModal() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | null>();
  const [startTime, setStartTime] = useState<Date | null>(new Date());

  const { register, handleSubmit, reset } = useForm<CreateActivity>();

  const [isSuccess, setIsSuccess] = useState(false);

  const { mutate: createActivity } = api.activity.createActivity.useMutation({
    onSuccess: () => {
      setIsSuccess(true);
      reset();
      setDate(null);
      setStartTime(null);
      setOpen(false);
    },
  });

  const handleInputChange = () => {
    if (isSuccess) {
      setIsSuccess(false);
      reset();
    }
  };

  const onSubmit = (data: CreateActivity) => {
    data.day = date ?? new Date();
    data.startTime = startTime ?? new Date();
    data.durationMinutes = parseInt(data.durationMinutes.toString(), 10);
    createActivity(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="rounded-[24px] bg-[#2E4D90]">
          <PlusIcon />
          Create
        </Button>
      </DialogTrigger>

      <DialogContent className="p-8 font-semibold">
        <DialogHeader>
          <DialogTitle>Create Activity</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Title</Label>
            <Input
              required
              {...register("name", { required: true })}
              name="name"
              onChange={handleInputChange}
              id="name"
              type="text"
              className="h-full w-full bg-slate-200 p-3 font-normal hover:outline-none focus:bg-gray-100 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-2/5">
              <Label htmlFor="day">Date</Label>
              <Popover>
                <PopoverTrigger
                  asChild
                  className="h-full w-full rounded-md border-none bg-slate-200 p-3 font-normal focus:bg-gray-100 focus:outline-none"
                  id="day"
                >
                  <Button
                    variant={"outline"}
                    className={cn(
                      "justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date ?? new Date()}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex gap-2 lg:w-3/5">
              <div className="flex w-full flex-col gap-2">
                <Label htmlFor="startTime">Time</Label>
                <input
                  onChange={(e) => {
                    const [hours, minutes] = e.target.value
                      .split(":")
                      .map(Number);
                    const time = new Date();
                    time.setUTCHours(hours ?? 0, minutes, 0, 0);
                    setStartTime(time);
                  }}
                  value={
                    startTime
                      ? new Date(
                          startTime.toLocaleString("en-US", {
                            timeZone: "America/New_York",
                          }),
                        )
                          .toISOString()
                          .substring(11, 16)
                      : ""
                  }
                  id="startTime"
                  required
                  name="startTime"
                  type="time"
                  className="w-full cursor-pointer rounded-md bg-slate-200 p-3 text-sm font-normal hover:bg-slate-200/70 focus:bg-gray-100 focus:outline-none"
                />
              </div>
              <div className="flex w-full flex-col gap-2">
                <Label htmlFor="durationMinutes">Duration</Label>
                <Input
                  {...register("durationMinutes", { required: true })}
                  id="durationMinutes"
                  name="durationMinutes"
                  required
                  min={15}
                  type="number"
                  className="h-full w-full cursor-pointer rounded-md bg-slate-200 p-3 text-sm font-normal hover:bg-slate-200/70 focus:bg-gray-100 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Input
              {...register("location", { required: true })}
              id="location"
              onChange={handleInputChange}
              required
              name="location"
              type="text"
              className="w- rounded-md bg-slate-200 p-3 text-sm font-normal hover:bg-slate-200/70 focus:bg-gray-100 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="leader">Leader</Label>
            <Input
              {...register("leader", { required: true })}
              id="leader"
              onChange={handleInputChange}
              required
              name="leader"
              type="text"
              className="w- rounded-md bg-slate-200 text-sm font-normal hover:bg-slate-200/70 focus:bg-gray-100 focus:outline-none"
            />
          </div>
          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
