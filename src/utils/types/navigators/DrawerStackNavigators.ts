import type {
  DrawerScreenProps,
  DrawerNavigationProp,
} from "@react-navigation/drawer";

type DrawerStackParamList = {
  HomeDrawer: undefined;
  Announcements: undefined;
  Attendance: undefined;
  Newsfeed: undefined;
  "My Posts": undefined;
  "Calculate BMI": { height: number; weight: number } | undefined;
  Pay: undefined;
  "Terms and Conditions": undefined;
  "About MJeshter": undefined;
  "My Account": undefined;
  "Sign Out": undefined;
};

type DrawerStackScreenProp = DrawerScreenProps<
  DrawerStackParamList,
  | "HomeDrawer"
  | "Announcements"
  | "Attendance"
  | "Newsfeed"
  | "My Posts"
  | "Calculate BMI"
  | "Pay"
  | "Terms and Conditions"
  | "About MJeshter"
  | "My Account"
  | "Sign Out"
>;
type DrawerStackNavigationProp = DrawerNavigationProp<
  DrawerStackParamList,
  | "HomeDrawer"
  | "Announcements"
  | "Attendance"
  | "Newsfeed"
  | "My Posts"
  | "Calculate BMI"
  | "Pay"
  | "Terms and Conditions"
  | "About MJeshter"
  | "My Account"
  | "Sign Out"
>;

export type {
  DrawerStackParamList,
  DrawerStackScreenProp,
  DrawerStackNavigationProp,
};
