import "react-native-gesture-handler";
import React from "react";
import ProcessCheckout from "./view_detailed_screens/Checkout/ProcessCheckout";
import DetailedScreenStacks from "../navigators/DetailedScreenStack";
import { Alert, StyleSheet, TouchableNativeFeedback, View } from "react-native";
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
import ViewProgram from "./view_detailed_screens/Programs/ViewProgram";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import EditProgram from "./view_detailed_screens/Programs/EditProgram";
import ViewImage from "./view_detailed_screens/ViewImage/ViewImage";
import SubscriptionHistory from "./view_detailed_screens/Subscription/SubscriptionHistory";
import ViewGymEquipment from "./view_detailed_screens/Tutorials/GymEquipments/ViewGymEquipment";
import ViewWorkout from "./view_detailed_screens/Tutorials/Workouts/ViewWorkout";
import ViewExercise from "./view_detailed_screens/Tutorials/Exercises/ViewExercise";
import ViewRFIDCard from "./view_detailed_screens/Attendance/ViewRFIDCard";
import ViewAttendanceHistory from "./view_detailed_screens/Attendance/ViewAttendanceHistory";
import ViewTutorialYoutube from "components/ViewTutorialYoutube";
import RegistrationConfirmation from "./view_detailed_screens/SignUp/RegistrationConfirmation";
import ForgotPassword from "./view_detailed_screens/MyAccount/ForgotPassword";
import ChangePassword from "./view_detailed_screens/MyAccount/ChangePassword";
import ForgotPasswordConfirmation from "./view_detailed_screens/MyAccount/ForgotPasswordConfirmation";
import ViewSuggestedProgram from "./view_detailed_screens/Programs/ViewSuggestedProgram";

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

  const navigation = useNavigation<RootStackNavigationProp>();
  const handleProgram = () => {
    navigation.navigate("DetailedScreens", {
      screen: "Edit Program",
    });
  };
  const handlePost = () => {
    navigation.navigate("DetailedScreens", {
      screen: "Edit Post",
    });
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
          fontFamily: "Inter-Bold",
          fontSize: 22,
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
        name="Registration Confirmation"
        component={RegistrationConfirmation}
        options={{
          headerLeft: () => null,
          cardOverlayEnabled: true,
          presentation: "card",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <DetailedScreenStacks.Screen
        name="Forgot Password"
        component={ForgotPassword}
        options={{
          cardOverlayEnabled: true,
          presentation: "card",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <DetailedScreenStacks.Screen
        name="Forgot Password Confirmation"
        component={ForgotPasswordConfirmation}
        options={{
          cardOverlayEnabled: true,
          presentation: "card",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <DetailedScreenStacks.Screen
        navigationKey="Change Password"
        name="Change Password"
        component={ChangePassword}
        options={{
          headerLeft: () => null,
          cardOverlayEnabled: true,
          presentation: "card",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <DetailedScreenStacks.Screen
        name="View Attendance History"
        component={ViewAttendanceHistory}
        options={{
          presentation: "card",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <DetailedScreenStacks.Screen
        name="View RFID Card"
        component={ViewRFIDCard}
        options={{
          headerTitle: "View RFID Card Details",
          presentation: "card",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <DetailedScreenStacks.Screen
        name="View Payments"
        component={SubscriptionHistory}
        options={{
          headerTitle: "Subscription History",
          presentation: "card",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <DetailedScreenStacks.Screen
        name="View Image"
        component={ViewImage}
        options={{
          headerShown: false,
          presentation: "card",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <DetailedScreenStacks.Screen
        name="Add Program"
        component={AddPrograms}
        options={{
          presentation: "card",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <DetailedScreenStacks.Screen
        name="View Program"
        component={ViewProgram}
        options={{
          presentation: "card",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerRight: () => (
            <CustomMenu onPress={handleProgram} screenName="Program" />
          ),
        }}
      />
      <DetailedScreenStacks.Screen
        name="View Suggested Program"
        component={ViewSuggestedProgram}
        options={{
          presentation: "card",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <DetailedScreenStacks.Screen
        name="Edit Program"
        component={EditProgram}
      />
      <DetailedScreenStacks.Screen
        name="View Announcement"
        component={ViewAnnouncements}
        options={{
          headerTitle: () => null,
          headerTintColor: "#fff",
          headerLeftContainerStyle: {
            padding: 2,
            backgroundColor: "#ff2e00",
            borderRadius: 50,
          },
          headerTransparent: true,
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
          headerLeft: () => null,
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
      <DetailedScreenStacks.Screen name="Edit Post" component={EditPost} />
      <DetailedScreenStacks.Screen
        name="View Post Feed"
        component={DetailedPostFeed}
        options={{
          headerTitle: () => null,
          headerTintColor: "#fff",
          headerLeftContainerStyle: {
            padding: 2,
            backgroundColor: "#ff2e00",
            borderRadius: 50,
          },
          headerTransparent: true,
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
          headerRight: () => (
            <CustomMenu onPress={handlePost} screenName="Post" />
          ),
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
        name="View Gym Equipment"
        component={ViewGymEquipment}
        options={{
          headerTitle: () => null,
          headerTintColor: "#fff",
          headerTransparent: true,
          headerLeftContainerStyle: {
            padding: 2,
            backgroundColor: "#ff2e00",
            borderRadius: 50,
          },
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
        name="View Workout"
        component={ViewWorkout}
        options={{
          headerTintColor: "#fff",
          headerLeftContainerStyle: {
            padding: 2,
            backgroundColor: "#ff2e00",
            borderRadius: 50,
          },
          headerTitle: () => null,
          headerTransparent: true,
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
        name="View Exercise"
        component={ViewExercise}
        options={{
          cardOverlayEnabled: true,
          presentation: "card",
          headerTintColor: "#fff",
          headerLeftContainerStyle: {
            padding: 2,
            backgroundColor: "#ff2e00",
            borderRadius: 50,
          },
          headerTitle: () => null,
          gestureEnabled: true,
          gestureDirection: "horizontal",
          headerTransparent: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <DetailedScreenStacks.Screen
        name="View Tutorial Youtube"
        component={ViewTutorialYoutube}
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
