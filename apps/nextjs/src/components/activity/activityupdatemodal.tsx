import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { cn } from "~/lib/utils";
import { api } from "~/utils/api";
import type { RouterInputs } from "~/utils/api";
import PencilIcon from "../icons/pencilicon";
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

export type UpdateAnnouncement = RouterInputs["activity"]["updateActivity"];

export default function ActivityUpdateModal({ id }: { id: number }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | null>();
  const [startTime, setStartTime] = useState<Date | null>();

  const { register, handleSubmit, reset } = useForm<UpdateAnnouncement>();

  const activity = api.activity.getActivity.useQuery({ id: id });

  const [isSuccess, setIsSuccess] = useState(false);

  const { mutate: updateActivity } = api.activity.updateActivity.useMutation({
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

  const onSubmit = (data: UpdateAnnouncement) => {
    data.day = date ? new Date(date) : new Date();
    data.startTime = startTime ?? new Date();
    data.durationMinutes = parseInt(
      data.durationMinutes ? data.durationMinutes.toString() : "15",
      10,
    );
    updateActivity({
      id: data.id,
      name: data.name,
      location: data.location,
      day: data.day,
      startTime: data.startTime,
      durationMinutes: data.durationMinutes,
      leader: data.leader,
    });
  };

  useEffect(() => {
    if (activity.data) {
      reset(activity.data);
      const utcDate = new Date(activity.data.day);
      setDate(
        new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000),
      );
      setStartTime(activity.data.startTime);
    }
  }, [activity.data, reset, setOpen]);

  return (
    activity.data && (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            {<PencilIcon />}
          </Button>
        </DialogTrigger>

        <DialogContent className="p-8 font-semibold">
          <DialogHeader>
            <DialogTitle>Update Activity</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
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
              <Button type="submit">Update</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    )
  );
}
