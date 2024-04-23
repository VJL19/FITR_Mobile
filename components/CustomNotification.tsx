import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const CustomNotification = (props) => {
  return (
    <TouchableNativeFeedback
      {...props}
      useForeground={true}
      background={TouchableNativeFeedback.Ripple(
        "rgba(255,46,0,0.5)",
        true,
        40
      )}
    >
      <View style={{ marginRight: 15 }}>
        <Ionicons name="notifications-outline" size={30} color={"#f5f5f5"} />
      </View>
    </TouchableNativeFeedback>
  );
};

export default CustomNotification;

const styles = StyleSheet.create({});
