import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import getAccessToken from "../actions/homeAction";
import IUser from "../utils/types/user.types";
import IAttendance from "../utils/types/attendance.types";

const Avatar = () => {
  const dispatch: AppDispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.authReducer);

  useEffect(() => {
    dispatch(getAccessToken());
  }, []);
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
    borderColor: "#ff2e00",
  },
  avatarNameStyle: {
    marginTop: 10,
    fontSize: 16,
    color: "#131313",
  },
  avatarInfoStyle: {
    marginTop: 10,
    fontSize: 12,
    color: "#131313",
  },
});
