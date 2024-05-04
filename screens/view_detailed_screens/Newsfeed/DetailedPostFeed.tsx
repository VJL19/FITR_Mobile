import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { DetailedRootStackNavigatorsParamList } from "../../../utils/types/detailed_screens/DetailedRootStackNavigators";

const DetailedPostFeed = () => {
  const route =
    useRoute<
      RouteProp<DetailedRootStackNavigatorsParamList, "View Post Feed">
    >();

  const {
    PostTitle,
    PostDescription,
    PostImage,
    PostIsLike,
    PostLikes,
    PostAuthor,
    PostDate,
    comments,
  } = route.params;

  return (
    <View>
      <Text>DetailedPosts</Text>
      <Text>{PostTitle}</Text>
      <Text>{PostDescription}</Text>
      <Text>{PostImage}</Text>
      <Text>{PostAuthor}</Text>
      <Text>{PostDate}</Text>
    </View>
  );
};

export default DetailedPostFeed;

const styles = StyleSheet.create({});
