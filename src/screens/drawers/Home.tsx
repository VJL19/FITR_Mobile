import { Text, View, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import LoadingIndicator from "components/LoadingIndicator";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import { setRoute } from "reducers/routeReducer";
import { useNavigation, useRoute } from "@react-navigation/native";
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
  notificationApi,
  setNotificationCount,
  useGetAllNotificationsCountQuery,
} from "reducers/notificationReducer";
import { BottomTabsNavigationProp } from "utils/types/navigators/BottomTabNavigators";
import {
  announcementApi,
  useGetAllTodaysAnnouncementsQuery,
} from "reducers/announcementReducer";
import AnnouncementLists from "screens/view_detailed_screens/Announcements/AnnouncementLists";
import { IAnnouncements } from "utils/types/announcement.types";
import { DrawerStackNavigationProp } from "utils/types/navigators/DrawerStackNavigators";
import { useRefetchOnMessage } from "hooks/useRefetchOnMessage";
import HTTP_ERROR from "utils/enums/ERROR_CODES";

const Home = () => {
  const { value, name } = useSelector((state: RootState) => state.counter);

  const { data, isError, isUninitialized, isFetching } =
    useGetAccessTokenQuery();

  const { data: programs, error: programErr } = useGetTodayProgramsQuery(
    data?.user?.UserID,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: count } = useGetAllNotificationsCountQuery(data?.user?.UserID, {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: workoutFavoritesData,
    isUninitialized: isUninitializedW,
    isFetching: isFetchingW,
    error: workoutErr,
  } = useGetWorkoutsFavoritesQuery(data?.user?.UserID, {
    refetchOnMountOrArgChange: true,
  });

  const { data: announcementsData } = useGetAllTodaysAnnouncementsQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  //refresh today announcements when mutation is perform on the server.
  useRefetchOnMessage("refresh_announcement", () => {
    dispatch(announcementApi.util.invalidateTags(["announcement"]));
  });
  // //refresh notif counts when mutation is perform on the server.
  useRefetchOnMessage("refresh_post", () => {
    dispatch(notificationApi.util.invalidateTags(["notifications"]));
  });

  const navigation = useNavigation<BottomTabsNavigationProp>();
  const navigationDrawer = useNavigation<DrawerStackNavigationProp>();

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setRoute("Home"));
    dispatch(setNotificationCount(count?.result?.[0].NotificationCount));
  }, []);

  // console.log("hey get access token", data?.isAuthenticated);
  const text =
    "Alam mo ba girl (alam mo) Pagka wala ka dito promise ako concern (promise)'Di ka nagre-reply 'di mo pa 'ko ma-confirm (ano ba)  Ayaw mo ba sa 'kin porke wala 'kong skrt (skrt)   O ayaw mo sa 'kin kasi ikaw mas older (uh) 'Di ko pa mabigay mga luho mo't order  Malas lang 'ta mo nga 'tong hawak ko ngayon four pairs (ayos 'yan) Ako batang kalye lang kayo ay foreigners Inalok kita ng red horse sagot mo okur (okur)";
  const speak = () => {
    Speech.speak(text, { language: "en-US" });
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

  // console.log(data?.user?.UserID);
  if (
    programs?.result.length === 0 &&
    announcementsData?.result.length === 0 &&
    workoutFavoritesData?.result.length === 0
  ) {
    return (
      <View style={{ padding: 15 }}>
        <Text
          style={{
            color: "#ff2e00",
            fontSize: 30,
            fontFamily: "Inter-Bold",
            lineHeight: 50,
          }}
        >
          Hello {data?.user?.FirstName}, What's your program today?
        </Text>
      </View>
    );
  }
  if (isError) {
    return <CustomError />;
  }

  if (
    programErr?.status === HTTP_ERROR.BAD_REQUEST ||
    workoutErr?.status === HTTP_ERROR.BAD_REQUEST
  ) {
    return <CustomError />;
  }

  if (isFetching || isUninitialized) {
    return <LoadingIndicator />;
  }

  console.log("hey get access token", workoutErr);

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
              <TouchableOpacity onPress={() => navigation.navigate("Programs")}>
                <Text style={{ color: "#ff2e00", fontWeight: "600" }}>
                  SEE ALL
                </Text>
              </TouchableOpacity>
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

        {announcementsData?.result.length !== 0 && (
          <React.Fragment>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 21 }}>
                Today's announcements
              </Text>
              <TouchableOpacity
                onPress={() => navigationDrawer.navigate("Announcements")}
              >
                <Text style={{ color: "#ff2e00", fontWeight: "600" }}>
                  SEE ALL
                </Text>
              </TouchableOpacity>
            </View>

            <FlatList
              horizontal={true}
              alwaysBounceVertical={true}
              data={announcementsData?.result}
              renderItem={({ item }) => <AnnouncementLists {...item} />}
              keyExtractor={(item: IAnnouncements) =>
                item?.AnnouncementID?.toString()
              }
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
              <TouchableOpacity
                onPress={() => navigation.navigate("Favorites")}
              >
                <Text style={{ color: "#ff2e00", fontWeight: "600" }}>
                  SEE ALL
                </Text>
              </TouchableOpacity>
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
