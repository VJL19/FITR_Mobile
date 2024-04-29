import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";

const LoadingIndicator = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#202020",
      }}
    >
      <View
        style={{
          flex: 0.2,
          justifyContent: "center",
          alignItems: "center",
          width: 120,
          backgroundColor: "rgba(0,0,0,.75)",
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "#f5f5f5",
        }}
      >
        <ActivityIndicator size="large" color="#f5f5f5" />
      </View>
    </View>
  );
};

export default LoadingIndicator;

const styles = StyleSheet.create({});
