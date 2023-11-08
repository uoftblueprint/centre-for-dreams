import { Button, View, Text } from "react-native";
// import { api } from "~/utils/api";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useState } from "react";

const ViewActivitiesComponent = () => {
    const currentDateTime: Date = new Date();
    const [selectedDate, setSelectedDate] = useState(currentDateTime);
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    // const viewAcitivtes = api.activity.getSchedule.useQuery({day: selectedDate});

    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };
    
    const handleDateConfirm = (date: Date) => {
        setSelectedDate(date);
        hideDatePicker();
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
        </View>
    );
}

export default ViewActivitiesComponent;