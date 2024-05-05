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
    PostLikes: number;
    PostIsLike: string;
    NewsfeedID: number;
    UserID: number;
    Username: string;
  };
  "View Post": {
    PostImage: string;
    PostTitle: string;
    PostDescription: string;
    PostDate: string;
  };
  "Comment on Post": {
    NewsfeedID: number;
    UserID: number;
    PostTitle: string;
  };
  Notifications: undefined;
  "Gym Equipments": undefined;
  Workouts: undefined;
  Exercises: undefined;
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
>;
