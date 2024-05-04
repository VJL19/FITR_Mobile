import { InteractionManager, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import RootStack from "./navigators/RootStack";
import AuthRootScreen from "./screens/AuthRootScreen";
import BottomRootScreen from "./screens/BottomRootScreen";
import DashboardScreen from "./screens/DashboardScreen";
import SplashScreen from "./screens/SplashScreen";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  RootStackNavigationProp,
  RootStackScreenProp,
} from "./utils/types/navigators/RootStackNavigators";
import AuthContextProvider, { AuthContext } from "./context/AuthContext";
import LoadingIndicator from "./components/LoadingIndicator";
import DetailedRootScreen from "./screens/DetailedRootScreen";
import useIsReady from "./hooks/useIsReady";

const RootApp = () => {
  const { isAuthenticated: rs } = useSelector(
    (state: RootState) => state.authReducer
  );

  const navigation = useNavigation<RootStackNavigationProp>();

  const { isReady } = useIsReady();
  const { token, isAuthenticated } = useContext(AuthContext);

  console.log("auth context", rs);
  // console.log("auth tokens", token);

  useEffect(() => {
    // InteractionManager.runAfterInteractions(() => {
    //   setIsReady(true);
    // });
    // navigation.addListener("focus", async () => {
    //   if (status === 200) {
    //     if (isAuthenticated) {
    //       navigation.replace("DashboardScreen");
    //     }
    //   } else if (status === 400) {
    //     if (!isAuthenticated) {
    //       navigation.replace("AuthStackScreens", { screen: "Sign In" });
    //     }
    //   }
    //   console.log("run", isAuthenticated);
    // });
  }, []);
  // console.log(
  //   "T headers: ",
  //   global_axios.defaults.headers.common["Authorization"]
  // );
  if (!isReady) {
    return <LoadingIndicator />;
  }
  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false, freezeOnBlur: true }}
    >
      {!token || !isAuthenticated ? (
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
          <RootStack.Screen name="BottomTab" component={BottomRootScreen} />
          <RootStack.Screen name="SplashScreen" component={SplashScreen} />
          <RootStack.Screen
            name="DetailedScreens"
            component={DetailedRootScreen}
          />
        </RootStack.Group>
      )}
    </RootStack.Navigator>
  );
};

export default RootApp;

const styles = StyleSheet.create({});
