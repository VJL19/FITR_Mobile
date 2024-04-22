import { View, Text } from "react-native";
import React from "react";
import AuthStack from "../navigators/AuthStack";
import { SignUpScreen, SignInScreen } from "./auth/index";

const AuthRootScreen = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Sign In" component={SignInScreen} />
      <AuthStack.Screen name="Sign Up" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthRootScreen;
