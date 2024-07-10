import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import { useGetExerciseByTargetMuscleQuery } from "reducers/tutorialReducer";
import ExercisesLists from "./ExercisesLists";
import { IExercises } from "utils/types/exercises.types";
import LoadingIndicator from "components/LoadingIndicator";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import CustomError from "components/CustomError";
import { ScrollView } from "react-native-gesture-handler";

const Exercises = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [selectedTargetMuscle, setSelectedTargetMuscle] = useState("All");

  const {
    data: filteredExercises,
    isFetching,
    isUninitialized,
  } = useGetExerciseByTargetMuscleQuery(selectedTargetMuscle, {
    refetchOnMountOrArgChange: true,
  });

  const targetMuscles = [
    "All",
    "abdominals",
    "abductors",
    "adductors",
    "biceps",
    "calves",
    "chest",
    "forearms",
    "glutes",
    "hamstrings",
    "lats",
    "lower back",
    "neck",
    "quadriceps",
    "traps",
    "triceps",
  ];
  const { isError } = useGetAccessTokenQuery();

  const handlePress = (targetMuscle: string) => {
    setSelectedTargetMuscle(targetMuscle);
  };
  const renderTargetMuscles = targetMuscles.map((targetMuscle) => (
    <View
      key={targetMuscle}
      style={{
        marginRight: 15,
        padding: 15,
        backgroundColor:
          selectedTargetMuscle === targetMuscle ? "#ff2e00" : "transparent",
      }}
    >
      <TouchableOpacity onPress={() => handlePress(targetMuscle)}>
        <Text
          style={{
            fontWeight:
              selectedTargetMuscle === targetMuscle ? "800" : "normal",
            fontSize: 14,
            color: selectedTargetMuscle === targetMuscle ? "#f5f5f5" : "black",
          }}
        >
          {targetMuscle.toUpperCase()}
        </Text>
      </TouchableOpacity>
    </View>
  ));

  if (isFetching || isUninitialized) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <CustomError />;
  }

  return (
    <View style={styles.container}>
      <View>
        <ScrollView horizontal={true}>{renderTargetMuscles}</ScrollView>
      </View>

      <FlatList
        key="exercises_"
        numColumns={2}
        alwaysBounceVertical={true}
        data={filteredExercises?.exercise_results}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        renderItem={({ item }) => <ExercisesLists {...item} />}
        keyExtractor={(item: IExercises) => item?.ExerciseID?.toString()}
      />
    </View>
  );
};

export default Exercises;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: "space-between",
  },
});
