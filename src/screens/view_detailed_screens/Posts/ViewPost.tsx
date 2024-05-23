import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import DisplayAlert from "components/CustomAlert";
import LoadingIndicator from "components/LoadingIndicator";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import { setPostData, useDeletePostsMutation } from "reducers/postReducer";
import {
  useDeleteCommentsMutation,
  useDeleteLikesMutation,
  useDeleteNotificationsMutation,
  useDeletePostInFeedMutation,
} from "reducers/newsfeedReducer";
import { AppDispatch, RootState } from "store/store";
import { useDispatch, useSelector } from "react-redux";

const ViewPost = () => {
  const {
    isError,
    data: user,
    isFetching,
    isUninitialized,
  } = useGetAccessTokenQuery();
  const dispatch: AppDispatch = useDispatch();

  const { postData } = useSelector((state: RootState) => state.post);

  const [deletePost, { data }] = useDeletePostsMutation();
  const [deletePostFeed, { data: feedData, status }] =
    useDeletePostInFeedMutation();

  const [deleteComments, {}] = useDeleteCommentsMutation();
  const [deleteLikes, {}] = useDeleteLikesMutation();
  const [deleteNotifications, {}] = useDeleteNotificationsMutation();

  const {
    PostAuthor,
    PostDate,
    PostDescription,
    PostID,
    PostImage,
    PostTitle,
  } = postData;
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
