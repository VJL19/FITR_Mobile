import { StyleSheet, Text, View } from "react-native";
import React from "react";
import IAttendance from "utils/types/attendance.types";

const AttendanceHistoryLists = ({
  DateTapped,
  SubscriptionExpectedEnd,
  TimeIn,
  TimeOut,
}: IAttendance) => {
  const formatDate = DateTapped.split(", ").join("");
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>{new Date(formatDate).toDateString()}</Text>
        <Text style={styles.text}>{SubscriptionExpectedEnd}</Text>
        <Text style={styles.text}>Time In - {TimeIn}</Text>
        <Text style={styles.text}>Time Out - {TimeOut}</Text>
      </View>
    </View>
  );
};

export default AttendanceHistoryLists;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    width: "90%",
    marginTop: 15,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#E12900",
  },
  text: {
    color: "#202020",
  },
});
