import React from "react";
import { format } from "date-fns";

import { cn } from "~/lib/utils";
import { api } from "~/utils/api";
import DropdownIcon from "./icons/dropdownicon";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export const selectedDateStyle = {
  backgroundColor: "#2E4D90",
  color: "#FFFFFF",
  borderRadius: "24px",
};

export const noSelectedDateStyle = {
  borderWidth: "1px",
  borderColor: "#2E4D90",
  borderRadius: "24px",
};

export default function AbsenteesTable() {
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const [absences, setAbsenses] = React.useState<number[]>([]);

  const { data: allAbsences } = api.absence.getAllAbsences.useQuery();

  React.useEffect(() => {
    if (allAbsences) {
      const foundAbsences: number[] = [];
      allAbsences.forEach((absence) => {
        // DB stores the absence date in UTC time - disregard the time
        if (
          selectedDate &&
          areDatesEqual(
            new Date(
              absence.absenceDate.getUTCFullYear(),
              absence.absenceDate.getUTCMonth(),
              absence.absenceDate.getUTCDate(),
            ),
            selectedDate,
          )
        ) {
          foundAbsences.push(absence.participantId);
        }
      });
      setAbsenses(foundAbsences);
    }
  }, [selectedDate, allAbsences]);

  return (
    <div style={{ padding: "32px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <h3
          style={{
            fontSize: "20px",
            paddingRight: "12px",
          }}
        >
          Absentees for{" "}
        </h3>
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
      <div style={{ paddingTop: "32px" }}>
        {selectedDate ? (
          AbsencesTable(absences)
        ) : (
          <div style={{ fontSize: "16px", padding: "16px" }}>
            Pick a Date to View Absentees
          </div>
        )}
      </div>
    </div>
  );
}

function AbsencesTable(absences: number[]) {
  return absences.length > 0 ? (
    <table style={{ width: "100%" }}>
      <thead style={{ backgroundColor: "#EFF2FB" }}>
        <tr style={{}}>
          <th
            style={{
              fontWeight: "normal",
              textAlign: "left",
              padding: "12px 16px 12px 32px",
              width: "200px",
            }}
          >
            S. No.
          </th>
          <th
            style={{
              fontWeight: "normal",
              textAlign: "left",
              padding: "12px 32px 12px 16px",
            }}
          >
            Name
          </th>
        </tr>
      </thead>
      <tbody>
        {absences.map((participantId) => {
          return (
            <tr key={participantId}>
              <td style={{ padding: "12px 16px 12px 32px", width: "200px" }}>
                {participantId}
              </td>
              <td
                style={{ padding: "12px 32px 12px 16px" }}
              >{`User ${participantId}`}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : (
    <div style={{ fontSize: "16px", padding: "16px" }}>No Absentees</div>
  );
}

export function areDatesEqual(date1: Date, date2: Date) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}
