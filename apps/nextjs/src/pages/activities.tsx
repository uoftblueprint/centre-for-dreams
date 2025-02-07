import React from "react";

import ActivityCreateModal from "~/components/activity/activitycreatemodal";
import ActivityUpdateModal from "~/components/activity/activityupdatemodal";
import CreateActivity from "../components/activity/activityform";
import ViewActivities from "../components/activity/viewactivites";

const Activities = () => {
  return (
    <div className="h-full w-full p-4">
      <ActivityUpdateModal id={1} />
      <ActivityCreateModal />
      <div className="font-medium">Create Activity</div>
      <CreateActivity />
      <div className="font-medium">View Activites</div>
      <ViewActivities />
    </div>
  );
};

export default Activities;
