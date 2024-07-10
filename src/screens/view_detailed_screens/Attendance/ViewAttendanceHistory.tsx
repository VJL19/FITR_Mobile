import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useGetUserAttendanceHistoryQuery } from "reducers/attendanceReducer";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import AttendanceHistoryLists from "./AttendanceHistoryLists";
import IAttendance from "utils/types/attendance.types";
import CustomError from "components/CustomError";
import LoadingIndicator from "components/LoadingIndicator";

const ViewAttendanceHistory = () => {
  const { isError, data } = useGetAccessTokenQuery();

  const {
    data: attendanceHistory,
    error,
    isFetching,
    isUninitialized,
  } = useGetUserAttendanceHistoryQuery(data?.user?.UserID, {
    refetchOnMountOrArgChange: true,
  });

  if (isFetching || isUninitialized) {
    return <LoadingIndicator />;
  }
  if (isError) {
    return <CustomError />;
  }

  if (attendanceHistory?.result?.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Your Subscription history is empty!</Text>
      </View>
    );
  }
  console.log("attendanceHistory data", attendanceHistory);
  console.log("attendanceHistory error", error);
  return (
    <View>
      <FlatList
        alwaysBounceVertical={true}
        data={attendanceHistory?.result}
        renderItem={({ item }) => <AttendanceHistoryLists {...item} />}
        keyExtractor={(item: IAttendance) => item?.AttendanceID?.toString()}
      />
    </View>
  );
};

export default ViewAttendanceHistory;

const styles = StyleSheet.create({});
