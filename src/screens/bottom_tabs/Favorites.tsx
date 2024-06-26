import {
  FlatList,
  InteractionManager,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import LoadingIndicator from "components/LoadingIndicator";
import { useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store/store";
import { setBottomRoute, setRoute } from "reducers/routeReducer";
import {
  useGetExercisesFavoritesQuery,
  useGetWorkoutsFavoritesQuery,
} from "reducers/favoriteReducer";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import FavoriteLists from "screens/view_detailed_screens/Favorites/ExerciseFavoriteLists";
import {
  IExerciseFavorites,
  IWorkOutFavorites,
} from "utils/types/favorites.types";
import CustomError from "components/CustomError";
import ExerciseFavoriteLists from "screens/view_detailed_screens/Favorites/ExerciseFavoriteLists";
import WorkoutFavoriteLists from "screens/view_detailed_screens/Favorites/WorkoutFavoriteLists";

const Favorites = () => {
  const route = useRoute();

  const { isError, data: user } = useGetAccessTokenQuery();
  const { data, isUninitialized, isFetching } = useGetExercisesFavoritesQuery(
    user?.user?.UserID,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const {
    data: workoutFavoritesData,
    isUninitialized: isUninitializedW,
    isFetching: isFetchingW,
  } = useGetWorkoutsFavoritesQuery(user?.user?.UserID, {
    refetchOnMountOrArgChange: true,
  });

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      dispatch(setRoute(route.name));
      dispatch(setBottomRoute(route.name));
    });
  }, []);

  if (isError) {
    return <CustomError />;
  }
  if (isFetching || isUninitialized || isFetchingW || isUninitializedW) {
    return <LoadingIndicator />;
  }

  if (data?.result.length === 0 && workoutFavoritesData?.result.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 22 }}>Your favorite lists is empty!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {data?.result.length !== 0 && (
        <View style={{ flex: 0.5 }}>
          <Text style={styles.title}>Your Exercise Favorites</Text>
          <FlatList
            horizontal={true}
            alwaysBounceVertical={true}
            data={data?.result}
            renderItem={({ item }) => <ExerciseFavoriteLists {...item} />}
            keyExtractor={(item: IExerciseFavorites) =>
              item?.ExerciseID?.toString()
            }
          />
        </View>
      )}
      {workoutFavoritesData?.result.length !== 0 && (
        <View style={{ flex: 0.5 }}>
          <Text style={styles.title}>Your Workout Favorites</Text>
          <FlatList
            horizontal={true}
            alwaysBounceVertical={true}
            data={workoutFavoritesData?.result}
            renderItem={({ item }) => <WorkoutFavoriteLists {...item} />}
            keyExtractor={(item: IWorkOutFavorites) =>
              item?.WorkOutID?.toString()
            }
          />
        </View>
      )}
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  title: {
    fontSize: 23,
    fontFamily: "Inter-Bold",
  },
});
