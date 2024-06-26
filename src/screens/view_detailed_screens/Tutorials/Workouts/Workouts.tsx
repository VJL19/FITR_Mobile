import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import { useGetAllWorkoutsQuery } from "reducers/tutorialReducer";
import WorkoutsLists from "./WorkoutsLists";
import { IWorkouts } from "utils/types/workouts.types";
import LoadingIndicator from "components/LoadingIndicator";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import CustomError from "components/CustomError";

const Workouts = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const { isError } = useGetAccessTokenQuery();

  const { data, isUninitialized, isFetching } = useGetAllWorkoutsQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  if (isFetching || isUninitialized) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <CustomError />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        key="_"
        numColumns={2}
        alwaysBounceVertical={true}
        data={data?.workout_results}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        renderItem={({ item }) => <WorkoutsLists {...item} />}
        keyExtractor={(item: IWorkouts) => item?.WorkOutID?.toString()}
      />
    </View>
  );
};

export default Workouts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    justifyContent: "space-between",
  },
});
