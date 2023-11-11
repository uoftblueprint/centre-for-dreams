import React from "react";
import { ScrollView } from "react-native";

import CreateActivityComponent from "./components/createactivity";
import ViewActivitiesComponent from "./components/viewactivites";

const Activities = () => {
  return (
    <ScrollView className="h-full w-full p-4">
      <ViewActivitiesComponent></ViewActivitiesComponent>
      <CreateActivityComponent></CreateActivityComponent>
    </ScrollView>
  );
};

export default Activities;
