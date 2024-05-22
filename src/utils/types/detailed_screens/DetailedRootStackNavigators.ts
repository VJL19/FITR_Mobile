import { StackScreenProps, StackNavigationProp } from "@react-navigation/stack";
import { IComments } from "../newsfeed.types";

export type DetailedRootStackNavigatorsParamList = {
  "Process Checkout": { checkout_url: string } | undefined;
  "Add Programs": undefined;
  "View Announcements": undefined;
  "Add Post": undefined;
  "View Post Feed": {
    PostImage: string;
    PostTitle: string;
    PostDescription: string;
    PostAuthor: string;
    PostDate: string;
    comments?: IComments[];
    NewsfeedID: number;
    UserID: number;
    Username: string;
    PostID: number;
  };
  "View Post": {
    PostImage: string;
    PostTitle: string;
    PostDescription: string;
    PostDate: string;
    PostID: number | undefined;
  };
  "Comment on Post": {
    NewsfeedID: number;
    UserID: number;
    PostTitle: string;
    NotificationDate: string;
    CommentDate: string;
    Username: string;
    PostAuthor: string;
    PostID: number;
  };
  Notifications: undefined;
  "Gym Equipments": undefined;
  Workouts: undefined;
  Exercises: undefined;
  "Change Account": undefined;
  ContactInformation: {
    LastName: string;
    FirstName: string;
    MiddleName: string;
    Age: string;
  };
  AccountSetup: {
    LastName: string;
    FirstName: string;
    MiddleName: string;
    Age: string;
    ContactNumber: string;
    Email: string;
    Height: string;
    Weight: string;
  };
  TermsAndCondition: {
    LastName: string;
    FirstName: string;
    MiddleName: string;
    Age: string;
    ContactNumber: string;
    Email: string;
    Height: string;
    Weight: string;
    Username: string;
    Password: string;
    ConfirmPassword: string;
    ProfilePic?: string;
    Gender: string;
  };
};

export type DetailedRootStackScreenProp = StackScreenProps<
  DetailedRootStackNavigatorsParamList,
  | "Process Checkout"
  | "Add Programs"
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
>;
export type DetailedRootStackNavigationProp = StackNavigationProp<
  DetailedRootStackNavigatorsParamList,
  | "Process Checkout"
  | "Add Programs"
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
>;
