import { StackScreenProps, StackNavigationProp } from "@react-navigation/stack";

export type DetailedRootStackNavigatorsParamList = {
  "Process Checkout": { checkout_url: string } | undefined;
  "Add Programs": undefined;
  "View Announcements": undefined;
};

export type DetailedRootStackScreenProp = StackScreenProps<
  DetailedRootStackNavigatorsParamList,
  "Process Checkout" | "Add Programs" | "View Announcements"
>;
export type DetailedRootStackNavigationProp = StackNavigationProp<
  DetailedRootStackNavigatorsParamList,
  "Process Checkout" | "Add Programs" | "View Announcements"
>;
