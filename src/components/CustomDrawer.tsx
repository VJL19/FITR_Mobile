import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import Avatar from "./Avatar";

const CustomDrawer = (props: DrawerContentComponentProps) => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 0.5,
          backgroundColor: "#ff2e00",
          alignItems: "flex-start",
          justifyContent: "center",
          shadowColor: "#000000",
          elevation: 54,
        }}
      >
        <Avatar />
      </View>
      <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({});
