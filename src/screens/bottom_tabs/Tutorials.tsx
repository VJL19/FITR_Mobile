import {
  InteractionManager,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import LoadingIndicator from "components/LoadingIndicator";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import gym_equipLogo from "assets/equipment.jpg";
import workout_logo from "assets/workout.jpg";
import exercise_logo from "assets/exercises.jpg";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import CustomError from "components/CustomError";

const Tutorials = () => {
  const [isReady, setIsReady] = useState(false);
  const { data, isError, isFetching, isUninitialized, refetch } =
    useGetAccessTokenQuery();

  const navigation = useNavigation<RootStackNavigationProp>();
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setIsReady(true);
    });
    refetch();
  }, []);

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
  if (isFetching || isUninitialized) {
    return <LoadingIndicator />;
  }
  if (isError) {
    return <CustomError />;
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
            <Text numberOfLines={1} style={styles.BoxTextStyle}>
              Gym Equipments
            </Text>
            <Image source={gym_equipLogo} style={styles.imageStyle} />
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
            <Image source={exercise_logo} style={styles.imageStyle} />
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
            <Image source={workout_logo} style={styles.imageStyle} />
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
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    justifyContent: "space-around",
  },
  BoxStyle: {
    width: 175,
    justifyContent: "flex-end",
    backgroundColor: "#f5f5f5",
  },
  BoxTextStyle: {
    width: "100%",
    height: 65,
    backgroundColor: "#131313",
    color: "#f5f5f5",
    position: "absolute",
    fontFamily: "Inter-ExtraBold",
    fontSize: 18,
    textAlign: "center",
    textAlignVertical: "center",
  },
  imageStyle: {
    height: 180,
    resizeMode: "cover",
    width: "auto",
    zIndex: -2,
  },
});
