import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { IComments } from "../../../utils/types/newsfeed.types";
import { AppDispatch, RootState } from "../../../store/store";
import getAccessToken from "../../../actions/homeAction";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCommentsAction,
  removeUserCommentAction,
} from "../../../actions/commentAction";
import LoadingIndicator from "../../../components/LoadingIndicator";

const Comments = ({
  UserID,
  CommentText,
  CommentID,
  NewsfeedID,
}: IComments) => {
  const { user } = useSelector((state: RootState) => state.authReducer);
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
    <View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Text>{UserID}</Text>
        <Text>{CommentText}</Text>
      </View>
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({});
