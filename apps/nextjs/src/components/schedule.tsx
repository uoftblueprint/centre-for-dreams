/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { addMinutes } from "date-fns";
import { toZonedTime } from "date-fns-tz";

import useTimezone from "~/hooks/timezone";
import { formatInTimeZone } from "~/lib/date-utils";
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
  const [activities, setActivities] = React.useState<Activity[]>([]);
  const timezone = useTimezone();

  const selectedDay = React.useMemo(
    () => props.selectedDate ?? new Date(),
    [props.selectedDate],
  );
  const { data: dailySchedule } = api.activity.getDailyScheduleUTC.useQuery({
    day: selectedDay,
  });

  React.useEffect(() => {
    if (!dailySchedule || !timezone) return;

    const adjusted = dailySchedule.map((activity) => {
      const start = new Date(activity.startTime);
      const activityDay = new Date(activity.day);

      const localDate = new Date(activityDay);
      localDate.setUTCHours(start.getUTCHours(), start.getUTCMinutes(), 0, 0);

      const zoned = toZonedTime(localDate, timezone);

      return {
        ...activity,
        startTime: zoned,
      };
    });

    const sorted = adjusted.sort(
      (a, b) => a.startTime.getTime() - b.startTime.getTime(),
    );
    setActivities(sorted);
  }, [dailySchedule, props.selectedDate, timezone]);

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
        {`${formatInTimeZone(activity.startTime, "America/New_York")} - ${formatInTimeZone(addMinutes(activity.startTime, activity.durationMinutes), "America/New_York")}`}
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
