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
    <div style={{ paddingTop: "32px" }}>
      {props.selectedDate && activities.length > 0 ? (
        <div>{activities.map((activity: Activity) => Event(activity))}</div>
      ) : (
        <div style={{ fontSize: "16px", padding: "16px" }}>
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
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      <div style={{ fontWeight: "bold" }}>
        {`${format(activity.startTime, "h:mm a")} - ${format(addMinutes(activity.startTime, activity.durationMinutes), "h:mm a")}`}
      </div>
      <div
        style={{
          backgroundColor: "#EFF2FB",
          borderRadius: "10px",
          padding: "16px",
          width: "100%",
          marginLeft: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontWeight: "bold" }}>{activity.name}</div>
          <ActivityUpdateModal id={activity.id} />
        </div>
      </div>
    </div>
  );
}
