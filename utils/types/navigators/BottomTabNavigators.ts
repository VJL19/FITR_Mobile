import type {
  BottomTabScreenProps,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

type BottomTabParamList = {
  Home_Bottom: undefined;
  Programs: undefined;
  Tutorials: undefined;
  Favorites: undefined;
};

type BottomTabsScreenProp = BottomTabScreenProps<
  BottomTabParamList,
  "Home_Bottom" | "Programs" | "Tutorials" | "Favorites"
>;
type BottomTabsNavigationProp = BottomTabNavigationProp<
  BottomTabParamList,
  "Home_Bottom" | "Programs" | "Tutorials" | "Favorites"
>;

export type {
  BottomTabParamList,
  BottomTabsScreenProp,
  BottomTabsNavigationProp,
};
