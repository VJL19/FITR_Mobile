import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ProcessCheckout = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>ProcessCheckout</Text>
    </View>
  );
};

export default ProcessCheckout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: "#f5f5f5",
  },
});
