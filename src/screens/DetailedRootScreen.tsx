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
import Notifications from "./view_detailed_screens/Notifications/Notifications";
import GymEquipments from "./view_detailed_screens/Tutorials/GymEquipments/GymEquipments";
import Workouts from "./view_detailed_screens/Tutorials/Workouts/Workouts";
import Exercises from "./view_detailed_screens/Tutorials/Exercises/Exercises";
import ChangeAccount from "./view_detailed_screens/MyAccount/ChangeAccount";
import ContactInformation from "./view_detailed_screens/SignUp/ContactInformation";
import AccountSetup from "./view_detailed_screens/SignUp/AccountSetup";
import TermsAndConditions from "./view_detailed_screens/SignUp/TermsAndConditions";
import EditPost from "./view_detailed_screens/Posts/EditPost";

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
        name="Edit Post"
        component={EditPost}
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
      <DetailedScreenStacks.Screen
        name="Notifications"
        component={Notifications}
        options={{
          cardOverlayEnabled: true,
          presentation: "card",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <DetailedScreenStacks.Screen
        name="Gym Equipments"
        component={GymEquipments}
        options={{
          cardOverlayEnabled: true,
          presentation: "card",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <DetailedScreenStacks.Screen
        name="Workouts"
        component={Workouts}
        options={{
          cardOverlayEnabled: true,
          presentation: "card",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <DetailedScreenStacks.Screen
        name="Exercises"
        component={Exercises}
        options={{
          cardOverlayEnabled: true,
          presentation: "card",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <DetailedScreenStacks.Screen
        name="Change Account"
        component={ChangeAccount}
        options={{
          cardOverlayEnabled: true,
          presentation: "card",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <DetailedScreenStacks.Screen
        name="ContactInformation"
        component={ContactInformation}
        options={{
          headerTitle: "Contact Information",
          cardOverlayEnabled: true,
          presentation: "card",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <DetailedScreenStacks.Screen
        name="AccountSetup"
        component={AccountSetup}
        options={{
          headerTitle: "Account Setup",
          cardOverlayEnabled: true,
          presentation: "card",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <DetailedScreenStacks.Screen
        name="TermsAndCondition"
        component={TermsAndConditions}
        options={{
          headerTitle: "Terms and Conditions",
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
