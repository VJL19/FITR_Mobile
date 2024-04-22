import type {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import { AuthStackParamLists } from "./AuthStackNavigators";
import { DrawerStackParamList } from "./DrawerStackNavigators";

type RootStackParamList = {
  SplashScreen: undefined;
  AuthStackScreens: NavigatorScreenParams<AuthStackParamLists>;
  DashboardScreen: undefined;
  SideStackNavigations: NavigatorScreenParams<DrawerStackParamList>;
  BottomTab: undefined;
};

type RootStackScreenProp = NativeStackScreenProps<
  RootStackParamList,
  | "SplashScreen"
  | "AuthStackScreens"
  | "DashboardScreen"
  | "SideStackNavigations"
  | "BottomTab"
>;
type RootStackNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  | "SplashScreen"
  | "AuthStackScreens"
  | "DashboardScreen"
  | "SideStackNavigations"
  | "BottomTab"
>;

export type {
  RootStackNavigationProp,
  RootStackScreenProp,
  RootStackParamList,
};
