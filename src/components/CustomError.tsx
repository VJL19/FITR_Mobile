import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const CustomError = () => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="error" size={75} color={"#d9534f"} />
      <Text style={styles.textStyle}>
        You are not authenticated! Please login again
      </Text>
    </View>
  );
};

export default CustomError;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "700",
    color: "#d9534f",
  },
});
