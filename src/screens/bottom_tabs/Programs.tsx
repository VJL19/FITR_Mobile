import {
  FlatList,
  InteractionManager,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import LoadingIndicator from "components/LoadingIndicator";
import { useNavigation } from "@react-navigation/native";
import {
  RootStackNavigationProp,
  RootStackParamList,
} from "utils/types/navigators/RootStackNavigators";
import { DashboardStackNavigationProp } from "utils/types/navigators/DashboardStackNavigator";
import { setBottomRoute, setRoute } from "reducers/routeReducer";
import { AppDispatch } from "store/store";
import { useDispatch } from "react-redux";
import { useRoute } from "@react-navigation/native";
import useIsReady from "hooks/useIsReady";
import { DrawerStackNavigationProp } from "utils/types/navigators/DrawerStackNavigators";
import Posts from "screens/view_detailed_screens/Posts/Posts";
import { IPost } from "utils/types/post.types";
import { useGetUserSpecificProgramsQuery } from "reducers/programReducer";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import Program from "screens/view_detailed_screens/Programs/Program";
import IProgram from "utils/types/program_planner.types";
import FloatingActionButton from "components/FloatingActionButton";
import CustomError from "components/CustomError";

const Programs = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const navigation2 = useNavigation<DashboardStackNavigationProp>();

  const { data: user, isError, refetch } = useGetAccessTokenQuery();
  const { data, isFetching, isUninitialized } = useGetUserSpecificProgramsQuery(
    user?.user.UserID,
    { refetchOnMountOrArgChange: true }
  );
  const route = useRoute();
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setRoute(route.name));
    dispatch(setBottomRoute(route.name));
    navigation2.setOptions({ headerTitle: "Programs" });
    refetch();
  }, []);

  const handlePress = () => {
    navigation.navigate("DetailedScreens", { screen: "Add Program" });
  };
  if (data?.result.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Your program is empty!</Text>
        <FloatingActionButton handlePress={handlePress} />
      </View>
    );
  }

  if (isError) {
    return <CustomError />;
  }
  if (isUninitialized || isFetching) {
    return <LoadingIndicator />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={{ fontWeight: "bold", fontSize: 25 }}>All programs</Text>
        <FlatList
          horizontal={true}
          alwaysBounceVertical={true}
          data={data?.result}
          renderItem={({ item }) => <Program {...item} />}
          keyExtractor={(item: IProgram) => item?.ProgramID?.toString()}
        />
        <Text style={{ fontWeight: "bold", fontSize: 25 }}>
          All suggested programs
        </Text>
        <FlatList
          horizontal={true}
          alwaysBounceVertical={true}
          data={data?.result}
          renderItem={({ item }) => <Program {...item} />}
          keyExtractor={(item: IProgram) => item?.ProgramID?.toString()}
        />
      </View>
      <FloatingActionButton handlePress={handlePress} />
    </View>
  );
};

export default Programs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 12,
  },
  textStyle: {
    color: "#202020",
  },
  box: { flex: 0.87, width: "100%" },
});
