import type {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { NavigatorScreenParams } from "@react-navigation/native";
import { AuthStackParamLists } from "./AuthStackNavigators";
import { DrawerStackParamList } from "./DrawerStackNavigators";

type RootStackParamList = {
  SplashScreen: undefined;
  AuthStackScreens: NavigatorScreenParams<AuthStackParamLists>;
  DashboardScreen: undefined;
  SideStackNavigations: NavigatorScreenParams<DrawerStackParamList>;
};

type RootStackScreenProp = NativeStackScreenProps<
  RootStackParamList,
  "SplashScreen" | "AuthStackScreens"
>;
type RootStackNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SplashScreen" | "AuthStackScreens"
>;

export type {
  RootStackNavigationProp,
  RootStackScreenProp,
  RootStackParamList,
};
