import React, { useState } from "react";
import { api } from "~/utils/api";

export default function ViewActivities() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const viewAcitivtes = api.activity.getSchedule.useQuery({
    day: selectedDate,
  });

  return <div>
    <div>{viewAcitivtes.data?.map((item) => {
      console.log(viewAcitivtes.data)
      return (
        <div key={item.id}>{JSON.stringify(item, null, 2)}</div>
      )
    })}
      
    </div>
  </div>;
}
