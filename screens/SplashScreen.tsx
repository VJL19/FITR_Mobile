import {
  Text,
  Image,
  ImageBackground,
  View,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../utils/types/navigators/RootStackNavigators";

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
          style={{ height: "50%", width: "100%" }}
        />

        <View
          style={{
            width: "100%",
            rowGap: 25,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btnPrimary}
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
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btnSecondary}
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
          </TouchableOpacity>
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
