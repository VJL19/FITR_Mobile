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

const Notifications = () => {
  const dispatch: AppDispatch = useDispatch();

  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.authReducer
  );
  const { message, status, result, isLoading } = useSelector(
    (state: RootState) => state.notification
  );

  const arg = {
    UserID: user.UserID,
  };
  useEffect(() => {
    dispatch(getAccessToken());
    dispatch(getNotificationAction(arg));
  }, []);
  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (!isAuthenticated) {
    return <Text>You are not authenticated please login again</Text>;
  }
  return (
    <View>
      <FlatList
        data={result}
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
