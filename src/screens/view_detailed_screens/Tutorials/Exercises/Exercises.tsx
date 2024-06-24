import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import { useGetAllExercisesQuery } from "reducers/tutorialReducer";
import ExercisesLists from "./ExercisesLists";
import { IExercises } from "utils/types/exercises.types";
import LoadingIndicator from "components/LoadingIndicator";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import CustomError from "components/CustomError";

const Exercises = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const { isError } = useGetAccessTokenQuery();
  const { data, isFetching, isUninitialized } = useGetAllExercisesQuery();

  if (isFetching || isUninitialized) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <CustomError />;
  }

  return (
    <View>
      <Text>Exercises</Text>

      <FlatList
        alwaysBounceVertical={true}
        data={data?.exercise_results}
        renderItem={({ item }) => <ExercisesLists {...item} />}
        keyExtractor={(item: IExercises) => item?.ExerciseID?.toString()}
      />
    </View>
  );
};

export default Exercises;

const styles = StyleSheet.create({});
