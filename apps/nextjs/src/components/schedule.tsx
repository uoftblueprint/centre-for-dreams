import React from "react";
import { addMinutes, format } from "date-fns";

import { api } from "~/utils/api";
import ActivityUpdateModal from "./activity/activityupdatemodal";

interface Activity {
  name: string;
  id: number;
  day: Date;
  startTime: Date;
  durationMinutes: number;
  leader: string;
  location: string;
}

interface ScheduleProps {
  selectedDate: Date | undefined;
}

export default function Schedule(props: ScheduleProps) {
  let dailySchedule;
  const [activities, setActivities] = React.useState<Activity[]>([]);

  if (props.selectedDate) {
    ({ data: dailySchedule } = api.activity.getDailySchedule.useQuery({
      day: props.selectedDate.toISOString().split("T")[0] ?? "",
    }));
  } else {
    // placeholder to prevent too many hook renders error
    ({ data: dailySchedule } = api.activity.getDailySchedule.useQuery({
      day: new Date().toISOString().split("T")[0] ?? "",
    }));
  }

  React.useEffect(() => {
    setActivities(dailySchedule ?? []);
  }, [dailySchedule, props.selectedDate]);

  return (
    <div className="pt-[32px]">
      {props.selectedDate && activities.length > 0 ? (
        <div>{activities.map((activity: Activity) => Event(activity))}</div>
      ) : (
        <div className="text-[16px] p-4">
          {props.selectedDate
            ? "No events are scheduled for today"
            : "Pick a Date to View Events"}
        </div>
      )}
    </div>
  );
}

function Event(activity: Activity) {
  return (
    <div
      key={activity.id}
      className="flex flex-row justify-start items-center mb-5"
    >
      <div className="font-bold">
        {`${format(activity.startTime, "h:mm a")} - ${format(addMinutes(activity.startTime, activity.durationMinutes), "h:mm a")}`}
      </div>
      <div
        className="bg-[#EFF2FB] rounded-[10px] p-4 w-full ml-5"
      >
        <div className="flex flex-row justify-between items-center"
        >
          <div className="font-bold">{activity.name}</div>
          <ActivityUpdateModal id={activity.id} />
        </div>
      </div>
    </div>
  );
}
