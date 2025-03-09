import React from "react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "~/lib/utils";
import { Calendar } from "./ui/calendar";
import DropdownIcon from "./icons/dropdownicon";
import { noSelectedDateStyle, selectedDateStyle } from "./absenteestable";
import Schedule from "./schedule";
import ActivityCreateModal from "./activity/activitycreatemodal";

export default function EventsCalendar() {
  const [selectedDate, setSelectedDate] = React.useState<Date>();

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
        <ActivityCreateModal/>
      </div>
      <Schedule selectedDate={selectedDate}/>
    </div>
  );
}