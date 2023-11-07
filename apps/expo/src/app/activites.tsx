import React, { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { api } from "~/utils/api";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Activities = () => {
    // activites from a given week

    const currentDateTime: Date = new Date();
    const [selectedDate, setSelectedDate] = useState(currentDateTime);
    const [datePickerVisible, setDatePickerVisible] = useState(false);

    const showDatePicker = () => {
      setDatePickerVisible(true);
    };
    
    const hideDatePicker = () => {
      setDatePickerVisible(false);
    };

    // create an activity
    const [activityData, setActivityData] = useState({
        name: "",
        duration: "",
        leader: "",
        location: "",
        selectedDate: currentDateTime,
    });

    const handleInputChange = (field: string, value: string | number) => {
        setActivityData({
          ...activityData,
          [field]: value,
        });
    };

    const handleDateConfirm = (date: Date) => {
  
      setActivityData({
        ...activityData,
        selectedDate: date,
      });
      setSelectedDate(date);
      hideDatePicker();
  
    };

    const handleSubmit = () => {
        if (
            activityData.name === "" ||
            activityData.duration === "" ||
            activityData.leader === "" ||
            activityData.location === ""
          ) {
            // Display an alert if any field is empty
            Alert.alert("Empty Field!", "Please fill in all fields");
            return;
        }

        const duration = parseInt(activityData.duration, 10);

        console.log("Form data:", {
        ...activityData,
        duration: duration, 
        });

        const currentDateTime: Date = new Date();
        console.log("Form data:", activityData);
        // createActivity.mutate({name: activityData.name, day: currentDateTime, startTime: currentDateTime, })
        setActivityData({
          name: "",
          duration: "",
          leader: "",
          location: "",
          selectedDate: currentDateTime
        });
    };

    return (
        <View className="h-full w-full p-4">
            <Text>Name:</Text>
      <TextInput
        placeholder="Enter name"
        value={activityData.name}
        onChangeText={(text) => handleInputChange("name", text)}
      />

      <Text>Duration:</Text>
      <TextInput
        placeholder="Enter duration"
        value={activityData.duration}
        onChangeText={(text) => handleInputChange("duration", text)}
        keyboardType="numeric" // This sets the keyboard to numeric for this input
      />

      <Text>Leader:</Text>
      <TextInput
        placeholder="Enter leader"
        value={activityData.leader}
        onChangeText={(text) => handleInputChange("leader", text)}
      />

      <Text>Location:</Text>
      <TextInput
        placeholder="Enter location"
        value={activityData.location}
        onChangeText={(text) => handleInputChange("location", text)}
      />
      
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        {selectedDate ? selectedDate.toISOString() : 'No date selected'}
      </Text>
      <Button title="Select a date" onPress={showDatePicker} />

      <Button title="Submit" onPress={handleSubmit} />
      <DateTimePickerModal
        // date={selectedDate}
        isVisible={datePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
        </View>
    );
};

export default Activities;