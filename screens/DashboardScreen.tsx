import React from "react";
import DrawerStack from "../navigators/DrawerStack";
import BottomRootScreen from "./BottomRootScreen";
import CustomDrawer from "../components/CustomDrawer";
import drawerIcon from "../components/drawerIcon";
import { View } from "react-native";

const DashboardScreen = () => {
  return (
    <DrawerStack.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerTitle: "",
        drawerActiveBackgroundColor: "#FF2E00",
        drawerActiveTintColor: "#f2f2f2",
        drawerLabelStyle: { marginLeft: -20 },
      }}
    >
      <DrawerStack.Screen
        name="HomeDrawer"
        component={BottomRootScreen}
        options={{
          title: "Home",
          drawerIcon: ({ color, focused, size }) => {
            const name = "home";
            return drawerIcon({ color, size, focused, name });
          },
        }}
      />
      <DrawerStack.Screen
        name="Announcements"
        component={BottomRootScreen}
        options={{
          drawerIcon: ({ color, focused, size }) => {
            const name = "megaphone";
            return drawerIcon({ color, size, focused, name });
          },
        }}
      />
      <DrawerStack.Screen
        name="Attendance"
        component={BottomRootScreen}
        options={{
          drawerIcon: ({ color, focused, size }) => {
            const name = "newspaper";
            return drawerIcon({ color, size, focused, name });
          },
        }}
      />
      <DrawerStack.Screen
        name="Newsfeed"
        component={BottomRootScreen}
        options={{
          drawerIcon: ({ color, focused, size }) => {
            const name = "megaphone";
            return drawerIcon({ color, size, focused, name });
          },
        }}
      />
      <DrawerStack.Screen
        name="My Posts"
        component={BottomRootScreen}
        options={{
          drawerIcon: ({ color, focused, size }) => {
            const name = "person-circle";
            return drawerIcon({ color, size, focused, name });
          },
        }}
      />
      <DrawerStack.Screen
        name="Calculate BMI"
        component={BottomRootScreen}
        options={{
          drawerIcon: ({ color, focused, size }) => {
            const name = "calculator";
            return drawerIcon({ color, size, focused, name });
          },
        }}
      />
      <DrawerStack.Screen
        name="Pay"
        component={BottomRootScreen}
        options={{
          drawerIcon: ({ color, focused, size }) => {
            const name = "card";
            return drawerIcon({ color, size, focused, name });
          },
        }}
      />

      <DrawerStack.Screen
        name="About MJeshter"
        component={BottomRootScreen}
        options={{
          drawerItemStyle: {
            borderTopWidth: 3,
            borderTopColor: "#131313",
          },
          drawerIcon: ({ color, focused, size }) => {
            const name = "information-circle";
            return drawerIcon({ color, size, focused, name });
          },
        }}
      />
      <DrawerStack.Screen
        name="My Account"
        component={BottomRootScreen}
        options={{
          drawerIcon: ({ color, focused, size }) => {
            const name = "person-circle";
            return drawerIcon({ color, size, focused, name });
          },
        }}
      />
      <DrawerStack.Screen
        name="Sign Out"
        component={BottomRootScreen}
        options={{
          drawerIcon: ({ color, focused, size }) => {
            const name = "arrow-back-circle";
            return drawerIcon({ color, size, focused, name });
          },
        }}
      />
    </DrawerStack.Navigator>
  );
};

export default DashboardScreen;
