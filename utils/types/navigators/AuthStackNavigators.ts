import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

type AuthStackParamLists = {
  "Sign Up": undefined;
  "Sign In": undefined;
  "Forgot Password": undefined;
  "My Profile": undefined;
  "Log Out": undefined;
};

type AuthStackScreenProp = NativeStackScreenProps<
  AuthStackParamLists,
  "Sign In" | "Sign Up" | "Forgot Password" | "My Profile" | "Log Out"
>;
type AuthStackNavigationProp = NativeStackNavigationProp<
  AuthStackParamLists,
  "Sign In" | "Sign Up" | "Forgot Password" | "My Profile" | "Log Out"
>;

export { AuthStackParamLists, AuthStackScreenProp, AuthStackNavigationProp };
