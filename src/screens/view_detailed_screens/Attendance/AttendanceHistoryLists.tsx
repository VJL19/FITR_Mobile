import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import IAttendance from "utils/types/attendance.types";
import { AppDispatch } from "store/store";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { DetailedRootStackNavigationProp } from "utils/types/detailed_screens/DetailedRootStackNavigators";
import { setViewAttendancePayload } from "reducers/attendanceReducer";

const AttendanceHistoryLists = ({
  DateTapped,
  SubscriptionExpectedEnd,
  TimeIn,
  TimeOut,
  LastName,
  FirstName,
  SubscriptionType,
}: IAttendance) => {
  const formatDate = DateTapped.split(", ").join("");

  const dispatch: AppDispatch = useDispatch();

  const navigation = useNavigation<DetailedRootStackNavigationProp>();

  const handleNavigate = () => {
    const arg = {
      DateTapped,
      SubscriptionExpectedEnd,
      TimeIn,
      TimeOut,
      LastName,
      FirstName,
      SubscriptionType,
    };
    dispatch(setViewAttendancePayload(arg));
    navigation.navigate("View Detailed Attendance History");
  };
  return (
    <TouchableOpacity onPress={handleNavigate}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.text} numberOfLines={1}>
            Date Tapped: {new Date(formatDate.split(" ")[0]).toDateString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
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
    height: 100,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    width: "90%",
    marginTop: 15,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#E12900",
  },
  text: {
    fontSize: 25,
    fontFamily: "Inter-Bold",
    color: "#202020",
  },
});
