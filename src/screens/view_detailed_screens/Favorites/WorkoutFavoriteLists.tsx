import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { IWorkOutFavorites } from "utils/types/favorites.types";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import { AppDispatch } from "store/store";
import { useDispatch } from "react-redux";
import { setWorkoutData } from "reducers/tutorialReducer";
import { INTENSITY } from "utils/enums/Workout";
import dynamicColor from "utils/helpers/dynamicStyles";

const WorkoutFavoriteLists = ({
  WorkOutID,
  WorkOutExplanation,
  WorkOutCategory,
  WorkOutIntensity,
  WorkOutTargetMuscle,
  WorkOutName,
  WorkOutImage,
}: IWorkOutFavorites) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const dispatch: AppDispatch = useDispatch();
  const handlePress = () => {
    const arg = {
      WorkOutID: WorkOutID,
      WorkOutImage: WorkOutImage,
      WorkOutExplanation: WorkOutExplanation,
      WorkOutCategory: WorkOutCategory,
      WorkOutIntensity: WorkOutIntensity,
      WorkOutTargetMuscle: WorkOutTargetMuscle,
      WorkOutName: WorkOutName,
      WorkOutSets: "",
      WorkOutReps: "",
    };
    navigation.navigate("DetailedScreens", { screen: "View Workout" });
    dispatch(setWorkoutData(arg));
  };
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
      <ImageBackground
        imageStyle={{
          borderRadius: 10,
          backgroundColor: "rgb(255,0,0)",
        }}
        style={styles.box}
        source={{
          uri: `https://ik.imagekit.io/yuhonas/${WorkOutImage}/0.jpg`,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0, 0.45)",
            flexDirection: "column",
            padding: 15,
            gap: 25,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              padding: 11,
              alignSelf: "flex-start",
              backgroundColor: dynamicColor(WorkOutIntensity),
              borderRadius: 8,
            }}
          >
            <Text numberOfLines={1} style={styles.subTitle}>
              {WorkOutIntensity.toUpperCase()}
            </Text>
          </View>
          <Text numberOfLines={1} style={styles.title}>
            {WorkOutName}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default WorkoutFavoriteLists;

const styles = StyleSheet.create({
  box: {
    height: 170,
    width: 300,
    marginTop: 15,
    borderRadius: 10,
    marginLeft: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    fontFamily: "Inter-Bold",
    color: "#f5f5f5",
  },
  subTitle: {
    fontSize: 13,
    fontWeight: "800",
    fontFamily: "Inter-Bold",
    color: "#f5f5f5",
  },
});
