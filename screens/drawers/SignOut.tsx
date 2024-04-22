import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { DrawerStackNavigationProp } from "../../utils/types/navigators/DrawerStackNavigators";
import { useNavigation } from "@react-navigation/native";
import { AuthStackNavigationProp } from "../../utils/types/navigators/AuthStackNavigators";
const SignOut = () => {
  const navigation = useNavigation<DrawerStackNavigationProp>();
  const signOut = useNavigation<AuthStackNavigationProp>();
  useEffect(() => {
    navigation.addListener("focus", () => {
      signOut.navigate("Sign In");
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
