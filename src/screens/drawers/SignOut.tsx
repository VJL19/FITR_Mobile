import {
  Alert,
  InteractionManager,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { DrawerStackNavigationProp } from "utils/types/navigators/DrawerStackNavigators";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import global_axios from "global/axios";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import testToken from "actions/homeAction";
import { AuthContext } from "context/AuthContext";
import { logoutUser } from "actions/authAction";
import { deleteToken } from "reducers/authReducer";
const SignOut = () => {
  const navigation = useNavigation<DrawerStackNavigationProp>();
  const rootNav = useNavigation<RootStackNavigationProp>();

  const { token, isAuthenticated } = useContext(AuthContext);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(testToken());
    dispatch(deleteToken());
    const deleteTokenAsync = async () => {
      await SecureStore.deleteItemAsync("accessToken");
    };
    deleteTokenAsync();
    // navigation.addListener("focus", async () => {
    //   // await logOut();
    //   dispatch(deleteToken());
    //   const deleteTokenAsync = async () => {
    //     await SecureStore.deleteItemAsync("accessToken");
    //   };
    //   // await SecureStore.deleteItemAsync("accessToken");
    // global_axios.defaults.headers.common["Authorization"] = "";
    // });
    deleteTokenAsync();
    // rootNav.navigate("AuthStackScreens", { screen: "Sign In" });
    Alert.alert("Message!", "Log out successfully!");
    console.log("deleted successfully!");
  }, [isAuthenticated, token]);

  // useEffect(() => {
  //   const loadToken = async () => {
  //     const token = await SecureStore.getItemAsync("accessToken");
  //     if (!token) {
  //       rootNav.reset({
  //         index: 0,
  //         routes: [{ name: "AuthStackScreens" }],
  //       });
  //     }
  //   };
  //   loadToken();
  // }, [navigation]);

  return (
    <View>
      <Text>SignOut</Text>
    </View>
  );
};

export default SignOut;

const styles = StyleSheet.create({});
