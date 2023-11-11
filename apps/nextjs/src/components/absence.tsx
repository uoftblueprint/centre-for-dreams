import React, { FC } from 'react';

interface AbsenceProps {
    data: {
        userId: number;
        absenceDate: Date;
    };
  }
const Absence: React.FC<AbsenceProps> = ({data : {userId, absenceDate}}) => {

  return (
    <div className="m-4 block max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow">
      <h2 className="mb-4 text-xl font-bold ">Absence</h2>
      <p className="text-md mb-2 font-normal text-gray-600">
        <b>User:</b> {userId}
      </p>
      <p className="text-md mb-2 font-normal text-gray-600">
        <b>Date of Absence:</b> {absenceDate.toDateString()}
      </p>
    </div>
  );
};

export default Absence;
