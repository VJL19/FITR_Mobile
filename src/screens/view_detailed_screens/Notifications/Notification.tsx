import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { INotifications } from "utils/types/notifications.types";
import {
  useMarkAsReadNotificationsMutation,
  useMarkAsUnreadNotificationsMutation,
} from "reducers/notificationReducer";
import DisplayAlert from "components/CustomAlert";
import LoadingIndicator from "components/LoadingIndicator";
import { IMAGE_VALUES } from "utils/enums/DefaultValues";
import avatar from "assets/avatar_default.jpeg";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import { useGetAccessTokenQuery } from "reducers/authReducer";

const Notification = ({
  UserID,
  isMarkRead,
  NotificationText,
  ProfilePic,
  NotificationID,
}: INotifications) => {
  const [markReadNotif, { status: readStat, error, data, status, isError }] =
    useMarkAsReadNotificationsMutation();
  const [markUnreadNotif, { status: unreadStat }] =
    useMarkAsUnreadNotificationsMutation();

  const { data: user } = useGetAccessTokenQuery();

  const navigation = useNavigation<RootStackNavigationProp>();
  const arg = {
    UserID: user?.user?.UserID,
    NotificationID: NotificationID,
  };
  const handleRead = async () => {
    markReadNotif(arg);
    DisplayAlert("Success message", "This notification is successfully read!");
  };
  const handleUnread = async () => {
    markUnreadNotif(arg);
    DisplayAlert(
      "Success message",
      "This notification is successfully unread!"
    );
  };

  console.log("markReadNotif data", data);
  if (readStat === "pending" || unreadStat === "pending") {
    return <LoadingIndicator />;
  }

  const handlePress = () => {
    navigation.navigate("DetailedScreens", {
      screen: "View Image",
      params: { imageUrl: ProfilePic },
    });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={{ width: "20%" }}>
        <Image
          source={
            ProfilePic === IMAGE_VALUES.DEFAULT ? avatar : { uri: ProfilePic }
          }
          style={styles.image}
        />
      </TouchableOpacity>
      <View style={styles.card}>
        <Text numberOfLines={1} ellipsizeMode="clip">
          {NotificationText}
        </Text>
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
    flexDirection: "row",
  },
  card: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 25,
    maxWidth: 250,
  },
  image: {
    width: "auto",
    borderWidth: 2,
    height: 75,
    borderRadius: 150,
    borderColor: "#ff2e00",
  },
});
