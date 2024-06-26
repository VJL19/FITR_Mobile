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
    <View style={styles.container}>
      <FlatList
        key="exercises_"
        numColumns={2}
        alwaysBounceVertical={true}
        data={data?.exercise_results}
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
    marginTop: 100,
    justifyContent: "space-between",
  },
});
