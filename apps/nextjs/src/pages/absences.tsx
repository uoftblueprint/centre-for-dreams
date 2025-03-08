import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { api } from "~/utils/api";
import Absence from "../components/absence";
import NavBar from "~/components/navbar";

export default function Absences() {
  const { data: allAbsences } = api.absence.getAllAbsences.useQuery();
  const [startDate, setStartDate] = useState(new Date());

  const areDatesEqual = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const filteredAbsences = allAbsences
    ?.filter(
      (absence) => !startDate || areDatesEqual(absence.absenceDate, startDate),
    )
    .map((data, index) => (
      <Absence
        key={index}
        userId={data.participantId}
        absenceDate={data.absenceDate}
        activityName={data.activity.name}
      />
    ));

  return (
    <div className="relative flex">
      <NavBar/>
      <h1 className="m-4 text-2xl font-extrabold ">Absences</h1>
      <div className="m-4">
        <span>Pick a date: </span>
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
        />
      </div>
      {filteredAbsences}
    </div>
  );
}
