import {
  Text,
  Image,
  Button,
  ImageBackground,
  View,
  Pressable,
  StyleSheet,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../utils/types/navigators/RootStackNavigators";
import { SafeAreaView } from "react-native-safe-area-context";

const SplashScreen = () => {
  const navigate = useNavigation<RootStackNavigationProp>();
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/bg_fitr.jpeg")}
    >
      <View style={styles.blur}>
        <Image
          source={require("../assets/fitr_logo3.png")}
          style={{ height: "40%", width: "100%" }}
        />

        <View>
          <View style={styles.btnPrimary}>
            <Pressable
              style={{ height: 50 }}
              onPress={() =>
                navigate.navigate("AuthStackScreens", { screen: "Sign In" })
              }
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.btnPrimaryText}>Get Started</Text>
              </View>
            </Pressable>
          </View>
          <View style={styles.btnSecondary}>
            <Pressable
              style={{ height: 50 }}
              onPress={() =>
                navigate.navigate("AuthStackScreens", { screen: "Sign In" })
              }
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.btnSecondaryText}>Sign Up</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    opacity: 1,
  },
  btnPrimary: {
    width: "90%",
    borderRadius: 150,
    height: 50,
    backgroundColor: "#FF2E00",
  },
  btnPrimaryText: {
    textAlign: "center",
    color: "#f5f5f5",
    fontSize: 18,
    fontWeight: "bold",
  },
  btnSecondary: {
    width: "90%",
    borderRadius: 150,
    height: 50,
    backgroundColor: "#F5F5F5",
  },
  btnSecondaryText: {
    textAlign: "center",
    color: "#131313",
    fontSize: 18,
    fontWeight: "bold",
  },
  blur: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "rgba(0,0,0,0.75)",
  },
});
export default SplashScreen;
