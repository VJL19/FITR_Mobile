import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DrawerStackScreenProp } from "../types/navigators/DrawerStackNavigators";
import {
  Home,
  About,
  Announcements,
  Attendance,
  CalculateBMI,
  MyAccount,
  MyPosts,
  Newsfeed,
  SignOut,
  Subscription,
} from "../../screens/drawers";
const RenderTab = ({ route }: DrawerStackScreenProp) => {
  let Component;
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
  return Component;
};

export default RenderTab;

const styles = StyleSheet.create({});
