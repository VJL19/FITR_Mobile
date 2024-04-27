import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Subscription = () => {
  return (
    <View style={styles.container}>
      <Text>Subscription</Text>
    </View>
  );
};

export default Subscription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#202020",
  },
});
