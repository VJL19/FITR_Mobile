import { View, Text } from "react-native";
import React from "react";
import AuthStack from "../navigators/AuthStack";
import { SignUpScreen, SignInScreen } from "screens/auth/index";
import { RootState } from "store/store";
import { useSelector } from "react-redux";

const AuthRootScreen = () => {
  const { isAuthenticated, accessToken } = useSelector(
    (state: RootState) => state.authReducer
  );
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#ff2e00" },
        headerTintColor: "#f5f5f5",
        headerTitle: "Personal Information",
      }}
    >
      <AuthStack.Screen
        name="Sign In"
        component={SignInScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen name="Sign Up" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthRootScreen;
