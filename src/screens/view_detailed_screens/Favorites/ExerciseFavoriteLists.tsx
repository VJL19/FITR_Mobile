import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { IExerciseFavorites } from "utils/types/favorites.types";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import { AppDispatch } from "store/store";
import { useDispatch } from "react-redux";
import { setExerciseData } from "reducers/tutorialReducer";

const ExerciseFavoriteLists = ({
  ExerciseID,
  ExerciseExplanation,
  ExerciseCategory,
  ExerciseIntensity,
  ExerciseTargetMuscle,
  ExerciseName,
  ExerciseImage,
}: IExerciseFavorites) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const dispatch: AppDispatch = useDispatch();
  const handlePress = () => {
    const arg = {
      ExerciseID: ExerciseID,
      ExerciseImage: ExerciseImage,
      ExerciseExplanation: ExerciseExplanation,
      ExerciseCategory: ExerciseCategory,
      ExerciseIntensity: ExerciseIntensity,
      ExerciseTargetMuscle: ExerciseTargetMuscle,
      ExerciseName: ExerciseName,
      ExerciseSets: "",
      ExerciseReps: "",
    };
    navigation.navigate("DetailedScreens", { screen: "View Exercise" });
    dispatch(setExerciseData(arg));
  };
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
      <ImageBackground
        imageStyle={{ borderRadius: 10 }}
        style={styles.box}
        source={{
          uri: `https://ik.imagekit.io/yuhonas/${ExerciseImage}/0.jpg`,
        }}
      >
        <View
          style={{
            padding: 11,
            alignSelf: "flex-start",
            backgroundColor: "#202020",
          }}
        >
          <Text numberOfLines={1} style={styles.title}>
            {ExerciseName}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default ExerciseFavoriteLists;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
    padding: 15,
    marginTop: 15,
    borderRadius: 10,
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    fontFamily: "Inter-Bold",
    color: "#f5f5f5",
  },
});
