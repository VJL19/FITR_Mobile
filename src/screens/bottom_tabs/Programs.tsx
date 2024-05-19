import { InteractionManager, StyleSheet, Text, View } from "react-native";
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

const Programs = () => {
  const { isReady } = useIsReady();
  const navigation = useNavigation<RootStackNavigationProp>();
  const navigation2 = useNavigation<DashboardStackNavigationProp>();
  const route = useRoute();
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setRoute(route.name));
    dispatch(setBottomRoute(route.name));
    navigation2.setOptions({ headerTitle: "Programs" });
  }, []);

  if (!isReady) {
    return <LoadingIndicator />;
  }
  return (
    <View style={styles.container}>
      <Text
        style={styles.textStyle}
        onPress={() =>
          navigation.navigate("DetailedScreens", { screen: "Add Programs" })
        }
      >
        Add Programs
      </Text>
    </View>
  );
};

export default Programs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#202020",
  },
  textStyle: {
    color: "#f5f5f5",
  },
});
function RouteProp<T>() {
  throw new Error("Function not implemented.");
}
