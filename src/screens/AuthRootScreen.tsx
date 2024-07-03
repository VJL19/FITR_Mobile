import { View, Text, Alert } from "react-native";
import React from "react";
import AuthStack from "navigators/AuthStack";
import { SignUpScreen, SignInScreen } from "screens/auth/index";
import { AppDispatch, RootState } from "store/store";
import { useDispatch, useSelector } from "react-redux";
import { clearFormFields } from "reducers/authReducer";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import { useNavigation } from "@react-navigation/native";

const AuthRootScreen = () => {
  // const { isAuthenticated, accessToken } = useSelector(
  //   (state: RootState) => state.authReducer
  // );
  const { LastName, FirstName, MiddleName, Age, Birthday } = useSelector(
    (state: RootState) => state.authReducer.personalInfo
  );

  const navigation = useNavigation<RootStackNavigationProp>();

  const dispatch: AppDispatch = useDispatch();
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
      <AuthStack.Screen
        name="Sign Up"
        component={SignUpScreen}
        listeners={{
          beforeRemove: (e) => {
            if (
              LastName?.length >= 1 ||
              FirstName?.length >= 1 ||
              MiddleName?.length >= 1 ||
              Age?.length >= 1
            ) {
              e.preventDefault();
              // Prompt the user before leaving the screen
              Alert.alert(
                "Are you sure?",
                "The values in the fields will not be saved. Are you sure to discard them and leave the screen?",
                [
                  { text: "Don't leave", style: "cancel", onPress: () => {} },
                  {
                    text: "Ok",
                    style: "destructive",
                    // If the user confirmed, then we dispatch the action we blocked earlier
                    // This will continue the action that had triggered the removal of the screen
                    onPress: async () => {
                      navigation.dispatch(e.data.action);
                      dispatch(clearFormFields());
                    },
                  },
                ]
              );
            }
          },
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthRootScreen;
