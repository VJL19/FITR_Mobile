import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import CheckoutScreen from "../../components/CheckoutScreen";

const Announcements = () => {
  return <CheckoutScreen />;
};

export default Announcements;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
    justifyContent: "center",
    alignItems: "center",
  },
});
