import { StackScreenProps, StackNavigationProp } from "@react-navigation/stack";
import { IComments } from "../newsfeed.types";

export type DetailedRootStackNavigatorsParamList = {
  "Process Checkout": { checkout_url: string } | undefined;
  "Add Program": undefined;
  "View Program": undefined;
  "View Suggested Program": undefined;
  "View Announcement": undefined;
  "Add Post": undefined;
  "Edit Post": undefined;
  "View Post Feed": undefined;
  "View Post": undefined;
  "Comment on Post": undefined;
  Notifications: undefined;
  "Gym Equipments": undefined;
  "View Gym Equipment": undefined;
  Workouts: undefined;
  "View Workout": undefined;
  Exercises: undefined;
  "View Exercise": undefined;
  "Change Account": undefined;
  ContactInformation: undefined;
  AccountSetup: undefined;
  TermsAndCondition: undefined;
  "Edit Program": undefined;
  "View Image": { imageUrl: string } | undefined;
  "View Payments": undefined;
  "View RFID Card": undefined;
  "View Attendance History": undefined;
  "View Tutorial Youtube": { yt_url: string } | undefined;
  "Registration Confirmation": undefined;
  "Forgot Password": undefined;
  "Change Password": undefined;
  "Forgot Password Confirmation": undefined;
};

export type DetailedRootStackScreenProp = StackScreenProps<
  DetailedRootStackNavigatorsParamList,
  | "Process Checkout"
  | "Add Program"
  | "View Announcement"
  | "View Program"
  | "View Suggested Program"
  | "Add Post"
  | "View Post Feed"
  | "View Post"
  | "Comment on Post"
  | "Notifications"
  | "Gym Equipments"
  | "View Gym Equipment"
  | "Workouts"
  | "View Workout"
  | "Exercises"
  | "View Exercise"
  | "Change Account"
  | "ContactInformation"
  | "AccountSetup"
  | "TermsAndCondition"
  | "Edit Post"
  | "Edit Program"
  | "View Image"
  | "View Payments"
  | "View RFID Card"
  | "View Attendance History"
  | "View Tutorial Youtube"
  | "Registration Confirmation"
  | "Forgot Password"
  | "Change Password"
  | "Forgot Password Confirmation"
>;
export type DetailedRootStackNavigationProp = StackNavigationProp<
  DetailedRootStackNavigatorsParamList,
  | "Process Checkout"
  | "Add Program"
  | "View Program"
  | "View Suggested Program"
  | "View Announcement"
  | "Add Post"
  | "View Post Feed"
  | "View Post"
  | "Comment on Post"
  | "Notifications"
  | "Gym Equipments"
  | "View Gym Equipment"
  | "Workouts"
  | "View Workout"
  | "Exercises"
  | "View Exercise"
  | "Change Account"
  | "ContactInformation"
  | "AccountSetup"
  | "TermsAndCondition"
  | "Edit Post"
  | "Edit Program"
  | "View Image"
  | "View Payments"
  | "View RFID Card"
  | "View Attendance History"
  | "View Tutorial Youtube"
  | "Registration Confirmation"
  | "Forgot Password"
  | "Change Password"
  | "Forgot Password Confirmation"
>;
