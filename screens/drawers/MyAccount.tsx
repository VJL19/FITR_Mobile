import { StyleSheet, Text, View } from "react-native";
import React from "react";

const MyAccount = () => {
  return (
    <View style={styles.container}>
      <Text>MyAccount</Text>
    </View>
  );
};

export default MyAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",
    backgroundColor: "#202020",
  },
});
