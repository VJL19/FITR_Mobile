import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { IComments } from "utils/types/newsfeed.types";
import { AppDispatch, RootState } from "store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCommentsAction,
  removeUserCommentAction,
} from "actions/commentAction";
import LoadingIndicator from "components/LoadingIndicator";
import { useNavigation } from "@react-navigation/native";
import { DetailedRootStackNavigationProp } from "utils/types/detailed_screens/DetailedRootStackNavigators";
import { setViewCommentData } from "reducers/commentReducer";
import { useGetSpecificPostQuery } from "reducers/newsfeedReducer";

const Comments = ({
  UserID,
  CommentText,
  CommentID,
  NewsfeedID,
  ProfilePic,
  Username,
  PostTitle,
  PostDescription,
  PostAuthor,
}: IComments) => {
  const dispatch: AppDispatch = useDispatch();

  const { message, status, isLoading } = useSelector(
    (state: RootState) => state.comment
  );

  const { data } = useGetSpecificPostQuery(NewsfeedID);

  const navigation = useNavigation<DetailedRootStackNavigationProp>();

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

  const handleViewComment = () => {
    navigation.navigate("View Comment");
    const arg = {
      UserID: 0,
      NewsfeedID: 0,
      CommentID: CommentID,
      CommentText: CommentText,
      PostImage: "",
      PostTitle: data?.result[0]?.PostTitle,
      PostDescription: data?.result[0]?.PostDescription,
      PostDate: "",
      PostAuthor: data?.result[0]?.PostAuthor,
      Username: data?.result[0]?.Username,
      PostID: 0,
    };
    dispatch(setViewCommentData(arg));
  };
  if (isLoading) {
    return <LoadingIndicator />;
  }
  return (
    <TouchableOpacity onPress={handleViewComment} style={styles.container}>
      <Image source={{ uri: ProfilePic }} style={styles.image} />
      <View>
        <Text style={styles.text}>@{Username}</Text>
        <Text numberOfLines={1} style={styles.text}>
          {CommentText}
        </Text>
      </View>
    </TouchableOpacity>
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
    width: 150,
  },
});
