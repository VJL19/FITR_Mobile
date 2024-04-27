import {
  Alert,
  InteractionManager,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { DrawerStackNavigationProp } from "../../utils/types/navigators/DrawerStackNavigators";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import global_axios from "../../global/axios";
import { RootStackNavigationProp } from "../../utils/types/navigators/RootStackNavigators";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import testToken from "../../actions/homeAction";
import { AuthContext } from "../../context/AuthContext";
import { logoutUser } from "../../actions/authAction";
const SignOut = () => {
  const navigation = useNavigation<DrawerStackNavigationProp>();
  const signOut = useNavigation<RootStackNavigationProp>();

  const { token, isAuthenticated } = useContext(AuthContext);

  const { logOut } = useContext(AuthContext);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(testToken());
  }, []);
  useEffect(() => {
    dispatch(testToken());
    navigation.addListener("focus", async () => {
      // await logOut();
      // await SecureStore.deleteItemAsync("accessToken");
      // global_axios.defaults.headers.common["Authorization"] = "";
    });

    const logOutUser = async () => {
      await logOut();
    };
    Alert.alert("Message", "Log out successfully!");
    logOutUser();
    console.log("deleted successfully!");
  }, [isAuthenticated, token]);

  return (
    <View>
      <Text>SignOut</Text>
    </View>
  );
};

export default SignOut;

const styles = StyleSheet.create({});
