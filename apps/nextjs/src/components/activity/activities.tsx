import React from "react";

import CreateActivity from "./activityform";
import ViewActivities from "./viewactivites";

const Activities = () => {
  return (
    <div className="h-full w-full p-4">
      <div className="font-medium">Create Activity</div>
      <CreateActivity/>
      <div className="font-medium">View Activites</div>
      <ViewActivities/>
    </div>
  );
};

export default Activities;
