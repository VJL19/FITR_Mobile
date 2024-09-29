import type {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import { AuthStackParamLists } from "./AuthStackNavigators";
import { DrawerStackParamList } from "./DrawerStackNavigators";
import { DetailedRootStackNavigatorsParamList } from "../detailed_screens/DetailedRootStackNavigators";

type RootStackParamList = {
  SplashScreen: undefined;
  AuthStackScreens: NavigatorScreenParams<AuthStackParamLists>;
  DashboardScreen: undefined;
  SideStackNavigations: NavigatorScreenParams<DrawerStackParamList>;
  BottomTab: undefined;
  DetailedScreens: NavigatorScreenParams<DetailedRootStackNavigatorsParamList>;
  OnBoardingScreen: undefined;
};

type RootStackScreenProp = NativeStackScreenProps<
  RootStackParamList,
  | "SplashScreen"
  | "AuthStackScreens"
  | "DashboardScreen"
  | "SideStackNavigations"
  | "BottomTab"
  | "DetailedScreens"
  | "OnBoardingScreen"
>;
type RootStackNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  | "SplashScreen"
  | "AuthStackScreens"
  | "DashboardScreen"
  | "SideStackNavigations"
  | "BottomTab"
  | "DetailedScreens"
  | "OnBoardingScreen"
>;

export type {
  RootStackNavigationProp,
  RootStackScreenProp,
  RootStackParamList,
};
