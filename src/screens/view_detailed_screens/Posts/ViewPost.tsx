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
import DialogBox from "components/DialogBox";

const ViewPost = () => {
  const {
    isError,
    data: user,
    isFetching,
    isUninitialized,
  } = useGetAccessTokenQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });
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
    DialogBox({
      dialogTitle: "Confirmation",
      dialogDescription: "Are you sure you want to delete this post?",
      params: PostID,
      async handlePress(args) {
        deletePost(args);
        deletePostFeed(args);
        deleteComments(args);
        deleteLikes(args);
        deleteNotifications(args);
        DisplayAlert("Success message", "Post deleted successfully!");
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("delete in feed", status);
        console.log("delete in feed", feedData);
        navigation.goBack();
      },
    });

    if (status === "fulfilled") {
    }
  };

  if (isError) {
    return (
      <View>
        <Text>You are not authenticated!</Text>
      </View>
    );
  }
  if (isFetching || isUninitialized) {
    return <LoadingIndicator />;
  }
  return (
    <View style={styles.container}>
      <View>
        <Text>ViewPost</Text>
        <Text>{PostID}</Text>
        <Text>{PostImage}</Text>
        <Text>{PostTitle}</Text>
        <Text>{PostDescription}</Text>
        <Text>{PostDate}</Text>
      </View>
      <Button title="Delete Post" onPress={handleDelete} />
    </View>
  );
};

export default ViewPost;

const styles = StyleSheet.create({
  container: {
    flex: 0.95,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
