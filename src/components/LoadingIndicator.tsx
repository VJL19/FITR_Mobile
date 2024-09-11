import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";

const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <View style={styles.boxStyle}>
        <ActivityIndicator size="large" color="#f5f5f5" />
        <View style={styles.textContainer}>
          <Text style={styles.loadingText}>Loading Please wait...</Text>
        </View>
      </View>
    </View>
  );
};

export default LoadingIndicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  boxStyle: {
    flexDirection: "row",
    height: 100,
    gap: 15,
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    backgroundColor: "rgba(0,0,0,.65)",
    borderRadius: 8,
  },
  textContainer: {
    maxWidth: 110,
  },
  loadingText: {
    color: "#f5f5f5",
  },
});
