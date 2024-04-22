import { StyleSheet, Text, View } from "react-native";
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
const BottomRootScreen = ({ route }: DrawerStackScreenProp) => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const RenderTabs = () => {
    switch (route.name) {
      case "Home":
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
    <BottomTab.Navigator screenOptions={{ headerShown: false }}>
      <BottomTab.Screen name="Home" component={RenderTabs} />
      <BottomTab.Screen name="Programs" component={Programs} />
      <BottomTab.Screen name="Tutorials" component={Tutorials} />
      <BottomTab.Screen name="Favorites" component={Favorites} />
    </BottomTab.Navigator>
  );
};

export default BottomRootScreen;

const styles = StyleSheet.create({});
