import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import React, { useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../utils/types/navigators/RootStackNavigators";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import {
  notificationApi,
  setNotificationCount,
  useGetAllNotificationsCountQuery,
} from "reducers/notificationReducer";
import { useRefetchOnMessage } from "hooks/useRefetchOnMessage";

const CustomNotification = (props: {
  tintColor?: string | undefined;
  pressColor?: string | undefined;
  pressOpacity?: number | undefined;
}) => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const { data, isError } = useGetAccessTokenQuery();

  const { data: count } = useGetAllNotificationsCountQuery(data?.user?.UserID, {
    refetchOnMountOrArgChange: true,
  });

  const dispatch: AppDispatch = useDispatch();

  //refresh notif counts when mutation is perform on the server.
  useRefetchOnMessage("refresh_post", () => {
    dispatch(notificationApi.util.invalidateTags(["notifications"]));
  });
  useEffect(() => {
    dispatch(setNotificationCount(count?.result?.[0].NotificationCount));
  }, []);

  return (
    <TouchableNativeFeedback
      {...props}
      onPress={() =>
        navigation.navigate("DetailedScreens", { screen: "Notifications" })
      }
      useForeground={true}
      background={TouchableNativeFeedback.Ripple("rgba(20,20,2,0.1)", true, 40)}
    >
      <View style={{ marginRight: 15 }}>
        {Number(count?.result?.[0].NotificationCount) > 0 && (
          <View style={{ position: "absolute", right: 25 }}>
            <Text
              style={{
                width: 25,
                textAlign: "center",
                color: "#f5f5f5",
                backgroundColor: "#d9534f",
                borderRadius: 50,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {count?.result?.[0].NotificationCount}
            </Text>
          </View>
        )}
        <Ionicons name="notifications-outline" size={30} color={"#f5f5f5"} />
      </View>
    </TouchableNativeFeedback>
  );
};

export default CustomNotification;

const styles = StyleSheet.create({});
