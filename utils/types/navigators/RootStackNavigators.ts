import type {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { NavigatorScreenParams } from "@react-navigation/native";
import { AuthStackParamLists } from "./AuthStackNavigators";

type RootStackParamList = {
  SplashScreen: undefined;
  AuthStackScreens: NavigatorScreenParams<AuthStackParamLists>;
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
