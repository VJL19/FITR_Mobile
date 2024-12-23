import {
  FlatList,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import {
  useGetAllWorkoutsQuery,
  useGetWorkOutByTargetMuscleQuery,
} from "reducers/tutorialReducer";
import WorkoutsLists from "./WorkoutsLists";
import { IWorkouts } from "utils/types/workouts.types";
import LoadingIndicator from "components/LoadingIndicator";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import CustomError from "components/CustomError";
import SearchBar from "components/SearchBar";
import HTTP_ERROR from "utils/enums/ERROR_CODES";
import { FlashList } from "@shopify/flash-list";

const Workouts = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [selectedTargetMuscle, setSelectedTargetMuscle] = useState("All");
  const [searchWorkout, setSearchWorkout] = useState("");
  const [queryWorkouts, setQueryWorkouts] = useState<IWorkouts[]>();

  const {
    data: filteredWorkouts,
    isFetching,
    isUninitialized,
    error: workoutErr,
  } = useGetWorkOutByTargetMuscleQuery(selectedTargetMuscle, {
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
    "middle back",
    "lower back",
    "neck",
    "quadriceps",
    "traps",
    "triceps",
  ];

  useEffect(() => {
    setQueryWorkouts(filteredWorkouts?.workout_results);
  }, [filteredWorkouts?.workout_results]);
  const { isError } = useGetAccessTokenQuery();

  // const { data, isUninitialized, isFetching } = useGetAllWorkoutsQuery(
  //   undefined,
  //   {
  //     refetchOnMountOrArgChange: true,
  //   }
  // );

  const handlePress = (targetMuscle: string) => {
    setSelectedTargetMuscle(targetMuscle);
    setSearchWorkout("");
  };

  console.log(filteredWorkouts?.workout_results.length);

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

  const handleSearch = (text: string) => {
    const formattedQuery = text.toLowerCase();

    if (formattedQuery) {
      const filteredWorkout = filteredWorkouts?.workout_results?.filter(
        (workout) => workout.WorkOutName.toLowerCase().includes(formattedQuery)
      );

      setQueryWorkouts(filteredWorkout);
    } else {
      setQueryWorkouts(filteredWorkouts?.workout_results);
    }
    setSearchWorkout(text);
  };

  if (isFetching || isUninitialized) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <CustomError />;
  }
  if (workoutErr?.status === HTTP_ERROR.BAD_REQUEST) {
    return <CustomError />;
  }
  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search any workout"
        value={searchWorkout}
        handleChangeText={handleSearch}
      />
      <View>
        <ScrollView horizontal={true}>{renderTargetMuscles}</ScrollView>
      </View>
      <FlashList
        onScrollEndDrag={() => Keyboard.dismiss()}
        onScrollBeginDrag={() => Keyboard.dismiss()}
        key="workouts"
        data={queryWorkouts}
        numColumns={2}
        alwaysBounceVertical={true}
        keyExtractor={(item: IWorkouts) => item?.WorkOutID?.toString()}
        renderItem={({ item }) => <WorkoutsLists {...item} />}
        estimatedItemSize={50}
      />
    </View>
  );
};

export default Workouts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    justifyContent: "space-between",
  },
});
