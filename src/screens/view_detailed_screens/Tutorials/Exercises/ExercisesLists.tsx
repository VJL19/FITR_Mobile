import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import React, { memo } from "react";
import { IExercises } from "utils/types/exercises.types";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setExerciseData } from "reducers/tutorialReducer";
import { AppDispatch } from "store/store";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import dynamicColor from "utils/helpers/dynamicStyles";

const ExercisesLists = ({
  ExerciseID,
  ExerciseExplanation,
  ExerciseCategory,
  ExerciseName,
  ExerciseIntensity,
  ExerciseTargetMuscle,
  ExerciseImage,
}: IExercises) => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const dispatch: AppDispatch = useDispatch();

  const handlePress = () => {
    const arg = {
      ExerciseID: ExerciseID,
      ExerciseName: ExerciseName,
      ExerciseExplanation: ExerciseExplanation,
      ExerciseIntensity: ExerciseIntensity,
      ExerciseTargetMuscle: ExerciseTargetMuscle,
      ExerciseCategory: ExerciseCategory,
      ExerciseImage: ExerciseImage,
      ExerciseSets: "1-2",
      ExerciseReps: "3-4",
    };
    dispatch(setExerciseData(arg));
    navigation.navigate("DetailedScreens", { screen: "View Exercise" });
  };

  return (
    <View style={styles.container}>
      <TouchableNativeFeedback
        useForeground={true}
        background={TouchableNativeFeedback.Ripple(
          "rgba(255,46,0,0.5)",
          true,
          100
        )}
        onPress={handlePress}
      >
        <View style={styles.BoxStyle}>
          <Text numberOfLines={1} style={styles.BoxTextStyle}>
            {ExerciseName}
          </Text>
          <ImageBackground
            source={{
              uri: `https://ik.imagekit.io/yuhonas/${ExerciseImage}/0.jpg`,
            }}
            style={styles.imageStyle}
            resizeMode="cover"
          >
            <View
              style={{
                padding: 12,
                backgroundColor: dynamicColor(ExerciseIntensity),
                alignSelf: "flex-start",
              }}
            >
              <Text style={styles.text}>{ExerciseIntensity}</Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default memo(ExercisesLists);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 5,
  },

  BoxStyle: {
    width: "100%",
    justifyContent: "flex-end",
    backgroundColor: "#f5f5f5",
  },
  BoxTextStyle: {
    width: "100%",
    height: 55,
    backgroundColor: "#131313",
    color: "#f5f5f5",
    position: "absolute",
    fontFamily: "Inter-ExtraBold",
    fontSize: 16,
    textAlign: "center",
    textAlignVertical: "center",
  },
  imageStyle: {
    height: 200,
    resizeMode: "cover",
    width: "100%",
    zIndex: -2,
  },
  text: {
    color: "#f5f5f5",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
