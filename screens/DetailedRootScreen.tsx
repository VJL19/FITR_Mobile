import "react-native-gesture-handler";
import React from "react";
import ProcessCheckout from "./view_detailed_screens/Checkout/ProcessCheckout";
import DetailedScreenStacks from "../navigators/DetailedScreenStack";
import { StyleSheet, TouchableNativeFeedback, View } from "react-native";
import { CardStyleInterpolators } from "@react-navigation/stack";
import AddPrograms from "./view_detailed_screens/Programs/AddProgram";
import ViewAnnouncements from "./view_detailed_screens/Announcements/ViewAnnouncements";
import AddPost from "./view_detailed_screens/Posts/AddPost";
import DetailedPostFeed from "./view_detailed_screens/Newsfeed/DetailedPostFeed";
import ViewPost from "./view_detailed_screens/Posts/ViewPost";
import CustomMenu from "../components/CustomMenu";
import CommentPost from "./view_detailed_screens/Newsfeed/CommentPost";

const DetailedRootScreen = () => {
  const config = {
    animation: "spring",
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
  return (
    <DetailedScreenStacks.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ff2e00",
          borderBottomWidth: 0.5,
          borderBottomColor: "#f5f5f5",
        },
        headerTitleStyle: {
          color: "#f5f5f5",
        },
        cardStyle: {
          backgroundColor: "#f5f5f5",
        },
        headerTintColor: "#f5f5f5",
        headerPressColor: "#d3d3d3",
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
      <DetailedScreenStacks.Screen
        name="View Post Feed"
        component={DetailedPostFeed}
        options={{
          presentation: "card",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <DetailedScreenStacks.Screen
        name="View Post"
        component={ViewPost}
        options={{
          cardOverlayEnabled: true,
          presentation: "card",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerRight: () => <CustomMenu />,
        }}
      />
      <DetailedScreenStacks.Screen
        name="Comment on Post"
        component={CommentPost}
        options={{
          cardOverlayEnabled: true,
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
