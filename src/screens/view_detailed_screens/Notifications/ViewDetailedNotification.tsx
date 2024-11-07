import { StyleSheet, Text, View, Image, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import { IMAGE_VALUES } from "utils/enums/DefaultValues";
import avatar from "assets/avatar_default.jpeg";
import DisplayAlert from "components/CustomAlert";
import LoadingIndicator from "components/LoadingIndicator";
import useIsNetworkConnected from "hooks/useIsNetworkConnected";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import {
  setViewNotification,
  useGetAllNotificationsQuery,
  useMarkAsReadNotificationsMutation,
  useMarkAsUnreadNotificationsMutation,
} from "reducers/notificationReducer";
import HTTP_ERROR from "utils/enums/ERROR_CODES";
import { NETWORK_ERROR } from "utils/enums/Errors";
import { setPostData, useGetPostsQuery } from "reducers/postReducer";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import { setCommentData } from "reducers/commentReducer";
import { useGetAllPostInFeedQuery } from "reducers/newsfeedReducer";

const ViewDetailedNotification = () => {
  const {
    UserID,
    isMarkRead,
    NotificationText,
    NotificationDate,
    NotificationAuthor,
    ProfilePic,
    PostID,
    NotificationID,
  } = useSelector(
    (state: RootState) => state.notification.viewNotificationPayload
  );
  const { data: user } = useGetAccessTokenQuery();
  const {
    data: notifData,
    isFetching,
    error,
    status,
    isUninitialized,
    refetch,
  } = useGetAllNotificationsQuery(user?.user?.UserID, {
    refetchOnMountOrArgChange: true,
  });

  const { data: postData, error: errorPst } = useGetAllPostInFeedQuery(
    user?.user?.SubscriptionType,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [markReadNotif, { status: readStat, error: readErr, data, isError }] =
    useMarkAsReadNotificationsMutation();
  const [markUnreadNotif, { status: unreadStat, error: unreadErr }] =
    useMarkAsUnreadNotificationsMutation();

  const dispatch: AppDispatch = useDispatch();
  const navigation = useNavigation<RootStackNavigationProp>();

  console.log(isMarkRead === "true");

  const { isConnected } = useIsNetworkConnected();
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
      refetch();
    }
  }, [readStat]);

  useEffect(() => {
    if (status === "fulfilled") {
      notifData?.result
        ?.filter((notifItem) => notifItem?.NotificationID === NotificationID)
        .forEach((notifItem) => {
          const arg = {
            isMarkRead: notifItem.isMarkRead,
          };
          const isMarkRead = notifItem.isMarkRead === "true" ? "true" : "false";
          console.log("found notif item", notifItem);
          dispatch(
            setViewNotification({
              UserID,
              NotificationText,
              PostID,
              NotificationDate,
              NotificationAuthor,
              ProfilePic,
              NotificationID,
              isMarkRead: isMarkRead,
            })
          );
        });
    }
  }, [status]);

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

  console.log("HOORAY", PostID);
  const handleViewPost = () => {
    postData?.result
      ?.filter((postItem) => postItem.PostID === PostID)
      ?.map((postItem) => {
        const arg = {
          PostTitle: postItem.PostTitle,
          PostDescription: postItem.PostDescription,
          PostDate: postItem.PostDate,
          PostAuthor: postItem.PostAuthor,
          PostImage: postItem.PostImage,
          NewsfeedID: postItem.NewsfeedID,
          UserID: postItem.UserID,
          PostID: postItem.PostID,
        };

        dispatch(setCommentData(arg));
      });
    navigation.navigate("DetailedScreens", {
      screen: "View Post Feed",
    });
  };
  // console.log("markReadNotif data", data);
  if (readStat === "pending" || unreadStat === "pending") {
    return <LoadingIndicator />;
  }

  console.log("text notif", NotificationText);
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={
            ProfilePic === IMAGE_VALUES.DEFAULT ? avatar : { uri: ProfilePic }
          }
          style={styles.image}
        />
        <Text style={styles.text}>
          Notification Date:{" "}
          {new Date(NotificationDate?.split(" , ")?.[0]).toDateString()}
        </Text>
        <Text style={styles.text}>{NotificationText}</Text>
      </View>

      <View style={{ width: "90%" }}>
        {isMarkRead === "true" ? (
          <View style={{ flexDirection: "column", gap: 25 }}>
            <Button title="Unread" onPress={handleUnread} color="#ff2e00" />
            <Button
              title="View Post"
              onPress={handleViewPost}
              color="#ff2e00"
            />
          </View>
        ) : (
          <View style={{ flexDirection: "column", gap: 25 }}>
            <Button title="Read" onPress={handleRead} color="#ff2e00" />
            <Button
              title="View Post"
              onPress={handleViewPost}
              color="#ff2e00"
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default ViewDetailedNotification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
  image: {
    alignSelf: "center",
    width: 250,
    borderWidth: 2,
    height: "48%",
    borderRadius: 150,
    borderColor: "#ff2e00",
  },
});
