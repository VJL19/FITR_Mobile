import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import { useGetExerciseByTargetMuscleQuery } from "reducers/tutorialReducer";
import ExercisesLists from "./ExercisesLists";
import { IExercises } from "utils/types/exercises.types";
import LoadingIndicator from "components/LoadingIndicator";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import CustomError from "components/CustomError";
import { ScrollView } from "react-native-gesture-handler";
import SearchBar from "components/SearchBar";

const Exercises = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [selectedTargetMuscle, setSelectedTargetMuscle] = useState("All");
  const [queryExercises, setQueryExercises] = useState<IExercises[]>();
  const [searchExercise, setSearchExercise] = useState("");
  const {
    data: filteredExercises,
    isFetching,
    isUninitialized,
  } = useGetExerciseByTargetMuscleQuery(selectedTargetMuscle, {
    refetchOnMountOrArgChange: true,
  });

  const { isError } = useGetAccessTokenQuery();
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

  useEffect(() => {
    setQueryExercises(filteredExercises?.exercise_results);
  }, [filteredExercises?.exercise_results]);

  const handlePress = (targetMuscle: string) => {
    setSelectedTargetMuscle(targetMuscle);
  };

  const handleSearch = (text: string) => {
    const formattedQuery = text.toLowerCase();

    if (formattedQuery) {
      const _filteredExercises = filteredExercises?.exercise_results?.filter(
        (exercise) =>
          exercise.ExerciseName.toLowerCase().includes(formattedQuery)
      );

      setQueryExercises(_filteredExercises);
    } else {
      setQueryExercises(filteredExercises?.exercise_results);
    }
    setSearchExercise(text);
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
      <SearchBar
        placeholder="Search any exercises"
        value={searchExercise}
        handleChangeText={handleSearch}
      />
      <View>
        <ScrollView horizontal={true}>{renderTargetMuscles}</ScrollView>
      </View>

      <FlatList
        onScrollEndDrag={() => Keyboard.dismiss()}
        onScrollBeginDrag={() => Keyboard.dismiss()}
        key="exercises_"
        numColumns={2}
        alwaysBounceVertical={true}
        data={queryExercises}
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
    marginTop: 25,
    justifyContent: "space-between",
  },
});
