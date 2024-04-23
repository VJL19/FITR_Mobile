import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";

const CustomDrawer = (props) => {
  const [pressIn, setPressIn] = React.useState(false);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.6, backgroundColor: "#131313" }}>
        <Image
          source={require("../assets/fitr_logo3.png")}
          style={{ height: 250, width: 260 }}
        />
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
