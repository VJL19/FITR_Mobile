import { Button, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { IComments } from "utils/types/newsfeed.types";
import { AppDispatch, RootState } from "store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCommentsAction,
  removeUserCommentAction,
} from "actions/commentAction";
import LoadingIndicator from "components/LoadingIndicator";

const Comments = ({
  UserID,
  CommentText,
  CommentID,
  NewsfeedID,
  ProfilePic,
  Username,
}: IComments) => {
  const dispatch: AppDispatch = useDispatch();

  const { message, status, isLoading } = useSelector(
    (state: RootState) => state.comment
  );

  const handleRemoveComment = () => {
    const arg = {
      NewsfeedID: NewsfeedID,
      CommentID: CommentID,
    };
    dispatch(getAllCommentsAction(NewsfeedID || 0));
    dispatch(removeUserCommentAction(arg));
    console.log("status", status);

    if (status === 200) {
      dispatch(getAllCommentsAction(NewsfeedID || 0));
    }
    console.log("status", message);
  };
  if (isLoading) {
    return <LoadingIndicator />;
  }
  return (
    <View style={styles.container}>
      <Image source={{ uri: ProfilePic }} style={styles.image} />
      <View>
        <Text style={styles.text}>@{Username}</Text>
        <Text style={styles.text}>{CommentText}</Text>
      </View>
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: 120,
    width: 300,
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginLeft: 10,
    borderWidth: 2,
    borderColor: "#E12900",
  },
  image: {
    height: 60,
    borderRadius: 50,
    width: "20%",
    borderWidth: 1.5,
    borderColor: "#202020",
  },
  text: {
    color: "#202020",
  },
});
