import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { INotifications } from "utils/types/notifications.types";
import {
  setViewNotification,
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
import useIsNetworkConnected from "hooks/useIsNetworkConnected";
import { NETWORK_ERROR } from "utils/enums/Errors";
import HTTP_ERROR from "utils/enums/ERROR_CODES";
import { AppDispatch } from "store/store";
import { useDispatch } from "react-redux";

const Notification = ({
  UserID,
  PostID,
  isMarkRead,
  NotificationText,
  NotificationDate,
  NotificationAuthor,
  ProfilePic,
  NotificationID,
}: INotifications) => {
  const [markReadNotif, { status: readStat, error: readErr, data, isError }] =
    useMarkAsReadNotificationsMutation();
  const [markUnreadNotif, { status: unreadStat, error: unreadErr }] =
    useMarkAsUnreadNotificationsMutation();

  const { data: user } = useGetAccessTokenQuery();

  const { isConnected } = useIsNetworkConnected();

  const dispatch: AppDispatch = useDispatch();
  // console.log("read stat", readStat);
  useEffect(() => {
    if (readErr?.status === NETWORK_ERROR.FETCH_ERROR && !isConnected) {
      DisplayAlert(
        "Error message",
        "Network Error. Please check your internet connection and try again this action"
      );
    }
    if (readErr?.status === NETWORK_ERROR.FETCH_ERROR && isConnected) {
      DisplayAlert(
        "Error message",
        "There is a problem within the server side possible maintenance or it crash unexpectedly. We apologize for your inconveniency"
      );
    }
    if (
      readStat === "rejected" &&
      readErr?.status !== NETWORK_ERROR?.FETCH_ERROR
    ) {
      DisplayAlert("Error message", readErr?.data?.error?.sqlMessage);
    }
    if (readErr?.status === HTTP_ERROR.BAD_REQUEST) {
      DisplayAlert("Error message", readErr?.data?.message);
    }
    if (readStat === "fulfilled") {
      DisplayAlert(
        "Success message",
        "This notification is successfully read!"
      );
    }
  }, [readStat]);
  useEffect(() => {
    if (unreadErr?.status === NETWORK_ERROR.FETCH_ERROR && !isConnected) {
      DisplayAlert(
        "Error message",
        "Network Error. Please check your internet connection and try again this action"
      );
    }
    if (unreadErr?.status === NETWORK_ERROR.FETCH_ERROR && isConnected) {
      DisplayAlert(
        "Error message",
        "There is a problem within the server side possible maintenance or it crash unexpectedly. We apologize for your inconveniency"
      );
    }
    if (
      unreadStat === "rejected" &&
      unreadErr?.status !== NETWORK_ERROR?.FETCH_ERROR
    ) {
      DisplayAlert("Error message", unreadErr?.data?.error?.sqlMessage);
    }
    if (unreadErr?.status === HTTP_ERROR.BAD_REQUEST) {
      DisplayAlert("Error message", unreadErr?.data?.message);
    }
    if (unreadStat === "fulfilled") {
      DisplayAlert(
        "Success message",
        "This notification is successfully unread!"
      );
    }
  }, [unreadStat]);
  const navigation = useNavigation<RootStackNavigationProp>();
  const arg = {
    UserID: user?.user?.UserID,
    NotificationID: NotificationID,
  };
  const handleRead = async () => {
    markReadNotif(arg);
  };
  const handleUnread = async () => {
    markUnreadNotif(arg);
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
  const handleNavigate = () => {
    const arg = {
      UserID,
      isMarkRead,
      NotificationText,
      PostID: PostID,
      NotificationDate,
      NotificationAuthor,
      ProfilePic,
      NotificationID,
    };
    dispatch(setViewNotification(arg));
    navigation.navigate("DetailedScreens", {
      screen: "View Detailed Notifications",
    });
  };
  return (
    <TouchableOpacity onPress={handleNavigate}>
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
            <Button title="Unread" onPress={handleUnread} color="#ff2e00" />
          ) : (
            <Button title="Read" onPress={handleRead} color="#ff2e00" />
          )}
        </View>
      </View>
    </TouchableOpacity>
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
