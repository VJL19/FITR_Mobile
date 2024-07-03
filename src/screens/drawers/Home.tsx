import { Text, View, Button, FlatList, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import LoadingIndicator from "components/LoadingIndicator";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import { increment, incrementByAmount } from "reducers/counterReducer";
import { setRoute } from "reducers/routeReducer";
import { useRoute } from "@react-navigation/native";
import useIsReady from "hooks/useIsReady";
import * as Speech from "expo-speech";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import CustomError from "components/CustomError";
import { useGetTodayProgramsQuery } from "reducers/programReducer";
import Program from "screens/view_detailed_screens/Programs/Program";
import IProgram from "utils/types/program_planner.types";
import { ScrollView } from "react-native-gesture-handler";
import { useGetWorkoutsFavoritesQuery } from "reducers/favoriteReducer";
import WorkoutFavoriteLists from "screens/view_detailed_screens/Favorites/WorkoutFavoriteLists";
import { IWorkOutFavorites } from "utils/types/favorites.types";
import {
  setNotificationCount,
  useGetAllNotificationsCountQuery,
} from "reducers/notificationReducer";
const Home = () => {
  const { value, name } = useSelector((state: RootState) => state.counter);

  const { data, isError } = useGetAccessTokenQuery();

  const {
    data: programs,
    isUninitialized,
    isFetching,
  } = useGetTodayProgramsQuery(data?.user?.UserID, {
    refetchOnMountOrArgChange: true,
  });

  const { data: count } = useGetAllNotificationsCountQuery(data?.user?.UserID);

  const {
    data: workoutFavoritesData,
    isUninitialized: isUninitializedW,
    isFetching: isFetchingW,
  } = useGetWorkoutsFavoritesQuery(data?.user?.UserID, {
    refetchOnMountOrArgChange: true,
  });

  const route = useRoute();
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setRoute("Home"));
    dispatch(setNotificationCount(count?.result?.[0].NotificationCount));
  }, []);

  const text =
    "Alam mo ba girl (alam mo) Pagka wala ka dito promise ako concern (promise)'Di ka nagre-reply 'di mo pa 'ko ma-confirm (ano ba)  Ayaw mo ba sa 'kin porke wala 'kong skrt (skrt)   O ayaw mo sa 'kin kasi ikaw mas older (uh) 'Di ko pa mabigay mga luho mo't order  Malas lang 'ta mo nga 'tong hawak ko ngayon four pairs (ayos 'yan) Ako batang kalye lang kayo ay foreigners Inalok kita ng red horse sagot mo okur (okur)";
  const speak = () => {
    // en-us-x-sfg-network
    Speech.speak(text, { language: "en-US" });
  };

  const stop = () => {
    Speech.stop();
  };

  // if (
  //   programs?.result.length === 0 &&
  //   workoutFavoritesData?.result.length === 0
  // ) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <Text style={{ color: "#ff2e00", fontSize: 18 }}>
  //         Hello {data?.user?.FirstName}, What's your program today?
  //       </Text>
  //     </View>
  //   );
  // }

  if (isError) {
    return <CustomError />;
  }

  if (isFetching || isUninitialized) {
    return <LoadingIndicator />;
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5", padding: 12 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {programs?.result.length !== 0 && (
          <React.Fragment>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 23 }}>
                Today's programs
              </Text>
              <Text style={{ color: "#ff2e00", fontWeight: "600" }}>
                SEE ALL
              </Text>
            </View>

            <FlatList
              horizontal={true}
              alwaysBounceVertical={true}
              data={programs?.result}
              renderItem={({ item }) => <Program {...item} />}
              keyExtractor={(item: IProgram) => item?.ProgramID?.toString()}
            />
          </React.Fragment>
        )}

        {programs?.result.length !== 0 && (
          <React.Fragment>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 23 }}>
                Suggested programs
              </Text>
              <Text style={{ color: "#ff2e00", fontWeight: "600" }}>
                SEE ALL
              </Text>
            </View>

            <FlatList
              horizontal={true}
              alwaysBounceVertical={true}
              data={programs?.result}
              renderItem={({ item }) => <Program {...item} />}
              keyExtractor={(item: IProgram) => item?.ProgramID?.toString()}
            />
          </React.Fragment>
        )}

        {workoutFavoritesData?.result.length !== 0 && (
          <React.Fragment>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 23 }}>
                Your favorites
              </Text>
              <Text style={{ color: "#ff2e00", fontWeight: "600" }}>
                SEE ALL
              </Text>
            </View>

            <FlatList
              horizontal={true}
              alwaysBounceVertical={true}
              data={workoutFavoritesData?.result}
              renderItem={({ item }) => <WorkoutFavoriteLists {...item} />}
              keyExtractor={(item: IWorkOutFavorites) =>
                item?.WorkOutID?.toString()
              }
            />
          </React.Fragment>
        )}
      </ScrollView>
    </View>
  );
};

export default Home;
