import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { DetailedRootStackNavigatorsParamList } from "../../../utils/types/detailed_screens/DetailedRootStackNavigators";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import getAccessToken from "../../../actions/homeAction";
import { RootStackNavigationProp } from "../../../utils/types/navigators/RootStackNavigators";
import { getAllCommentsAction } from "../../../actions/commentAction";
import { FlatList } from "react-native-gesture-handler";
import { IComments } from "../../../utils/types/newsfeed.types";
import Comments from "./Comments";
import LoadingIndicator from "../../../components/LoadingIndicator";
import {
  checkLikepostAction,
  getAllPostsAction,
  likePostAction,
  unlikePostAction,
} from "../../../actions/newsfeedAction";
import DisplayAlert from "../../../components/CustomAlert";
import {
  notifyLikeAction,
  removeNotificationAction,
} from "../../../actions/notificationAction";
import getCurrentDate from "../../../utils/helpers/formatDate";

const DetailedPostFeed = () => {
  const route =
    useRoute<
      RouteProp<DetailedRootStackNavigatorsParamList, "View Post Feed">
    >();

  const { user } = useSelector((state: RootState) => state.authReducer);
  const { comments, isLoading } = useSelector(
    (state: RootState) => state.comment
  );

  const {
    message: nMessage,
    status,
    result,
  } = useSelector((state: RootState) => state.newsfeed);

  const { message, status: nStatus } = useSelector(
    (state: RootState) => state.notification
  );

  const navigation = useNavigation<RootStackNavigationProp>();
  const dispatch: AppDispatch = useDispatch();
  const {
    PostTitle,
    PostDescription,
    PostImage,
    PostIsLike,
    PostLikes,
    PostAuthor,
    PostDate,
    NewsfeedID,
    UserID,
    Username,
  } = route.params;

  const arg = {
    UserID: user.UserID,
    NewsfeedID: NewsfeedID,
  };

  const notify_arg = {
    UserID: UserID,
    PostAuthor: PostAuthor,
    Username: Username,
    NotificationDate: getCurrentDate(),
  };
  useEffect(() => {
    dispatch(getAccessToken());
    dispatch(getAllCommentsAction(NewsfeedID || 0));
    // dispatch(getAllPostsAction());
    dispatch(checkLikepostAction(arg));
  }, []);

  const fullName = `${user.FirstName} ${user.LastName}`;

  const handleUnlike = () => {
    dispatch(getAllPostsAction());
    if (status === 200) {
      dispatch(unlikePostAction(arg));
      dispatch(removeNotificationAction(notify_arg));
      DisplayAlert("Success message", "Unliked post successfully");
      // navigation.goBack();
    }
  };

  const handleLike = () => {
    dispatch(getAllPostsAction());
    if (status === 200) {
      dispatch(likePostAction(arg));
      dispatch(notifyLikeAction(notify_arg));
      DisplayAlert("Success message", "Liked post successfully");
      // navigation.goBack();
    }
  };
  console.log("heyy notif message!", message);
  console.log("heyy notif status!", nStatus);
  const handleComment = () => {
    navigation.navigate("DetailedScreens", {
      screen: "Comment on Post",
      params: {
        NewsfeedID: NewsfeedID,
        PostTitle: PostTitle,
        UserID: UserID,
        PostAuthor: PostAuthor,
        Username: Username,
        CommentDate: getCurrentDate(),
        NotificationDate: getCurrentDate(),
      },
    });
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }
  return (
    <View>
      <Text>DetailedPosts</Text>
      <Text>{PostTitle}</Text>
      <Text>{PostDescription}</Text>
      <Text>{PostImage}</Text>
      <Text>{PostAuthor}</Text>
      <Text>{PostDate}</Text>
      <FlatList
        alwaysBounceVertical={true}
        data={comments}
        renderItem={({ item }: { item: IComments }) => <Comments {...item} />}
        keyExtractor={(item) => item.CommentID?.toString()}
      />
      {fullName == PostAuthor ||
        (!isLoading && (
          <Button
            title={`${
              result?.[0]?.PostIsLike === "liked" ? "unliked" : "liked"
            }post`}
            onPress={
              result?.[0]?.PostIsLike === "liked" ? handleUnlike : handleLike
            }
          />
        ))}
      {fullName == PostAuthor || (
        <Button title="comment on post" onPress={handleComment} />
      )}
    </View>
  );
};

export default DetailedPostFeed;

const styles = StyleSheet.create({});
