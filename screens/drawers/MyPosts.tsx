import { StyleSheet, Text, View } from "react-native";
import React from "react";

const MyPosts = () => {
  return (
    <View style={styles.container}>
      <Text>MyPosts</Text>
    </View>
  );
};

export default MyPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#202020",
  },
});
