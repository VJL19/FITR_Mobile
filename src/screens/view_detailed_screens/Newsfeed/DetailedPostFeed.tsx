import { Button, Text, View } from "react-native";
import React, { useEffect } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { DetailedRootStackNavigatorsParamList } from "utils/types/detailed_screens/DetailedRootStackNavigators";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import { getAllCommentsAction } from "actions/commentAction";
import { FlatList } from "react-native-gesture-handler";
import { IComments } from "utils/types/newsfeed.types";
import Comments from "./Comments";
import LoadingIndicator from "components/LoadingIndicator";
import { checkLikepostAction } from "actions/newsfeedAction";
import DisplayAlert from "components/CustomAlert";
import getCurrentDate from "utils/helpers/formatDate";
import {
  useCheckLikePostMutation,
  useLikePostInFeedMutation,
  useNotifyLikePostInFeedMutation,
  useRemoveNotificationLikeMutation,
  useUnlikePostInFeedMutation,
} from "reducers/newsfeedReducer";
import { useGetAccessTokenQuery } from "reducers/authReducer";

const DetailedPostFeed = () => {
  const route =
    useRoute<
      RouteProp<DetailedRootStackNavigatorsParamList, "View Post Feed">
    >();

  // const { user } = useSelector((state: RootState) => state.authReducer);
  const { comments, isLoading } = useSelector(
    (state: RootState) => state.comment
  );

  const [likePost, { data: likeData, error }] = useLikePostInFeedMutation();
  const [unLikePost, {}] = useUnlikePostInFeedMutation();
  const [notificationLike, {}] = useNotifyLikePostInFeedMutation();
  const [removeNotificationLike, {}] = useRemoveNotificationLikeMutation();
  const [checkPostIsLike, { data: result }] = useCheckLikePostMutation();
  const { data, isError, isFetching, isUninitialized } =
    useGetAccessTokenQuery();

  const { user } = data!;
  // const {
  //   message: nMessage,
  //   status,
  //   result,
  // } = useSelector((state: RootState) => state.newsfeed);

  // const { message, status: nStatus } = useSelector(
  //   (state: RootState) => state.notification
  // );
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
    PostID,
  } = route.params;

  const arg = {
    UserID: user.UserID,
    NewsfeedID: NewsfeedID,
  };

  console.log("PostTitle", PostTitle);
  const notify_arg = {
    UserID: UserID,
    PostID: PostID,
    PostAuthor: PostAuthor,
    Username: Username,
    NotificationDate: getCurrentDate(),
    PostTitle: PostTitle,
  };
  useEffect(() => {
    // dispatch(getAccessToken());
    // dispatch(getAllCommentsAction(NewsfeedID || 0));
    // dispatch(getAllPostsAction());
    // dispatch(checkLikepostAction(arg));
    checkPostIsLike(arg);
  }, []);

  const fullName = `${user.FirstName} ${user.LastName}`;

  const handleUnlike = () => {
    // dispatch(unlikePostAction(arg));
    unLikePost(arg);
    removeNotificationLike({ Username: user.Username, PostID: PostID });
    // dispatch(removeNotificationAction(notify_arg));
    DisplayAlert("Success message", "Unlike post successfully");
    navigation.goBack();
  };

  const handleLike = async () => {
    // dispatch(likePostAction(arg));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    likePost(arg);
    notificationLike(notify_arg);
    console.log("LIKE POST !", error);
    console.log("LIKE POST !", likeData);
    // dispatch(notifyLikeAction(notify_arg));
    DisplayAlert("Success message", "Like post successfully!");
    navigation.goBack();
  };
  // console.log("heyy notif message!", message);
  // console.log("heyy notif status!", nStatus);
  const handleComment = () => {
    navigation.navigate("DetailedScreens", {
      screen: "Comment on Post",
      params: {
        NewsfeedID: NewsfeedID,
        PostTitle: PostTitle,
        UserID: UserID,
        PostAuthor: PostAuthor,
        PostID: PostID,
        Username: Username,
        CommentDate: getCurrentDate(),
        NotificationDate: getCurrentDate(),
      },
    });
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
              result?.result[0]?.PostIsLike === "liked" ? "unliked" : "liked"
            }post`}
            onPress={
              result?.result[0]?.PostIsLike === "liked"
                ? handleUnlike
                : handleLike
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
