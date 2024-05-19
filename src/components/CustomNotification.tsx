import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../utils/types/navigators/RootStackNavigators";

const CustomNotification = (props) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  return (
    <TouchableNativeFeedback
      {...props}
      onPress={() =>
        navigation.navigate("DetailedScreens", { screen: "Notifications" })
      }
      useForeground={true}
      background={TouchableNativeFeedback.Ripple("rgba(20,20,2,0.1)", true, 40)}
    >
      <View style={{ marginRight: 15 }}>
        <Ionicons name="notifications-outline" size={30} color={"#f5f5f5"} />
      </View>
    </TouchableNativeFeedback>
  );
};

export default CustomNotification;

const styles = StyleSheet.create({});
