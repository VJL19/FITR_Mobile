import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { INotifications } from "utils/types/notifications.types";

const Notification = ({
  UserID,
  isMarkRead,
  NotificationText,
}: INotifications) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text>{NotificationText}</Text>
        {!isMarkRead ? <Button title="Unread" /> : <Button title="Read" />}
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
