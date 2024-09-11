import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import CustomTextInput from "./CustomTextInput";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
const DatePicker = ({
  showPicker,
  onChangeDate,
  toggleDatePicker,
  placeholder,
  control,
  errors,
}: {
  showPicker: boolean;
  onChangeDate: (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined
  ) => void;
  toggleDatePicker: () => void;
  placeholder?: string;
  control: Control<any> | undefined;
  errors: FieldErrors<any>;
}) => {
  return (
    <React.Fragment>
      {showPicker && (
        <DateTimePicker
          mode="date"
          value={new Date()}
          onChange={onChangeDate}
          display="calendar"
        />
      )}
      <Text style={styles.labelStyle}>Select Date</Text>
      {!showPicker && (
        <Pressable onPress={toggleDatePicker}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                isEditable={false}
                inputMode="text"
                error={errors.attendanceDate}
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
              />
            )}
            name="attendanceDate"
          />
        </Pressable>
      )}
    </React.Fragment>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
