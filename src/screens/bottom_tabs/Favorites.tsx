import { InteractionManager, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import LoadingIndicator from "components/LoadingIndicator";
import { useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store/store";
import { setBottomRoute, setRoute } from "reducers/routeReducer";

const Favorites = () => {
  const [isReady, setIsReady] = useState(false);

  const route = useRoute();

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setIsReady(true);
      dispatch(setRoute(route.name));
      dispatch(setBottomRoute(route.name));
    });
  }, []);

  if (!isReady) {
    return <LoadingIndicator />;
  }
  return (
    <View style={styles.container}>
      <Text>Favorites</Text>
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
  },
});
