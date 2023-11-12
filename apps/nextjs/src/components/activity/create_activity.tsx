import React, { useState } from "react";
import { api } from "~/utils/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateActivity() {
  const currentDateTime: Date = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | null>(currentDateTime);
  const [selectedStartDate, setselectedStartDate] = useState(currentDateTime);

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
    console.log(activityData)

    setActivityData({
      name: "",
      duration: "",
      leader: "",
      location: "",
      selectedDate: currentDateTime,
      startDate: currentDateTime,
    });
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Name"
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
          onChange={(text) => handleInputChange("duration", text.target.value)}
          className="mt-4 rounded-md border border-gray-300 p-2 text-sm transition duration-150 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Leader"
          onChange={(text) => handleInputChange("leader", text.target.value)}
          className="mt-4 rounded-md border border-gray-300 p-2 text-sm transition duration-150 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Location"
          onChange={(text) => handleInputChange("location", text.target.value)}
          className="mt-4 rounded-md border border-gray-300 p-2 text-sm transition duration-150 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div className="mt-2">
        <div>Date of Activity:</div>
        <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date as Date)} />
      </div>
      <div className="mt-2">
        <div>Start Date:</div>
        <DatePicker selected={selectedStartDate} onChange={(date) => setselectedStartDate(date as Date)} />
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
