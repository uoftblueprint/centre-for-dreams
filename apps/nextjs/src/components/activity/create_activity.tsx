import React, { useState } from "react";
import { api } from "~/utils/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateActivity() {
  const currentDateTime: Date = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | null>(currentDateTime);
  const [selectedStartDate, setselectedStartDate] = useState<Date | null>(currentDateTime);
  const createActivity = api.activity.createActivity.useMutation();

  const [activityData, setActivityData] = useState({
    name: "",
    duration: "",
    leader: "",
    location: "",
    selectedDate: currentDateTime,
    startDate: currentDateTime,
  });

  const handleInputChange = (field: string, value: string | number) => {
    setActivityData({
      ...activityData,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    if (activityData.name == "" || activityData.duration == "" || activityData.leader == "" || activityData.location == 
    "") {
      alert("You cannot have empty fields!")
      return
    }

    const duration = parseInt(activityData.duration, 10);

    createActivity.mutate({
      name: activityData.name,
      day: activityData.selectedDate,
      durationMinutes: duration,
      leader: activityData.leader,
      location: activityData.location,
      // always creates an object with start date 1970?
      startTime: activityData.startDate,
    });

    setActivityData({
      name: "",
      duration: "",
      leader: "",
      location: "",
      selectedDate: currentDateTime,
      startDate: currentDateTime,
    });

    alert("Submitted!")
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={activityData.name}
          onChange={(text) => {
            handleInputChange("name", text.target.value);
          }}
          className="mt-4 rounded-md border border-gray-300 p-2 text-sm transition duration-150 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div>
        <input
          type="number"
          min="0"
          placeholder="Duration (minutes)"
          value={activityData.duration}
          onChange={(text) => handleInputChange("duration", text.target.value)}
          className="mt-4 rounded-md border border-gray-300 p-2 text-sm transition duration-150 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Leader"
          value={activityData.leader}
          onChange={(text) => handleInputChange("leader", text.target.value)}
          className="mt-4 rounded-md border border-gray-300 p-2 text-sm transition duration-150 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Location"
          value={activityData.location}
          onChange={(text) => handleInputChange("location", text.target.value)}
          className="mt-4 rounded-md border border-gray-300 p-2 text-sm transition duration-150 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div className="mt-2">
        <div>Date of Activity:</div>
        <DatePicker selected={selectedDate} onChange={(date) => {
          setSelectedDate(date)
          activityData.selectedDate = selectedDate!
          }} />
      </div>
      <div className="mt-2">
        <div>Start Date:</div>
        <DatePicker selected={selectedStartDate} onChange={(date) => {
          setselectedStartDate(date)
          activityData.startDate = selectedStartDate!
          }} />
      </div>
      <button
        type="submit"
        className="focus:shadow-outline mt-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}
