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
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import DisplayFormError from "components/DisplayFormError";
import { joiResolver } from "@hookform/resolvers/joi";
import { IComments } from "utils/types/newsfeed.types";
import { commentSchema } from "utils/validations";
import { AppDispatch, RootState } from "store/store";
import { useDispatch, useSelector } from "react-redux";
import DisplayAlert from "components/CustomAlert";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import {
  newsfeedslice,
  useCommentPostInFeedMutation,
  useNotifyCommentPostInFeedMutation,
} from "reducers/newsfeedReducer";
import getCurrentDate from "utils/helpers/formatDate";
import LoadingIndicator from "components/LoadingIndicator";
import useIsNetworkConnected from "hooks/useIsNetworkConnected";
import { NETWORK_ERROR } from "utils/enums/Errors";
import { useRefetchOnMessage } from "hooks/useRefetchOnMessage";
import HTTP_ERROR from "utils/enums/ERROR_CODES";

const CommentPost = () => {
  const { data } = useGetAccessTokenQuery();
  const { user } = data!;

  const [
    commentPost,
    { status: commentStatus, data: commentData, error: commentErr },
  ] = useCommentPostInFeedMutation();
  const [notifyComment, { data: notifData, status: notifStatus, error }] =
    useNotifyCommentPostInFeedMutation();
  const {
    handleSubmit,
    control,
    reset,
    formState: { isLoading, isSubmitted, errors },
  } = useForm<IComments>({
    resolver: joiResolver(commentSchema),
  });

  const { UserID, PostTitle, NewsfeedID, Username, CommentDate, PostID } =
    useSelector((state: RootState) => state.comment.commentData);

  // const { message, status } = useSelector((state: RootState) => state.comment);
  const { message, status } = useSelector(
    (state: RootState) => state.notification
  );

  const dispatch: AppDispatch = useDispatch();
  useRefetchOnMessage("refresh_post", () => {
    dispatch(newsfeedslice.util.invalidateTags(["newsfeed"]));
  });

  const onInvalid = (errors) => {
    console.log(errors);
  };
  const navigation = useNavigation();

  const { isConnected } = useIsNetworkConnected();

  useEffect(() => {
    if (commentErr?.status === NETWORK_ERROR.FETCH_ERROR && !isConnected) {
      DisplayAlert(
        "Error message",
        "Network Error. Please check your internet connection and try again this action"
      );
    }
    if (commentErr?.status === NETWORK_ERROR.FETCH_ERROR && isConnected) {
      DisplayAlert(
        "Error message",
        "There is a problem within the server side possible maintenance or it crash unexpectedly. We apologize for your inconveniency"
      );
    }
    if (
      commentStatus === "rejected" &&
      commentErr?.status !== NETWORK_ERROR?.FETCH_ERROR
    ) {
      DisplayAlert("Error message", commentErr?.data?.error?.sqlMessage);
    }
    if (commentErr?.status === HTTP_ERROR.BAD_REQUEST) {
      DisplayAlert("Error message", commentErr?.data?.message);
    }
    if (commentStatus === "fulfilled") {
      const fullName = `${user.FirstName} ${user.LastName}`;

      const notify_arg = {
        UserID: UserID,
        PostID: PostID,
        NotificationAuthor: fullName,
        Username: Username,
        NotificationDate: getCurrentDate(),
        PostTitle: PostTitle,
      };
      notifyComment(notify_arg);
      DisplayAlert("Success message", "Successfully commented on this post.");
      reset();
      const delayRedirect = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        navigation.goBack();
      };
      delayRedirect();
    }
  }, [commentStatus]);

  const onComment = async (data: IComments) => {
    const arg = {
      CommentText: data.CommentText,
      UserID: user.UserID,
      NewsfeedID: NewsfeedID,
      CommentDate: getCurrentDate(),
    };
    commentPost(arg);
    // dispatch(commentPostAction(arg));
    // dispatch(getAllCommentsAction(NewsfeedID || 0));
    // dispatch(notifyCommentAction(notify_arg));
    // console.log("notif comment res", message);
    // console.log("notif comment status", status);
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
