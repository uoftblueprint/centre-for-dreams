import React from "react";

import ActivityCreateModal from "~/components/activity/activitycreatemodal";
import ActivityUpdateModal from "~/components/activity/activityupdatemodal";
import CreateActivity from "../components/activity/activityform";
import ViewActivities from "../components/activity/viewactivites";
import NavBar from "~/components/navbar";

const Activities = () => {
  return (
    <div className="relative flex">
      <NavBar/>
      <div className="flex-col items-center pt-6 pl-6">
        <ActivityUpdateModal id={1} />
        <ActivityCreateModal />
        <div className="font-medium">Create Activity</div>
        <CreateActivity />
        <div className="font-medium">View Activites</div>
        <ViewActivities />
      </div>
    </div>
  );
};

export default Activities;
