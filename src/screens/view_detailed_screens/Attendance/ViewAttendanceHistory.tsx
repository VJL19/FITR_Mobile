import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  useGetUserAttendanceHistoryByDateMutation,
  useGetUserAttendanceHistoryQuery,
} from "reducers/attendanceReducer";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import AttendanceHistoryLists from "./AttendanceHistoryLists";
import IAttendance, { IAttendanceDate } from "utils/types/attendance.types";
import CustomError from "components/CustomError";
import LoadingIndicator from "components/LoadingIndicator";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Controller, useForm } from "react-hook-form";
import CustomTextInput from "components/CustomTextInput";
import DisplayFormError from "components/DisplayFormError";
import { joiResolver } from "@hookform/resolvers/joi";
import { attendanceDateSchema } from "utils/validations";
import DatePicker from "components/DatePicker";
const ViewAttendanceHistory = () => {
  const { isError, data } = useGetAccessTokenQuery();
  const [showPicker, setShowPicker] = useState(false);

  const {
    setValue,
    getValues,
    control,
    formState: { isSubmitted, errors },
  } = useForm<IAttendanceDate>({ resolver: joiResolver(attendanceDateSchema) });
  // const {
  //   data: attendanceHistory,
  //   error,
  //   isFetching,
  //   isUninitialized,
  // } = useGetUserAttendanceHistoryQuery(data?.user?.UserID, {
  //   refetchOnMountOrArgChange: true,
  // });

  const [getAttendance, { data: attendanceHistory, error, isLoading }] =
    useGetUserAttendanceHistoryByDateMutation();

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  useEffect(() => {
    getAttendance({
      UserID: data?.user?.UserID!,
      selectedDate: new Date().toISOString().split("T")[0],
    });
  }, []);
  const onChangeDate = (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined
  ) => {
    const { type } = event;
    if (type == "set") {
      const currentDate = selectedDate;
      setValue("attendanceDate", currentDate!.toDateString());

      if (Platform.OS === "android") {
        toggleDatePicker();
        setValue("attendanceDate", currentDate!.toDateString());
      }
      console.log(currentDate!.toISOString().split("T")[0]);
      getAttendance({
        UserID: data?.user?.UserID!,
        selectedDate: currentDate!.toISOString().split("T")[0],
      });
    } else {
      toggleDatePicker();
    }
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (isError) {
    return <CustomError />;
  }

  if (attendanceHistory?.result?.length === 0) {
    return (
      <React.Fragment>
        <DatePicker
          control={control}
          errors={errors}
          onChangeDate={onChangeDate}
          showPicker={showPicker}
          toggleDatePicker={toggleDatePicker}
          placeholder="Enter attendance date"
        />
        <DisplayFormError errors={errors.attendanceDate} />
        <Text style={styles.labelStyle}>
          Selected Date: {getValues("attendanceDate")}
        </Text>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Your Attendance history for this selected date is empty!</Text>
        </View>
      </React.Fragment>
    );
  }
  console.log("attendanceHistory data", attendanceHistory);
  console.log("attendanceHistory error", error);
  return (
    <View style={{ padding: 10 }}>
      <DatePicker
        control={control}
        errors={errors}
        onChangeDate={onChangeDate}
        showPicker={showPicker}
        toggleDatePicker={toggleDatePicker}
        placeholder="Enter attendance date"
      />
      <DisplayFormError errors={errors.attendanceDate} />
      <Text style={styles.labelStyle}>
        Selected Date: {getValues("attendanceDate")}
      </Text>
      <FlatList
        alwaysBounceVertical={true}
        data={attendanceHistory?.result}
        renderItem={({ item }) => <AttendanceHistoryLists {...item} />}
        ListFooterComponent={<View style={{ height: 200 }} />}
        keyExtractor={(item: IAttendance) => item?.AttendanceID?.toString()}
      />
    </View>
  );
};

export default ViewAttendanceHistory;

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 20,
  },
});
