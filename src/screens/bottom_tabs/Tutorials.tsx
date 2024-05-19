import {
  InteractionManager,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import LoadingIndicator from "components/LoadingIndicator";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";

const Tutorials = () => {
  const [isReady, setIsReady] = useState(false);

  const navigation = useNavigation<RootStackNavigationProp>();
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setIsReady(true);
    });
  }, []);

  if (!isReady) {
    return <LoadingIndicator />;
  }
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "#202020",
          fontFamily: "Inter-Bold",
          fontSize: 34,
          textAlign: "left",
          marginLeft: 10,
          letterSpacing: 1.2,
        }}
      >
        Available Guides
      </Text>
      <View
        style={{
          width: "100%",
          justifyContent: "space-around",
          flexDirection: "row",
          flexWrap: "wrap",
          rowGap: 25,
        }}
      >
        <TouchableNativeFeedback
          useForeground={true}
          background={TouchableNativeFeedback.Ripple(
            "rgba(255,46,0,0.5)",
            true,

            100
          )}
          onPress={() =>
            navigation.navigate("DetailedScreens", { screen: "Gym Equipments" })
          }
        >
          <View style={styles.BoxStyle}>
            <Text style={styles.BoxTextStyle}>Gym Equipments</Text>
            <MaterialCommunityIcons
              name="dumbbell"
              color={"#ff2e00"}
              size={170}
              style={{ opacity: 0.7, zIndex: 1 }}
            />
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          useForeground={true}
          background={TouchableNativeFeedback.Ripple(
            "rgba(255,46,0,0.5)",
            true,
            100
          )}
          onPress={() =>
            navigation.navigate("DetailedScreens", { screen: "Exercises" })
          }
        >
          <View style={styles.BoxStyle}>
            <Text style={styles.BoxTextStyle}>Exercises</Text>
            <MaterialCommunityIcons
              name="run-fast"
              color={"#ff2e00"}
              size={170}
              style={{ opacity: 0.7, zIndex: 1 }}
            />
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          useForeground={true}
          background={TouchableNativeFeedback.Ripple(
            "rgba(255,46,0,0.5)",
            true,
            100
          )}
          onPress={() =>
            navigation.navigate("DetailedScreens", { screen: "Workouts" })
          }
        >
          <View style={styles.BoxStyle}>
            <Text style={styles.BoxTextStyle}>Workouts</Text>
            <MaterialCommunityIcons
              name="weight-lifter"
              color={"#000000"}
              size={170}
              style={{ opacity: 0.7, zIndex: 1 }}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

export default Tutorials;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "space-around",
  },
  BoxStyle: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    opacity: 0.65,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#ff2e00",
  },
  BoxTextStyle: {
    zIndex: 2,
    position: "absolute",
    color: "black",
    fontFamily: "Inter-ExtraBold",
    fontSize: 24,
    textAlign: "center",
  },
});
