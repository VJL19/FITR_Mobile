import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { WebView } from "react-native-webview";
import CheckoutScreen from "components/CheckoutScreen";
import useIsReady from "hooks/useIsReady";
import LoadingIndicator from "components/LoadingIndicator";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import { useNavigation, useRoute } from "@react-navigation/native";
import { setRoute } from "reducers/routeReducer";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";

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

  const navigation = useNavigation<RootStackNavigationProp>();
  return (
    <View style={styles.container}>
      <Text
        onPress={() =>
          navigation.navigate("DetailedScreens", {
            screen: "View Announcement",
          })
        }
      >
        Announcemnts
      </Text>
    </View>
  );
};

export default Announcements;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
});
