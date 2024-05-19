import { StyleSheet, Text, View } from "react-native";
import React, { useState, useRef, Ref } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { DetailedRootStackNavigatorsParamList } from "utils/types/detailed_screens/DetailedRootStackNavigators";
import WebView from "react-native-webview";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

const ProcessCheckout = () => {
  const { details, error, checkout_url } = useSelector(
    (state: RootState) => state.subscription
  );

  const route = useRoute<RouteProp<DetailedRootStackNavigatorsParamList>>();
  const [status, setStatus] = useState(false);
  console.log("url in reducer", checkout_url);

  if (status) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ color: "#f5f5f5", fontSize: 22, textAlign: "center" }}>
          Successfully sent the payment! awaiting for confirmation :) You can
          now proceed to back this screen.
        </Text>
      </View>
    );
  }
  return (
    <React.Fragment>
      <WebView
        originWhitelist={["*"]}
        source={{
          uri: checkout_url,
        }}
        startInLoadingState={true}
        domStorageEnabled={true}
        nestedScrollEnabled={true}
        scrollEnabled={true}
        showsVerticalScrollIndicator={true}
        style={styles.webStyle}
        onNavigationStateChange={(state) => {
          if (state.url.includes("https://test-sources.paymongo.com/")) {
            setStatus(true);
          }
          console.log("for admin", state.url);
        }}
      />
    </React.Fragment>
  );
};

export default ProcessCheckout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: "#f5f5f5",
  },
  webStyle: {
    flex: 1,
    alignSelf: "stretch",
    marginTop: 25,
  },
});
