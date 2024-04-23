import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";

const LoadingIndicator = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="large" color="#131313" />
    </View>
  );
};

export default LoadingIndicator;

const styles = StyleSheet.create({});
