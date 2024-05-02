import "react-native-gesture-handler";
import React from "react";
import ProcessCheckout from "./view_detailed_screens/Checkout/ProcessCheckout";
import DetailedScreenStacks from "../navigators/DetailedScreenStack";
import { StyleSheet, TouchableNativeFeedback, View } from "react-native";
import { CardStyleInterpolators } from "@react-navigation/stack";
import AddPrograms from "./view_detailed_screens/Programs/AddProgram";
import ViewAnnouncements from "./view_detailed_screens/Announcements/ViewAnnouncements";
import AddPost from "./view_detailed_screens/Posts/AddPost";
import Ionicons from "react-native-vector-icons/Ionicons";

const DetailedRootScreen = () => {
  return (
    <DetailedScreenStacks.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#131313",
          borderBottomWidth: 0.5,
          borderBottomColor: "#f5f5f5",
        },
        headerTitleStyle: {
          color: "#f5f5f5",
        },
        cardStyle: {
          backgroundColor: "#202020",
        },
        headerTintColor: "#f5f5f5",
        headerPressColor: "#ff2e00",
        headerPressOpacity: 0.2,
        presentation: "card",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <DetailedScreenStacks.Screen
        name="Add Programs"
        component={AddPrograms}
        options={{
          presentation: "card",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <DetailedScreenStacks.Screen
        name="View Announcements"
        component={ViewAnnouncements}
        options={{
          presentation: "card",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <DetailedScreenStacks.Screen
        name="Process Checkout"
        component={ProcessCheckout}
        options={{
          presentation: "card",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <DetailedScreenStacks.Screen
        name="Add Post"
        component={AddPost}
        options={{
          presentation: "card",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </DetailedScreenStacks.Navigator>
  );
};

export default DetailedRootScreen;

const styles = StyleSheet.create({});
