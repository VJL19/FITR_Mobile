import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { DetailedRootStackNavigatorsParamList } from "../../../utils/types/detailed_screens/DetailedRootStackNavigators";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { deletePostAction, getPostAction } from "../../../actions/postAction";
import { deletePostinFeedAction } from "../../../actions/newsfeedAction";
import DisplayAlert from "../../../components/CustomAlert";
import getAccessToken from "../../../actions/homeAction";
import LoadingIndicator from "../../../components/LoadingIndicator";

const ViewPost = () => {
  const route =
    useRoute<RouteProp<DetailedRootStackNavigatorsParamList, "View Post">>();

  const { PostDate, PostDescription, PostImage, PostTitle, PostID } =
    route.params;

  const { message, postItems, status } = useSelector(
    (state: RootState) => state.post
  );
  const { user, isLoading } = useSelector(
    (state: RootState) => state.authReducer
  );

  useEffect(() => {
    dispatch(getAccessToken());

    navigation.addListener("blur", () => {
      dispatch(getPostAction(user.UserID));
    });
  }, []);

  const navigation = useNavigation();

  const dispatch: AppDispatch = useDispatch();

  const handleDelete = async () => {
    dispatch(deletePostAction(PostID || 0));
    dispatch(deletePostinFeedAction(PostID || 0));

    if (status === 200) {
      DisplayAlert("Success message", "Post deleted successfully!");
      navigation.goBack();
    }
    console.log("deleted pressed");
  };
  console.log("delete message", message);
  console.log("delete message", postItems);
  console.log("delete message", isLoading);

  if (isLoading) {
    return <LoadingIndicator />;
  }
  return (
    <View>
      <Text>ViewPost</Text>
      <Text>{PostID}</Text>
      <Text>{PostImage}</Text>
      <Text>{PostTitle}</Text>
      <Text>{PostDescription}</Text>
      <Text>{PostDate}</Text>
      <Button title="Delete Post" onPress={handleDelete} />
    </View>
  );
};

export default ViewPost;

const styles = StyleSheet.create({});
