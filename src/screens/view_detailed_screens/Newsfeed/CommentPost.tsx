import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect } from "react";
import { DetailedRootStackNavigatorsParamList } from "utils/types/detailed_screens/DetailedRootStackNavigators";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import DisplayFormError from "components/DisplayFormError";
import { joiResolver } from "@hookform/resolvers/joi";
import { IComments } from "utils/types/newsfeed.types";
import { commentSchema } from "utils/validations";
import { commentPostAction, getAllCommentsAction } from "actions/commentAction";
import { AppDispatch, RootState } from "store/store";
import { useDispatch, useSelector } from "react-redux";
import DisplayAlert from "components/CustomAlert";
import getAccessToken from "actions/homeAction";
import { notifyCommentAction } from "actions/notificationAction";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import {
  useCommentPostInFeedMutation,
  useNotifyCommentPostInFeedMutation,
} from "reducers/newsfeedReducer";

const CommentPost = () => {
  const route =
    useRoute<
      RouteProp<DetailedRootStackNavigatorsParamList, "Comment on Post">
    >();

  const { data } = useGetAccessTokenQuery();
  const { user } = data!;

  const [commentPost, {}] = useCommentPostInFeedMutation();
  const [notifyComment, {}] = useNotifyCommentPostInFeedMutation();
  const {
    handleSubmit,
    control,
    reset,
    formState: { isLoading, isSubmitted, errors },
  } = useForm<IComments>({
    resolver: joiResolver(commentSchema),
  });

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {}, []);
  const {
    UserID,
    PostTitle,
    NewsfeedID,
    PostAuthor,
    Username,
    NotificationDate,
    CommentDate,
    PostID,
  } = route.params;

  // const { message, status } = useSelector((state: RootState) => state.comment);
  const { message, status } = useSelector(
    (state: RootState) => state.notification
  );

  const onInvalid = (errors) => {
    console.log(errors);
  };
  const navigation = useNavigation();

  const notify_arg = {
    UserID: UserID,
    PostID: PostID,
    PostAuthor: PostAuthor,
    Username: Username,
    NotificationDate: NotificationDate,
    PostTitle: PostTitle,
  };
  const onComment = async (data: IComments) => {
    const arg = {
      CommentText: data.CommentText,
      UserID: user.UserID,
      NewsfeedID: NewsfeedID,
      CommentDate: CommentDate,
    };
    commentPost(arg);
    notifyComment(notify_arg);
    // dispatch(commentPostAction(arg));
    // dispatch(getAllCommentsAction(NewsfeedID || 0));
    // dispatch(notifyCommentAction(notify_arg));
    // console.log("notif comment res", message);
    // console.log("notif comment status", status);

    await new Promise((resolve) => setTimeout(resolve, 1500));
    DisplayAlert("Success message", "Successfully commented on this post.");
    navigation.goBack();
    reset();
  };
  return (
    <View>
      <Text>
        You are commenting for {PostTitle} {UserID} {NewsfeedID}
      </Text>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <React.Fragment>
            <Text
              style={{
                color: "#202020",
                fontSize: 18,
                fontFamily: "Inter-Bold",
                letterSpacing: 1,
              }}
            >
              Description
            </Text>

            <TextInput
              multiline={true}
              textAlignVertical="top"
              placeholder="Enter the description"
              placeholderTextColor={"#202020"}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={{
                borderWidth: 1,
                height: 300,
                borderRadius: 8,
                padding: 15,
                color: "#202020",
                borderColor: errors.CommentText ? "#d9534f" : "#202020",
                marginBottom: 10,
                fontSize: 16,
              }}
            />
          </React.Fragment>
        )}
        name="CommentText"
      />

      <DisplayFormError errors={errors.CommentText} />

      <View>
        <Button title="Comment" onPress={handleSubmit(onComment, onInvalid)} />
      </View>
    </View>
  );
};

export default CommentPost;

const styles = StyleSheet.create({});
