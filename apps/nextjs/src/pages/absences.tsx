import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { api } from "~/utils/api";
import Absence from "../components/absence";

export default function Absences() {
    const { data: allAbsences } = api.absence.getAllAbsences.useQuery();
    const [startDate, setStartDate] = useState(new Date());

    const areDatesEqual = (date1, date2) => {
        return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
        );
    };

    const filteredAbsences = allAbsences
        ?.filter((absence) => !startDate || areDatesEqual(absence.absenceDate, startDate))
        .map((data) => <Absence key={data.id} data={data} />);

  

  return (
    <>
        <h1 className="m-4 text-2xl font-extrabold ">Absences</h1>
        <div className="m-4">
          <span>Pick a date: </span>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </div>
        {filteredAbsences}
    </>
    
  );
}







