import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Newsfeed = () => {
  return (
    <View style={styles.container}>
      <Text>Newsfeed</Text>
    </View>
  );
};

export default Newsfeed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#202020",
  },
});
