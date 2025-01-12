import React from "react";

interface AbsenceProps {
  userId: number;
  absenceDate: Date;
  activityName: string;
}
const Absence: React.FC<AbsenceProps> = ({
  userId,
  absenceDate,
  activityName,
}) => {
  return (
    <div className="m-4 block max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow">
      <h2 className="mb-4 text-xl font-bold ">Absence</h2>
      <p className="text-md mb-2 font-normal text-gray-600">
        <b>User:</b> {userId}
      </p>
      <p className="text-md mb-2 font-normal text-gray-600">
        <b>Date of Absence:</b> {absenceDate.toDateString()}
      </p>
      <p className="text-md mb-2 font-normal text-gray-600">
        <b>Activity:</b> {activityName}
      </p>
    </div>
  );
};

export default Absence;
