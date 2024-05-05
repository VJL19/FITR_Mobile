import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { IComments } from "../../../utils/types/newsfeed.types";
import { AppDispatch, RootState } from "../../../store/store";
import getAccessToken from "../../../actions/homeAction";
import { useDispatch, useSelector } from "react-redux";

const Comments = ({ UserID, CommentText }: IComments) => {
  const { user } = useSelector((state: RootState) => state.authReducer);
  const dispatch: AppDispatch = useDispatch();

  return (
    <View>
      <Text>{UserID}</Text>
      <Text>{CommentText}</Text>
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({});
