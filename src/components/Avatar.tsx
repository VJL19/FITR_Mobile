import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import IUser from "../utils/types/user.types";
import IAttendance from "../utils/types/attendance.types";
import LoadingIndicator from "./LoadingIndicator";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import { IMAGE_VALUES } from "utils/enums/DefaultValues";
import avatar from "assets/avatar_default.jpeg";
import { useNavigation } from "@react-navigation/native";

const Avatar = () => {
  const { user, accessToken } = useSelector(
    (state: RootState) => state.authReducer
  );

  const { isUninitialized, isFetching, data, status, error, isError } =
    useGetAccessTokenQuery(undefined, {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    });

  useEffect(() => {
    console.log("access in gloal state", accessToken);
    console.log("in fetch access token", data?.accessToken);
  }, []);

  if (isUninitialized || isFetching) {
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

  if (isError) {
    return (
      <View style={{ width: "100%" }}>
        <Text style={[styles.avatarNameStyle, { textAlign: "center" }]}>
          You are not authenticated! Please login again!
        </Text>
      </View>
    );
  }

  const url = data?.user?.ProfilePic;
  return (
    <View style={styles.container}>
      <Image
        source={
          data?.user?.ProfilePic === IMAGE_VALUES.DEFAULT
            ? avatar
            : { uri: url }
        }
        style={styles.avatarStyle}
      />
      <Text numberOfLines={1} style={styles.avatarNameStyle}>
        {data?.user.LastName}, {data?.user.FirstName}
      </Text>
      <Text numberOfLines={1} style={styles.avatarInfoStyle}>
        {data?.user?.Email}
      </Text>
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
    fontFamily: "Inter-Bold",
  },
  avatarInfoStyle: {
    marginTop: 10,
    fontSize: 14,
    color: "#f5f5f5",
  },
});
