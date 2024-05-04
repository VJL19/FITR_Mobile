import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { DetailedRootStackNavigatorsParamList } from "../../../utils/types/detailed_screens/DetailedRootStackNavigators";

const ViewPost = () => {
  const route =
    useRoute<RouteProp<DetailedRootStackNavigatorsParamList, "View Post">>();

  const { PostDate, PostDescription, PostImage, PostTitle } = route.params;
  return (
    <View>
      <Text>ViewPost</Text>
      <Text>{PostImage}</Text>
      <Text>{PostTitle}</Text>
      <Text>{PostDescription}</Text>
      <Text>{PostDate}</Text>
    </View>
  );
};

export default ViewPost;

const styles = StyleSheet.create({});
