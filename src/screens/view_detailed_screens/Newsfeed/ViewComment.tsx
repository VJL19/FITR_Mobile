import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { useNavigation } from "@react-navigation/native";
import { DetailedRootStackNavigationProp } from "utils/types/detailed_screens/DetailedRootStackNavigators";
import { useDeleteUserCommentMutation } from "reducers/newsfeedReducer";
import DisplayAlert from "components/CustomAlert";
import HTTP_ERROR from "utils/enums/ERROR_CODES";
import { NETWORK_ERROR } from "utils/enums/Errors";
import useIsNetworkConnected from "hooks/useIsNetworkConnected";
import DialogBox from "components/DialogBox";

const ViewComment = () => {
  const {
    UserID,
    NewsfeedID,
    CommentID,
    CommentText,
    PostImage,
    PostTitle,
    PostDescription,
    PostDate,
    PostAuthor,
    Username,
    PostID,
  } = useSelector((state: RootState) => state.comment.viewCommentData);

  const [deleteComment, { data, status, error: deleteErr }] =
    useDeleteUserCommentMutation();
  const navigation = useNavigation<DetailedRootStackNavigationProp>();
  const { isConnected } = useIsNetworkConnected();

  useEffect(() => {
    if (deleteErr?.status === NETWORK_ERROR.FETCH_ERROR && !isConnected) {
      DisplayAlert(
        "Error message",
        "Network Error. Please check your internet connection and try again this action"
      );
    }
    if (deleteErr?.status === NETWORK_ERROR.FETCH_ERROR && isConnected) {
      DisplayAlert(
        "Error message",
        "There is a problem within the server side possible maintenance or it crash unexpectedly. We apologize for your inconveniency"
      );
    }
    if (
      status === "rejected" &&
      deleteErr?.status !== NETWORK_ERROR?.FETCH_ERROR
    ) {
      DisplayAlert("Error message", deleteErr?.data?.error?.sqlMessage);
    }
    if (deleteErr?.status === HTTP_ERROR.BAD_REQUEST) {
      DisplayAlert("Error message", deleteErr?.data?.message);
    }
    if (status === "fulfilled") {
      DisplayAlert("Success message", "This comment is removed successfully!");
      const delayGoBack = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        navigation.goBack();
      };

      delayGoBack();
    }
  }, [status, data]);
  const handleDeleteComment = () => {
    DialogBox({
      dialogTitle: "Delete your comment?",
      dialogDescription:
        "This action cannot be undone and will delete this comment.",
      async handlePress(args) {
        deleteComment(CommentID);
      },
    });
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
      }}
    >
      <ScrollView style={{ flex: 1 }}>
        <Text style={styles.text}>
          Your comment for <Text style={styles.title}> {PostTitle}</Text> posted
          by: <Text style={styles.title}>{PostAuthor}</Text>
        </Text>

        <View style={{ marginTop: 50 }}>
          <Text style={styles.title}>
            Your Comment: <Text style={styles.text}>{CommentText}</Text>
          </Text>
        </View>
      </ScrollView>

      <View style={{ marginBottom: 10 }}>
        <Button
          title="Delete Comment"
          color={"#ff2e00"}
          onPress={handleDeleteComment}
        />
      </View>
    </View>
  );
};

export default ViewComment;

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
