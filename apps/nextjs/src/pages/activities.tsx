import React from "react";

import ActivityCreateModal from "~/components/activity/activitycreatemodal";
import ActivityUpdateModal from "~/components/activity/activityupdatemodal";
// import NavBar from "~/components/navbar";
import CreateActivity from "../components/activity/activityform";
import ViewActivities from "../components/activity/viewactivites";

const Activities = () => {
  return (
    <div className="relative flex">
      {/* <NavBar /> */}
      <div className="flex-col items-center pl-6 pt-6">
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
