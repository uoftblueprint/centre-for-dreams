import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";

import { api } from "~/utils/api";
import type { RouterInputs } from "~/utils/api";

import "react-datepicker/dist/react-datepicker.css";

export type CreateAnnouncement = RouterInputs["activity"]["createActivity"];

export default function CreateActivity() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<CreateAnnouncement>();

  const [isSuccess, setIsSuccess] = useState(false);

  const { mutate: createActivity } = api.activity.createActivity.useMutation({
    onSuccess: () => {
      setIsSuccess(true);
      reset();
    },
  });

  const handleInputChange = () => {
    if (isSuccess) {
      setIsSuccess(false);
      reset();
    }
  };

  const onSubmit = (data: CreateAnnouncement) => {
    data.durationMinutes = parseInt(data.durationMinutes.toString(), 10);
    createActivity({
      name: data.name,
      durationMinutes: data.durationMinutes,
      leader: data.leader,
      location: data.location,
      day: data.day,
      startTime: data.startTime,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          className="mt-4 rounded-md border border-gray-300 p-2 text-sm transition duration-150 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          {...register("name", { required: true })}
          placeholder="Name"
          onChange={handleInputChange}
        />
        {errors.name && <span>Name is required</span>}
      </div>
      <div>
        <input
          className="mt-4 rounded-md border border-gray-300 p-2 text-sm transition duration-150 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          {...register("durationMinutes", { required: true })}
          type="number"
          min="15"
          placeholder="Duration (15+ minutes)"
          onChange={handleInputChange}
        />
        {errors.durationMinutes && <span>Duration is required</span>}
      </div>

      <div>
        <input
          className="mt-4 rounded-md border border-gray-300 p-2 text-sm transition duration-150 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          {...register("leader", { required: true })}
          placeholder="Leader"
          onChange={handleInputChange}
        />
        {errors.leader && <span>Leader is required</span>}
      </div>

      <div>
        <input
          className="mt-4 rounded-md border border-gray-300 p-2 text-sm transition duration-150 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          {...register("location", { required: true })}
          placeholder="Location"
          onChange={handleInputChange}
        />
        {errors.location && <span>Location is required</span>}
      </div>

      <div>
        <Controller
          name="day"
          control={control}
          render={({ field }) => (
            <DatePicker
              className="mt-4 rounded-md border border-gray-300 p-2 text-sm transition duration-150 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              selected={field.value}
              placeholderText="Day"
              onChange={(date) => field.onChange(date)}
              dateFormat="MM/dd/yyyy"
            />
          )}
        />
        {errors.day && <span>Day is required</span>}
      </div>

      <div>
        <Controller
          name="startTime"
          control={control}
          render={({ field }) => (
            <DatePicker
              className="mt-4 rounded-md border border-gray-300 p-2 text-sm transition duration-150 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              selected={field.value}
              placeholderText="Start Time"
              onChange={(date) => field.onChange(date)}
              showTimeSelect
              timeIntervals={5}
              dateFormat="MM/dd/yyyy hh:mm"
            />
          )}
        />
        {errors.startTime && <span>Start time is required</span>}
      </div>

      <button
        type="submit"
        className="focus:shadow-outline mt-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
      >
        Submit
      </button>
      {isSuccess && <p>Post created successfully!</p>}
    </form>
  );
}
