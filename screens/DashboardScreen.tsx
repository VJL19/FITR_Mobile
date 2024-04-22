import React from "react";
import DrawerStack from "../navigators/DrawerStack";
import BottomRootScreen from "./BottomRootScreen";

const DashboardScreen = () => {
  return (
    <DrawerStack.Navigator screenOptions={{ headerTitle: "" }}>
      <DrawerStack.Screen name="Home" component={BottomRootScreen} />
      <DrawerStack.Screen name="Announcements" component={BottomRootScreen} />
      <DrawerStack.Screen name="Attendance" component={BottomRootScreen} />
      <DrawerStack.Screen name="Newsfeed" component={BottomRootScreen} />
      <DrawerStack.Screen name="My Posts" component={BottomRootScreen} />
      <DrawerStack.Screen name="Calculate BMI" component={BottomRootScreen} />
      <DrawerStack.Screen name="Pay" component={BottomRootScreen} />
      <DrawerStack.Screen name="About MJeshter" component={BottomRootScreen} />
      <DrawerStack.Screen name="My Account" component={BottomRootScreen} />
      <DrawerStack.Screen name="Sign Out" component={BottomRootScreen} />
    </DrawerStack.Navigator>
  );
};

export default DashboardScreen;
