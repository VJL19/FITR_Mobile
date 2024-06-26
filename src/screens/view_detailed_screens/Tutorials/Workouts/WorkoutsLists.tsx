import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  ImageBackground,
} from "react-native";
import React, { memo } from "react";
import { IWorkouts } from "utils/types/workouts.types";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import { AppDispatch } from "store/store";
import { useDispatch } from "react-redux";
import { setWorkoutData } from "reducers/tutorialReducer";
import { WorkoutIntensity } from "utils/enums/Workout";

const WorkoutsLists = ({
  WorkOutID,
  WorkOutName,
  WorkOutExplanation,
  WorkOutIntensity,
  WorkOutTargetMuscle,
  WorkOutCategory,
  WorkOutImage,
}: IWorkouts) => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const dispatch: AppDispatch = useDispatch();

  const handlePress = () => {
    const arg = {
      WorkOutID: WorkOutID,
      WorkOutName: WorkOutName,
      WorkOutExplanation: WorkOutExplanation,
      WorkOutIntensity: WorkOutIntensity,
      WorkOutTargetMuscle: WorkOutTargetMuscle,
      WorkOutCategory: WorkOutCategory,
      WorkOutImage: WorkOutImage,
      WorkOutSets: "1-2",
      WorkOutReps: "3-4",
    };
    dispatch(setWorkoutData(arg));
    navigation.navigate("DetailedScreens", { screen: "View Workout" });
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
            {WorkOutName}
          </Text>
          <ImageBackground
            source={{
              uri: `https://ik.imagekit.io/yuhonas/${WorkOutImage}/0.jpg`,
            }}
            style={styles.imageStyle}
            resizeMode="cover"
          >
            <View
              style={{
                padding: 12,
                backgroundColor:
                  WorkOutIntensity.toUpperCase() === WorkoutIntensity.BEGINNER
                    ? "green"
                    : WorkOutIntensity.toUpperCase() ===
                      WorkoutIntensity.INTERMEDIATE
                    ? "orange"
                    : "red",
                alignSelf: "flex-start",
              }}
            >
              <Text style={styles.text}>{WorkOutIntensity}</Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default memo(WorkoutsLists);

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
