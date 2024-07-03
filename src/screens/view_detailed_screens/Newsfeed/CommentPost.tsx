import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { DetailedRootStackNavigatorsParamList } from "utils/types/detailed_screens/DetailedRootStackNavigators";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import DisplayFormError from "components/DisplayFormError";
import { joiResolver } from "@hookform/resolvers/joi";
import { IComments } from "utils/types/newsfeed.types";
import { commentSchema } from "utils/validations";
import { RootState } from "store/store";
import { useSelector } from "react-redux";
import DisplayAlert from "components/CustomAlert";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import {
  useCommentPostInFeedMutation,
  useNotifyCommentPostInFeedMutation,
} from "reducers/newsfeedReducer";
import getCurrentDate from "utils/helpers/formatDate";
import LoadingIndicator from "components/LoadingIndicator";

const CommentPost = () => {
  const { data } = useGetAccessTokenQuery();
  const { user } = data!;

  const [commentPost, { status: commentStatus, data: commentData, error }] =
    useCommentPostInFeedMutation();
  const [notifyComment, {}] = useNotifyCommentPostInFeedMutation();
  const {
    handleSubmit,
    control,
    reset,
    formState: { isLoading, isSubmitted, errors },
  } = useForm<IComments>({
    resolver: joiResolver(commentSchema),
  });

  const {
    UserID,
    PostTitle,
    NewsfeedID,
    NotificationAuthor,
    Username,
    CommentDate,
    PostID,
  } = useSelector((state: RootState) => state.comment.commentData);

  // const { message, status } = useSelector((state: RootState) => state.comment);
  const { message, status } = useSelector(
    (state: RootState) => state.notification
  );

  const onInvalid = (errors) => {
    console.log(errors);
  };
  const navigation = useNavigation();
  const fullName = `${user.FirstName} ${user.LastName}`;

  const notify_arg = {
    UserID: UserID,
    PostID: PostID,
    NotificationAuthor: fullName,
    Username: Username,
    NotificationDate: getCurrentDate(),
    PostTitle: PostTitle,
  };
  const onComment = async (data: IComments) => {
    const arg = {
      CommentText: data.CommentText,
      UserID: user.UserID,
      NewsfeedID: NewsfeedID,
      CommentDate: getCurrentDate(),
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

  if (commentStatus === "pending") {
    return <LoadingIndicator />;
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
      }}
    >
      <ScrollView style={{ flex: 1 }}>
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
                Comment
              </Text>

              <TextInput
                multiline={true}
                textAlignVertical="top"
                placeholder="Enter your comment"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={{
                  borderWidth: 1,
                  height: 350,
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
      </ScrollView>

      <View style={{ marginBottom: 10 }}>
        <Button
          title="Comment"
          color={"#ff2e00"}
          onPress={handleSubmit(onComment, onInvalid)}
        />
      </View>
    </View>
  );
};

export default CommentPost;

const styles = StyleSheet.create({});
