import React from "react";
import { format } from "date-fns";

import { cn } from "~/lib/utils";
import { noSelectedDateStyle, selectedDateStyle } from "./absenteestable";
import ActivityCreateModal from "./activity/activitycreatemodal";
import DropdownIcon from "./icons/dropdownicon";
import Schedule from "./schedule";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function EventsCalendar() {
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  return (
    <div className="p-8">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <h3 className="pr-3 text-[20px]">Events for</h3>
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
        <ActivityCreateModal />
      </div>
      <Schedule selectedDate={selectedDate} />
    </div>
  );
}
