import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../../utils/types/navigators/RootStackNavigators";
import CustomButton from "../../components/CustomButton";
const SignInScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/bg_fitr.jpeg")}
    >
      <View style={styles.opacityBg}>
        <View>
          <Image
            source={require("../../assets/fitr_logo3.png")}
            style={{ height: 300, width: 310 }}
          />
        </View>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "space-around",
            flex: 0.3,
          }}
        >
          <CustomButton
            buttonStyle={styles.btnPrimary}
            textStyle={styles.btnPrimaryText}
            textValue="Sign In"
            screenToNavigate={"DashboardScreen"}
          />
          <CustomButton
            buttonStyle={styles.btnSecondary}
            textStyle={styles.btnSecondaryText}
            textValue="Sign Up"
            screenToNavigate={"Sign Up"}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.75)",
    opacity: 0.9,
  },
  opacityBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.75)",
    opacity: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  btnPrimary: {
    width: "90%",
    backgroundColor: "#FF2E00",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  btnPrimaryText: { color: "#F5F5F5", fontWeight: "800", fontSize: 18 },
  btnSecondary: {
    width: "90%",
    backgroundColor: "#F5F5F5",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  btnSecondaryText: {
    color: "#131313",
    fontWeight: "800",
    fontSize: 18,
  },
});

export default SignInScreen;
