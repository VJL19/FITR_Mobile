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
import { useGetAllNotificationsQuery } from "reducers/newsfeedReducer";
import CustomError from "components/CustomError";

const Notifications = () => {
  const dispatch: AppDispatch = useDispatch();

  const { data, isError } = useGetAccessTokenQuery();

  const { user } = data!;

  const {
    data: result,
    isFetching,
    error,
    status,
    isUninitialized,
  } = useGetAllNotificationsQuery(user.UserID);
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
  return (
    <View>
      <FlatList
        data={result?.result}
        renderItem={({ item }: { item: INotifications }) => (
          <Notification {...item} />
        )}
        keyExtractor={(item) => item?.NotificationID?.toString()}
      />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({});
