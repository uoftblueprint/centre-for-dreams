"use client";

import { useEffect, useState } from "react";
import type { Activity, Subactivity } from "@prisma/client";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const fetchActivities = (date: Date) => {
  console.log(date);
  console.log(new Date());
  return [
    {
      id: 1,
      name: "Morning Yoga",
      day: new Date(), // Example date
      startTime: new Date(), // Example start time
      durationMinutes: 60,
      leader: "Alice",
      location: "Gym",
      subactivities: [],
    },
    {
      id: 2,
      name: "Team Meeting",
      day: new Date(), // Example date
      startTime: new Date(), // Example start time
      durationMinutes: 30,
      leader: "Bob",
      location: "Conference Room",
      subactivities: [],
    },
  ].filter((activity) => {
    const activityDate = activity.day;

    // Compare year, month, and day
    return (
      activityDate.getFullYear() === date.getFullYear() &&
      activityDate.getMonth() === date.getMonth() &&
      activityDate.getDate() === date.getDate()
    );
  });
};

const updateActivity = async (activityData: Activity) => {
  // Simulating API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { success: true };
};

export default function EventUpdatePage() {
  const [date, setDate] = useState<Date>();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity>();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Activity>({
    id: 0,
    name: "",
    day: new Date(),
    startTime: new Date(),
    durationMinutes: 0,
    leader: "",
    location: "",
  });

  const handleDateSelect = (date: Date) => {
    setDate(date);
    setIsLoading(true);
    try {
      const fetchedActivities = fetchActivities(date);
      setActivities(fetchedActivities);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleActivitySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value);
    const selected = activities.find((activity) => activity.id === selectedId);

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
    const keyValue = name === "day" ? new Date(value) : value;
    setFormData({ ...formData, [e.target.name]: keyValue });
    console.log({ ...formData, [e.target.name]: keyValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="mx-64 my-32 flex flex-col">
      <h1 className="text-3xl font-bold">Update Events</h1>
      <h2 className="mt-2 text-gray-500">Update event and activities.</h2>
      <hr className="mt-8"></hr>
      <div className="mx-24 mt-12 flex flex-col gap-4">
        <form className="flex w-2/3 flex-col gap-2">
          <label htmlFor="calendar" className="text-lg font-semibold">
            Date
          </label>

          <DatePicker
            id="calendar"
            selected={date}
            placeholderText="Select a date"
            isClearable={true}
            onChange={handleDateSelect}
            className="block w-full appearance-none rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 pr-8 leading-tight text-gray-700 transition duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>

        {date && (
          <form className="flex flex-col gap-2">
            <label htmlFor="activity" className="text-lg font-semibold">
              Activity
            </label>
            <select
              id="options"
              value={selectedActivity?.id ?? ""}
              onChange={handleActivitySelect}
              className="block w-2/3 appearance-none rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 pr-8 leading-tight text-gray-700 transition duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select an option
              </option>
              {activities.map((activity) => (
                <option key={activity.id} value={activity.id}>
                  {activity.name}
                </option>
              ))}
            </select>
          </form>
        )}

        {selectedActivity && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-lg font-semibold">
                Event Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="block w-2/3 appearance-none rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 pr-8 leading-tight text-gray-700 transition duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="day" className="text-lg font-semibold">
                Event Date
              </label>

              <DatePicker
                id="day"
                name="day"
                selected={formData.day}
                onChange={(date) =>
                  setFormData({ ...formData, ["day"]: date || new Date() })
                }
                className="block w-2/3 appearance-none rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 pr-8 leading-tight text-gray-700 transition duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    ["startTime"]: time || new Date(),
                  })
                }
                className="block w-2/3 appearance-none rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 pr-8 leading-tight text-gray-700 transition duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="block w-2/3 appearance-none rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 pr-8 leading-tight text-gray-700 transition duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="rounded bg-blue-500 p-2 text-white"
            >
              {isLoading ? "Updating..." : "Update Event"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
