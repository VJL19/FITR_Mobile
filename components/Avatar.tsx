import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import getAccessToken from "../actions/homeAction";
import IUser from "../utils/types/user.types";
import IAttendance from "../utils/types/attendance.types";
import LoadingIndicator from "./LoadingIndicator";

const Avatar = () => {
  const dispatch: AppDispatch = useDispatch();

  const { user, isLoading } = useSelector(
    (state: RootState) => state.authReducer
  );

  useEffect(() => {
    dispatch(getAccessToken());
  }, []);
  if (isLoading) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignSelf: "center",
          backgroundColor: "rgba(0,0,0,.25)",
          width: 100,
          height: 80,
          borderRadius: 8,
        }}
      >
        <ActivityIndicator size={"large"} color={"white"} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/avatar_default.jpeg")}
        style={styles.avatarStyle}
      />
      <Text style={styles.avatarNameStyle}>
        {user.LastName}, {user.FirstName}
      </Text>
      <Text style={styles.avatarInfoStyle}>{user.Email}</Text>
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarStyle: {
    height: 85,
    width: 85,
    borderRadius: 150,
    borderWidth: 1,
    borderColor: "#f5f5f5",
  },
  avatarNameStyle: {
    marginTop: 10,
    fontSize: 18,
    color: "#f5f5f5",
    fontWeight: "bold",
  },
  avatarInfoStyle: {
    marginTop: 10,
    fontSize: 14,
    color: "#f5f5f5",
  },
});
