import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

type DashboardStackParamList = {
  Home: undefined;
};

type DashboardStackNavigationProp = NativeStackNavigationProp<
  DashboardStackParamList,
  "Home"
>;
type DashboardStackScreenProp = NativeStackScreenProps<
  DashboardStackParamList,
  "Home"
>;

export type {
  DashboardStackNavigationProp,
  DashboardStackScreenProp,
  DashboardStackParamList,
};
