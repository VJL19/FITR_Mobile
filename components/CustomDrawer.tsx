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
          flex: 0.45,
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#131313",
          borderBottomWidth: 1,
          borderBottomColor: "#FF2E00",
        }}
      >
        <Image
          source={require("../assets/fitr_logo3.png")}
          style={{
            height: 170,
            width: 180,
            opacity: 0.4,
          }}
        />
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
