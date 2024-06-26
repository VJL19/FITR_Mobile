import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import React from "react";
import { DetailedRootStackScreenProp } from "utils/types/detailed_screens/DetailedRootStackNavigators";

const ViewTutorialYoutube = ({ route }: DetailedRootStackScreenProp) => {
  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={{
          uri: route?.params?.yt_url,
        }}
        nestedScrollEnabled={true}
        scrollEnabled={true}
        showsVerticalScrollIndicator={true}
        style={styles.webStyle}
      />
    </View>
  );
};

export default ViewTutorialYoutube;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  webStyle: {
    flexGrow: 1,
  },
});
