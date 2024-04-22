import { View, Text, Button } from "react-native";
import React from "react";
import DrawerStack from "../navigators/DrawerStack";
import {
  Home,
  Announcements,
  Attendance,
  Newsfeed,
  MyPosts,
  About,
  CalculateBMI,
  MyAccount,
  Subscription,
  SignOut,
} from "./drawers";
import { DrawerStackScreenProp } from "../utils/types/navigators/DrawerStackNavigators";

const DashboardScreen = () => {
  return (
    <DrawerStack.Navigator screenOptions={{ headerTitle: "" }}>
      <DrawerStack.Screen name="Home" component={Home} />
      <DrawerStack.Screen name="Announcements" component={Announcements} />
      <DrawerStack.Screen name="Attendance" component={Attendance} />
      <DrawerStack.Screen name="Newsfeed" component={Newsfeed} />
      <DrawerStack.Screen name="My Posts" component={MyPosts} />
      <DrawerStack.Screen name="Calculate BMI" component={CalculateBMI} />
      <DrawerStack.Screen name="Pay" component={Subscription} />
      <DrawerStack.Screen name="About MJeshter" component={About} />
      <DrawerStack.Screen name="My Account" component={MyAccount} />
      <DrawerStack.Screen name="Sign Out" component={SignOut} />
    </DrawerStack.Navigator>
  );
};

export default DashboardScreen;
