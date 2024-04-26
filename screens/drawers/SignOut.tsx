import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { DrawerStackNavigationProp } from "../../utils/types/navigators/DrawerStackNavigators";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import global_axios from "../../global/axios";
import { RootStackNavigationProp } from "../../utils/types/navigators/RootStackNavigators";
const SignOut = () => {
  const navigation = useNavigation<DrawerStackNavigationProp>();
  const signOut = useNavigation<RootStackNavigationProp>();
  useEffect(() => {
    navigation.addListener("focus", async () => {
      await SecureStore.deleteItemAsync("accessToken");

      global_axios.defaults.headers.common["Authorization"] = "";
      signOut.navigate("AuthStackScreens", { screen: "Sign In" });
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
