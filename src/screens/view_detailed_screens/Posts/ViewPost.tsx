import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { DetailedRootStackNavigatorsParamList } from "utils/types/detailed_screens/DetailedRootStackNavigators";
import DisplayAlert from "components/CustomAlert";
import LoadingIndicator from "components/LoadingIndicator";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import { useDeletePostsMutation } from "reducers/postReducer";
import {
  useDeleteCommentsMutation,
  useDeleteLikesMutation,
  useDeleteNotificationsMutation,
  useDeletePostInFeedMutation,
} from "reducers/newsfeedReducer";

const ViewPost = () => {
  const route =
    useRoute<RouteProp<DetailedRootStackNavigatorsParamList, "View Post">>();

  const { PostDate, PostDescription, PostImage, PostTitle, PostID } =
    route.params;

  const {
    isError,
    data: user,
    isFetching,
    isUninitialized,
  } = useGetAccessTokenQuery();

  const [deletePost, { data }] = useDeletePostsMutation();
  const [deletePostFeed, { data: feedData, status }] =
    useDeletePostInFeedMutation();

  const [deleteComments, {}] = useDeleteCommentsMutation();
  const [deleteLikes, {}] = useDeleteLikesMutation();
  const [deleteNotifications, {}] = useDeleteNotificationsMutation();
  useEffect(() => {}, []);

  const navigation = useNavigation();

  const handleDelete = async () => {
    deletePost(PostID);
    deletePostFeed(PostID);
    deleteComments(PostID);
    deleteLikes(PostID);
    deleteNotifications(PostID);

    DisplayAlert("Success message", "Post deleted successfully!");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("delete in feed", status);
    console.log("delete in feed", feedData);
    navigation.goBack();
    if (status === "fulfilled") {
    }
    console.log("deleted pressed");
  };

  if (isFetching || isUninitialized) {
    return <LoadingIndicator />;
  }
  return (
    <View>
      <Text>ViewPost</Text>
      <Text>{PostID}</Text>
      <Text>{PostImage}</Text>
      <Text>{PostTitle}</Text>
      <Text>{PostDescription}</Text>
      <Text>{PostDate}</Text>
      <Button title="Delete Post" onPress={handleDelete} />
    </View>
  );
};

export default ViewPost;

const styles = StyleSheet.create({});
