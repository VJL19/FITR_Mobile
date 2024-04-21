import { View, Text, Image, Button, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../utils/types/navigators/RootStackNavigators";
import { SafeAreaView } from "react-native-safe-area-context";

const SplashScreen = () => {
  const navigate = useNavigation<RootStackNavigationProp>();
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Image source={{ uri: "./assets/adaptive-icon.png" }} />
      <Text>SplashScreen</Text>
      <Button
        title="Get Started"
        color={"#131313"}
        onPress={() =>
          navigate.navigate("AuthStackScreens", { screen: "Sign In" })
        }
      />
    </SafeAreaView>
  );
};

export default SplashScreen;
