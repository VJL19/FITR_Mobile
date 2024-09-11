import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useGetUserRFIDNumberDetailsQuery } from "reducers/attendanceReducer";
import LoadingIndicator from "components/LoadingIndicator";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import CustomError from "components/CustomError";

const ViewRFIDCard = () => {
  const { data: user, isError } = useGetAccessTokenQuery();

  const { data, isFetching, isUninitialized, error } =
    useGetUserRFIDNumberDetailsQuery(user?.user?.UserID);

  if (isFetching || isUninitialized) {
    return <LoadingIndicator />;
  }
  if (data?.result[0]?.RFIDNumber === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          You current do not have RFID Number in your account. Please contact
          the Gym Owner ASAP to process your RFID Number.
        </Text>
      </View>
    );
  }
  if (isError) {
    return <CustomError />;
  }
  console.log(data?.result);
  console.log(error);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Your RFID Number is {data?.result[0]?.RFIDNumber}, Please proceed to Gym
        Owner to give you an RFID Card for inquiry inside the gym.
      </Text>
    </View>
  );
};

export default ViewRFIDCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    lineHeight: 30,
  },
  errorText: {
    fontSize: 20,
    lineHeight: 30,
    textAlign: "center",
    fontWeight: "700",
    color: "#d9534f",
  },
});
