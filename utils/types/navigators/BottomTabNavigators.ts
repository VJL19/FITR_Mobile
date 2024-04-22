import type {
  BottomTabScreenProps,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

type BottomTabParamList = {
  Home: undefined;
  Programs: undefined;
  Tutorials: undefined;
  Favorites: undefined;
};

type BottomTabsScreenProp = BottomTabScreenProps<
  BottomTabParamList,
  "Home" | "Programs" | "Tutorials" | "Favorites"
>;
type BottomTabsNavigationProp = BottomTabNavigationProp<
  BottomTabParamList,
  "Home" | "Programs" | "Tutorials" | "Favorites"
>;

export type {
  BottomTabParamList,
  BottomTabsScreenProp,
  BottomTabsNavigationProp,
};
