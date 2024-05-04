import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Postsfeed = ({
  PostTitle,
  PostDescription,
  PostDate,
  PostAuthor,
  PostIsLike,
  PostLikes,
}: INewsFeed) => {
  return (
    <View style={styles.container}>
      <Text>{PostTitle}</Text>
      <Text>{PostDescription}</Text>
      <Text>{PostDate}</Text>
      <Text>{PostDate}</Text>
      <Text>{PostLikes}</Text>
    </View>
  );
};

export default Postsfeed;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: "teal",
    marginTop: 10,
    width: 300,
  },
});
