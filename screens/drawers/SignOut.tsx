import { InteractionManager, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { DrawerStackNavigationProp } from "../../utils/types/navigators/DrawerStackNavigators";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import global_axios from "../../global/axios";
import { RootStackNavigationProp } from "../../utils/types/navigators/RootStackNavigators";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import testToken from "../../actions/homeAction";
const SignOut = () => {
  const navigation = useNavigation<DrawerStackNavigationProp>();
  const signOut = useNavigation<RootStackNavigationProp>();

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(testToken());
  }, []);
  useEffect(() => {
    dispatch(testToken());
    navigation.addListener("focus", async () => {
      await SecureStore.deleteItemAsync("accessToken");

      global_axios.defaults.headers.common["Authorization"] = "";

      console.log("deleted successfully!");
    });
  }, [navigation]);

  return (
    <View>
      <Text>SignOut</Text>
    </View>
  );
};

export default SignOut;

const styles = StyleSheet.create({});
