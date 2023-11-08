import React from "react";
import { View } from "react-native";
import CreateActivityComponent from "./components/createactivity";
import ViewActivitiesComponent from "./components/viewactivites";

const Activities = () => {
  
  return <View className="h-full w-full p-4">
    <ViewActivitiesComponent></ViewActivitiesComponent>
    <CreateActivityComponent></CreateActivityComponent>
  </View>;
};

export default Activities;
