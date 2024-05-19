import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { WebView } from "react-native-webview";
import CheckoutScreen from "../../components/CheckoutScreen";
import useIsReady from "../../hooks/useIsReady";
import LoadingIndicator from "../../components/LoadingIndicator";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useRoute } from "@react-navigation/native";
import { setRoute } from "../../reducers/routeReducer";

const Announcements = () => {
  const { isReady } = useIsReady();

  const route = useRoute();
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setRoute("Announcements"));
  }, []);
  if (!isReady) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text style={{ color: "#f5f5f5" }}>Announcemnts</Text>
    </View>
  );
};

export default Announcements;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
    justifyContent: "center",
    alignItems: "center",
  },
});
