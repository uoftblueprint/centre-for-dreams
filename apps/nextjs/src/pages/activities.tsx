import React from "react";

import CreateActivity from "../components/activity/activityform";
import ViewActivities from "../components/activity/viewactivites";
import ActivityModal from "~/components/activity/activitymodal";

const Activities = () => {
  return (
    // <div className="h-full w-full p-4">
    //   <div className="font-medium">Create Activity</div>
    //   <CreateActivity />
    //   <div className="font-medium">View Activites</div>
    //   <ViewActivities />
    // </div>
    <ActivityModal />
  );
};

export default Activities;
