import type {
  DrawerScreenProps,
  DrawerNavigationProp,
} from "@react-navigation/drawer";

type DrawerStackParamList = {
  Home: undefined;
  Announcements: undefined;
  Attendance: undefined;
  Newsfeed: undefined;
  "My Posts": undefined;
  "Calculate BMI": { height: number; weight: number } | undefined;
  Pay: undefined;
  "About MJeshter": undefined;
  "My Account": undefined;
  "Sign Out": undefined;
};

type DrawerStackScreenProp = DrawerScreenProps<
  DrawerStackParamList,
  | "Home"
  | "Announcements"
  | "Attendance"
  | "Newsfeed"
  | "My Posts"
  | "Calculate BMI"
  | "Pay"
  | "About MJeshter"
  | "My Account"
  | "Sign Out"
>;
type DrawerStackNavigationProp = DrawerNavigationProp<
  DrawerStackParamList,
  | "Home"
  | "Announcements"
  | "Attendance"
  | "Newsfeed"
  | "My Posts"
  | "Calculate BMI"
  | "Pay"
  | "About MJeshter"
  | "My Account"
  | "Sign Out"
>;

export type {
  DrawerStackParamList,
  DrawerStackScreenProp,
  DrawerStackNavigationProp,
};
