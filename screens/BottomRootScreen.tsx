import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import React from "react";
import BottomTab from "../navigators/BottomTab";
import { Favorites, Home, Programs, Tutorials } from "./bottom_tabs";
import { DrawerStackScreenProp } from "../utils/types/navigators/DrawerStackNavigators";
import {
  About,
  Announcements,
  Attendance,
  CalculateBMI,
  MyAccount,
  MyPosts,
  Newsfeed,
  SignOut,
  Subscription,
} from "./drawers";
import { useNavigation } from "@react-navigation/native";
import { AuthStackNavigationProp } from "../utils/types/navigators/AuthStackNavigators";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomTabBar from "../components/CustomTabBar";

const BottomRootScreen = ({ route }: DrawerStackScreenProp) => {
  const navigation = useNavigation<AuthStackNavigationProp>();

  const RenderTabs = () => {
    switch (route.name) {
      case "HomeDrawer":
        return <Home />;
      case "Announcements":
        return <Announcements />;
      case "Attendance":
        return <Attendance />;
      case "Newsfeed":
        return <Newsfeed />;
      case "My Posts":
        return <MyPosts />;
      case "Calculate BMI":
        return <CalculateBMI />;
      case "Pay":
        return <Subscription />;
      case "About MJeshter":
        return <About />;

      case "My Account":
        return <MyAccount />;

      case "Sign Out":
        return <SignOut />;
    }
  };
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case "Home_Bottom":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Programs":
              iconName = focused ? "barbell" : "barbell-outline";
              break;
            case "Tutorials":
              iconName = focused ? "play-circle" : "play-circle-outline";
              break;
            case "Favorites":
              iconName = focused ? "heart" : "heart-outline";
              break;
            default:
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarButton: (props) => <CustomTabBar {...props} />,
        tabBarActiveTintColor: "#FF2E00",
        tabBarInactiveTintColor: "#F5F5F5",
        tabBarLabelStyle: { color: "#f5f5f5", marginTop: -10 },
        tabBarStyle: { backgroundColor: "#131313", height: 60 },
      })}
    >
      <BottomTab.Screen
        name="Home_Bottom"
        component={RenderTabs}
        options={{ tabBarBadge: 3, title: "Home" }}
      />
      <BottomTab.Screen name="Programs" component={Programs} />
      <BottomTab.Screen name="Tutorials" component={Tutorials} />
      <BottomTab.Screen name="Favorites" component={Favorites} />
    </BottomTab.Navigator>
  );
};

export default BottomRootScreen;

const styles = StyleSheet.create({});
