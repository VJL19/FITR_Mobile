import React, { useContext, useEffect, useState } from "react";
import DrawerStack from "navigators/DrawerStack";
import BottomRootScreen from "./BottomRootScreen";
import CustomDrawer from "components/CustomDrawer";
import drawerIcon from "components/drawerIcon";
import { View, Text } from "react-native";
import CustomNotification from "components/CustomNotification";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import * as SecureStore from "expo-secure-store";
import global_axios from "global/axios";
import {
  CommonActions,
  Route,
  getFocusedRouteNameFromRoute,
  useNavigation,
} from "@react-navigation/native";
import {
  RootStackNavigationProp,
  RootStackScreenProp,
} from "utils/types/navigators/RootStackNavigators";
import { AuthContext } from "context/AuthContext";

const DashboardScreen = ({ navigation }: RootStackScreenProp) => {
  const { route: nav } = useSelector((state: RootState) => state.route);

  function getHeaderTitle(route: Partial<Route<string>>) {
    // If the focused route is not found, we need to assume it's the initial screen
    // This can happen during if there hasn't been any navigation inside the screen
    // In our case, it's "Feed" as that's the first screen inside the navigator
    const routeName = getFocusedRouteNameFromRoute(route) ?? nav.name;

    switch (routeName) {
      case "Home_Bottom":
        return nav.name;
      case "Programs":
        return "Programs";
      case "Tutorials":
        return "Tutorials";
      case "Favorites":
        return "Favorites";
    }
  }

  const { logOut } = useContext(AuthContext);

  // console.log("routes", route.name);
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
      screenOptions={({ route }) => ({
        headerTitle: getHeaderTitle(route),
        unmountOnBlur: true,
        headerBackground: () => {
          return (
            <View
              style={{
                flex: 1,
                backgroundColor: "#ff2e00",
                shadowColor: "#000000",
                elevation: 10,
              }}
            />
          );
        },
        drawerStyle: {
          width: 310,
        },
        headerTintColor: "#f5f5f5",
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
        drawerActiveBackgroundColor: "#rgba(255,45,0, .2)",
        drawerActiveTintColor: "#ff2e00",
        drawerLabelStyle: { marginLeft: -5 },
      })}
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
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
          title: "Announcements",
          drawerIcon: ({ color, focused, size }) => {
            const name = "megaphone";
            return drawerIcon({ color, size, focused, name });
          },
        })}
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
            const name = "newspaper";
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
            borderTopWidth: 1.5,
            borderTopColor: "#ccc",
          },
          drawerIcon: ({ color, focused, size }) => {
            const name = "information-circle";
            return drawerIcon({ color, size, focused, name });
          },
        }}
      />
      <DrawerStack.Screen
        name="Gym Terms and Conditions"
        component={BottomRootScreen}
        options={{
          headerStyle: {
            height: 120,
          },
          headerTitle: ({ style: styles, children: title }) => {
            return (
              <Text
                style={{
                  fontSize: 22,
                  color: "#f5f5f5",
                }}
                numberOfLines={2}
              >
                Terms and Conditions
              </Text>
            );
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
            const name = "settings";
            return drawerIcon({ color, size, focused, name });
          },
        }}
      />
      <DrawerStack.Screen
        name="Sign Out"
        component={BottomRootScreen}
        options={{
          drawerIcon: ({ color, focused, size }) => {
            const name = "arrow-back";
            return drawerIcon({ color, size, focused, name });
          },
        }}
      />
    </DrawerStack.Navigator>
  );
};

export default DashboardScreen;
