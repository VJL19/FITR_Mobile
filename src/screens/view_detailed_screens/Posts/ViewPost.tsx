import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { DetailedRootStackNavigatorsParamList } from "utils/types/detailed_screens/DetailedRootStackNavigators";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import { deletePostAction, getPostAction } from "actions/postAction";
import { deletePostinFeedAction } from "actions/newsfeedAction";
import DisplayAlert from "components/CustomAlert";
import getAccessToken from "actions/homeAction";
import LoadingIndicator from "components/LoadingIndicator";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import { useDeletePostsMutation } from "reducers/postReducer";
import { useDeletePostInFeedMutation } from "reducers/newsfeedReducer";

const ViewPost = () => {
  const route =
    useRoute<RouteProp<DetailedRootStackNavigatorsParamList, "View Post">>();

  const { PostDate, PostDescription, PostImage, PostTitle, PostID } =
    route.params;

  // const { message, postItems, status } = useSelector(
  //   (state: RootState) => state.post
  // );

  const {
    isError,
    data: user,
    isFetching,
    isUninitialized,
  } = useGetAccessTokenQuery();
  // const { user, isLoading } = useSelector(
  //   (state: RootState) => state.authReducer
  // );

  const [deletePost, { data }] = useDeletePostsMutation();
  const [deletePostFeed, { data: feedData, status }] =
    useDeletePostInFeedMutation();
  useEffect(() => {
    // dispatch(getAccessToken());
    // navigation.addListener("blur", () => {
    //   dispatch(getPostAction(user.UserID));
    // });
  }, []);

  const navigation = useNavigation();

  const dispatch: AppDispatch = useDispatch();

  const handleDelete = async () => {
    // dispatch(deletePostAction(PostID || 0));
    deletePost(PostID);
    deletePostFeed(PostID);
    // dispatch(deletePostinFeedAction(PostID || 0));
    // dispatch(getPostAction(user.UserID));

    DisplayAlert("Success message", "Post deleted successfully!");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("delete in feed", status);
    console.log("delete in feed", feedData);
    if (status === "fulfilled") {
      navigation.goBack();
    }
    console.log("deleted pressed");
  };
  // console.log("delete message", message);
  // console.log("delete message", postItems);
  // console.log("delete message", isLoading);

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
