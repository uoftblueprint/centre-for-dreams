import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { cn } from "~/lib/utils";
import { api } from "~/utils/api";
import type { RouterInputs } from "~/utils/api";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export type CreateAnnouncement = RouterInputs["activity"]["createActivity"];

const ActivityCreateModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [date, setDate] = useState<Date | null>();
  const [startTime, setStartTime] = useState<Date | null>();

  const { register, handleSubmit, reset } = useForm<CreateAnnouncement>();

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

  const onSubmit = (data: CreateAnnouncement) => {
    data.day = date ?? new Date();
    data.startTime = startTime ?? new Date();
    data.durationMinutes = parseInt(data.durationMinutes.toString(), 10);
    createActivity({
      name: data.name,
      location: data.location,
      day: data.day,
      startTime: data.startTime,
      durationMinutes: data.durationMinutes,
      leader: data.leader,
    });
  };

  useEffect(() => {
    setDate(new Date());
  }, []);

  return (
    <div
      className={`fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-black/80 ${
        open ? "" : "invisible"
      }`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <form className="m-12 flex w-full min-w-[320px] flex-col gap-3 rounded-lg border-b-2 bg-white p-6 font-semibold max-sm:text-sm sm:w-2/3 sm:p-12 lg:w-1/2 xl:w-2/5">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Title</label>
          <input
            required
            {...register("name", { required: true })}
            name="name"
            onChange={handleInputChange}
            id="name"
            type="text"
            className="rounded-md bg-slate-200 p-3 text-sm font-normal hover:bg-slate-200/70 focus:bg-gray-100 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-2/5">
            <label htmlFor="day">Date</label>
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

          <div className="flex w-full gap-2">
            <div className="flex w-full flex-col gap-2">
              <label htmlFor="startTime">Time</label>
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
              <label htmlFor="durationMinutes">Duration (Minutes)</label>
              <input
                {...register("durationMinutes", { required: true })}
                id="durationMinutes"
                name="durationMinutes"
                required
                min={15}
                type="number"
                className="w-full cursor-pointer rounded-md bg-slate-200 p-3    text-sm font-normal hover:bg-slate-200/70 focus:bg-gray-100 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="location">Location</label>
          <input
            {...register("location", { required: true })}
            id="location"
            onChange={handleInputChange}
            required
            name="location"
            type="text"
            className="w- rounded-md bg-slate-200 p-3 text-sm    font-normal hover:bg-slate-200/70 focus:bg-gray-100 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="leader">Leader</label>
          <input
            {...register("leader", { required: true })}
            id="leader"
            onChange={handleInputChange}
            required
            name="leader"
            type="text"
            className="w- rounded-md bg-slate-200 p-3 text-sm    font-normal hover:bg-slate-200/70 focus:bg-gray-100 focus:outline-none"
          />
        </div>

        <div className="flex gap-3 self-end text-center text-xs sm:text-sm">
          <button
            className="w-fit rounded-full bg-gray-200 px-5 py-3 font-normal text-black sm:px-10"
            type="button"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            className="w-fit rounded-full bg-black px-3 py-3 font-normal text-white sm:px-5"
            type="submit"
          >
            Create Activity
          </button>
        </div>
      </form>
    </div>
  );
};

export default ActivityCreateModal;
