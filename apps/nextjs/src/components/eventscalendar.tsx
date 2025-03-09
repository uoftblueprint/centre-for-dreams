import React from "react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "~/lib/utils";
import { Calendar } from "./ui/calendar";
import DropdownIcon from "./icons/dropdownicon";
import { areDatesEqual, noSelectedDateStyle, selectedDateStyle } from "./absenteestable";
import { api } from "~/utils/api";

interface Activity {
  name: string;
  id: number;
  day: Date;
  startTime: Date;
  durationMinutes: number;
  leader: string;
  location: string;
}

export default function EventsCalendar() {
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const [activities, setActivities] = React.useState<Activity[]>([]);
  
  // Daily Schedule for today
  // const { data: allActivities } = api.activity.getDailySchedule.useQuery({
  //   day: new Date().toISOString().split("T")[0] ?? "", // today's date in the format YYYY-MM-DD
  // });;

  React.useEffect(() => {
    // const { data: dailySchedule } = api.activity.getDailySchedule.useQuery({
    //   day: new Date().toISOString().split("T")[0] ?? "", // today's date in the format YYYY-MM-DD
    // });
    if (selectedDate) {
      const { data: dailySchedule } = api.activity.getDailySchedule.useQuery({
        day: new Date().toISOString().split("T")[0] ?? "", // today's date in the format YYYY-MM-DD
      });

      setActivities(dailySchedule ?? []);
      console.log(dailySchedule);
    }
    
  }, [selectedDate]);

  return (
    <div style={{ padding: "32px" }}>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
        <div className="flex flex-row items-center">
          <h3 className="text-[20px] pr-3">Events for</h3>
          <Popover>
            <PopoverTrigger
              asChild
              style={selectedDate ? selectedDateStyle : noSelectedDateStyle}
            >
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground",
                )}
                style={{ minWidth: "170px" }}
              >
                {selectedDate ? (
                  format(selectedDate, "PPP")
                ) : (
                  <span>Select Date</span>
                )}
                {DropdownIcon(!!selectedDate)}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <button style={{minWidth: "100px", }} className="m-2 rounded-[24px] border border-[#2E4D90] bg-[#2E4D90] p-2 text-white">Create</button>
        </div>
      </div>
      <div style={{ paddingTop: "32px" }}>
        {selectedDate ? (
          <></>
        ) : (
          <div style={{ fontSize: "16px", padding: "16px" }}>
            Pick a Date to View Events
          </div>
        )}
      </div>
    </div>
  );
}