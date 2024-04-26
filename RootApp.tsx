import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import RootStack from "./navigators/RootStack";
import AuthRootScreen from "./screens/AuthRootScreen";
import BottomRootScreen from "./screens/BottomRootScreen";
import DashboardScreen from "./screens/DashboardScreen";
import SplashScreen from "./screens/SplashScreen";
import global_axios from "./global/axios";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { useNavigation } from "@react-navigation/native";
import {
  RootStackNavigationProp,
  RootStackScreenProp,
} from "./utils/types/navigators/RootStackNavigators";
import { AuthStackNavigationProp } from "./utils/types/navigators/AuthStackNavigators";

const RootApp = () => {
  const [token, setToken] = useState("");
  const { isAuthenticated, accessToken, status } = useSelector(
    (state: RootState) => state.authReducer
  );

  const ACCESS_TOKEN = "accessToken";

  useEffect(() => {
    const loadAccessToken = async () => {
      const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN);
      setToken(accessToken!);
      console.log("access token stored: ", accessToken);
      if (accessToken) {
        global_axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
      }
    };
    loadAccessToken();
  }, []);
  console.log(
    "T headers: ",
    global_axios.defaults.headers.common["Authorization"]
  );
  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false, freezeOnBlur: true }}
    >
      {!isAuthenticated && accessToken === undefined ? (
        <RootStack.Group>
          <RootStack.Screen
            name="AuthStackScreens"
            component={AuthRootScreen}
          />
          <RootStack.Screen name="SplashScreen" component={SplashScreen} />
        </RootStack.Group>
      ) : (
        <RootStack.Group>
          <RootStack.Screen
            name="DashboardScreen"
            component={DashboardScreen}
          />
          <RootStack.Screen name="SplashScreen" component={SplashScreen} />
          <RootStack.Screen name="BottomTab" component={BottomRootScreen} />
        </RootStack.Group>
      )}
    </RootStack.Navigator>
  );
};

export default RootApp;

const styles = StyleSheet.create({});
