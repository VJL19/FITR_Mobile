import React, { useContext, useEffect, useState } from "react";
import DrawerStack from "../navigators/DrawerStack";
import BottomRootScreen from "./BottomRootScreen";
import CustomDrawer from "../components/CustomDrawer";
import drawerIcon from "../components/drawerIcon";
import { Alert, Button, TouchableNativeFeedback, View } from "react-native";
import CustomNotification from "../components/CustomNotification";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import * as SecureStore from "expo-secure-store";
import global_axios from "../global/axios";
import { useNavigation } from "@react-navigation/native";
import {
  RootStackNavigationProp,
  RootStackScreenProp,
} from "../utils/types/navigators/RootStackNavigators";
import { AuthContext } from "../context/AuthContext";

const DashboardScreen = ({ navigation }: RootStackScreenProp) => {
  const { isAuthenticated, accessToken, status } = useSelector(
    (state: RootState) => state.authReducer
  );

  const { logOut } = useContext(AuthContext);

  // console.log("my accesstoken", accessToken);

  // console.log("in dashboard,", isAuthenticated);

  // useEffect(() => {
  //   navigation.reset({
  //     index: 0,
  //     routes: [{ name: "DashboardScreen" }],
  //   });
  //   console.log("dashboard use effect");
  // }, []);

  const checkAccessToken = async () => {
    const accessToken = await SecureStore.getItemAsync("accessToken");
    if (!accessToken) {
      navigation.replace("AuthStackScreens", { screen: "Sign In" });
    } else {
      navigation.replace("DashboardScreen");
    }
  };
  // console.log("dashboard", status);
  return (
    <DrawerStack.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        unmountOnBlur: true,

        headerBackground: () => {
          return (
            <View
              style={{
                flex: 1,
                backgroundColor: "#131313",
                borderBottomWidth: 0.5,
                borderBottomColor: "#f5f5f5",
              }}
            />
          );
        },
        headerTintColor: "#f5f5f5",
        headerTitle: "",
        headerRight: (props) => (
          <View>
            {/* <Button
              title="Logout"
              onPress={async () => {
                await SecureStore.deleteItemAsync("accessToken");
                global_axios.defaults.headers.common["Authorization"] = "";
                Alert.alert("Logout message", "", [
                  {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel",
                  },
                  { text: "OK", onPress: () => {} },
                ]);
                console.log("token deleted successfully!");
              }}
            /> */}
            <CustomNotification {...props} />
          </View>
        ),
        drawerActiveBackgroundColor: "#FF2E00",
        drawerActiveTintColor: "#f2f2f2",
        drawerLabelStyle: { marginLeft: -15 },
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
