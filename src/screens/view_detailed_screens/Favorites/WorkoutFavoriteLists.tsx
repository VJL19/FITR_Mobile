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
        imageStyle={{ borderRadius: 10 }}
        style={styles.box}
        source={{
          uri: `https://ik.imagekit.io/yuhonas/${WorkOutImage}/0.jpg`,
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
    height: 180,
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
