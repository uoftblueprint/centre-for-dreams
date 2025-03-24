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
    ({ data: dailySchedule } = api.activity.getDailySchedule.useQuery({
      day: new Date().toISOString().split("T")[0] ?? "",
    }));
  }

  React.useEffect(() => {
    const sortedActivities = [...(dailySchedule ?? [])].sort(
      (a, b) => a.startTime.getTime() - b.startTime.getTime(),
    );
    setActivities(sortedActivities ?? []);
  }, [dailySchedule, props.selectedDate]);

  return (
    <div className="pt-[32px]">
      {props.selectedDate && activities.length > 0 ? (
        <div>{activities.map((activity: Activity) => Event(activity))}</div>
      ) : (
        <div className="text-[16px]">
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
      className="mb-5 flex flex-row items-center justify-start"
    >
      <div className="w-[100px] font-bold">
        {`${format(activity.startTime, "h:mm a")} - ${format(addMinutes(activity.startTime, activity.durationMinutes), "h:mm a")}`}
      </div>
      <div className="ml-5 w-full rounded-[10px] bg-[#EFF2FB] p-4">
        <div className="flex flex-row items-center justify-between">
          <div className="font-bold">{activity.name}</div>
          <ActivityUpdateModal id={activity.id} />
        </div>
      </div>
    </div>
  );
}
