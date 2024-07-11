import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import { getNotificationAction } from "actions/notificationAction";
import getAccessToken from "actions/homeAction";
import { FlatList } from "react-native-gesture-handler";
import Notification from "./Notification";
import { INotifications } from "utils/types/notifications.types";
import LoadingIndicator from "components/LoadingIndicator";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import { useGetAllNotificationsQuery } from "reducers/notificationReducer";
import CustomError from "components/CustomError";

const Notifications = () => {
  const dispatch: AppDispatch = useDispatch();

  const { data: user, isError } = useGetAccessTokenQuery();

  const { data, isFetching, error, status, isUninitialized } =
    useGetAllNotificationsQuery(user?.user?.UserID, {
      refetchOnMountOrArgChange: true,
    });

  // const { user, isAuthenticated } = useSelector(
  //   (state: RootState) => state.authReducer
  // );
  // const { message, status, result, isLoading } = useSelector(
  //   (state: RootState) => state.notification
  // );

  useEffect(() => {}, []);
  if (isFetching || isUninitialized) {
    return <LoadingIndicator />;
  }
  if (isError) {
    return <CustomError />;
  }
  if (data?.result?.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 25, fontWeight: "700" }}>
          You have no notifications
        </Text>
      </View>
    );
  }
  return (
    <View>
      <FlatList
        data={data?.result}
        renderItem={({ item }) => <Notification {...item} />}
        keyExtractor={(item: INotifications) =>
          item?.NotificationID?.toString()
        }
      />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({});
