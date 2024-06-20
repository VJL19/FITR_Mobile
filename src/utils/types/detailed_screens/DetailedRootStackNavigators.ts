import { StackScreenProps, StackNavigationProp } from "@react-navigation/stack";
import { IComments } from "../newsfeed.types";

export type DetailedRootStackNavigatorsParamList = {
  "Process Checkout": { checkout_url: string } | undefined;
  "Add Program": undefined;
  "View Program": undefined;
  "View Announcements": undefined;
  "Add Post": undefined;
  "Edit Post": undefined;
  "View Post Feed": undefined;
  "View Post": undefined;
  "Comment on Post": undefined;
  Notifications: undefined;
  "Gym Equipments": undefined;
  Workouts: undefined;
  Exercises: undefined;
  "Change Account": undefined;
  ContactInformation: undefined;
  AccountSetup: undefined;
  TermsAndCondition: undefined;
  "Edit Program": undefined;
  "View Image": { imageUrl: string } | undefined;
};

export type DetailedRootStackScreenProp = StackScreenProps<
  DetailedRootStackNavigatorsParamList,
  | "Process Checkout"
  | "Add Program"
  | "View Announcements"
  | "View Program"
  | "Add Post"
  | "View Post Feed"
  | "View Post"
  | "Comment on Post"
  | "Notifications"
  | "Gym Equipments"
  | "Workouts"
  | "Exercises"
  | "Change Account"
  | "ContactInformation"
  | "AccountSetup"
  | "TermsAndCondition"
  | "Edit Post"
  | "Edit Program"
  | "View Image"
>;
export type DetailedRootStackNavigationProp = StackNavigationProp<
  DetailedRootStackNavigatorsParamList,
  | "Process Checkout"
  | "Add Program"
  | "View Program"
  | "View Announcements"
  | "Add Post"
  | "View Post Feed"
  | "View Post"
  | "Comment on Post"
  | "Notifications"
  | "Gym Equipments"
  | "Workouts"
  | "Exercises"
  | "Change Account"
  | "ContactInformation"
  | "AccountSetup"
  | "TermsAndCondition"
  | "Edit Post"
  | "Edit Program"
  | "View Image"
>;
