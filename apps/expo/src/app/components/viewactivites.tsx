import { useState } from "react";
import { Button, FlatList, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { api } from "~/utils/api";

const ViewActivitiesComponent = () => {
  const currentDateTime: Date = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDateTime);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const viewAcitivtes = api.activity.getSchedule.useQuery({
    day: selectedDate,
  });

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDateConfirm = (date: Date) => {
    setSelectedDate(date);
    hideDatePicker();
    console.log(viewAcitivtes.data);
  };

  return (
    <View>
      <Text>
        {selectedDate ? selectedDate.toUTCString() : "No date selected"}
      </Text>
      <Button title="Select a date" onPress={showDatePicker} />
      <DateTimePickerModal
        date={selectedDate}
        isVisible={datePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
      <FlatList
        data={viewAcitivtes.data}
        renderItem={({ item }) => (
          <View>
            <Text>{JSON.stringify(item, null, 2)}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ViewActivitiesComponent;
