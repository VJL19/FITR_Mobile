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
import {
  CommonActions,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
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
  useEditCommentPostInFeedMutation,
} from "reducers/newsfeedReducer";
import getCurrentDate from "utils/helpers/formatDate";
import LoadingIndicator from "components/LoadingIndicator";
import useIsNetworkConnected from "hooks/useIsNetworkConnected";
import { NETWORK_ERROR } from "utils/enums/Errors";
import { useRefetchOnMessage } from "hooks/useRefetchOnMessage";
import HTTP_ERROR from "utils/enums/ERROR_CODES";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";

const EditComment = () => {
  const { data } = useGetAccessTokenQuery();
  const { user } = data!;

  const [
    editComment,
    { status: commentStatus, data: commentData, error: commentErr },
  ] = useEditCommentPostInFeedMutation();

  const {
    handleSubmit,
    control,
    reset,
    formState: { isLoading, isSubmitted, errors },
  } = useForm<IComments>({
    resolver: joiResolver(commentSchema),
  });

  const {
    CommentID,
    CommentText,
    PostImage,
    PostDescription,
    PostDate,
    PostAuthor,
  } = useSelector((state: RootState) => state.comment.viewCommentData);

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
  const navigation = useNavigation<RootStackNavigationProp>();

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

      DisplayAlert(
        "Success message",
        "Successfully edited your comment for this post."
      );
      reset();
      const delayRedirect = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        navigation.navigate("DetailedScreens", { screen: "View Post Feed" });
      };
      delayRedirect();
    }
  }, [commentStatus]);

  const onComment = async (data: IComments) => {
    const arg = {
      CommentID: CommentID,
      CommentText: data.CommentText,
      CommentDate: getCurrentDate(),
    };
    editComment(arg);
    // dispatch(EditCommentAction(arg));
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
        <Text style={styles.text}>
          You are commenting for <Text style={styles.title}>{PostTitle}</Text>{" "}
          Posted By <Text style={styles.title}>{PostAuthor}</Text>
        </Text>

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <React.Fragment>
              <Text style={styles.title}>Comment: </Text>

              <TextInput
                multiline={true}
                textAlignVertical="top"
                placeholder="Enter your comment"
                onBlur={onBlur}
                onChangeText={onChange}
                defaultValue={CommentText}
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
          title="Edit comment"
          color={"#ff2e00"}
          onPress={handleSubmit(onComment, onInvalid)}
        />
      </View>
    </View>
  );
};

export default EditComment;

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    fontFamily: "Inter-Regular",
  },
  title: {
    fontSize: 25,
    fontFamily: "Inter-Bold",
  },
});
