import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import React from "react";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";

const CustomTabBar = ({
  children,
  style,
  ...props
}: BottomTabBarButtonProps) => {
  return (
    <TouchableNativeFeedback
      {...props}
      useForeground={true}
      background={TouchableNativeFeedback.Ripple(
        "rgba(255,46,0,0.3)",
        true,
        40
      )}
    >
      <View style={style}>{children}</View>
    </TouchableNativeFeedback>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({});
