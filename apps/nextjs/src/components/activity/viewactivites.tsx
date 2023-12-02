import React, { useState } from "react";
import DatePicker from "react-datepicker";

import { api } from "~/utils/api";

import "react-datepicker/dist/react-datepicker.css";

export default function ViewActivities() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const viewAcitivtes = api.activity.getSchedule.useQuery({
    day: selectedDate,
  });

  return (
    <div>
      <div className="mt-2">
        <div>Start Date:</div>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date!);
          }}
        />
      </div>
      <div>
        {viewAcitivtes.data?.map((item) => {
          return <div key={item.id}>{JSON.stringify(item, null, 2)}</div>;
        })}
      </div>
    </div>
  );
}
