import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";

const LoadingIndicator = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flex: 0.15,
          justifyContent: "center",
          alignItems: "center",
          width: 100,
          backgroundColor: "rgba(0,0,0,.75)",
          borderRadius: 8,
        }}
      >
        <ActivityIndicator size="large" color="#FF2E00" />
      </View>
    </View>
  );
};

export default LoadingIndicator;

const styles = StyleSheet.create({});
