import { StackScreenProps, StackNavigationProp } from "@react-navigation/stack";

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
    comments: IComments[];
    PostLikes: number;
    PostIsLike: string;
  };
  "View Post": {
    PostImage: string;
    PostTitle: string;
    PostDescription: string;
    PostDate: string;
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
>;
export type DetailedRootStackNavigationProp = StackNavigationProp<
  DetailedRootStackNavigatorsParamList,
  | "Process Checkout"
  | "Add Programs"
  | "View Announcements"
  | "Add Post"
  | "View Post Feed"
  | "View Post"
>;
