import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { INotifications } from "utils/types/notifications.types";
import {
  useMarkAsReadNotificationsMutation,
  useMarkAsUnreadNotificationsMutation,
} from "reducers/notificationReducer";
import DisplayAlert from "components/CustomAlert";
import LoadingIndicator from "components/LoadingIndicator";

const Notification = ({
  UserID,
  isMarkRead,
  NotificationText,
}: INotifications) => {
  const [markReadNotif, { status: readStat, error, data, status, isError }] =
    useMarkAsReadNotificationsMutation();
  const [markUnreadNotif, { status: unreadStat }] =
    useMarkAsUnreadNotificationsMutation();

  const arg = {
    UserID: UserID,
  };
  const handleRead = async () => {
    markReadNotif(arg);
    DisplayAlert("Success message", "This notification is successfully read!");
  };
  console.log("markReadNotif data", data);
  console.log("markReadNotif error", error);
  console.log("markReadNotif isError", isError);
  console.log("markReadNotif status", status);
  const handleUnread = async () => {
    markUnreadNotif(arg);
    DisplayAlert(
      "Success message",
      "This notification is successfully unread!"
    );
  };
  if (readStat === "pending" || unreadStat === "pending") {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text>{NotificationText}</Text>
        {isMarkRead === "true" ? (
          <Button title="Unread" onPress={handleUnread} />
        ) : (
          <Button title="Read" onPress={handleRead} />
        )}
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 25,
  },
});
