import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

const ViewDetailedAttendanceHistory = () => {
  const {
    DateTapped,
    SubscriptionExpectedEnd,
    TimeIn,
    TimeOut,
    LastName,
    FirstName,
    SubscriptionType,
  } = useSelector((state: RootState) => state.attendance.viewAttendancePayload);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detailed Attendance History</Text>
      <View style={styles.box}>
        <Text style={styles.subTitle}>Attendance Details</Text>
        <Text style={styles.label}>Date Tapped: {DateTapped}</Text>
        <Text style={styles.label}>
          Full Name: {FirstName} {LastName}
        </Text>
        <Text style={styles.label}>SubscriptionType: {SubscriptionType}</Text>
        <Text style={styles.label}>Time in: {TimeIn}</Text>
        <Text style={styles.label}>Time Out: {TimeOut}</Text>
      </View>
    </View>
  );
};

export default ViewDetailedAttendanceHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    textAlign: "left",
    fontFamily: "Inter-Bold",
  },
  box: {
    padding: 25,
    backgroundColor: "rgba(255,45,0, .25)",
    width: "90%",
    marginTop: 15,
  },
  subTitle: {
    fontSize: 22,
    fontFamily: "Inter-Bold",
  },
  label: {
    fontSize: 18,
  },
});
