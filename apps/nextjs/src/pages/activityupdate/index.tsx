"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { Activity } from "@prisma/client";

import "react-datepicker/dist/react-datepicker.css";

import { api } from "~/utils/api";
import styles from "../../styles/activityupdate.module.css";

const DatePicker = dynamic(() => import("react-datepicker"), {
  ssr: false,
});

export default function ActivityUpdatePage() {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<Activity>({
    id: 0,
    name: "",
    day: new Date(),
    startTime: new Date(),
    durationMinutes: 15,
    leader: "",
    location: "",
  });

  const activities = api.activity.getDailySchedule.useQuery({
    day: date.toISOString().slice(0, 10),
  });
  const { mutate: updateActivity } = api.activity.updateActivity.useMutation({
    onSuccess: () => {
      setIsSuccess(true);
      setIsLoading(false);
      setSelectedActivity(null);
    },
  });

  const handleDateSelect = (date: Date) => {
    setDate(date);
    setSelectedActivity(null);
  };

  const handleActivitySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value);
    const selected = activities.data?.find(
      (activity) => activity.id === selectedId,
    );

    if (selected) {
      setSelectedActivity(selected);
      setFormData({
        ...selected,
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    formData.durationMinutes = Number(formData.durationMinutes);
    updateActivity(formData);
  };

  return (
    <div className="mx-6 my-32 flex flex-col md:mx-16 lg:mx-64">
      <h1 className="text-3xl font-bold">Update Activities</h1>
      <hr className="mt-8"></hr>
      <div className="mx-6 mt-12 flex flex-col gap-4 md:mx-12 xl:mx-24">
        <form className="flex flex-col gap-2 xl:w-3/4">
          <label htmlFor="calendar" className="text-lg font-semibold">
            Date
          </label>

          <DatePicker
            id="calendar"
            selected={date}
            onChange={handleDateSelect}
            className={styles.form_input}
          />
          <p className="text-sm italic text-gray-400">
            Choose a date to view a list of activities scheduled for that day.
          </p>
        </form>

        {date && (
          <form className="flex flex-col gap-2 xl:w-3/4">
            <label htmlFor="activity" className="text-lg font-semibold">
              Activity
            </label>
            <select
              id="options"
              value={selectedActivity?.id ?? ""}
              onChange={handleActivitySelect}
              className={styles.form_input}
            >
              <option value="" disabled>
                Select an activity
              </option>
              {activities.data?.map((activity: Activity) => (
                <option key={activity.id} value={activity.id}>
                  {activity.name}
                </option>
              ))}
            </select>
            <p className="text-sm italic text-gray-400">
              Select an activity to update.
            </p>
          </form>
        )}

        {selectedActivity && (
          <form onSubmit={handleSubmit} className="space-y-4 xl:w-3/4">
            <hr></hr>
            <div className="space-y-2">
              <label htmlFor="name" className="text-lg font-semibold">
                Activity Title
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={styles.form_input}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="day" className="text-lg font-semibold">
                Activity Date
              </label>

              <DatePicker
                id="day"
                name="day"
                selected={
                  new Date(
                    formData.day.getTime() +
                      formData.day.getTimezoneOffset() * 60000,
                  )
                }
                onChange={(date) =>
                  setFormData({
                    ...formData,
                    ["day"]: date instanceof Date ? date : new Date(),
                  })
                }
                className={styles.form_input}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="startTime" className="text-lg font-semibold">
                Start Time
              </label>
              <DatePicker
                id="startTime"
                name="startTime"
                selected={formData.startTime}
                showTimeSelect
                showTimeSelectOnly
                timeCaption="Time"
                dateFormat="h:mm aa"
                timeIntervals={15}
                onChange={(time) =>
                  setFormData({
                    ...formData,
                    ["startTime"]: time instanceof Date ? time : new Date(),
                  })
                }
                className={styles.form_input}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="durationMinutes"
                className="text-lg font-semibold"
              >
                Duration (minutes)
              </label>
              <input
                id="durationMinutes"
                name="durationMinutes"
                type="number"
                min={15}
                value={Number(formData.durationMinutes)}
                onChange={handleInputChange}
                required
                className={styles.form_input}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="leader" className="text-lg font-semibold">
                Leader
              </label>
              <input
                id="leader"
                name="leader"
                type="text"
                value={formData.leader}
                onChange={handleInputChange}
                required
                className={styles.form_input}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="text-lg font-semibold">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleInputChange}
                required
                className={styles.form_input}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="rounded bg-blue-500 p-2 text-white"
            >
              {isLoading ? "Updating..." : "Update Activity"}
            </button>
          </form>
        )}

        {isSuccess && (
          <div className="absolute left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-black/40">
            <div className="relative flex w-fit flex-col items-center justify-center gap-5 rounded-md bg-white px-16 py-8 text-center shadow-sm">
              <h1 className="text-3xl font-bold">Success!</h1>
              <p>The activity has been updated.</p>
              <button
                className="w-full rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 p-3 text-sm text-white duration-100 hover:scale-105 active:scale-95"
                onClick={() => setIsSuccess(false)}
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
